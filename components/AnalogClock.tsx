import React from 'react';
import { ClockProps } from '../types';

const AnalogClock: React.FC<ClockProps> = ({ time, settings }) => {
  const {
    handColor = '#FFFFFF',
    secondHandColor = '#FF0000',
    accentColor = '#888888',
    showMarkings = true,
  } = settings;
  
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;

  return (
    <div className="relative aspect-square w-64 md:w-80 lg:w-96 rounded-full border-4 border-gray-700 bg-gray-900/50 flex items-center justify-center shadow-2xl shadow-black">
      {/* Center dot */}
      <div className="absolute w-3 h-3 rounded-full z-10" style={{ backgroundColor: handColor as string }}></div>

      {/* Hour Hand */}
      <div
        className="absolute w-2 h-[25%] rounded-t-full"
        style={{
          transform: `rotate(${hourDeg}deg)`,
          transformOrigin: 'bottom',
          bottom: '50%',
          backgroundColor: handColor as string,
        }}
      ></div>

      {/* Minute Hand */}
      <div
        className="absolute w-1.5 h-[35%] rounded-t-full"
        style={{
          transform: `rotate(${minuteDeg}deg)`,
          transformOrigin: 'bottom',
          bottom: '50%',
          backgroundColor: handColor as string,
        }}
      ></div>

      {/* Second Hand */}
      <div
        className="absolute w-0.5 h-[40%] rounded-t-full"
        style={{
          transform: `rotate(${secondDeg}deg)`,
          transformOrigin: 'bottom',
          bottom: '50%',
          backgroundColor: secondHandColor as string,
        }}
      ></div>

      {/* Clock Face Markings */}
      {showMarkings && Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{ transform: `rotate(${i * 30}deg)` }}
        >
          <div
            className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[3px] h-[6%]"
            style={{ backgroundColor: accentColor as string }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default AnalogClock;