
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

interface StartScreenProps {
  onStartQuiz: () => void;
  totalQuestions: number;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartQuiz, totalQuestions }) => {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-quiz-primary">QuizQuest</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-center">
            <p className="text-xl font-medium">
              Test your knowledge with our fun quiz!
            </p>
            <p className="text-muted-foreground">
              This quiz consists of {totalQuestions} multiple-choice questions. 
              See how many you can answer correctly!
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={onStartQuiz} 
            size="lg" 
            className="bg-gradient-to-r from-quiz-primary to-quiz-secondary hover:opacity-90 transition-all"
          >
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StartScreen;
