import React from 'react';
import { ClockProps } from '../types';

const SundialClock: React.FC<ClockProps> = ({ time, settings }) => {
  const { dialColor = '#A0A0A0', gnomonColor = '#333333' } = settings;
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const totalMinutes = hours * 60 + minutes;
  const rotation = (totalMinutes / (12 * 60)) * 360 + 180;

  const isDay = hours >= 6 && hours < 18;
  const background = isDay
    ? 'radial-gradient(circle, #87CEEB 0%, #4682B4 100%)'
    : 'radial-gradient(circle, #000030 0%, #000000 100%)';

  return (
    <div 
      className="relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center transition-all duration-1000"
      style={{ background, boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }}
    >
      {/* Gnomon Shadow */}
      <div 
        className="absolute w-1.5 h-[40%] opacity-30" 
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'bottom',
          bottom: '50%',
          background: `linear-gradient(to top, ${gnomonColor}00, ${gnomonColor}FF)`,
        }}
      />
      
      {/* Gnomon */}
      <div 
        className="absolute w-4 h-4 rounded-full"
        style={{ 
            backgroundColor: gnomonColor as string,
            boxShadow: `0 0 10px 2px ${gnomonColor}AA`
        }}
      />

      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-4 origin-center"
          style={{
            transform: `rotate(${i * 30}deg) translateY(-450%)`, // Use percentage for responsiveness
            backgroundColor: dialColor as string,
          }}
        />
      ))}
    </div>
  );
};

export default SundialClock;