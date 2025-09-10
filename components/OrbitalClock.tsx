import React from 'react';
import { ClockProps } from '../types';

const OrbitalClock: React.FC<ClockProps> = ({ time, settings }) => {
  const {
    hourColor = '#FFD700',
    minuteColor = '#C0C0C0',
    secondColor = '#CD7F32',
    orbitColor = '#FFFFFF20',
  } = settings;

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const getCoordinates = (progress: number, radius: number) => {
    const angle = progress * 2 * Math.PI - Math.PI / 2;
    const x = 100 + radius * Math.cos(angle);
    const y = 100 + radius * Math.sin(angle);
    return { x, y };
  };

  const hourCoords = getCoordinates(((hours % 12) / 12) + (minutes / 60 / 12), 40);
  const minuteCoords = getCoordinates((minutes / 60) + (seconds / 60 / 60), 65);
  const secondCoords = getCoordinates(seconds / 60, 85);

  return (
    <div className="aspect-square w-64 md:w-80 lg:w-96">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Orbits */}
        <circle cx="100" cy="100" r="40" fill="none" stroke={orbitColor as string} strokeWidth="1" />
        <circle cx="100" cy="100" r="65" fill="none" stroke={orbitColor as string} strokeWidth="1" />
        <circle cx="100" cy="100" r="85" fill="none" stroke={orbitColor as string} strokeWidth="1" />

        {/* Sun */}
        <circle cx="100" cy="100" r="10" fill="white" filter="url(#glow)" />

        {/* Hour Planet */}
        <circle cx={hourCoords.x} cy={hourCoords.y} r="8" fill={hourColor as string} />
        
        {/* Minute Planet */}
        <circle cx={minuteCoords.x} cy={minuteCoords.y} r="6" fill={minuteColor as string} />
        
        {/* Second Planet */}
        <circle cx={secondCoords.x} cy={secondCoords.y} r="4" fill={secondColor as string} style={{ transition: 'all 0.2s linear' }} />
      </svg>
    </div>
  );
};

export default OrbitalClock;