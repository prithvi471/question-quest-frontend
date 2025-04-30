
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizQuestion } from '@/types/quiz';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface QuestionCardProps {
  question: QuizQuestion;
  currentSelection: string | null;
  showFeedback: boolean;
  onSelectOption: (option: string) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentSelection,
  showFeedback,
  onSelectOption,
  onNextQuestion,
  isLastQuestion,
}) => {
  const isCorrect = currentSelection === question.correctAnswer;

  return (
    <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-center">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              if (!showFeedback) {
                onSelectOption(option);
              }
            }}
            className={cn(
              "p-4 rounded-lg cursor-pointer option-hover border border-gray-200",
              currentSelection === option && !showFeedback ? "bg-quiz-accent text-white" : "bg-quiz-neutral",
              showFeedback && option === question.correctAnswer && "correct-answer",
              showFeedback && option === currentSelection && option !== question.correctAnswer && "wrong-answer"
            )}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showFeedback && option === question.correctAnswer && (
                <Check className="h-5 w-5" />
              )}
              {showFeedback && option === currentSelection && option !== question.correctAnswer && (
                <X className="h-5 w-5" />
              )}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-center pt-4">
        {showFeedback && (
          <Button
            onClick={onNextQuestion}
            className="bg-gradient-to-r from-quiz-primary to-quiz-secondary hover:opacity-90 transition-all"
          >
            {isLastQuestion ? "See Results" : "Next Question"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
