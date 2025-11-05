import React from 'react';
import { View, MenuTheme } from '../types';
import ThemedButton from './ThemedButton';

interface LearningProps {
  navigateTo: (view: View) => void;
  goBack: () => void;
  menuTheme: MenuTheme;
}

const Learning: React.FC<LearningProps> = ({ navigateTo, goBack, menuTheme }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Học tập</h2>
      <ThemedButton onClick={() => navigateTo(View.Calculator)} theme={menuTheme}>Máy tính</ThemedButton>
      <ThemedButton onClick={() => navigateTo(View.MathPractice)} theme={menuTheme}>Luyện tập</ThemedButton>
      <ThemedButton onClick={goBack} theme={menuTheme}>Thoát</ThemedButton>
    </div>
  );
};

export default Learning;