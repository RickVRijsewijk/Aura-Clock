import React from 'react';
import { ClockProps } from '../types';

const ROMAN_NUMERALS = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

const RomanClock: React.FC<ClockProps> = ({ time, settings }) => {
  const {
    handColor = '#d1d5db',
    secondHandColor = '#f87171',
    faceColor = '#1f2937',
    numeralColor = '#d1d5db',
  } = settings;
  
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;

  return (
    <div 
      className="relative aspect-square w-64 md:w-80 lg:w-96 rounded-full border-4 shadow-2xl shadow-black flex items-center justify-center"
      style={{
        borderColor: handColor as string,
        backgroundColor: faceColor as string,
      }}
    >
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

      {/* Roman Numerals */}
      {ROMAN_NUMERALS.map((numeral, i) => {
        const angle = i * 30;
        return (
            <div
                key={i}
                className="absolute w-full h-full flex items-center justify-center font-serif text-2xl md:text-3xl"
                style={{
                    transform: `rotate(${angle}deg)`,
                    color: numeralColor as string,
                }}
            >
                <span style={{ transform: `translateY(-290%) rotate(-${angle}deg)` }}>
                    {numeral}
                </span>
            </div>
        )
      })}
    </div>
  );
};

export default RomanClock;
