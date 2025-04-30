
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  userAnswers: (string | null)[];
  quizComplete: boolean;
  showFeedback: boolean;
  currentSelection: string | null;
}
