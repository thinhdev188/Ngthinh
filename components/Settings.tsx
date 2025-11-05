import React from 'react';
import { View, Theme, FontFamily, FontSize, MenuTheme } from '../types';
import ThemedButton from './ThemedButton';

interface SettingsProps {
  goBack: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontFamily: FontFamily;
  setFontFamily: (font: FontFamily) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  menuTheme: MenuTheme;
  setMenuTheme: (theme: MenuTheme) => void;
  backgroundTheme: string;
  setBackgroundTheme: (theme: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ goBack, theme, setTheme, fontFamily, setFontFamily, fontSize, setFontSize, menuTheme, setMenuTheme, backgroundTheme, setBackgroundTheme }) => {
  const fontOptions: { id: FontFamily, name: string, class: string }[] = [
    { id: 'modern', name: 'Hiện đại', class: 'font-modern' },
    { id: 'formal', name: 'Lịch sự', class: 'font-formal' },
    { id: 'stylish', name: 'Cong', class: 'font-stylish' },
    { id: 'pixel', name: 'Pixel', class: 'font-pixel text-sm' },
    { id: 'script', name: 'Nét Bút', class: 'font-script' },
    { id: 'futuristic', name: 'Tương Lai', class: 'font-futuristic' },
    { id: 'mono', name: 'Gõ Chữ', class: 'font-mono' },
    { id: 'handwritten', name: 'Viết Tay', class: 'font-handwritten' },
  ];

  const sizeOptions: { id: FontSize, name: string }[] = [
    { id: 'text-sm', name: 'Nhỏ' },
    { id: 'text-base', name: 'Vừa' },
    { id: 'text-lg', name: 'Lớn' },
  ];

  const menuThemeOptions: { id: MenuTheme, name: string }[] = [
    { id: 'rainbow', name: '7 Màu' },
    { id: 'matrix', name: 'Matrix' },
    { id: 'cute', name: 'Xinh Xắn' },
    { id: 'neon', name: 'Neon' },
    { id: 'ios', name: 'iOS' },
    { id: 'space', name: 'Không Gian' },
    { id: 'vintage', name: 'Cổ Điển' },
    { id: 'pastel', name: 'Pastel' },
    { id: 'ocean', name: 'Đại dương' },
    { id: 'sunset', name: 'Hoàng hôn' },
    { id: 'jungle', name: 'Rừng xanh' },
    { id: 'royal', name: 'Hoàng gia' },
    { id: 'minimalist', name: 'Tối giản' },
    { id: 'classic', name: 'Cơ bản' },
  ];

  const backgroundOptions = {
    "Màu trơn": [
      { name: "Mặc định", value: "default" },
      { name: "Xanh Đậm", value: "solid:bg-blue-900" },
      { name: "Tím Than", value: "solid:bg-slate-900" },
      { name: "Hồng Phấn", value: "solid:bg-pink-900" },
      { name: "Xanh Rêu", value: "solid:bg-emerald-900" },
    ],
    "Phối màu": [
      { name: "Hoàng Hôn", value: "gradient:bg-gradient-to-br from-yellow-800 via-orange-700 to-red-900" },
      { name: "Bầu Trời", value: "gradient:bg-gradient-to-br from-sky-400 to-blue-600" },
      { name: "Thiên Hà", value: "gradient:bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600" },
      { name: "Rừng Sâu", value: "gradient:bg-gradient-to-br from-green-900 to-teal-800" },
    ],
    "Hình ảnh": [
      { name: "Thiên Nhiên", value: "image:https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      { name: "Vũ Trụ", value: "image:https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      { name: "Trừu Tượng", value: "image:https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    ]
  };

  return (
    <div className="w-full max-w-md p-6 bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-gray-500 to-gray-200 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">Cài đặt</h2>

      {/* Theme Setting */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Giao diện</h3>
        <div className="flex items-center justify-center p-1 bg-gray-300 dark:bg-gray-700 rounded-full">
          <button onClick={() => setTheme('light')} className={`w-1/2 py-2 rounded-full transition ${theme === 'light' ? 'bg-white dark:bg-gray-500 font-bold' : ''}`}>Sáng</button>
          <button onClick={() => setTheme('dark')} className={`w-1/2 py-2 rounded-full transition ${theme === 'dark' ? 'bg-black text-white font-bold' : ''}`}>Tối</button>
        </div>
      </div>
      
      {/* Background Theme Setting */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Hình nền</h3>
        <select 
          value={backgroundTheme} 
          onChange={(e) => setBackgroundTheme(e.target.value)} 
          className="w-full p-2 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(backgroundOptions).map(([group, options]) => (
            <optgroup key={group} label={group}>
              {options.map(option => (
                <option key={option.value} value={option.value}>{option.name}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Menu Theme Setting */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Kiểu Menu</h3>
        <select 
          value={menuTheme} 
          onChange={(e) => setMenuTheme(e.target.value as MenuTheme)} 
          className="w-full p-2 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {menuThemeOptions.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
      </div>

      {/* Font Family Setting */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Phông chữ</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {fontOptions.map(font => (
                <button key={font.id} onClick={() => setFontFamily(font.id)} className={`flex-1 py-2 rounded-lg transition text-base ${font.class} ${fontFamily === font.id ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    {font.name}
                </button>
            ))}
        </div>
      </div>

      {/* Font Size Setting */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Cỡ chữ</h3>
        <div className="flex justify-between items-center gap-2">
            {sizeOptions.map(size => (
                 <button key={size.id} onClick={() => setFontSize(size.id)} className={`flex-1 py-2 rounded-lg transition ${fontSize === size.id ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    {size.name}
                </button>
            ))}
        </div>
      </div>

      <ThemedButton onClick={goBack} theme={menuTheme} className="w-full">Thoát</ThemedButton>
    </div>
  );
};

export default Settings;