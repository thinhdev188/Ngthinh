import React from 'react';
import { MenuTheme } from '../types';

interface ThemedButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  theme: MenuTheme;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ onClick, children, className = '', theme }) => {
    const baseContainerClasses = "relative inline-flex items-center justify-center p-0.5 my-2 overflow-hidden text-lg font-bold rounded-lg group transition-all duration-300 ease-in-out transform hover:scale-105";
    const baseSpanClasses = "relative w-full text-center px-6 py-3 transition-all ease-in duration-75 rounded-md";

    const getThemeClasses = () => {
        switch (theme) {
            case 'matrix':
                return {
                    container: `${baseContainerClasses} bg-green-900`,
                    span: `${baseSpanClasses} bg-black text-green-400 font-mono group-hover:bg-opacity-90`,
                    text: `drop-shadow-[0_0_2px_#0f0]`
                };
             case 'cute':
                return {
                    container: `${baseContainerClasses} bg-pink-400`,
                    span: `${baseSpanClasses} bg-pink-100 text-pink-600 font-stylish group-hover:bg-opacity-90`,
                    text: ``
                };
            case 'neon':
                return {
                    container: `${baseContainerClasses} bg-fuchsia-700`,
                    span: `${baseSpanClasses} bg-black text-cyan-300 group-hover:bg-opacity-90`,
                    text: `drop-shadow-[0_0_5px_#0ff]`
                };
            case 'classic':
                 return {
                    container: `${baseContainerClasses} bg-gray-400 dark:bg-gray-600`,
                    span: `${baseSpanClasses} bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 group-hover:bg-opacity-90`,
                    text: ``
                };
            case 'ocean':
                 return {
                    container: `${baseContainerClasses} bg-cyan-500`,
                    span: `${baseSpanClasses} bg-blue-300 text-white group-hover:bg-opacity-90`,
                    text: `drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]`
                };
            case 'sunset':
                 return {
                    container: `${baseContainerClasses} bg-red-600`,
                    span: `${baseSpanClasses} bg-orange-400 text-white group-hover:bg-opacity-90`,
                    text: `drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]`
                };
            case 'jungle':
                 return {
                    container: `${baseContainerClasses} bg-yellow-900`,
                    span: `${baseSpanClasses} bg-green-700 text-white group-hover:bg-opacity-90`,
                    text: `drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]`
                };
            case 'royal':
                 return {
                    container: `${baseContainerClasses} bg-yellow-500`,
                    span: `${baseSpanClasses} bg-purple-800 text-yellow-300 font-formal group-hover:bg-opacity-90`,
                    text: ``
                };
            case 'minimalist':
                 return {
                    container: `${baseContainerClasses} border-2 border-gray-400 dark:border-gray-600`,
                    span: `${baseSpanClasses} bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 group-hover:bg-opacity-90`,
                    text: ``
                };
            case 'ios':
                 return {
                    container: `${baseContainerClasses} bg-white/20 dark:bg-black/20 border border-white/30 dark:border-black/30`,
                    span: `${baseSpanClasses} bg-gray-200/50 dark:bg-gray-700/50 text-black dark:text-white backdrop-blur-lg group-hover:bg-opacity-40`,
                    text: ``
                };
            case 'space':
                return {
                    container: `${baseContainerClasses} bg-indigo-900`,
                    span: `${baseSpanClasses} bg-black text-purple-300 font-futuristic group-hover:bg-opacity-90`,
                    text: ``
                };
            case 'vintage':
                return {
                    container: `${baseContainerClasses} bg-amber-800`,
                    span: `${baseSpanClasses} bg-[#f5e8c7] text-[#6b4f4f] font-formal sepia-[.5] group-hover:sepia-0`,
                    text: ``
                };
            case 'pastel':
                 return {
                    container: `${baseContainerClasses} bg-rose-200`,
                    span: `${baseSpanClasses} bg-teal-100 text-teal-800 font-script group-hover:bg-opacity-90`,
                    text: ``
                };
            case 'rainbow':
            default:
                return {
                    container: `${baseContainerClasses} bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500`,
                    span: `${baseSpanClasses} bg-white dark:bg-gray-900 group-hover:bg-opacity-0`,
                    text: `bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-hue-rotate`
                };
        }
    };

    const themeClasses = getThemeClasses();

    return (
        <button onClick={onClick} className={`${themeClasses.container} ${className}`}>
            <span className={themeClasses.span}>
                <span className={themeClasses.text}>
                    {children}
                </span>
            </span>
        </button>
    );
};

export default ThemedButton;
