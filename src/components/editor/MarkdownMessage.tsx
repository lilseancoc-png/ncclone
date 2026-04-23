"use client";

import { useMemo, useState, type ReactNode } from "react";

type Block =
  | { kind: "prose"; text: string }
  | { kind: "code"; lang: string; content: string; closed: boolean };

/**
 * Streaming-safe: an unclosed ``` region at the end of the input renders as an
 * open code block so partial AI output looks stable while tokens arrive.
 */
function parseBlocks(input: string): Block[] {
  const blocks: Block[] = [];
  let i = 0;
  const n = input.length;

  while (i < n) {
    const fence = input.indexOf("```", i);
    if (fence === -1) {
      if (i < n) blocks.push({ kind: "prose", text: input.slice(i) });
      break;
    }
    if (fence > i) {
      blocks.push({ kind: "prose", text: input.slice(i, fence) });
    }

    const langStart = fence + 3;
    const newlineAfterLang = input.indexOf("\n", langStart);

    if (newlineAfterLang === -1) {
      const lang = input.slice(langStart).trim();
      blocks.push({ kind: "code", lang, content: "", closed: false });
      break;
    }

    const lang = input.slice(langStart, newlineAfterLang).trim();
    const codeStart = newlineAfterLang + 1;
    const closeFence = input.indexOf("```", codeStart);

    if (closeFence === -1) {
      blocks.push({
        kind: "code",
        lang,
        content: input.slice(codeStart),
        closed: false,
      });
      break;
    }

    let content = input.slice(codeStart, closeFence);
    if (content.endsWith("\n")) content = content.slice(0, -1);
    blocks.push({ kind: "code", lang, content, closed: true });

    i = closeFence + 3;
    if (input[i] === "\n") i += 1;
  }

  return blocks;
}

const INLINE_RE = /(`[^`\n]+`)|(\*\*[^*\n]+\*\*)|(\*[^*\n]+\*)|(_[^_\n]+_)/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  INLINE_RE.lastIndex = 0;

  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > last) {
      out.push(text.slice(last, m.index));
    }
    const token = m[0];
    const key = `${keyPrefix}-${m.index}`;
    if (token.startsWith("`")) {
      out.push(
        <code
          key={key}
          className="px-1 py-0.5 rounded bg-[#0f0f1f] border border-border/40 font-mono text-[12px] text-violet-200"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("**")) {
      out.push(
        <strong key={key} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      out.push(
        <em key={key} className="italic text-foreground/90">
          {token.slice(1, -1)}
        </em>,
      );
    }
    last = m.index + token.length;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
}

type ProseLine =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "bullet"; text: string }
  | { type: "numbered"; text: string; marker: string }
  | { type: "text"; text: string }
  | { type: "blank" };

function classifyLine(line: string): ProseLine {
  if (!line.trim()) return { type: "blank" };
  if (line.startsWith("### ")) return { type: "heading", level: 3, text: line.slice(4) };
  if (line.startsWith("## ")) return { type: "heading", level: 2, text: line.slice(3) };
  if (line.startsWith("# ")) return { type: "heading", level: 2, text: line.slice(2) };
  const bullet = /^\s*[-*]\s+(.*)$/.exec(line);
  if (bullet) return { type: "bullet", text: bullet[1] };
  const numbered = /^\s*(\d+)\.\s+(.*)$/.exec(line);
  if (numbered) return { type: "numbered", text: numbered[2], marker: numbered[1] };
  return { type: "text", text: line };
}

function renderProse(text: string, keyPrefix: string): ReactNode[] {
  const lines = text.split("\n").map(classifyLine);
  const out: ReactNode[] = [];
  let i = 0;
  let idx = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = `${keyPrefix}-p${idx++}`;

    if (line.type === "blank") {
      i++;
      continue;
    }

    if (line.type === "bullet") {
      const items: string[] = [];
      while (i < lines.length && lines[i].type === "bullet") {
        items.push((lines[i] as { text: string }).text);
        i++;
      }
      out.push(
        <ul key={key} className="list-disc pl-5 space-y-1 my-1">
          {items.map((t, j) => (
            <li key={j}>{renderInline(t, `${key}-${j}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (line.type === "numbered") {
      const items: string[] = [];
      while (i < lines.length && lines[i].type === "numbered") {
        items.push((lines[i] as { text: string }).text);
        i++;
      }
      out.push(
        <ol key={key} className="list-decimal pl-5 space-y-1 my-1">
          {items.map((t, j) => (
            <li key={j}>{renderInline(t, `${key}-${j}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    if (line.type === "heading") {
      const cls =
        line.level === 2
          ? "text-[13px] font-semibold text-foreground mt-2 mb-1"
          : "text-[12px] font-semibold text-foreground/90 mt-1.5 mb-0.5";
      out.push(
        <div key={key} className={cls}>
          {renderInline(line.text, key)}
        </div>,
      );
      i++;
      continue;
    }

    const paragraph: string[] = [];
    while (i < lines.length && lines[i].type === "text") {
      paragraph.push((lines[i] as { text: string }).text);
      i++;
    }
    out.push(
      <p key={key} className="whitespace-pre-wrap leading-relaxed">
        {paragraph.map((l, j) => (
          <span key={j}>
            {renderInline(l, `${key}-${j}`)}
            {j < paragraph.length - 1 && "\n"}
          </span>
        ))}
      </p>,
    );
  }

  return out;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be blocked (insecure context, permissions); silently ignore.
    }
  };

  return (
    <button
      onClick={onCopy}
      className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400 hover:text-violet-200 border border-border/40 hover:border-violet-500/40 rounded transition-colors bg-[#0f0f1f]/60"
      title="Copy code"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CodeBlock({
  lang,
  content,
  closed,
}: {
  lang: string;
  content: string;
  closed: boolean;
}) {
  return (
    <div className="my-2 rounded-md border border-border/40 bg-[#0d0d1a] overflow-hidden">
      <div className="flex items-center justify-between px-2.5 py-1 bg-[#111125] border-b border-border/30">
        <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
          {lang || "code"}
        </span>
        {closed && content && <CopyButton text={content} />}
      </div>
      <pre className="px-3 py-2 overflow-x-auto text-[12px] leading-relaxed font-mono text-foreground/90">
        <code>{content}</code>
      </pre>
    </div>
  );
}

export default function MarkdownMessage({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const blocks = useMemo(() => parseBlocks(text), [text]);

  return (
    <div className={className}>
      {blocks.map((b, i) =>
        b.kind === "code" ? (
          <CodeBlock
            key={i}
            lang={b.lang}
            content={b.content}
            closed={b.closed}
          />
        ) : (
          <div key={i} className="space-y-1.5">
            {renderProse(b.text, `b${i}`)}
          </div>
        ),
      )}
    </div>
  );
}
