import React from 'react';
import { ClockComponent } from '../types';
import { CloseIcon } from './icons';

interface ClockSelectionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectClock: (index: number) => void;
  clocks: ClockComponent[];
  currentIndex: number;
}

const ClockSelectionMenu: React.FC<ClockSelectionMenuProps> = ({ isOpen, onClose, onSelectClock, clocks, currentIndex }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex flex-col items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-3xl font-bold text-white font-orbitron">Choose a Clock</h2>
            <button
                onClick={onClose}
                className="p-2 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white focus:outline-none"
                aria-label="Close menu"
            >
                <CloseIcon className="w-8 h-8" />
            </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-h-[70vh] overflow-y-auto p-2">
            {clocks.map((clock, index) => (
                <button
                    key={clock.name}
                    onClick={() => onSelectClock(index)}
                    className={`aspect-video flex items-center justify-center p-4 rounded-lg border-2 transition-all duration-200
                        ${currentIndex === index ? 'border-cyan-400 bg-cyan-900/50' : 'border-gray-700 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50'}`
                    }
                >
                    <span className="text-white font-mono text-lg md:text-xl text-center">{clock.name}</span>
                </button>
            ))}
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ClockSelectionMenu;
