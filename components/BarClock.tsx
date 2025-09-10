import React from 'react';
import { ClockProps } from '../types';

const padZero = (num: number): string => num.toString().padStart(2, '0');

interface BarProps {
  label: string;
  progress: number;
  color: string;
  trackColor: string;
}

const Bar: React.FC<BarProps> = ({ label, progress, color, trackColor }) => (
  <div className="w-full">
    <div className="text-gray-400 text-lg md:text-xl mb-2 font-mono uppercase">{label}</div>
    <div className="h-6 md:h-8 rounded-full" style={{ backgroundColor: trackColor }}>
      <div
        className="h-full rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress * 100}%`, backgroundColor: color }}
      ></div>
    </div>
  </div>
);

const BarClock: React.FC<ClockProps> = ({ time, settings }) => {
  const {
    hourColor = '#ef4444',
    minuteColor = '#3b82f6',
    secondColor = '#22c55e',
    trackColor = '#374151',
    showLabels = true,
  } = settings;

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourProgress = ((hours % 12) || 12) / 12;
  const minuteProgress = minutes / 60;
  const secondProgress = seconds / 60;

  return (
    <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl flex flex-col items-center justify-center space-y-6 select-none p-4">
      {showLabels && (
        <div className="text-white font-orbitron text-5xl md:text-6xl lg:text-7xl tracking-widest">
          {padZero(hours)}:{padZero(minutes)}:{padZero(seconds)}
        </div>
      )}
      <Bar label="Hour" progress={hourProgress} color={hourColor as string} trackColor={trackColor as string} />
      <Bar label="Minute" progress={minuteProgress} color={minuteColor as string} trackColor={trackColor as string} />
      <Bar label="Second" progress={secondProgress} color={secondColor as string} trackColor={trackColor as string} />
    </div>
  );
};

export default BarClock;