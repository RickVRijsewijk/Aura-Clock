import React from 'react';
import { ClockProps } from '../types';

const toBinary = (num: number, bits: number): boolean[] => {
  return num.toString(2).padStart(bits, '0').split('').map(bit => bit === '1');
};

const BinaryColumn: React.FC<{ value: number; bits: number; title: string; onColor: string; offColor: string }> = ({ value, bits, title, onColor, offColor }) => {
  const binaryValue = toBinary(value, bits);
  const bitValues = Array.from({ length: bits }, (_, i) => Math.pow(2, bits - 1 - i));

  return (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="flex">
        {binaryValue.map((isOn, index) => (
          <div key={index} className="flex flex-col items-center mx-1">
            <div
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full m-1 transition-all duration-300"
              style={{
                backgroundColor: isOn ? onColor : offColor,
                boxShadow: isOn ? `0 0 15px ${onColor}` : 'none'
              }}
            ></div>
            <span className="text-gray-500 text-sm mt-1">{bitValues[index]}</span>
          </div>
        ))}
      </div>
      <div className="text-white mt-4 text-3xl md:text-4xl font-orbitron">{String(value).padStart(2, '0')}</div>
      <div className="text-gray-400 text-lg md:text-xl uppercase tracking-widest">{title}</div>
    </div>
  );
};

const BinaryClock: React.FC<ClockProps> = ({ time, settings }) => {
  const { onColor = '#06b6d4', offColor = '#1f2937' } = settings;
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <div className="flex justify-center items-center select-none">
      <BinaryColumn value={hours} bits={5} title="Hours" onColor={onColor as string} offColor={offColor as string} />
      <BinaryColumn value={minutes} bits={6} title="Minutes" onColor={onColor as string} offColor={offColor as string} />
      <BinaryColumn value={seconds} bits={6} title="Seconds" onColor={onColor as string} offColor={offColor as string} />
    </div>
  );
};

export default BinaryClock;
