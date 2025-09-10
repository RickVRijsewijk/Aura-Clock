import React from 'react';
import { ClockProps } from '../types';

interface RingProps {
  radius: number;
  stroke: number;
  color: string;
  trackColor: string;
  progress: number;
}

const Ring: React.FC<RingProps> = ({ radius, stroke, color, trackColor, progress }) => {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <>
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="transparent"
        stroke={trackColor}
        strokeWidth={stroke}
      />
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="transparent"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 100 100)"
        style={{ transition: 'stroke-dashoffset 0.3s linear' }}
      />
    </>
  );
};

const AbstractClock: React.FC<ClockProps> = ({ time, settings }) => {
  const {
    hourColor = '#d032f0',
    minuteColor = '#77e609',
    secondColor = '#00c4e2',
    trackColor = '#222222',
  } = settings;

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourProgress = ((hours % 12) / 12) + (minutes / 60 / 12);
  const minuteProgress = (minutes / 60) + (seconds / 60 / 60);
  const secondProgress = seconds / 60;

  return (
    <div className="aspect-square w-64 md:w-80 lg:w-96">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <Ring radius={80} stroke={12} color={hourColor as string} trackColor={trackColor as string} progress={hourProgress} />
            <Ring radius={62} stroke={12} color={minuteColor as string} trackColor={trackColor as string} progress={minuteProgress} />
            <Ring radius={44} stroke={12} color={secondColor as string} trackColor={trackColor as string} progress={secondProgress} />
        </svg>
    </div>
  );
};

export default AbstractClock;