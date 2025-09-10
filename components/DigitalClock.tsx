import React from 'react';
import { ClockProps } from '../types';

const padZero = (num: number): string => num.toString().padStart(2, '0');

const DigitalClock: React.FC<ClockProps> = ({ time, settings }) => {
  const { 
    textColor = '#FFFFFF', 
    font = 'Orbitron, sans-serif',
    showSeconds = true,
    showDate = true,
  } = settings;

  const hours = padZero(time.getHours());
  const minutes = padZero(time.getMinutes());
  const seconds = padZero(time.getSeconds());

  // FIX: Added a type guard to ensure `font` is a string before calling `includes`.
  const fontName = typeof font === 'string' ? font : '';
  const fontClass = fontName.includes('Orbitron') ? 'font-orbitron' : fontName.includes('Cutive') ? 'font-cutive-mono' : 'font-mono';

  return (
    <div className="flex flex-col items-center justify-center text-white select-none" style={{ color: textColor as string }}>
      <div className={`${fontClass} text-8xl md:text-9xl lg:text-[10rem] tracking-widest`} style={{ textShadow: `0 0 20px ${textColor as string}80` }}>
        <span>{hours}</span>
        <span className="animate-pulse">:</span>
        <span>{minutes}</span>
        {showSeconds && <span className="animate-pulse">:</span>}
        {showSeconds && <span>{seconds}</span>}
      </div>
      {showDate && (
        <div className="font-mono text-xl md:text-2xl lg:text-3xl mt-4 opacity-70 tracking-wider">
          {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      )}
    </div>
  );
};

export default DigitalClock;