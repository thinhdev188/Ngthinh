import React, { useState, useEffect } from 'react';
import { View, MenuTheme } from '../types';
import ThemedButton from './ThemedButton';

interface RockPaperScissorsProps {
  goBack: () => void;
  menuTheme: MenuTheme;
}

type Choice = 'rock' | 'paper' | 'scissors';
type Result = 'Thắng!' | 'Thua!' | 'Hòa!' | '';

const choices: { name: Choice, emoji: string }[] = [
  { name: 'rock', emoji: '✊' },
  { name: 'paper', emoji: '✋' },
  { name: 'scissors', emoji: '✌️' },
];

const RockPaperScissors: React.FC<RockPaperScissorsProps> = ({ goBack, menuTheme }) => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result>('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const playGame = (choice: Choice) => {
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult('');
    setIsAnimating(true);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)].name;
    
    setTimeout(() => {
      setComputerChoice(randomChoice);
      determineWinner(choice, randomChoice);
      setIsAnimating(false);
    }, 1000);
  }

  const determineWinner = (player: Choice, computer: Choice) => {
    if (player === computer) {
      setResult('Hòa!');
    } else if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      setResult('Thắng!');
      setPlayerScore(score => score + 1);
    } else {
      setResult('Thua!');
      setComputerScore(score => score + 1);
    }
  };
  
  const resetGame = () => {
      setPlayerChoice(null);
      setComputerChoice(null);
      setResult('');
  }

  const getResultColor = () => {
      if (result === 'Thắng!') return 'text-green-400';
      if (result === 'Thua!') return 'text-red-400';
      if (result === 'Hòa!') return 'text-yellow-400';
      return '';
  }

  return (
    <div className="w-full max-w-md text-center p-4">
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">Oẳn tù xì</h2>
      
      <div className="flex justify-around items-center my-6 p-4 bg-gray-200 dark:bg-gray-800 rounded-xl">
          <div className="text-center">
              <p className="text-xl font-bold">Bạn</p>
              <p className="text-4xl font-bold text-blue-400">{playerScore}</p>
          </div>
          <div className="text-3xl font-bold">VS</div>
           <div className="text-center">
              <p className="text-xl font-bold">Máy</p>
              <p className="text-4xl font-bold text-red-400">{computerScore}</p>
          </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center justify-items-center h-48 my-4">
        <div className={`p-4 rounded-full transition-transform duration-300 ${isAnimating && playerChoice ? 'scale-110' : ''}`}>
          <span className="text-6xl">{playerChoice ? choices.find(c => c.name === playerChoice)?.emoji : '🤔'}</span>
          <p className="mt-2 font-semibold">Bạn chọn</p>
        </div>
        <div className={`p-4 rounded-full transition-transform duration-300 ${isAnimating ? 'animate-bounce' : ''}`}>
          <span className="text-6xl">{isAnimating ? '⏳' : (computerChoice ? choices.find(c => c.name === computerChoice)?.emoji : '🤖')}</span>
          <p className="mt-2 font-semibold">Máy chọn</p>
        </div>
      </div>
      
      {result && !isAnimating && (
          <div className="my-4">
             <h3 className={`text-5xl font-bold ${getResultColor()}`}>{result}</h3>
             <button onClick={resetGame} className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition">Chơi lại</button>
          </div>
      )}

      {!playerChoice && !isAnimating && (
        <div>
          <p className="text-xl mb-4">Mời bạn ra kéo!</p>
          <div className="flex justify-center space-x-4">
            {choices.map(choice => (
              <button
                key={choice.name}
                onClick={() => playGame(choice.name)}
                className="p-4 bg-violet-500 rounded-full text-4xl transform transition hover:scale-110 hover:bg-violet-600"
                aria-label={choice.name}
              >
                {choice.emoji}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-8">
         <ThemedButton onClick={goBack} theme={menuTheme}>Thoát</ThemedButton>
      </div>
    </div>
  );
};

export default RockPaperScissors;