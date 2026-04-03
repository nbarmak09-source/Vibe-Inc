"use client";

import { useEffect, useMemo, useState } from "react";
import { Brain, CheckCircle2, CircleX, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  EDUCATION_PROGRESS_EVENT,
  getCompletionState,
  setCompletionState,
} from "./progress-storage";

type QuestionType = "multiple-choice" | "true-false" | "fill-blank";

export type KnowledgeCheckQuestion = {
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
};

type KnowledgeCheckProps = {
  checkId: string;
  questions: KnowledgeCheckQuestion[];
  className?: string;
  sectionId?: string;
};

function normalize(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
}

function levenshteinDistance(a: string, b: string) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let row = 0; row < rows; row += 1) matrix[row][0] = row;
  for (let col = 0; col < cols; col += 1) matrix[0][col] = col;

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = a[row - 1] === b[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost
      );
    }
  }

  return matrix[rows - 1][cols - 1];
}

function isFuzzyMatch(input: string, answer: string) {
  const normalizedInput = normalize(input);
  const normalizedAnswer = normalize(answer);
  if (!normalizedInput || !normalizedAnswer) return false;
  if (normalizedInput === normalizedAnswer) return true;

  const distance = levenshteinDistance(normalizedInput, normalizedAnswer);
  if (normalizedAnswer.length <= 6) return distance <= 1;
  return distance <= 2;
}

export function KnowledgeCheck({
  checkId,
  questions,
  className,
  sectionId,
}: KnowledgeCheckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [fillInput, setFillInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFinalScore, setShowFinalScore] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const hasSubmitted = feedback !== null;

  useEffect(() => {
    setIsCompleted(getCompletionState(checkId));

    const syncProgress = () => {
      setIsCompleted(getCompletionState(checkId));
    };

    window.addEventListener("storage", syncProgress);
    window.addEventListener(EDUCATION_PROGRESS_EVENT, syncProgress);
    return () => {
      window.removeEventListener("storage", syncProgress);
      window.removeEventListener(EDUCATION_PROGRESS_EVENT, syncProgress);
    };
  }, [checkId]);

  const options = useMemo(() => {
    if (!currentQuestion) return [];
    if (currentQuestion.type === "true-false") return ["True", "False"];
    return currentQuestion.options ?? [];
  }, [currentQuestion]);

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setFillInput("");
    setFeedback(null);
    setAttempts(0);
    setAnswerRevealed(false);
  };

  const completeCheck = () => {
    setCompletionState(checkId, true);
    setIsCompleted(true);
    setShowFinalScore(true);
  };

  const submitAnswer = (answer: string) => {
    if (!currentQuestion || hasSubmitted) return;
    const isCorrect = normalize(answer) === normalize(currentQuestion.correctAnswer);
    setSelectedAnswer(answer);
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const submitFillBlank = () => {
    if (!currentQuestion || hasSubmitted || !fillInput.trim()) return;
    const isCorrect = isFuzzyMatch(fillInput, currentQuestion.correctAnswer);
    if (isCorrect) {
      setFeedback("correct");
      setScore((prev) => prev + 1);
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    if (nextAttempts >= 2) {
      setAnswerRevealed(true);
      setFeedback("wrong");
    }
  };

  const goNext = () => {
    if (!hasSubmitted || !currentQuestion) return;
    if (isLastQuestion) {
      completeCheck();
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    resetQuestionState();
  };

  const sectionAnchorId = sectionId ?? checkId;

  if (!currentQuestion) return null;

  return (
    <Card
      id={sectionAnchorId}
      className={cn(
        "w-full gap-0 border-border bg-gradient-to-br from-card to-card/60 py-0 transition-all duration-300",
        className
      )}
    >
      <CardHeader className="border-b border-border/80 px-6 pb-5 pt-8 sm:px-8 sm:pb-6 sm:pt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-lg font-semibold text-foreground">
            <Brain className="h-4.5 w-4.5 text-electric-blue" />
            Check Your Understanding 🧠
          </div>
          <span className="text-xs text-muted-foreground">
            Question {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-6 pb-2 pt-8 sm:px-8 sm:pt-10">
        <p className="text-base font-medium leading-snug text-foreground">
          {currentQuestion.question}
        </p>

        {(currentQuestion.type === "multiple-choice" ||
          currentQuestion.type === "true-false") && (
          <div className="grid gap-4">
            {options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption =
                normalize(option) === normalize(currentQuestion.correctAnswer);
              const showCorrect = hasSubmitted && isCorrectOption;
              const showWrong = hasSubmitted && isSelected && !isCorrectOption;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => submitAnswer(option)}
                  disabled={hasSubmitted}
                  className={cn(
                    "rounded-lg border px-4 py-3.5 text-left text-base transition-all duration-200",
                    "border-border bg-background/30 text-muted-foreground hover:border-electric-blue/40 hover:text-foreground",
                    showCorrect && "border-green-400/40 bg-green-500/10 text-green-200",
                    showWrong && "border-red-400/40 bg-red-500/10 text-red-200",
                    hasSubmitted && !showCorrect && !showWrong && "opacity-60"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {currentQuestion.type === "fill-blank" && (
          <div className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={fillInput}
                onChange={(event) => setFillInput(event.target.value)}
                disabled={hasSubmitted}
                placeholder="Type your answer..."
                className="h-11 w-full rounded-lg border border-input bg-background/30 px-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
              />
              <Button
                variant="outline"
                size="sm"
                className="sm:min-w-[88px]"
                onClick={submitFillBlank}
                disabled={hasSubmitted || !fillInput.trim()}
              >
                Submit
              </Button>
            </div>
            {attempts > 0 && !hasSubmitted ? (
              <p className="text-xs text-amber-300">
                Attempt {attempts}/2. One more try before the answer is revealed.
              </p>
            ) : null}
          </div>
        )}

        {hasSubmitted ? (
          <div
            className={cn(
              "rounded-lg border px-4 py-4 text-sm leading-relaxed transition-all duration-300",
              feedback === "correct"
                ? "border-green-400/40 bg-green-500/10 text-green-200"
                : "border-red-400/40 bg-red-500/10 text-red-200"
            )}
          >
            <div className="mb-1 flex items-center gap-1.5 font-semibold">
              {feedback === "correct" ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span className="animate-in fade-in duration-200">
                    Correct!
                  </span>
                </>
              ) : (
                <>
                  <CircleX className="h-3.5 w-3.5" />
                  <span>Not quite yet</span>
                </>
              )}
            </div>
            <p>{currentQuestion.explanation}</p>
            {answerRevealed ? (
              <p className="mt-1.5">
                <strong>Answer:</strong> {currentQuestion.correctAnswer}
              </p>
            ) : null}
          </div>
        ) : null}

        {isCompleted && currentIndex === questions.length - 1 ? (
          <div className="rounded-lg border border-electric-blue/25 bg-electric-blue/[0.08] px-4 py-3 text-sm text-electric-blue">
            <div className="inline-flex items-center gap-1.5 font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              Completed
            </div>
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="justify-between gap-3 border-t border-border/60 px-6 py-5 sm:px-8">
        <p className="text-sm text-muted-foreground">
          Score: {score}/{questions.length}
        </p>
        <Button
          variant={hasSubmitted ? "default" : "secondary"}
          size="sm"
          onClick={goNext}
          disabled={!hasSubmitted}
        >
          {isLastQuestion ? "Finish check" : "Next question"}
        </Button>
      </CardFooter>

      {isCompleted && showFinalScore && (
        <div className="border-t border-border/80 px-6 py-4 text-base font-medium text-foreground sm:px-8">
          You got {score}/{questions.length} correct
        </div>
      )}
    </Card>
  );
}
