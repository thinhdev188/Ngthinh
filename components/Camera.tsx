import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, MenuTheme } from '../types';

interface CameraProps {
  goBack: () => void;
  menuTheme: MenuTheme;
}

type Mode = 'photo' | 'video';
type FacingMode = 'user' | 'environment';
type TimerValue = 0 | 3 | 5 | 10;

const filters = [
    { name: 'None', style: {} }, { name: 'Grayscale', style: { filter: 'grayscale(100%)' } },
    { name: 'Sepia', style: { filter: 'sepia(100%)' } }, { name: 'Invert', style: { filter: 'invert(100%)' } },
    { name: 'Hue-Rotate', style: { filter: 'hue-rotate(90deg)' } }, { name: 'Saturate', style: { filter: 'saturate(2)' } },
    { name: 'Contrast', style: { filter: 'contrast(200%)' } }, { name: 'Brightness', style: { filter: 'brightness(150%)' } },
    { name: 'Vintage', style: { filter: 'sepia(60%) contrast(110%) brightness(90%)' } }, { name: 'Cool', style: { filter: 'contrast(110%) saturate(120%) hue-rotate(-15deg)' } },
    { name: 'Warm', style: { filter: 'sepia(30%) contrast(110%) saturate(120%) hue-rotate(15deg)' } }, { name: 'Dramatic', style: { filter: 'grayscale(50%) contrast(150%)' } },
    { name: 'Rose', style: { filter: 'sepia(20%) saturate(150%) hue-rotate(-10deg)' } }, { name: 'Cyberpunk', style: { filter: 'contrast(120%) hue-rotate(50deg) saturate(180%)' } },
    { name: 'Emerald', style: { filter: 'hue-rotate(-40deg) saturate(150%)' } }, { name: 'Dreamy', style: { filter: 'saturate(120%) brightness(110%) contrast(90%)' } },
    { name: 'Muted', style: { filter: 'saturate(70%) contrast(90%)' } }, { name: 'Film', style: { filter: 'contrast(120%) saturate(80%)' } },
    { name: 'Sharpen', style: { filter: 'contrast(110%) saturate(110%)' } }, { name: 'Pop', style: { filter: 'contrast(130%) saturate(130%)' } }
];

const frames = [
    { name: 'None', style: {} }, { name: 'Classic', style: { border: '15px solid white', boxShadow: '0 0 10px rgba(0,0,0,0.5)' } },
    { name: 'Film', style: { border: '20px solid black', padding: '5px', background: 'white' } }, { name: 'Polaroid', style: { border: '15px solid white', borderBottomWidth: '60px', boxShadow: '0 0 10px rgba(0,0,0,0.3)' } },
    { name: 'Gold', style: { border: '10px solid #ffd700', padding: '5px', borderStyle: 'double' } }, { name: 'Circle', style: { borderRadius: '50%', overflow: 'hidden' } },
    { name: 'Neon Pink', style: { boxShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #f0f, 0 0 20px #f0f' } }, { name: 'Neon Blue', style: { boxShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0ff, 0 0 20px #0ff' } },
    { name: 'Vignette', style: { boxShadow: 'inset 0 0 80px 20px black' } }, { name: 'Dashed', style: { border: '5px dashed white', padding: '5px' } },
    { name: 'Double', style: { border: '5px double #333' } }, { name: 'Gradient', style: { border: '10px solid transparent', borderImage: 'linear-gradient(45deg, gold, fuchsia) 1' } },
    { name: 'Stamp', style: { border: '1px solid #ccc', padding: '10px', background: 'repeating-linear-gradient(-45deg, #eee, #eee 1px, #fff 1px, #fff 5px)', borderStyle: 'dashed' } },
    { name: 'Wood', style: { border: '20px solid #855E42' } }, { name: 'Grunge', style: { border: '10px solid #333', borderRadius: '2px', filter: 'contrast(2) brightness(0.8)' } },
    { name: 'Shadow', style: { boxShadow: '10px 10px 20px rgba(0,0,0,0.5)' } }, { name: 'Scanlines', style: { background: 'linear-gradient(rgba(0,0,0,0.2) 50%, transparent 50%)', backgroundSize: '100% 4px' } },
    { name: 'Hearts', style: { border: '10px solid transparent', borderImageSource: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'red\' d=\'M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.631 7.928 9.27 12 14.808 4.072-5.538 12-10.177 12-14.808 0-6.792-8.875-8.306-12-2.944z\'/%3E%3C/svg%3E")', borderImageSlice: 1, borderImageRepeat: 'round' } },
    { name: 'Stars', style: { border: '10px solid transparent', borderImageSource: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'yellow\' d=\'M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z\'/%3E%3C/svg%3E")', borderImageSlice: 1, borderImageRepeat: 'round' } },
    { name: 'Corner', style: { background: 'linear-gradient(to top right, transparent 50%, white 50%) top right / 20px 20px no-repeat, linear-gradient(to top left, transparent 50%, white 50%) top left / 20px 20px no-repeat, linear-gradient(to bottom right, transparent 50%, white 50%) bottom right / 20px 20px no-repeat, linear-gradient(to bottom left, transparent 50%, white 50%) bottom left / 20px 20px no-repeat', padding: '10px' } }
];

const Camera: React.FC<CameraProps> = ({ goBack }) => {
  const [mode, setMode] = useState<Mode>('photo');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>('user');
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [activeFrame, setActiveFrame] = useState(frames[0]);
  const [timer, setTimer] = useState<TimerValue>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showFilterTray, setShowFilterTray] = useState(false);
  const [showFrameTray, setShowFrameTray] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<number | null>(null);

  const setupCamera = useCallback(async () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: true,
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Không thể truy cập camera. Vui lòng cấp quyền và thử lại.");
    }
  }, [facingMode]);

  useEffect(() => {
    setupCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [setupCamera]);
  
  const handleCapture = useCallback(() => {
    if (countdown !== null) return;
    
    const performCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                if (facingMode === 'user') {
                    context.translate(canvas.width, 0);
                    context.scale(-1, 1);
                }
                context.filter = activeFilter.style.filter || 'none';
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                 const dataUrl = canvas.toDataURL('image/png');
                 const link = document.createElement('a');
                 link.href = dataUrl;
                 link.download = `photo-${Date.now()}.png`;
                 document.body.appendChild(link);
                 link.click();
                 document.body.removeChild(link);
            }
        }
    }

    if (timer > 0) {
        let count = timer;
        setCountdown(count);
        const interval = setInterval(() => {
            count -= 1;
            setCountdown(count);
            if (count === 0) {
                clearInterval(interval);
                performCapture();
                setCountdown(null);
            }
        }, 1000);
    } else {
        performCapture();
    }
  }, [timer, activeFilter, countdown, facingMode]);

  const startRecording = () => {
    if (!stream || isRecording) return;
    setIsRecording(true);
    setRecordingTime(0);
    recordedChunksRef.current = [];
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
        }
    };
    mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = `video-${Date.now()}.webm`;
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };
    mediaRecorderRef.current.start();
    recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
    }, 1000);
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
        setRecordingTime(0);
    }
  };

  const toggleFacingMode = () => setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  const toggleTimer = () => setTimer(prev => (prev === 0 ? 3 : prev === 3 ? 5 : prev === 5 ? 10 : 0));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const renderControlTray = (items: {name: string, style?: any}[], activeItem: {name: string}, setItem: (item: any) => void, closeTray: () => void, isFrame = false) => (
    <div className="w-full bg-black/50 p-2 overflow-x-auto whitespace-nowrap backdrop-blur-sm">
        {items.map(item => (
            <button
                key={item.name}
                onClick={() => { setItem(item); closeTray(); }}
                className={`inline-block px-3 py-2 text-white rounded-md text-sm mx-1 border-2 ${activeItem.name === item.name ? 'border-yellow-400 bg-white/20' : 'border-transparent'}`}
                style={isFrame ? { ...item.style, width: '60px', height: '60px', boxSizing: 'border-box' } : {}}
            >
                { !isFrame && <div className="w-12 h-12 rounded-full bg-gray-600" style={item.style} /> }
                <span className="block mt-1 truncate text-xs">{item.name}</span>
            </button>
        ))}
    </div>
  );

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
        <button onClick={goBack} className="absolute top-4 left-4 z-20 bg-black/50 text-white px-4 py-2 rounded-full">&lt; Thoát</button>

        <div className="absolute top-4 right-4 z-20 flex flex-col gap-4">
             {!isRecording && (
                <button onClick={toggleFacingMode} className="text-white bg-black/50 p-3 rounded-full transition-opacity hover:bg-black/80">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2.086a7.5 7.5 0 00-12.872 0M20 20v-5h-.581m-15.357-2.086a7.5 7.5 0 0112.872 0" /></svg>
                </button>
             )}
            <button onClick={toggleTimer} className="text-white bg-black/50 p-3 rounded-full relative transition-opacity hover:bg-black/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full px-1.5 py-0.5">{timer}s</span>
            </button>
        </div>
        
        <div className="relative w-full h-full flex items-center justify-center">
            <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" style={{...activeFilter.style, transform: facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)'}} />
            <div className="absolute inset-0 w-full h-full pointer-events-none" style={activeFrame.style} />
             {isRecording && <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full"><div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>{formatTime(recordingTime)}</div>}
        </div>

        <canvas ref={canvasRef} className="hidden" />
        
        {countdown !== null && countdown > 0 && <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-9xl font-bold drop-shadow-lg z-30">{countdown}</div>}

        {/* CONTROLS */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center gap-4 z-10 pt-4">
            <div className="w-full">
                {mode === 'photo' && showFrameTray && renderControlTray(frames, activeFrame, setActiveFrame, () => setShowFrameTray(false), true)}
                {showFilterTray && renderControlTray(filters, activeFilter, setActiveFilter, () => setShowFilterTray(false))}
            </div>

            <div className="flex items-center justify-around w-full px-4">
                <button onClick={() => setShowFilterTray(s => !s)} className="text-white flex flex-col items-center gap-1 opacity-90 hover:opacity-100 transition">
                    <div className="bg-black/50 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m0-10v2m0 6v2M6 12H4m16 0h-2m-10 0h2m6 0h2M9 15l-2 2M15 9l2-2M15 15l2 2M9 9l-2-2" /></svg>
                    </div>
                    <span className="text-xs font-semibold">Bộ lọc</span>
                </button>

                <div className="flex flex-col items-center">
                    <button 
                        onClick={mode === 'photo' ? handleCapture : (isRecording ? stopRecording : startRecording)}
                        className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-colors ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-white/30 hover:bg-white/50'}`}
                    >
                        {mode === 'video' && isRecording && <div className="w-8 h-8 bg-white rounded-md"></div>}
                    </button>
                    <div className="flex gap-4 mt-2">
                        <button onClick={() => { setMode('photo'); setShowFrameTray(false);}} className={`px-3 py-1 rounded-full text-sm font-semibold ${mode === 'photo' ? 'bg-yellow-400 text-black' : 'bg-black/50 text-white'}`}>Ảnh</button>
                        <button onClick={() => setMode('video')} className={`px-3 py-1 rounded-full text-sm font-semibold ${mode === 'video' ? 'bg-yellow-400 text-black' : 'bg-black/50 text-white'}`}>Video</button>
                    </div>
                </div>

                {mode === 'photo' ? (
                     <button onClick={() => setShowFrameTray(s => !s)} className="text-white flex flex-col items-center gap-1 opacity-90 hover:opacity-100 transition">
                        <div className="bg-black/50 p-3 rounded-full">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" /></svg>
                        </div>
                        <span className="text-xs font-semibold">Khung</span>
                    </button>
                ) : <div className="w-20" /> /* Placeholder to keep layout balanced */ }
            </div>
        </div>
    </div>
  );
};

export default Camera;
