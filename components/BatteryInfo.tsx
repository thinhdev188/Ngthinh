import React from 'react';
import { MenuTheme } from '../types';
import ThemedButton from './ThemedButton';
import { useBattery } from '../hooks/useBattery';

interface BatteryInfoProps {
  goBack: () => void;
  menuTheme: MenuTheme;
}

const BatteryIconFull: React.FC<{ level: number, charging: boolean }> = ({ level, charging }) => {
  const widthPercentage = level;
  const color = level <= 15 ? 'bg-red-500' : level <= 50 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className={`relative w-24 h-48 border-4 border-gray-500 dark:border-gray-400 rounded-2xl p-2 flex flex-col-reverse`}>
        <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-10 h-4 bg-gray-500 dark:bg-gray-400 rounded-t-md"></div>
        <div style={{ height: `${widthPercentage}%` }} className={`w-full ${color} rounded-lg transition-all duration-500`}></div>
         {charging && (
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
            </svg>
        )}
    </div>
  );
};

const BatteryInfo: React.FC<BatteryInfoProps> = ({ goBack, menuTheme }) => {
  const { level, charging, supported } = useBattery();

  const getAdvice = () => {
    if (charging) {
      return "Thiết bị đang sạc. Pin sẽ sớm được nạp đầy!";
    }
    if (level <= 15) {
      return "Pin yếu! Bạn nên kết nối bộ sạc để tránh gián đoạn.";
    }
    return "Pin của bạn đang ở trạng thái tốt. Hãy tiếp tục sử dụng!";
  };

  if (!supported) {
    return (
       <div className="flex flex-col items-center text-center p-4">
        <h2 className="text-3xl font-bold mb-4">Thông tin Pin</h2>
        <p className="text-lg">Trình duyệt của bạn không hỗ trợ xem thông tin pin.</p>
        <div className="mt-6">
            <ThemedButton onClick={goBack} theme={menuTheme}>Thoát</ThemedButton>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center text-center p-4 w-full max-w-sm">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Thông tin Pin</h2>
      
      <div className="flex flex-col items-center gap-6 mb-6">
        <BatteryIconFull level={level} charging={charging} />
        <div>
            <p className="text-7xl font-bold">{level}%</p>
            <p className="text-xl text-gray-500 dark:text-gray-400">{charging ? 'Đang sạc' : 'Không sạc'}</p>
        </div>
      </div>

      <p className="text-lg mb-6 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">{getAdvice()}</p>
      
      <ThemedButton onClick={goBack} theme={menuTheme}>Thoát</ThemedButton>
    </div>
  );
};

export default BatteryInfo;
