import React from 'react';
import { ClockProps } from '../types';

interface Box {
  size: number;
  colorKey: 'h' | 'm' | 'b' | 'e'; // hour, minute, both, empty
}

const FibonacciClock: React.FC<ClockProps> = ({ time, settings }) => {
  const {
    hourColor = '#FF6347',
    minuteColor = '#4682B4',
    bothColor = '#FFFFFF',
    emptyColor = '#333333',
  } = settings;

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const minuteValue = Math.floor(minutes / 5);

  const getColor = (value: number, h: number, m: number) => {
    let colorKey: 'h' | 'm' | 'b' | 'e' = 'e';
    const hourUsed = h >= value;
    const minuteUsed = m >= value;

    if (hourUsed && minuteUsed) colorKey = 'b';
    else if (hourUsed) colorKey = 'h';
    else if (minuteUsed) colorKey = 'm';

    if (hourUsed) h -= value;
    if (minuteUsed) m -= value;
    
    return { colorKey, newH: h, newM: m };
  };

  let h = hours;
  let m = minuteValue;

  const boxes: Box[] = [
    { size: 3, colorKey: 'e' },
    { size: 5, colorKey: 'e' },
    { size: 2, colorKey: 'e' },
    { size: 1, colorKey: 'e' },
    { size: 1, colorKey: 'e' },
  ];

  const values = [5, 3, 2, 1, 1];
  const finalBoxes = values.map((val, index) => {
    const result = getColor(val, h, m);
    h = result.newH;
    m = result.newM;
    return { size: val, colorKey: result.colorKey };
  });

  const colorMap: Record<string, string> = {
    h: hourColor as string,
    m: minuteColor as string,
    b: bothColor as string,
    e: emptyColor as string,
  };

  const boxStyles = finalBoxes.map(box => ({
    flex: `${box.size} ${box.size} 0px`,
    backgroundColor: colorMap[box.colorKey],
    transition: 'background-color 0.5s ease',
  }));

  return (
    <div className="w-64 h-48 md:w-96 md:h-64 flex flex-col p-1 gap-1 rounded-lg bg-black/50 select-none">
      <div className="flex-3 flex gap-1">
        <div className="flex-3 flex flex-col gap-1">
          <div className="flex-2 flex gap-1">
            <div className="flex-1 flex flex-col gap-1">
              <div style={boxStyles[3]} className="flex-1 rounded-sm"></div>
              <div style={boxStyles[4]} className="flex-1 rounded-sm"></div>
            </div>
            <div style={boxStyles[2]} className="flex-2 rounded-sm"></div>
          </div>
          <div style={boxStyles[0]} className="flex-3 rounded-sm"></div>
        </div>
        <div style={boxStyles[1]} className="flex-5 rounded-sm"></div>
      </div>
    </div>
  );
};

export default FibonacciClock;