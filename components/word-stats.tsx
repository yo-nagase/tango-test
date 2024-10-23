"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WordResult } from "@/types/word-types";

interface WordStatsProps {
  results: WordResult[];
}

export function WordStats({ results }: WordStatsProps) {
  const totalAnswers = results.length;
  const correctAnswers = results.filter(r => r.correct).length;
  const accuracy = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

  const getLastNResults = (n: number) => {
    return results.slice(-n).map(result => result.correct ? 1 : 0);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>学習状況</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold">{accuracy.toFixed(1)}%</div>
            <div className="text-sm text-gray-500">
              正解率 ({correctAnswers}/{totalAnswers})
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">最近の回答</div>
            <div className="grid grid-cols-10 gap-1">
              {getLastNResults(100).map((result, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-sm ${
                    result ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}