"use client";

import { use, useState, useCallback } from "react";
import Link from "next/link";
import { categories } from "@/data/problems";
import { findProblemBySlug, getAdjacentProblems } from "@/lib/utils";
import { Language } from "@/data/types";
import DifficultyBadge from "@/components/DifficultyBadge";
import { useProgress } from "@/hooks/useProgress";
import ProblemDescription from "@/components/editor/ProblemDescription";
import CodeEditor from "@/components/editor/CodeEditor";
import EditorToolbar from "@/components/editor/EditorToolbar";
import OutputPanel from "@/components/editor/OutputPanel";
import { useCodeDrafts } from "@/hooks/useCodeDrafts";
import { useCodeRunner } from "@/hooks/useCodeRunner";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function ProblemPageClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const result = findProblemBySlug(categories, slug);

  if (!result) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Problem not found</h1>
        <Link href="/" className="text-easy hover:underline">
          Back to all problems
        </Link>
      </main>
    );
  }

  const { problem, category } = result;
  const hasIDE = problem.starterCode && problem.testCases && problem.functionName;

  if (hasIDE) {
    return (
      <IDELayout
        problem={problem}
        category={category}
        slug={slug}
      />
    );
  }

  return <SimpleProblemLayout problem={problem} category={category} />;
}

function SimpleProblemLayout({
  problem,
  category,
}: {
  problem: ReturnType<typeof findProblemBySlug> extends { problem: infer P } | null ? P : never;
  category: ReturnType<typeof findProblemBySlug> extends { category: infer C } | null ? C : never;
}) {
  const { isCompleted, toggleCompleted, mounted } = useProgress();
  const done = mounted && isCompleted(problem.slug);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-foreground transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to problems
      </Link>
      <div className="bg-card rounded-lg border border-border p-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{category.name}</p>
            <h1 className="text-2xl font-bold">{problem.id}. {problem.title}</h1>
          </div>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>
        <button
          onClick={() => toggleCompleted(problem.slug)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            done ? "bg-easy/20 text-easy" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {done ? "Completed" : "Mark as Complete"}
        </button>
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Approach</h2>
          <p className="text-foreground/85 leading-relaxed">{problem.approach}</p>
        </div>
        <div className="flex gap-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Time Complexity</h2>
            <code className="text-lg text-easy font-mono">{problem.timeComplexity}</code>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Space Complexity</h2>
            <code className="text-lg text-medium font-mono">{problem.spaceComplexity}</code>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProblemNav({ slug }: { slug: string }) {
  const { prev, next } = getAdjacentProblems(categories, slug);
  return (
    <div className="flex items-center gap-1">
      {prev ? (
        <Link
          href={`/problem/${prev.slug}`}
          className="p-1 text-gray-400 hover:text-foreground transition-colors"
          title={prev.title}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      ) : (
        <span className="p-1 text-gray-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </span>
      )}
      {next ? (
        <Link
          href={`/problem/${next.slug}`}
          className="p-1 text-gray-400 hover:text-foreground transition-colors"
          title={next.title}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <span className="p-1 text-gray-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </div>
  );
}

function IDELayout({
  problem,
  category,
  slug,
}: {
  problem: ReturnType<typeof findProblemBySlug> extends { problem: infer P } | null ? P : never;
  category: ReturnType<typeof findProblemBySlug> extends { category: infer C } | null ? C : never;
  slug: string;
}) {
  const [language, setLanguage] = useState<Language>("python");
  const starterCode = problem.starterCode?.[language] || "";
  const { code, setCode, reset } = useCodeDrafts(slug, language, starterCode);
  const { run, results, consoleOutput, isRunning, error, clear } = useCodeRunner();

  const handleRun = useCallback(() => {
    run(code, problem.functionName!, problem.testCases!, language);
  }, [code, problem.functionName, problem.testCases, language, run]);

  const handleReset = useCallback(() => {
    reset();
    clear();
  }, [reset, clear]);

  const handleLanguageChange = useCallback(
    (lang: Language) => {
      setLanguage(lang);
      clear();
    },
    [clear]
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-2 bg-card border-b border-border flex-shrink-0">
        <Link
          href="/"
          className="text-gray-400 hover:text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <ProblemNav slug={slug} />
        <span className="text-sm font-medium flex-1">
          {problem.id}. {problem.title}
        </span>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>

      {/* Split pane */}
      <div className="flex flex-1 min-h-0">
        {/* Left pane - Problem description */}
        <div className="w-[40%] min-w-[300px] border-r border-border overflow-hidden">
          <ProblemDescription problem={problem} category={category} />
        </div>

        {/* Right pane - Editor + Output */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Editor toolbar */}
          <EditorToolbar
            language={language}
            onLanguageChange={handleLanguageChange}
            onRun={handleRun}
            onReset={handleReset}
            isRunning={isRunning}
          />

          {/* Editor */}
          <div className="flex-1 min-h-0">
            <ErrorBoundary>
              <CodeEditor
                language={language}
                value={code}
                onChange={setCode}
                onRun={handleRun}
              />
            </ErrorBoundary>
          </div>

          {/* Output panel */}
          <div className="h-[200px] flex-shrink-0">
            <OutputPanel
              results={results}
              testCases={problem.testCases || []}
              consoleOutput={consoleOutput}
              error={error}
              isRunning={isRunning}
              isPythonLoading={isRunning && language === "python"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
