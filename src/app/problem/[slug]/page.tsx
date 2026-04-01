import { categories } from "@/data/problems";
import ProblemPageClient from "./ProblemPageClient";

export function generateStaticParams() {
  return categories.flatMap((c) => c.problems.map((p) => ({ slug: p.slug })));
}

export default function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ProblemPageClient params={params} />;
}
