import React, { useState, useEffect, useRef } from 'react';
import { ClockProps } from '../types';

interface FlipUnitProps {
  digit: string;
  previousDigit: string;
  textColor: string;
  backgroundColor: string;
}

const FlipUnit: React.FC<FlipUnitProps> = ({ digit, previousDigit, textColor, backgroundColor }) => {
  // We use a key to force a re-render of the animation, which is simpler and more reliable than state management for this case.
  const [flipKey, setFlipKey] = useState(0);

  useEffect(() => {
    if (digit !== previousDigit) {
      setFlipKey(key => key + 1);
    }
  }, [digit, previousDigit]);

  const upperBg = backgroundColor;
  // Create a subtle shadow effect for the bottom half for depth
  const lowerBg = `color-mix(in srgb, ${backgroundColor} 90%, black)`;

  return (
    <div 
      key={flipKey}
      className="relative w-16 h-24 md:w-20 md:h-28 lg:w-24 lg:h-36 text-6xl md:text-7xl lg:text-8xl font-orbitron"
      style={{
        color: textColor,
        perspective: '400px',
      }}
    >
      {/* Static card showing the final (new) digit */}
      <div className="absolute w-full h-full">
        {/* Top half */}
        <div className="absolute top-0 left-0 w-full h-1/2 flex items-end justify-center rounded-t-lg overflow-hidden" style={{backgroundColor: upperBg}}>
          <span style={{ transform: 'translateY(50%)' }}>{digit}</span>
        </div>
        {/* Bottom half */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 flex items-start justify-center rounded-b-lg overflow-hidden" style={{backgroundColor: lowerBg}}>
          <span style={{ transform: 'translateY(-50%)' }}>{digit}</span>
        </div>
      </div>
      
      {/* The animated card that flips down */}
      <div
        className={`absolute top-0 left-0 w-full h-1/2 [transform-style:preserve-3d] z-10 animate-flip`}
        style={{ transformOrigin: 'bottom' }}
      >
        {/* Front of the animated card: Top half of PREVIOUS digit */}
        <div className="absolute w-full h-full flex items-end justify-center rounded-t-lg overflow-hidden [backface-visibility:hidden]" style={{backgroundColor: upperBg}}>
          <span style={{ transform: 'translateY(50%)' }}>{previousDigit}</span>
        </div>
        
        {/* Back of the animated card: Bottom half of NEW digit */}
        <div className="absolute w-full h-full flex items-start justify-center rounded-b-lg overflow-hidden [backface-visibility:hidden] [transform:rotateX(180deg)]" style={{backgroundColor: lowerBg}}>
          <span style={{ transform: 'translateY(-50%)' }}>{digit}</span>
        </div>
      </div>
      <style>{`
        @keyframes flip {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-180deg); }
        }
        .animate-flip {
          animation: flip 600ms cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

const usePrevious = <T,>(value: T): T => {
    const ref = useRef<T>(value);
    useEffect(() => {
      ref.current = value;
    },[value]);
    return ref.current;
  };
  
const FlipClock: React.FC<ClockProps> = ({ time, settings }) => {
  const { textColor = '#FFFFFF', backgroundColor = '#1f2937' } = settings;

  const pad = (num: number) => String(num).padStart(2, '0');
  
  const h = pad(time.getHours());
  const m = pad(time.getMinutes());
  const s = pad(time.getSeconds());
  
  const prevH = usePrevious(h);
  const prevM = usePrevious(m);
  const prevS = usePrevious(s);

  return (
    <div className="flex items-center justify-center select-none">
      <div className="flex space-x-1">
        <FlipUnit digit={h[0]} previousDigit={prevH[0]} textColor={textColor as string} backgroundColor={backgroundColor as string}/>
        <FlipUnit digit={h[1]} previousDigit={prevH[1]} textColor={textColor as string} backgroundColor={backgroundColor as string}/>
      </div>
      <div className="text-6xl md:text-7xl lg:text-8xl text-gray-500 mx-2">:</div>
      <div className="flex space-x-1">
        <FlipUnit digit={m[0]} previousDigit={prevM[0]} textColor={textColor as string} backgroundColor={backgroundColor as string}/>
        <FlipUnit digit={m[1]} previousDigit={prevM[1]} textColor={textColor as string} backgroundColor={backgroundColor as string}/>
      </div>
      <div className="text-6xl md:text-7xl lg:text-8xl text-gray-500 mx-2">:</div>
      <div className="flex space-x-1">
        <FlipUnit digit={s[0]} previousDigit={prevS[0]} textColor={textColor as string} backgroundColor={backgroundColor as string}/>
        <FlipUnit digit={s[1]} previousDigit={prevS[1]} textColor={textColor as string} backgroundColor={backgroundColor as string}/>
      </div>
    </div>
  );
};

export default FlipClock;