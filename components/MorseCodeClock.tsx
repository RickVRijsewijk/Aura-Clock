import React, { useState, useEffect } from 'react';
import { ClockProps } from '../types';

const MORSE_MAP: { [key: string]: string } = {
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
};

const padZero = (num: number) => num.toString().padStart(2, '0');

const MorseCodeClock: React.FC<ClockProps> = ({ time, settings }) => {
  const { dotColor = '#FFFF00', showHint = true } = settings;

  const [morseString, setMorseString] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDigitIndex, setCurrentDigitIndex] = useState(0);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const h = padZero(time.getHours());
    const m = padZero(time.getMinutes());
    const s = padZero(time.getSeconds());
    setMorseString(`${h}${m}${s}`);
    setCurrentIndex(0);
    setCurrentDigitIndex(0);
  }, [time.getSeconds()]);

  useEffect(() => {
    if (!morseString) return;

    const currentDigit = morseString[currentDigitIndex];
    const morseCode = MORSE_MAP[currentDigit];
    
    if (!morseCode || currentIndex >= morseCode.length) {
        // Pause between digits, then move to the next
        const timeout = setTimeout(() => {
            setCurrentIndex(0);
            setCurrentDigitIndex((prev) => (prev + 1) % morseString.length);
        }, 700); // 7 units pause
        return () => clearTimeout(timeout);
    }
    
    const char = morseCode[currentIndex];
    const duration = char === '.' ? 100 : 300; // 1 unit vs 3 units

    setIsOn(true);
    const onTimeout = setTimeout(() => {
        setIsOn(false);
    }, duration);

    const offTimeout = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
    }, duration + 100); // 1 unit pause between signals

    return () => {
        clearTimeout(onTimeout);
        clearTimeout(offTimeout);
    };
    
  }, [morseString, currentIndex, currentDigitIndex]);

  const timeDigits = morseString.split('');
  const hint = showHint && morseString ? `${timeDigits[currentDigitIndex]} = ${MORSE_MAP[timeDigits[currentDigitIndex]]}` : '';

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div 
        className="w-32 h-32 md:w-40 md:h-40 rounded-full transition-all duration-100"
        style={{
          backgroundColor: isOn ? dotColor as string : '#1a1a1a',
          boxShadow: isOn ? `0 0 40px ${dotColor as string}` : 'none',
        }}
      />
      {showHint && (
        <div className="mt-8 text-center">
            <div className="font-mono text-3xl text-gray-400 tracking-widest h-10">
                {hint}
            </div>
            <div className="text-xl text-gray-600 uppercase tracking-[0.2em]">
                {['H1','H2','M1','M2','S1','S2'][currentDigitIndex]}
            </div>
        </div>
      )}
    </div>
  );
};

export default MorseCodeClock;