
import React, { useState } from 'react';
import { quizQuestions } from '@/data/quizQuestions';
import { QuizState } from '@/types/quiz';
import StartScreen from './StartScreen';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import ResultsScreen from './ResultsScreen';
import { useToast } from '@/components/ui/use-toast';

const Quiz: React.FC = () => {
  const { toast } = useToast();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    userAnswers: Array(quizQuestions.length).fill(null),
    quizComplete: false,
    showFeedback: false,
    currentSelection: null,
  });

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleSelectOption = (option: string) => {
    setQuizState(prev => ({
      ...prev,
      currentSelection: option,
      showFeedback: true,
      score: option === quizQuestions[prev.currentQuestionIndex].correctAnswer 
        ? prev.score + 1 
        : prev.score,
      userAnswers: prev.userAnswers.map((answer, idx) => 
        idx === prev.currentQuestionIndex ? option : answer
      ),
    }));

    // Show feedback toast
    const isCorrect = option === quizQuestions[quizState.currentQuestionIndex].correctAnswer;
    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect 
        ? "Good job! That's the right answer." 
        : `The correct answer is: ${quizQuestions[quizState.currentQuestionIndex].correctAnswer}`,
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const handleNextQuestion = () => {
    const isLastQuestion = quizState.currentQuestionIndex === quizQuestions.length - 1;

    if (isLastQuestion) {
      setQuizState(prev => ({
        ...prev,
        quizComplete: true,
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        showFeedback: false,
        currentSelection: null,
      }));
    }
  };

  const restartQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      userAnswers: Array(quizQuestions.length).fill(null),
      quizComplete: false,
      showFeedback: false,
      currentSelection: null,
    });
  };

  const currentQuestion = quizQuestions[quizState.currentQuestionIndex];

  if (quizState.quizComplete) {
    return (
      <ResultsScreen
        score={quizState.score}
        totalQuestions={quizQuestions.length}
        userAnswers={quizState.userAnswers}
        questions={quizQuestions}
        onRestartQuiz={restartQuiz}
      />
    );
  }

  if (!quizStarted) {
    return <StartScreen onStartQuiz={startQuiz} totalQuestions={quizQuestions.length} />;
  }

  return (
    <div className="space-y-4">
      <ProgressBar 
        currentQuestion={quizState.currentQuestionIndex + 1} 
        totalQuestions={quizQuestions.length} 
      />
      <QuestionCard
        question={currentQuestion}
        currentSelection={quizState.currentSelection}
        showFeedback={quizState.showFeedback}
        onSelectOption={handleSelectOption}
        onNextQuestion={handleNextQuestion}
        isLastQuestion={quizState.currentQuestionIndex === quizQuestions.length - 1}
      />
    </div>
  );
};

export default Quiz;
