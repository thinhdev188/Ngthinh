import React from 'react';
import { View, MenuTheme } from '../types';
import ThemedButton from './ThemedButton';

interface EntertainmentProps {
  navigateTo: (view: View) => void;
  goBack: () => void;
  menuTheme: MenuTheme;
}

const Entertainment: React.FC<EntertainmentProps> = ({ navigateTo, goBack, menuTheme }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Giải trí</h2>
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs">
        <ThemedButton onClick={() => {}} theme={menuTheme}>Youtube</ThemedButton>
      </a>
      <ThemedButton onClick={() => navigateTo(View.RockPaperScissors)} theme={menuTheme}>Oẳn tù xì</ThemedButton>
      <ThemedButton onClick={goBack} theme={menuTheme}>Thoát</ThemedButton>
    </div>
  );
};

export default Entertainment;