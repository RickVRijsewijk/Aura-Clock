import React from 'react';
import { ClockProps } from '../types';

const words = [
  ['I', 'T', 'L', 'I', 'S', 'A', 'S', 'A', 'M', 'P', 'M'],
  ['A', 'C', 'Q', 'U', 'A', 'R', 'T', 'E', 'R', 'D', 'C'],
  ['T', 'W', 'E', 'N', 'T', 'Y', 'F', 'I', 'V', 'E', 'X'],
  ['H', 'A', 'L', 'F', 'B', 'T', 'E', 'N', 'F', 'T', 'O'],
  ['P', 'A', 'S', 'T', 'E', 'R', 'U', 'N', 'I', 'N', 'E'],
  ['O', 'N', 'E', 'S', 'I', 'X', 'T', 'H', 'R', 'E', 'E'],
  ['F', 'O', 'U', 'R', 'F', 'I', 'V', 'E', 'T', 'W', 'O'],
  ['E', 'I', 'G', 'H', 'T', 'E', 'L', 'E', 'V', 'E', 'N'],
  ['S', 'E', 'V', 'E', 'N', 'T', 'W', 'E', 'L', 'V', 'E'],
  ['T', 'E', 'N', 'S', 'E', 'O', 'C', 'L', 'O', 'C', 'K'],
];

const highlights: { [key: string]: number[][] } = {
  IT: [[0, 0], [0, 1]],
  IS: [[0, 3], [0, 4]],
  A: [[0, 5]],
  QUARTER: [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8]],
  TWENTY: [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5]],
  FIVE_M: [[2, 6], [2, 7], [2, 8], [2, 9]],
  HALF: [[3, 0], [3, 1], [3, 2], [3, 3]],
  TEN_M: [[3, 5], [3, 6], [3, 7]],
  TO: [[3, 9], [3, 10]],
  PAST: [[4, 0], [4, 1], [4, 2], [4, 3]],
  ONE: [[5, 0], [5, 1], [5, 2]],
  SIX: [[5, 3], [5, 4], [5, 5]],
  THREE: [[5, 6], [5, 7], [5, 8], [5, 9], [5, 10]],
  FOUR: [[6, 0], [6, 1], [6, 2], [6, 3]],
  FIVE_H: [[6, 4], [6, 5], [6, 6], [6, 7]],
  TWO: [[6, 8], [6, 9], [6, 10]],
  EIGHT: [[7, 0], [7, 1], [7, 2], [7, 3], [7, 4]],
  ELEVEN: [[7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10]],
  SEVEN: [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4]],
  TWELVE: [[8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10]],
  NINE: [[4, 7], [4, 8], [4, 9], [4, 10]], // Corrected NINE coordinates
  TEN_H: [[9, 0], [9, 1], [9, 2]],
  OCLOCK: [[9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10]],
};

const getWordsForTime = (h: number, m: number): number[][] => {
  let hour = h;
  const minute = Math.floor(m / 5) * 5;

  let activeWords = [...highlights.IT, ...highlights.IS];

  if (minute > 30 && minute < 60) hour = (hour + 1);
  hour = hour % 12;
  if (hour === 0) hour = 12;

  const hourMap: { [key: number]: number[][] } = {
    1: highlights.ONE, 2: highlights.TWO, 3: highlights.THREE, 4: highlights.FOUR, 5: highlights.FIVE_H,
    6: highlights.SIX, 7: highlights.SEVEN, 8: highlights.EIGHT, 9: highlights.NINE, 10: highlights.TEN_H,
    11: highlights.ELEVEN, 12: highlights.TWELVE
  };

  if (minute === 5 || minute === 55) activeWords.push(...highlights.FIVE_M);
  if (minute === 10 || minute === 50) activeWords.push(...highlights.TEN_M);
  if (minute === 15 || minute === 45) activeWords.push(...highlights.A, ...highlights.QUARTER);
  if (minute === 20 || minute === 40) activeWords.push(...highlights.TWENTY);
  if (minute === 25 || minute === 35) activeWords.push(...highlights.TWENTY, ...highlights.FIVE_M);
  if (minute === 30) activeWords.push(...highlights.HALF);

  if (minute > 0 && minute <= 30) activeWords.push(...highlights.PAST);
  if (minute > 30) activeWords.push(...highlights.TO);

  activeWords.push(...hourMap[hour]);

  if (minute === 0) activeWords.push(...highlights.OCLOCK);
  
  return activeWords;
};

const WordClock: React.FC<ClockProps> = ({ time, settings }) => {
  const { activeColor = '#FFFFFF', inactiveColor = '#374151' } = settings;
  const activeCoords = getWordsForTime(time.getHours(), time.getMinutes());
  const activeSet = new Set(activeCoords.map(coord => `${coord[0]}-${coord[1]}`));

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-11 gap-1 md:gap-2 lg:gap-3 select-none">
        {words.flat().map((letter, index) => {
          const row = Math.floor(index / 11);
          const col = index % 11;
          const isActive = activeSet.has(`${row}-${col}`);
          return (
            <span
              key={index}
              className="flex items-center justify-center text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-500"
              style={{ color: isActive ? activeColor as string : inactiveColor as string }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default WordClock;
