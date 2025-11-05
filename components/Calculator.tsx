import React, { useState } from 'react';
import { View, MenuTheme } from '../types';
import ThemedButton from './ThemedButton';

interface CalculatorProps {
  goBack: () => void;
  menuTheme: MenuTheme;
}

const Calculator: React.FC<CalculatorProps> = ({ goBack, menuTheme }) => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleDigitClick = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleOperatorClick = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (operator && !waitingForSecondOperand) {
      if (firstOperand === null) {
          setFirstOperand(inputValue);
      } else {
        const result = calculate(firstOperand, inputValue, operator);
        setDisplay(String(result));
        setFirstOperand(result);
      }
    } else {
       setFirstOperand(inputValue);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string) => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '*': return first * second;
      case '/': return second === 0 ? 'Error' : first / second;
      default: return second;
    }
  };

  const handleEqualsClick = () => {
    if (operator && firstOperand !== null) {
      const result = calculate(firstOperand, parseFloat(display), operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };
  
  const handleClear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  }

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  const handleButtonClick = (btn: string) => {
    if (!isNaN(Number(btn)) || btn === '.') {
      handleDigitClick(btn);
    } else if (btn === '=') {
      handleEqualsClick();
    } else {
      handleOperatorClick(btn);
    }
  };
  

  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-2xl">
      <div className="bg-gray-800 dark:bg-black text-white text-right text-4xl font-mono p-4 rounded-lg mb-4 overflow-x-auto break-all">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button onClick={handleClear} className="col-span-4 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg text-xl transition">C</button>
        {buttons.map(btn => (
          <button 
            key={btn} 
            onClick={() => handleButtonClick(btn)}
            className={`font-bold py-3 rounded-lg text-xl transition ${'/*-+='.includes(btn) ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'}`}
          >
            {btn}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <ThemedButton onClick={goBack} theme={menuTheme} className="w-full">Thoát</ThemedButton>
      </div>
    </div>
  );
};

export default Calculator;