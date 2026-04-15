import React, { useState } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';

interface QuizState {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  selectedAnswer: string | null
  score: number
  quizCompleted: boolean
}

const Quiz: React.FC = () => {
  const initialQuestions: QuizQuestion[] = [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
    },
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
    {
      question: 'What is the largest planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Jupiter',
    },
    {
    question: 'What is the fastest land animal?',
    options: ['Lion', 'Horse', 'Cheetah', 'Leopard'],
    correctAnswer: 'Cheetah',
  },
  ];

  const [state, setState] = useState<QuizState>({
    questions: initialQuestions,
    currentQuestionIndex: 0,
    selectedAnswer: null,
    score: 0,
    quizCompleted: false,
  });

  // Дараагийн асуулт байгаа эсэхийг шалгах
  const hasNextQuestion = (): boolean => {
    return state.currentQuestionIndex < state.questions.length - 1;
  };

  // Нийт оноог тооцоолох
  const getScore = (): number => {
    return state.score;
  };

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  };

  const handleButtonClick = (): void => {
    const { selectedAnswer, currentQuestionIndex, questions, score } = state;

    if (!selectedAnswer) return; 

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;

    if (hasNextQuestion()) {
      // Дараагийн асуулт руу шилжих
      setState((prevState) => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        selectedAnswer: null,
        score: newScore,
      }));
    } else {
      // Сүүлийн асуулт — оноог харуулах
      setState((prevState) => ({
        ...prevState,
        score: newScore,
        quizCompleted: true,
      }));
    }
  };

  const handleRestart = (): void => {
    setState({
      questions: initialQuestions,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      score: 0,
      quizCompleted: false,
    });
  };

  const { questions, currentQuestionIndex, selectedAnswer, quizCompleted } = state;
  const currentQuestion = questions[currentQuestionIndex];


  if (quizCompleted) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {getScore()} out of {questions.length}</p>
        <button onClick={handleRestart}>Дахин эхлүүлэх</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question {currentQuestionIndex + 1} / {questions.length}:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick} disabled={!selectedAnswer}>
        {hasNextQuestion() ? 'Дараагийн Асуулт' : 'Илгээх'}
      </button>
    </div>
  );
};

export default Quiz;