
import { Quiz } from '@/components/Quiz';

const Index = () => {
  return (
    <div className="quiz-container min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <Quiz />
      </div>
    </div>
  );
};

export default Index;
