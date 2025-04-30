
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { QuizQuestion } from '@/types/quiz';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  userAnswers: (string | null)[];
  questions: QuizQuestion[];
  onRestartQuiz: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  totalQuestions,
  userAnswers,
  questions,
  onRestartQuiz,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let performanceText = "";
  let performanceClass = "";
  
  if (percentage >= 80) {
    performanceText = "Excellent! You're a quiz master!";
    performanceClass = "text-quiz-correct";
  } else if (percentage >= 60) {
    performanceText = "Good job! You know your stuff.";
    performanceClass = "text-quiz-primary";
  } else if (percentage >= 40) {
    performanceText = "Not bad, but there's room for improvement.";
    performanceClass = "text-quiz-secondary";
  } else {
    performanceText = "Keep practicing to improve your score.";
    performanceClass = "text-quiz-incorrect";
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">
              {score} / {totalQuestions}
            </div>
            <div className="text-xl font-medium mb-4">Your score: {percentage}%</div>
            <p className={`text-lg font-medium ${performanceClass}`}>{performanceText}</p>
          </div>
          
          <div className="pt-4">
            <h3 className="text-lg font-medium mb-3">Question Summary:</h3>
            <div className="space-y-2">
              {questions.map((question, index) => (
                <div 
                  key={index} 
                  className="p-3 rounded-lg border border-gray-200 bg-white"
                >
                  <p className="font-medium">{question.question}</p>
                  <div className="flex justify-between items-center mt-1 text-sm">
                    <div>
                      <span className="text-gray-500">Your answer: </span>
                      <span className={userAnswers[index] === question.correctAnswer ? "text-quiz-correct font-medium" : "text-quiz-incorrect font-medium"}>
                        {userAnswers[index] || "Unanswered"}
                      </span>
                    </div>
                    {userAnswers[index] !== question.correctAnswer && (
                      <div>
                        <span className="text-gray-500">Correct: </span>
                        <span className="text-quiz-correct font-medium">{question.correctAnswer}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={onRestartQuiz} 
            className="bg-gradient-to-r from-quiz-primary to-quiz-secondary hover:opacity-90 transition-all"
          >
            Restart Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultsScreen;
