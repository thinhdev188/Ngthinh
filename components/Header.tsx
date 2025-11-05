import React from 'react';
import { useDateTime } from '../hooks/useDateTime';
import { useBattery } from '../hooks/useBattery';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

const WifiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
  </svg>
);


const BatteryIcon: React.FC<{ level: number, charging: boolean }> = ({ level, charging }) => {
  const width = Math.max(0, (level / 100) * 16);
  const color = level > 20 ? 'currentColor' : '#ef4444'; // Tailwind red-500

  return (
    <div className="relative w-7 h-4 flex items-center">
      <svg viewBox="0 0 24 12" className="w-full h-full absolute" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1,3 A2,2 0 0,1 3,1 H19 A2,2 0 0,1 21,3 V9 A2,2 0 0,1 19,11 H3 A2,2 0 0,1 1,9 V3 z" />
        <path d="M21,4 L23,4 L23,8 L21,8" />
      </svg>
      <div className="h-[7px] ml-[2.5px] rounded-sm" style={{ width: `${width}px`, backgroundColor: color }}></div>
      {charging && (
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-full h-full p-[3px] text-yellow-400" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
        </svg>
      )}
    </div>
  );
};


export default function Header() {
  const { formattedDate, formattedTime } = useDateTime();
  const { level, charging, supported } = useBattery();
  const isOnline = useOnlineStatus();

  return (
    <header className="absolute top-0 left-0 right-0 w-full p-2 sm:p-4 flex justify-between items-center z-10 text-xs sm:text-sm">
      <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-white bg-black/20 dark:bg-white/10 rounded-xl backdrop-blur-sm px-3 py-1">
            <img src="https://i.pravatar.cc/40?u=thuy" alt="Avatar" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white/50" />
            <div>
              <p className="font-semibold text-xs sm:text-base">Xin chào Thùy</p>
              <p className="text-gray-300 dark:text-gray-400 text-[10px] sm:text-xs">Quyền: admin</p>
            </div>
          </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 font-mono text-white bg-black/20 dark:bg-white/10 rounded-xl backdrop-blur-sm px-3 py-1">
        {isOnline && <WifiIcon />}
        {supported && <div className="flex items-center gap-1"><BatteryIcon level={level} charging={charging} /> {level}%</div>}
        <div>{formattedDate}</div>
        <div>{formattedTime}</div>
      </div>
    </header>
  );
}