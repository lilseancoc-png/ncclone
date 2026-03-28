import { Difficulty } from "@/data/types";

const styles: Record<Difficulty, string> = {
  Easy: "text-easy bg-easy/10",
  Medium: "text-medium bg-medium/10",
  Hard: "text-hard bg-hard/10",
};

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: Difficulty;
}) {
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}
