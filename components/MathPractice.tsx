import React, { useState, useEffect } from 'react';
import { View, MathGame, MenuTheme } from '../types';
import ThemedButton from './ThemedButton';

interface MathPracticeProps {
  navigateTo: (view: View) => void;
  goBack: () => void;
  menuTheme: MenuTheme;
}

const MathPractice: React.FC<MathPracticeProps> = ({ navigateTo, goBack, menuTheme }) => {
  const [game, setGame] = useState<MathGame | null>(null);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);

  const generateProblem = (selectedGame: MathGame) => {
    setMessage('');
    setAnswer('');
    let newNum1 = Math.floor(Math.random() * 20) + 1;
    let newNum2 = Math.floor(Math.random() * 20) + 1;
    
    if (selectedGame === MathGame.Calculation && Math.random() > 0.5) {
      setOperator('-');
      if (newNum1 < newNum2) {
        [newNum1, newNum2] = [newNum2, newNum1];
      }
    } else {
       setOperator('+');
    }
    
    setNum1(newNum1);
    setNum2(newNum2);
  };
  
  const startGame = (selectedGame: MathGame) => {
    setGame(selectedGame);
    setScore(0);
    generateProblem(selectedGame);
  };

  const checkComparison = (op: string) => {
    let correct = false;
    if (op === '<' && num1 < num2) correct = true;
    if (op === '>' && num1 > num2) correct = true;
    if (op === '=' && num1 === num2) correct = true;
    handleFeedback(correct);
  };

  const checkCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    let correct = false;
    const correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;
    if (parseInt(answer) === correctAnswer) {
      correct = true;
    }
    handleFeedback(correct);
  };

  const handleFeedback = (isCorrect: boolean) => {
    if (isCorrect) {
      setMessage('Đúng rồi! Giỏi quá!');
      setScore(s => s + 1);
      setTimeout(() => generateProblem(game!), 1500);
    } else {
      setMessage('Sai rồi, thử lại nhé!');
      setScore(0);
    }
  };
  
  if (game === null) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-yellow-200 bg-clip-text text-transparent">Luyện tập</h2>
        <ThemedButton onClick={() => startGame(MathGame.Comparison)} theme={menuTheme}>Bài luyện toán so sánh</ThemedButton>
        <ThemedButton onClick={() => startGame(MathGame.Calculation)} theme={menuTheme}>Bài tính +, -</ThemedButton>
        <ThemedButton onClick={goBack} theme={menuTheme}>Thoát</ThemedButton>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md text-center">
      <h3 className="text-2xl font-bold mb-4">Điểm: {score}</h3>
      <div className="p-8 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="flex items-center justify-center space-x-4 text-6xl font-bold">
          <span className="text-blue-400">{num1}</span>
          {game === MathGame.Comparison && <span className="text-gray-500 text-4xl">?</span>}
          {game === MathGame.Calculation && <span className="text-red-400">{operator}</span>}
          <span className="text-green-400">{num2}</span>
        </div>
      </div>
      
      {game === MathGame.Comparison && (
        <div className="flex justify-center space-x-4 mt-6">
          <button onClick={() => checkComparison('<')} className="text-5xl p-4 rounded-full bg-violet-500 hover:bg-violet-600 transition transform hover:scale-110">&lt;</button>
          <button onClick={() => checkComparison('=')} className="text-5xl p-4 rounded-full bg-violet-500 hover:bg-violet-600 transition transform hover:scale-110">=</button>
          <button onClick={() => checkComparison('>')} className="text-5xl p-4 rounded-full bg-violet-500 hover:bg-violet-600 transition transform hover:scale-110">&gt;</button>
        </div>
      )}

      {game === MathGame.Calculation && (
        <form onSubmit={checkCalculation} className="mt-6 flex flex-col items-center">
          <input 
            type="number" 
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="text-center text-4xl font-bold w-40 p-2 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button type="submit" className="mt-4 px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition transform hover:scale-105">Trả lời</button>
        </form>
      )}

      {message && <p className={`mt-4 text-2xl font-semibold ${message.includes('Đúng') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
      
      <div className="mt-8">
         <ThemedButton onClick={() => setGame(null)} theme={menuTheme}>Chọn bài khác</ThemedButton>
      </div>
    </div>
  );
};

export default MathPractice;