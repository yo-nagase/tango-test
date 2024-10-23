"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, Book, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WordResult } from "@/types/word-types";

const WORD_LIST = [
  { en: "apple", ja: "りんご" },
  { en: "banana", ja: "バナナ" },
  { en: "cherry", ja: "さくらんぼ" },
  { en: "grape", ja: "ぶどう" },
  { en: "orange", ja: "オレンジ" },
  { en: "strawberry", ja: "いちご" },
  { en: "peach", ja: "もも" },
  { en: "pear", ja: "なし" },
  { en: "pineapple", ja: "パイナップル" },
  { en: "watermelon", ja: "すいか" },
];

interface WordQuizProps {
  onResult: (result: WordResult) => void;
}

export function WordQuiz({ onResult }: WordQuizProps) {
  const [currentWord, setCurrentWord] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const checkAnswer = () => {
    const isCorrect = input.toLowerCase().trim() === WORD_LIST[currentWord].en.toLowerCase();
    
    onResult({
      word: WORD_LIST[currentWord].en,
      correct: isCorrect,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: isCorrect ? "正解!" : "不正解",
      description: `${WORD_LIST[currentWord].ja}の英語は「${WORD_LIST[currentWord].en}」です`,
      icon: isCorrect ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />,
    });

    if (isCorrect) {
      setScore(score + 1);
    }

    setInput("");
    setCurrentWord((prev) => (prev + 1) % WORD_LIST.length);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Book className="w-6 h-6" />
            単語テスト
          </span>
          <span className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            スコア: {score}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-2xl font-bold text-center">
            {WORD_LIST[currentWord].ja}
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
              placeholder="英語で入力してください"
              className="text-lg"
            />
            <Button onClick={checkAnswer} size="lg">
              回答
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}