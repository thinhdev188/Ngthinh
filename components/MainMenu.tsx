import React from 'react';
import { View, MenuTheme } from '../types';

interface MainMenuProps {
  navigateTo: (view: View) => void;
  menuTheme: MenuTheme;
}

interface MenuCardProps {
    onClick: () => void;
    children: React.ReactNode;
    theme: MenuTheme;
    icon: React.ReactNode;
    className?: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ onClick, children, theme, icon, className = '' }) => {
    const baseButtonClasses = "w-full h-full text-lg font-bold rounded-xl backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center gap-2";
    const baseContainerClasses = "p-1 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl shadow-lg";

    const getThemeClasses = () => {
        switch (theme) {
            case 'matrix':
                return {
                    container: `${baseContainerClasses} bg-green-900`,
                    button: `${baseButtonClasses} bg-black text-green-400 font-mono hover:bg-gray-900`,
                    text: 'drop-shadow-[0_0_4px_#0f0] animate-pulse',
                };
            case 'cute':
                return {
                    container: `${baseContainerClasses} bg-pink-400`,
                    button: `${baseButtonClasses} bg-pink-100 text-pink-600 font-stylish hover:bg-pink-200`,
                    text: 'drop-shadow-[0_0_1px_rgba(255,255,255,0.7)]',
                };
            case 'neon':
                return {
                    container: `${baseContainerClasses} bg-fuchsia-700`,
                    button: `${baseButtonClasses} bg-black text-cyan-300 hover:bg-gray-900`,
                    text: 'drop-shadow-[0_0_5px_#0ff] drop-shadow-[0_0_10px_#0ff] animate-pulse',
                };
            case 'classic':
                 return {
                    container: `${baseContainerClasses} bg-gray-400 dark:bg-gray-600`,
                    button: `${baseButtonClasses} bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`,
                    text: '',
                };
            case 'ocean':
                 return {
                    container: `${baseContainerClasses} bg-cyan-500`,
                    button: `${baseButtonClasses} bg-gradient-to-b from-blue-200 to-blue-400 text-white`,
                    text: 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]',
                };
            case 'sunset':
                 return {
                    container: `${baseContainerClasses} bg-red-600`,
                    button: `${baseButtonClasses} bg-gradient-to-b from-yellow-300 to-orange-500 text-white`,
                    text: 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]',
                };
            case 'jungle':
                 return {
                    container: `${baseContainerClasses} bg-yellow-900`,
                    button: `${baseButtonClasses} bg-gradient-to-b from-lime-600 to-green-800 text-white`,
                    text: 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]',
                };
            case 'royal':
                 return {
                    container: `${baseContainerClasses} bg-yellow-500`,
                    button: `${baseButtonClasses} bg-purple-800 text-yellow-300 font-formal hover:bg-purple-700`,
                    text: '',
                };
            case 'minimalist':
                 return {
                    container: `${baseContainerClasses} border-2 border-gray-400 dark:border-gray-600`,
                    button: `${baseButtonClasses} bg-gray-100/50 dark:bg-gray-900/50 text-gray-800 dark:text-gray-200`,
                    text: '',
                };
            case 'ios':
                 return {
                    container: `${baseContainerClasses} bg-white/20 dark:bg-black/20 border border-white/30 dark:border-black/30`,
                    button: `${baseButtonClasses} bg-gray-200/50 dark:bg-gray-700/50 text-black dark:text-white backdrop-blur-lg`,
                    text: '',
                };
            case 'space':
                return {
                    container: `${baseContainerClasses} bg-indigo-900`,
                    button: `${baseButtonClasses} bg-black text-purple-300 font-futuristic hover:bg-gray-900`,
                    text: 'drop-shadow-[0_0_5px_#fff] drop-shadow-[0_0_10px_#f0f]',
                };
            case 'vintage':
                return {
                    container: `${baseContainerClasses} bg-amber-800`,
                    button: `${baseButtonClasses} bg-[#f5e8c7] text-[#6b4f4f] font-formal sepia-[.5] hover:sepia-0`,
                    text: '',
                };
            case 'pastel':
                 return {
                    container: `${baseContainerClasses} bg-rose-200`,
                    button: `${baseButtonClasses} bg-teal-100 text-teal-800 font-script hover:bg-rose-100`,
                    text: 'drop-shadow-[0_0_1px_rgba(255,255,255,0.7)]',
                };
            case 'rainbow':
            default:
                return {
                    container: `${baseContainerClasses} bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 animate-hue-rotate`,
                    button: `${baseButtonClasses} bg-white/80 dark:bg-gray-900/80`,
                    text: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-hue-rotate',
                };
        }
    };

    const themeClasses = getThemeClasses();

    return (
        <div className={`${themeClasses.container} ${className}`}>
            <button
                onClick={onClick}
                className={themeClasses.button}
            >
                <div className="w-10 h-10 sm:w-12 sm:h-12">
                    {icon}
                </div>
                <span className="block px-2 sm:px-8 py-2 transition-all ease-in duration-75 text-base sm:text-lg">
                    <span className={themeClasses.text}>
                        {children}
                    </span>
                </span>
            </button>
        </div>
    );
};

const EntertainmentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.75h-9v10.5h9V6.75Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h.75v10.5h-.75V6.75Zm15.75 0h.75v10.5h-.75V6.75Zm-12 1.5h4.5m-4.5 3h4.5m-4.5 3h4.5M3.75 3.75h16.5v1.5H3.75v-1.5Zm0 15h16.5v1.5H3.75v-1.5Z" /></svg>;
const LearningIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-1.003 1.11-1.226.554-.223 1.196-.223 1.75 0 .548.223 1.02.684 1.11 1.226l.082.499a.502.502 0 0 1-.423.552l-.22.038a2.5 2.5 0 0 0-1.18 2.065l-.046.255a2.5 2.5 0 0 0 .942 2.326l.16.121a2.5 2.5 0 0 0 3.28-.432l.126-.21a2.5 2.5 0 0 0-.43-3.282l-.16-.121a.503.503 0 0 1 .553-.423l.22.038c.284.049.55.198.75.423.202.225.32.51.32.822v3.29c0 .312-.118.597-.32.822-.2.225-.466.374-.75.423l-.22.038a.502.502 0 0 1-.553-.423l-.16-.121a2.5 2.5 0 0 0-3.28.432l-.126.21a2.5 2.5 0 0 0 .43 3.282l.16.121a.503.503 0 0 1 .423.552l.22.038c.283.049.55.198.75.423.2.225.32.51.32.822v1.259c0 .312-.118.597-.32.822-.2.225-.466.374-.75.423l-.22.038a.502.502 0 0 1-.552-.423l-.082-.499a2.5 2.5 0 0 0-2.22-1.79l-.255-.046a2.5 2.5 0 0 0-2.326.942l-.121.16a2.5 2.5 0 0 0 .432 3.28l.21.126c.433.256.64.79.526 1.282l-.042.181c-.13.563-.594 1.004-1.168 1.18a2.5 2.5 0 0 1-1.323-.29l-.18-.081a.501.501 0 0 1-.29-.49l.042-.181c.114-.492-.1-.992-.526-1.282l-.21-.126a2.5 2.5 0 0 0-.432-3.28l-.121-.16a2.5 2.5 0 0 0-2.326-.942l-.255.046a2.5 2.5 0 0 0-1.79 2.22l-.499.082a.502.502 0 0 1-.552-.423l-.038-.22c-.049-.282-.198-.55-.423-.75a1.01 1.01 0 0 1-.822-.32v-3.29c0-.312.118-.597.32-.822.2-.225.466-.374.75-.423l.22-.038a.502.502 0 0 1 .552.423l.082.499a2.5 2.5 0 0 0 2.22 1.79l.255.046a2.5 2.5 0 0 0 2.326-.942l.121-.16a2.5 2.5 0 0 0-.432-3.28l-.21-.126a.503.503 0 0 1-.423-.552l.038-.22c.049-.283.198-.55.423-.75.225-.2.51-.32.822-.32h1.259c.312 0 .597.118.822.32.225.2.374.466.423.75l.038.22a.502.502 0 0 1-.423.552l-.22.038a2.5 2.5 0 0 0-1.18 2.065l-.046.255a2.5 2.5 0 0 0 .942 2.326l.16.121a2.5 2.5 0 0 0 3.28-.432l.126-.21a2.5 2.5 0 0 0-.43-3.282l-.16-.121a.503.503 0 0 1 .553-.423l.22.038c.284.049.55.198.75.423.2.225.32.51.32.822Z" /></svg>;
const BatteryStatusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18V6c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v12c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 0 1 3.75 18Z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M12 12.75h.008v.008H12v-.008Z" /></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.776 48.776 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" /></svg>;


export default function MainMenu({ navigateTo, menuTheme }: MainMenuProps) {
  return (
    <div className="w-full max-w-4xl p-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 pl-2 text-gray-600 dark:text-gray-300">Chức năng chính</h2>
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          <MenuCard onClick={() => navigateTo(View.Entertainment)} theme={menuTheme} icon={<EntertainmentIcon/>}>
            Giải trí
          </MenuCard>
          <MenuCard onClick={() => navigateTo(View.Learning)} theme={menuTheme} icon={<LearningIcon/>}>
            Học tập
          </MenuCard>
          <MenuCard onClick={() => navigateTo(View.Camera)} theme={menuTheme} icon={<CameraIcon/>}>
            Máy ảnh
          </MenuCard>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 pl-2 text-gray-600 dark:text-gray-300">Tiện ích & Cài đặt</h2>
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          <MenuCard onClick={() => navigateTo(View.Calendar)} theme={menuTheme} icon={<CalendarIcon/>}>
            Lịch
          </MenuCard>
          <MenuCard onClick={() => navigateTo(View.BatteryInfo)} theme={menuTheme} icon={<BatteryStatusIcon/>}>
            Pin
          </MenuCard>
          <MenuCard onClick={() => navigateTo(View.Settings)} theme={menuTheme} icon={<SettingsIcon/>}>
            Cài đặt
          </MenuCard>
        </div>
      </div>
    </div>
  );
}