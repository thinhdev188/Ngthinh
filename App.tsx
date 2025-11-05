import React, { useState, useEffect } from 'react';
import { View, Theme, FontFamily, FontSize, MenuTheme } from './types';
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import Entertainment from './components/Entertainment';
import Learning from './components/Learning';
import Calculator from './components/Calculator';
import MathPractice from './components/MathPractice';
import Settings from './components/Settings';
import RockPaperScissors from './components/RockPaperScissors';
import BatteryInfo from './components/BatteryInfo';
import Calendar from './components/Calendar';
import Camera from './components/Camera';
import Footer from './components/Footer';


const getInitialState = <T,>(key: string, defaultValue: T): T => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key "${key}":`, error);
    return defaultValue;
  }
};

export default function App() {
  const [viewHistory, setViewHistory] = useState<View[]>([View.MainMenu]);
  const [theme, setTheme] = useState<Theme>(() => getInitialState<Theme>('app-theme', 'dark'));
  const [fontFamily, setFontFamily] = useState<FontFamily>(() => getInitialState<FontFamily>('app-font-family', 'modern'));
  const [fontSize, setFontSize] = useState<FontSize>(() => getInitialState<FontSize>('app-font-size', 'text-base'));
  const [menuTheme, setMenuTheme] = useState<MenuTheme>(() => getInitialState<MenuTheme>('app-menu-theme', 'rainbow'));
  const [backgroundTheme, setBackgroundTheme] = useState<string>(() => getInitialState<string>('app-background-theme', 'default'));

  const currentView = viewHistory[viewHistory.length - 1];

  useEffect(() => {
    localStorage.setItem('app-theme', JSON.stringify(theme));
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem('app-font-family', JSON.stringify(fontFamily));
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem('app-font-size', JSON.stringify(fontSize));
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('app-menu-theme', JSON.stringify(menuTheme));
  }, [menuTheme]);
  
  useEffect(() => {
    localStorage.setItem('app-background-theme', JSON.stringify(backgroundTheme));
  }, [backgroundTheme]);

  const navigateTo = (view: View) => {
    setViewHistory(prev => [...prev, view]);
  };

  const goBack = () => {
    setViewHistory(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const fontClassMap: Record<FontFamily, string> = {
    modern: 'font-modern',
    formal: 'font-formal',
    stylish: 'font-stylish',
    pixel: 'font-pixel',
    script: 'font-script',
    futuristic: 'font-futuristic',
    mono: 'font-mono',
    handwritten: 'font-handwritten',
  };

  const getBackgroundClassesAndStyle = (): { className: string; style: React.CSSProperties } => {
    if (backgroundTheme === 'default') {
      return { className: 'bg-gray-100 dark:bg-gray-900', style: {} };
    }
    const [type, value] = backgroundTheme.split(':');
    if (type === 'image') {
      return {
        className: 'bg-cover bg-center',
        style: { backgroundImage: `url(${value})` },
      };
    }
    // Gradients and solids are handled by classes
    return { className: value, style: {} };
  };

  const { className: backgroundClass, style: backgroundStyle } = getBackgroundClassesAndStyle();


  const renderView = () => {
    switch (currentView) {
      case View.MainMenu:
        return <MainMenu navigateTo={navigateTo} menuTheme={menuTheme} />;
      case View.Entertainment:
        return <Entertainment goBack={goBack} navigateTo={navigateTo} menuTheme={menuTheme} />;
      case View.Learning:
        return <Learning goBack={goBack} navigateTo={navigateTo} menuTheme={menuTheme} />;
      case View.Calculator:
        return <Calculator goBack={goBack} menuTheme={menuTheme} />;
      case View.MathPractice:
        return <MathPractice goBack={goBack} navigateTo={navigateTo} menuTheme={menuTheme} />;
       case View.BatteryInfo:
        return <BatteryInfo goBack={goBack} menuTheme={menuTheme} />;
      case View.Calendar:
        return <Calendar goBack={goBack} menuTheme={menuTheme} />;
      case View.RockPaperScissors:
        return <RockPaperScissors goBack={goBack} menuTheme={menuTheme} />;
      case View.Camera:
        return <Camera goBack={goBack} menuTheme={menuTheme} />;
      case View.Settings:
        return <Settings 
                  goBack={goBack} 
                  theme={theme} setTheme={setTheme} 
                  fontFamily={fontFamily} setFontFamily={setFontFamily} 
                  fontSize={fontSize} setFontSize={setFontSize}
                  menuTheme={menuTheme} setMenuTheme={setMenuTheme} 
                  backgroundTheme={backgroundTheme} setBackgroundTheme={setBackgroundTheme}
                />;
      default:
        return <MainMenu navigateTo={navigateTo} menuTheme={menuTheme} />;
    }
  };

  return (
    <div 
      className={`flex flex-col h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500 ${fontClassMap[fontFamily]} ${fontSize} ${backgroundClass}`}
      style={backgroundStyle}
    >
      {currentView !== View.Camera && <Header />}
      <main className={`flex-grow flex flex-col items-center justify-center ${currentView !== View.Camera ? 'p-4 pt-20 pb-24 overflow-y-auto' : ''}`}>
        <div key={currentView} className="w-full h-full flex flex-col items-center justify-center animate-fade-in">
          {renderView()}
        </div>
      </main>
      {viewHistory.length > 1 && currentView !== View.Camera && <Footer goBack={goBack} />}
    </div>
  );
}