"use client";

import Header from "@/components/Header";
import CategorySection from "@/components/CategorySection";
import { categories } from "@/data/problems";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="space-y-4">
          {categories.map((category) => (
            <CategorySection key={category.slug} category={category} />
          ))}
        </div>
      </main>
    </>
  );
}
