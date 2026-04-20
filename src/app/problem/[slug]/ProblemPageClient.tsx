"use client";

import { use, useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { categories } from "@/data/problems";
import { findProblemBySlug, getAdjacentProblems } from "@/lib/utils";
import { Language } from "@/data/types";
import DifficultyBadge from "@/components/DifficultyBadge";
import { useProgress } from "@/hooks/useProgress";
import { useToast } from "@/components/Toast";
import ProblemDescription from "@/components/editor/ProblemDescription";
import CodeEditor from "@/components/editor/CodeEditor";
import EditorToolbar from "@/components/editor/EditorToolbar";
import OutputPanel from "@/components/editor/OutputPanel";
import ShortcutsModal from "@/components/editor/ShortcutsModal";
import { useCodeDrafts } from "@/hooks/useCodeDrafts";
import { useCodeRunner } from "@/hooks/useCodeRunner";
import { useCodeReview } from "@/hooks/useCodeReview";
import { useComplexityReport } from "@/hooks/useComplexityReport";
import ErrorBoundary from "@/components/ErrorBoundary";
import ResizeHandle from "@/components/editor/ResizeHandle";
import { fireConfetti } from "@/lib/confetti";

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

type MobileTab = "description" | "code" | "output";

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
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
  const [mobileTab, setMobileTab] = useState<MobileTab>("description");
  const [outputHeight, setOutputHeight] = useState(280);
  const isDesktop = useIsDesktop();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const starterCode = problem.starterCode?.[language] || "";
  const { code, setCode, reset } = useCodeDrafts(slug, language, starterCode);
  const { run, results, consoleOutput, isRunning, error, clear } = useCodeRunner();
  const {
    messages: reviewMessages,
    isReviewing,
    error: reviewError,
    start: startReview,
    send: sendReviewMessage,
    explainFailure,
    stop: stopReview,
    clear: clearReview,
  } = useCodeReview();
  const {
    report: complexityReport,
    isLoading: isComplexityLoading,
    error: complexityError,
    request: requestComplexity,
    clear: clearComplexity,
  } = useComplexityReport();
  const { isCompleted, toggleCompleted, markCompleted, mounted } = useProgress();
  const { toast } = useToast();
  const prevAllPassedRef = useRef(false);
  const submitInFlightRef = useRef(false);
  const submittedSnapshotRef = useRef<{ code: string; language: Language } | null>(null);

  const done = mounted && isCompleted(slug);
  const allPassed = (results?.length ?? 0) > 0 && results!.every((r) => r.passed);

  useEffect(() => {
    if (isRunning) return;
    const wasSubmit = submitInFlightRef.current;
    submitInFlightRef.current = false;
    setIsSubmitting(false);

    if (wasSubmit && results && results.length > 0) {
      const snap = submittedSnapshotRef.current;
      submittedSnapshotRef.current = null;
      if (allPassed) {
        fireConfetti();
        if (!done) {
          markCompleted(slug);
          toast("Accepted! Problem marked complete.", "success");
        } else {
          toast("Accepted!", "success");
        }
        if (snap) void requestComplexity(problem, snap.language, snap.code);
      } else {
        const passedCount = results.filter((r) => r.passed).length;
        toast(`Wrong answer: ${passedCount}/${results.length} passed`, "error");
      }
      return;
    }

    if (allPassed && !prevAllPassedRef.current) {
      fireConfetti();
      toast("All test cases passed!", "success");
    }
    prevAllPassedRef.current = allPassed;
  }, [isRunning, allPassed, results, done, markCompleted, slug, toast, problem, requestComplexity]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if ((e.target as HTMLElement)?.closest(".monaco-editor")) return;
      if (e.key === "?") {
        e.preventDefault();
        setShortcutsOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleRun = useCallback(() => {
    submitInFlightRef.current = false;
    run(
      code,
      problem.functionName!,
      problem.testCases!,
      language,
      problem.compareMode,
      problem.runner
    );
    setMobileTab("output");
  }, [code, problem.functionName, problem.testCases, problem.compareMode, problem.runner, language, run]);

  const handleSubmit = useCallback(() => {
    submitInFlightRef.current = true;
    submittedSnapshotRef.current = { code, language };
    setIsSubmitting(true);
    clearComplexity();
    run(
      code,
      problem.functionName!,
      problem.testCases!,
      language,
      problem.compareMode,
      problem.runner
    );
    setMobileTab("output");
  }, [code, problem.functionName, problem.testCases, problem.compareMode, problem.runner, language, run, clearComplexity]);

  const handleReview = useCallback(() => {
    startReview({
      problem,
      language,
      code,
      failingResults: results?.filter((r) => !r.passed) ?? [],
      testCases: problem.testCases ?? [],
    });
    setMobileTab("output");
  }, [startReview, problem, language, code, results]);

  const handleSendReviewMessage = useCallback(
    (text: string) => {
      sendReviewMessage(text, language, code);
    },
    [sendReviewMessage, language, code],
  );

  const handleExplainFailure = useCallback(
    (
      testNumber: number,
      result: Parameters<typeof explainFailure>[1],
      testCase: Parameters<typeof explainFailure>[2],
    ) => {
      explainFailure(testNumber, result, testCase, language, code);
      setMobileTab("output");
    },
    [explainFailure, language, code],
  );

  const handleReset = useCallback(() => {
    reset();
    clear();
    clearReview();
    clearComplexity();
    toast("Code reset to starter template", "info");
  }, [reset, clear, clearReview, clearComplexity, toast]);

  const handleToggleComplete = useCallback(() => {
    toggleCompleted(slug);
    toast(done ? "Marked as incomplete" : "Marked as complete!", done ? "info" : "success");
  }, [toggleCompleted, slug, done, toast]);

  const handleLanguageChange = useCallback(
    (lang: Language) => {
      setLanguage(lang);
      clear();
      clearReview();
      clearComplexity();
    },
    [clear, clearReview, clearComplexity]
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
        <span className="text-sm font-medium flex-1 truncate">
          {problem.id}. {problem.title}
        </span>
        {mounted && (
          <button
            onClick={handleToggleComplete}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors border ${
              done
                ? "bg-easy/15 text-easy border-easy/30 hover:bg-easy/25"
                : "bg-white/5 text-gray-400 border-white/10 hover:text-foreground hover:bg-white/10"
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill={done ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {done ? "Completed" : "Complete"}
          </button>
        )}
        <button
          onClick={() => setShortcutsOpen(true)}
          className="p-1.5 text-gray-500 hover:text-foreground transition-colors rounded hover:bg-white/5"
          title="Keyboard shortcuts (?)"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>
      <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />

      {/* Mobile tab bar */}
      <div className="flex md:hidden border-b border-border bg-card flex-shrink-0">
        {([
          { key: "description", label: "Problem" },
          { key: "code", label: "Code" },
          { key: "output", label: "Output", badge: results ? `${results.filter(r => r.passed).length}/${results.length}` : undefined },
        ] as { key: MobileTab; label: string; badge?: string }[]).map(({ key, label, badge }) => (
          <button
            key={key}
            onClick={() => setMobileTab(key)}
            className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors relative ${
              mobileTab === key
                ? "text-foreground"
                : "text-gray-500"
            }`}
          >
            {label}
            {badge && (
              <span className={`ml-1.5 ${results?.every(r => r.passed) ? "text-easy" : "text-hard"}`}>
                {badge}
              </span>
            )}
            {mobileTab === key && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-easy rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Desktop: split pane / Mobile: tabbed content */}
      <div className="flex flex-1 min-h-0">
        {/* Left pane - Problem description */}
        <div className={`${mobileTab === "description" ? "flex" : "hidden"} md:flex w-full md:w-[40%] md:min-w-[300px] border-r border-border overflow-hidden flex-col`}>
          <ProblemDescription
            problem={problem}
            category={category}
            language={language}
            code={code}
          />
        </div>

        {/* Right pane - Editor + Output */}
        <div className={`${mobileTab === "description" ? "hidden" : "flex"} md:flex flex-1 flex-col min-w-0`}>
          {/* Editor toolbar */}
          <EditorToolbar
            language={language}
            onLanguageChange={handleLanguageChange}
            onRun={handleRun}
            onSubmit={handleSubmit}
            onReset={handleReset}
            onReview={handleReview}
            isRunning={isRunning && !isSubmitting}
            isSubmitting={isSubmitting}
            isReviewing={isReviewing}
          />

          {/* Editor */}
          <div className={`${mobileTab === "output" ? "hidden" : "flex"} md:flex flex-1 min-h-0`}>
            <ErrorBoundary>
              <CodeEditor
                language={language}
                value={code}
                onChange={setCode}
                onRun={handleRun}
              />
            </ErrorBoundary>
          </div>

          {/* Resize handle (desktop only) */}
          <div className="hidden md:block">
            <ResizeHandle onResize={(delta) => setOutputHeight(h => Math.max(80, Math.min(500, h + delta)))} />
          </div>

          {/* Output panel */}
          <div
            className={`${!isDesktop && mobileTab === "output" ? "flex-1 min-h-0" : "flex-shrink-0"}`}
            style={
              !isDesktop && mobileTab === "output"
                ? undefined
                : { height: outputHeight }
            }
          >
            <OutputPanel
              results={results}
              testCases={problem.testCases || []}
              consoleOutput={consoleOutput}
              error={error}
              isRunning={isRunning}
              isPythonLoading={isRunning && language === "python"}
              reviewMessages={reviewMessages}
              isReviewing={isReviewing}
              reviewError={reviewError}
              onSendReviewMessage={handleSendReviewMessage}
              onStopReview={stopReview}
              onExplainFailure={handleExplainFailure}
              complexityReport={complexityReport}
              isComplexityLoading={isComplexityLoading}
              complexityError={complexityError}
              onDismissComplexity={clearComplexity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
