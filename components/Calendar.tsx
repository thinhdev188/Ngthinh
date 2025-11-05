import React, { useState, useEffect } from 'react';
import { MenuTheme } from '../types';
import ThemedButton from './ThemedButton';

interface CalendarProps {
  goBack: () => void;
  menuTheme: MenuTheme;
}

interface Event {
    time: string;
    title: string;
}

const HOLIDAYS_2024: Record<string, string> = {
  '2024-1-1': 'Tết Dương Lịch',
  '2024-2-10': 'Tết Nguyên Đán',
  '2024-4-18': 'Giỗ Tổ Hùng Vương',
  '2024-4-30': 'Ngày Giải phóng miền Nam',
  '2024-5-1': 'Ngày Quốc tế Lao động',
  '2024-9-2': 'Ngày Quốc khánh',
  '2024-9-17': 'Tết Trung Thu',
};

const Calendar: React.FC<CalendarProps> = ({ goBack, menuTheme }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Record<string, Event[]>>(() => {
    try {
        const savedEvents = localStorage.getItem('calendarEvents');
        return savedEvents ? JSON.parse(savedEvents) : {};
    } catch (e) {
        return {};
    }
  });
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('12:00');

  useEffect(() => {
      localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleDayClick = (day: number) => {
      setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  }

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !eventTitle) return;
    const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    const newEvent: Event = { title: eventTitle, time: eventTime };
    const updatedEvents = { ...events };
    if (!updatedEvents[dateKey]) {
        updatedEvents[dateKey] = [];
    }
    updatedEvents[dateKey].push(newEvent);
    updatedEvents[dateKey].sort((a,b) => a.time.localeCompare(b.time));

    setEvents(updatedEvents);
    setEventTitle('');
    setEventTime('12:00');
  }

  const renderEventModal = () => {
      if (!selectedDate) return null;
      const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
      const dayEvents = events[dateKey] || [];
      const holiday = HOLIDAYS_2024[dateKey];

      return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20" onClick={() => setSelectedDate(null)}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 max-w-md" onClick={e => e.stopPropagation()}>
                  <h3 className="font-bold text-xl mb-4">Sự kiện ngày {selectedDate.toLocaleDateString('vi-VN')}</h3>
                  {holiday && <div className="p-2 bg-yellow-200 dark:bg-yellow-800 rounded-lg mb-3 font-semibold text-yellow-800 dark:text-yellow-200">Lễ: {holiday}</div>}
                  <div className="max-h-40 overflow-y-auto mb-4">
                      {dayEvents.length > 0 ? (
                        dayEvents.map((event, index) => (
                           <div key={index} className="flex items-center gap-4 p-2 border-b border-gray-200 dark:border-gray-700">
                               <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{event.time}</span>
                               <span>{event.title}</span>
                           </div>
                        ))
                      ) : <p>Không có sự kiện nào.</p>}
                  </div>
                  <form onSubmit={handleAddEvent} className="mt-4">
                      <h4 className="font-semibold mb-2">Thêm sự kiện mới</h4>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input type="time" value={eventTime} onChange={e => setEventTime(e.target.value)} className="p-2 rounded bg-gray-200 dark:bg-gray-700" />
                        <input type="text" placeholder="Tên sự kiện" value={eventTitle} onChange={e => setEventTitle(e.target.value)} className="flex-grow p-2 rounded bg-gray-200 dark:bg-gray-700" />
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Thêm</button>
                      </div>
                  </form>
                  <button onClick={() => setSelectedDate(null)} className="mt-6 w-full py-2 bg-gray-300 dark:bg-gray-600 rounded">Đóng</button>
              </div>
          </div>
      )
  }

  return (
    <div className="w-full max-w-2xl p-4 bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Lịch</h2>
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-4 py-2">&lt;</button>
        <h3 className="text-xl font-semibold">{`Tháng ${currentDate.getMonth() + 1}, ${currentDate.getFullYear()}`}</h3>
        <button onClick={nextMonth} className="px-4 py-2">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-semibold">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-2">
        {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`}></div>)}
        {days.map(day => {
            const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
            const hasEvent = (events[dateKey] && events[dateKey].length > 0) || HOLIDAYS_2024[dateKey];
            const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
            return (
                <button 
                    key={day} 
                    onClick={() => handleDayClick(day)}
                    className={`p-2 rounded-lg relative ${isToday ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                >
                    {day}
                    {hasEvent && <div className="absolute bottom-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>}
                </button>
            )
        })}
      </div>
      {renderEventModal()}
      <div className="mt-6">
        <ThemedButton onClick={goBack} theme={menuTheme}>Thoát</ThemedButton>
      </div>
    </div>
  );
};

export default Calendar;
