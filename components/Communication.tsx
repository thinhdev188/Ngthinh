import React from 'react';
import { View, MenuTheme } from '../types';
import ThemedButton from './ThemedButton';

interface CommunicationProps {
  goBack: () => void;
  menuTheme: MenuTheme;
}

const Communication: React.FC<CommunicationProps> = ({ goBack, menuTheme }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Liên lạc</h2>
      <ThemedButton onClick={() => { alert('Chức năng Điện thoại sắp ra mắt!'); }} theme={menuTheme}>Điện thoại</ThemedButton>
      <ThemedButton onClick={() => { alert('Chức năng Tin nhắn sắp ra mắt!'); }} theme={menuTheme}>Tin nhắn</ThemedButton>
      <ThemedButton onClick={() => { alert('Chức năng Danh bạ sắp ra mắt!'); }} theme={menuTheme}>Danh bạ</ThemedButton>
      <ThemedButton onClick={() => { alert('Chức năng Mail sắp ra mắt!'); }} theme={menuTheme}>Mail</ThemedButton>
      <ThemedButton onClick={goBack} theme={menuTheme}>Thoát</ThemedButton>
    </div>
  );
};

export default Communication;
