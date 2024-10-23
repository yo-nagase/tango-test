"use client";

import { WordQuiz } from "@/components/word-quiz";
import { WordStats } from "@/components/word-stats";
import { useState } from "react";
import { WordResult } from "@/types/word-types";

export default function Home() {
  const [results, setResults] = useState<WordResult[]>([]);

  const handleQuizResult = (result: WordResult) => {
    setResults(prev => [...prev, result]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          英単語テスト
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WordQuiz onResult={handleQuizResult} />
          </div>
          <div className="lg:col-span-1">
            <WordStats results={results} />
          </div>
        </div>
      </div>
    </main>
  );
}