"use client";

import { useRef, useCallback } from "react";
import Editor, { OnMount, BeforeMount } from "@monaco-editor/react";
import { Language } from "@/data/types";
import { registerEditorCompletions } from "@/lib/editorCompletions";

const MONACO_LANGUAGE_MAP: Record<Language, string> = {
  javascript: "javascript",
  python: "python",
  java: "java",
  cpp: "cpp",
};

interface CodeEditorProps {
  language: Language;
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
}

export default function CodeEditor({
  language,
  value,
  onChange,
  onRun,
}: CodeEditorProps) {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const handleBeforeMount: BeforeMount = (monaco) => {
    registerEditorCompletions(monaco);
    monaco.editor.defineTheme("neetcode-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6a737d", fontStyle: "italic" },
        { token: "keyword", foreground: "c678dd" },
        { token: "string", foreground: "98c379" },
        { token: "number", foreground: "d19a66" },
        { token: "type", foreground: "e5c07b" },
        { token: "identifier", foreground: "e06c75" },
        { token: "delimiter", foreground: "abb2bf" },
        { token: "function", foreground: "61afef" },
      ],
      colors: {
        "editor.background": "#1e1e2e",
        "editor.foreground": "#ededed",
        "editor.lineHighlightBackground": "#2a2a3e",
        "editorCursor.foreground": "#4ade80",
        "editor.selectionBackground": "#3a3a5e",
        "editorLineNumber.foreground": "#555570",
        "editorLineNumber.activeForeground": "#ededed",
        "editorIndentGuide.background": "#2a2a3e",
        "editorIndentGuide.activeBackground": "#444466",
        "editorBracketMatch.background": "#3a3a5e",
        "editorBracketMatch.border": "#4ade80",
        "scrollbar.shadow": "#00000000",
        "editorOverviewRuler.border": "#00000000",
      },
    });
  };

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Ctrl/Cmd+Enter to run
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun?.();
    });

    // Focus the editor on mount
    editor.focus();
  };

  const handleChange = useCallback(
    (val: string | undefined) => {
      onChange(val || "");
    },
    [onChange]
  );

  const tabSize = language === "python" ? 4 : 2;

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language={MONACO_LANGUAGE_MAP[language]}
        value={value}
        onChange={handleChange}
        beforeMount={handleBeforeMount}
        onMount={handleMount}
        theme="neetcode-dark"
        loading={
          <div className="flex items-center justify-center h-full text-gray-400 bg-[#1e1e2e]">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Loading editor...
            </div>
          </div>
        }
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineHeight: 22,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize,
          insertSpaces: true,
          detectIndentation: false,
          lineNumbers: "on",
          renderLineHighlight: "line",
          padding: { top: 16, bottom: 16 },
          fontFamily:
            "'Cascadia Code', 'Fira Code', 'JetBrains Mono', Consolas, 'Courier New', monospace",
          fontLigatures: true,
          wordWrap: "on",
          bracketPairColorization: { enabled: true },
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          autoIndent: "full",
          formatOnPaste: true,
          formatOnType: true,
          suggestOnTriggerCharacters: true,
          quickSuggestions: {
            other: "on",
            comments: "off",
            strings: "off",
          },
          quickSuggestionsDelay: 50,
          snippetSuggestions: "top",
          tabCompletion: "on",
          acceptSuggestionOnEnter: "on",
          acceptSuggestionOnCommitCharacter: true,
          wordBasedSuggestions: "allDocuments",
          inlineSuggest: { enabled: true, mode: "prefix" },
          suggest: {
            showSnippets: true,
            showKeywords: true,
            showWords: true,
            showMethods: true,
            showFunctions: true,
            showVariables: true,
            showClasses: true,
            showProperties: true,
            preview: true,
            previewMode: "prefix",
            insertMode: "insert",
            snippetsPreventQuickSuggestions: false,
            localityBonus: true,
          },
          renderWhitespace: "selection",
          guides: {
            indentation: true,
            bracketPairs: true,
          },
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          matchBrackets: "always",
          overviewRulerBorder: false,
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
            verticalSliderSize: 8,
          },
        }}
      />
    </div>
  );
}
