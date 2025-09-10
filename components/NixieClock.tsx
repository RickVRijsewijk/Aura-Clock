import React from 'react';
import { ClockProps } from '../types';

const padZero = (num: number): string => num.toString().padStart(2, '0');

const NixieDigit: React.FC<{ digit: string; digitColor: string; glowColor: string; showGlassEffect: boolean }> = 
({ digit, digitColor, glowColor, showGlassEffect }) => (
    <div className="relative flex items-center justify-center w-20 h-36 md:w-24 md:h-44">
        {showGlassEffect && 
            <div className="absolute inset-0 bg-black/10 rounded-xl border-2 border-white/10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                <div className="absolute top-4 left-4 w-4 h-4 bg-white/20 rounded-full blur-sm" />
            </div>
        }
        <span
          className="font-orbitron text-8xl md:text-9xl transition-colors duration-300"
          style={{
            color: digitColor,
            textShadow: `
              0 0 5px #fff,
              0 0 10px #fff,
              0 0 20px ${glowColor},
              0 0 30px ${glowColor},
              0 0 40px ${glowColor},
              0 0 55px ${glowColor},
              0 0 75px ${glowColor}
            `
          }}
        >
          {digit}
        </span>
    </div>
);

const NixieSeparator: React.FC = () => (
    <div className="flex items-center justify-center w-10 h-36 md:h-44">
        <span className="font-orbitron text-6xl md:text-7xl text-gray-500">:</span>
    </div>
);

const NixieClock: React.FC<ClockProps> = ({ time, settings }) => {
    const { 
        digitColor = '#ff8a00', 
        glowColor = '#ff8a00', 
        showGlassEffect = true,
    } = settings;

    const hours = padZero(time.getHours());
    const minutes = padZero(time.getMinutes());
    const seconds = padZero(time.getSeconds());

    return (
        <div className="flex items-center justify-center select-none">
            <NixieDigit digit={hours[0]} digitColor={digitColor as string} glowColor={glowColor as string} showGlassEffect={showGlassEffect as boolean} />
            <NixieDigit digit={hours[1]} digitColor={digitColor as string} glowColor={glowColor as string} showGlassEffect={showGlassEffect as boolean} />
            <NixieSeparator />
            <NixieDigit digit={minutes[0]} digitColor={digitColor as string} glowColor={glowColor as string} showGlassEffect={showGlassEffect as boolean} />
            <NixieDigit digit={minutes[1]} digitColor={digitColor as string} glowColor={glowColor as string} showGlassEffect={showGlassEffect as boolean} />
            <NixieSeparator />
            <NixieDigit digit={seconds[0]} digitColor={digitColor as string} glowColor={glowColor as string} showGlassEffect={showGlassEffect as boolean} />
            <NixieDigit digit={seconds[1]} digitColor={digitColor as string} glowColor={glowColor as string} showGlassEffect={showGlassEffect as boolean} />
        </div>
    );
};

export default NixieClock;