"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

type Score = {
  name: string;
  score: number;
  timestamp?: number;
};

export function Leaderboard() {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("scores") || "[]");
    const sortedScores = savedScores.sort((a: Score, b: Score) => b.score - a.score);
    setScores(sortedScores.slice(0, 10)); // Top 10 scores
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6" />
          リーダーボード
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scores.map((score, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold min-w-[1.5rem]">
                  {index + 1}.
                </span>
                <span>{score.name}</span>
              </div>
              <span className="font-bold">{score.score}点</span>
            </div>
          ))}
          {scores.length === 0 && (
            <p className="text-center text-muted-foreground">
              まだスコアがありません
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}