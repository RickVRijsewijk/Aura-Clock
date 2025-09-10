import React from 'react';
import { ClockProps } from '../types';

const padZero = (num: number): string => num.toString().padStart(2, '0');

// Map of numbers to their 7-segment display pattern
// Segments are ordered: top, top-left, top-right, middle, bottom-left, bottom-right, bottom
const SEGMENT_MAP: { [key: number]: number[] } = {
  0: [1, 1, 1, 0, 1, 1, 1],
  1: [0, 0, 1, 0, 0, 1, 0],
  2: [1, 0, 1, 1, 1, 0, 1],
  3: [1, 0, 1, 1, 0, 1, 1],
  4: [0, 1, 1, 1, 0, 1, 0],
  5: [1, 1, 0, 1, 0, 1, 1],
  6: [1, 1, 0, 1, 1, 1, 1],
  7: [1, 0, 1, 0, 0, 1, 0],
  8: [1, 1, 1, 1, 1, 1, 1],
  9: [1, 1, 1, 1, 0, 1, 1],
};

const SevenSegmentDigit: React.FC<{ digit: number; onColor: string; offColor: string }> = ({ digit, onColor, offColor }) => {
  const segments = SEGMENT_MAP[digit] || SEGMENT_MAP[0];
  const segmentStyle = (isActive: boolean) => ({
    backgroundColor: isActive ? onColor : offColor,
    transition: 'background-color 0.3s ease',
  });

  const base = "absolute rounded-sm";
  const hBar = "w-full h-3 left-0"; // Horizontal bar
  const vBar = "w-3 h-1/2";      // Vertical bar

  return (
    // Add a slight skew for a more retro, stylized look
    <div className="relative w-16 h-28 md:w-20 md:h-36 lg:w-24 lg:h-44" style={{ transform: 'skewX(-4deg)' }}>
      {/* Segments are ordered A-G clockwise from top */}
      {/* Top (A) */}
      <div className={`${base} ${hBar} top-0`} style={segmentStyle(!!segments[0])}></div>
      {/* Top-Left (F) */}
      <div className={`${base} ${vBar} top-0 left-0`} style={segmentStyle(!!segments[1])}></div>
      {/* Top-Right (B) */}
      <div className={`${base} ${vBar} top-0 right-0`} style={segmentStyle(!!segments[2])}></div>
      {/* Middle (G) */}
      <div className={`${base} ${hBar} top-1/2 -translate-y-1/2`} style={segmentStyle(!!segments[3])}></div>
      {/* Bottom-Left (E) */}
      <div className={`${base} ${vBar} bottom-0 left-0`} style={segmentStyle(!!segments[4])}></div>
      {/* Bottom-Right (C) */}
      <div className={`${base} ${vBar} bottom-0 right-0`} style={segmentStyle(!!segments[5])}></div>
      {/* Bottom (D) */}
      <div className={`${base} ${hBar} bottom-0`} style={segmentStyle(!!segments[6])}></div>
    </div>
  );
};

const Colon: React.FC<{ onColor: string }> = ({ onColor }) => (
    <div className="w-10 h-28 md:h-36 lg:h-44 flex flex-col items-center justify-center space-y-6 animate-pulse">
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: onColor }}></div>
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: onColor }}></div>
    </div>
)

const SegmentClock: React.FC<ClockProps> = ({ time, settings }) => {
  const { 
    onColor = '#ef4444', 
    offColor = '#ef444420',
    glowColor = '#ef4444'
  } = settings;

  const hours = padZero(time.getHours());
  const minutes = padZero(time.getMinutes());
  const seconds = padZero(time.getSeconds());

  return (
    <div className="flex items-center justify-center select-none" style={{ filter: `drop-shadow(0 0 15px ${glowColor as string})`}}>
      <SevenSegmentDigit digit={parseInt(hours[0])} onColor={onColor as string} offColor={offColor as string} />
      <SevenSegmentDigit digit={parseInt(hours[1])} onColor={onColor as string} offColor={offColor as string} />
      <Colon onColor={onColor as string} />
      <SevenSegmentDigit digit={parseInt(minutes[0])} onColor={onColor as string} offColor={offColor as string} />
      <SevenSegmentDigit digit={parseInt(minutes[1])} onColor={onColor as string} offColor={offColor as string} />
      <Colon onColor={onColor as string} />
      <SevenSegmentDigit digit={parseInt(seconds[0])} onColor={onColor as string} offColor={offColor as string} />
      <SevenSegmentDigit digit={parseInt(seconds[1])} onColor={onColor as string} offColor={offColor as string} />
    </div>
  );
};

export default SegmentClock;