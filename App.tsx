import React, { useState, useCallback } from 'react';
import { useTime } from './hooks/useTime';
import { CLOCKS } from './constants';
import { CustomizationProvider, useCustomization } from './context/CustomizationContext';
import CustomizationPanel from './components/CustomizationPanel';
import ClockSelectionMenu from './components/ClockSelectionMenu';
import { ChevronLeftIcon, ChevronRightIcon, SettingsIcon, GridIcon } from './components/icons';

const AppContent: React.FC = () => {
  const [clockIndex, setClockIndex] = useState(0);
  const time = useTime();
  const [showControls, setShowControls] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useCustomization();
  
  const currentClockInfo = CLOCKS[clockIndex];
  const CurrentClock = currentClockInfo.component;
  const currentClockSettings = settings[currentClockInfo.name] || {};

  const nextClock = useCallback(() => {
    setClockIndex((prevIndex) => (prevIndex + 1) % CLOCKS.length);
  }, []);

  const prevClock = useCallback(() => {
    setClockIndex((prevIndex) => (prevIndex - 1 + CLOCKS.length) % CLOCKS.length);
  }, []);
  
  const handleSelectClock = useCallback((index: number) => {
    setClockIndex(index);
    setIsMenuOpen(false);
  }, []);


  return (
    <main 
      className="bg-black w-screen h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-500"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={() => isPanelOpen && setIsPanelOpen(false)}
    >
        {/* Navigation & Settings Controls */}
        <div className={`control-transition absolute top-0 right-0 left-0 flex items-center justify-center p-4 z-20 ${showControls || isPanelOpen || isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
          <div className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-full backdrop-blur-sm">
            <button
                onClick={prevClock}
                className="p-3 text-white rounded-full hover:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                aria-label="Previous clock"
            >
                <ChevronLeftIcon className="w-6 h-6"/>
            </button>
             <button
                onClick={() => setIsMenuOpen(true)}
                className="p-3 text-white rounded-full hover:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                aria-label="Select clock"
            >
                <GridIcon className="w-6 h-6"/>
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); setIsPanelOpen(true); }}
                className="p-3 text-white rounded-full hover:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                aria-label="Customize clock"
            >
                <SettingsIcon className="w-6 h-6"/>
            </button>
            <button
                onClick={nextClock}
                className="p-3 text-white rounded-full hover:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                aria-label="Next clock"
            >
                <ChevronRightIcon className="w-6 h-6"/>
            </button>
          </div>
        </div>

      {/* Clock Display Wrapper */}
      <div className={`transition-all duration-300 ${isMenuOpen || isPanelOpen ? 'blur-md scale-95' : 'blur-none scale-100'}`}>
        <div key={clockIndex} className="animate-[clock-bounce-enter_0.5s_forwards]">
          <CurrentClock time={time} settings={currentClockSettings} />
        </div>

        {/* Clock Name Display */}
        <div className={`control-transition absolute bottom-5 left-1/2 -translate-x-1/2 ${showControls && !isPanelOpen && !isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
            <div className="text-gray-400 text-lg font-mono bg-gray-900/50 px-4 py-2 rounded-lg">
              {currentClockInfo.name}
            </div>
        </div>
      </div>

      <ClockSelectionMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        clocks={CLOCKS}
        currentIndex={clockIndex}
        onSelectClock={handleSelectClock}
      />

      <CustomizationPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        clock={currentClockInfo}
      />
      
      <style>{`
        .control-transition {
          transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes clock-bounce-enter {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(15px);
          }
          80% {
            opacity: 1;
            transform: scale(1.02) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>

    </main>
  );
};


const App: React.FC = () => (
  <CustomizationProvider>
    <AppContent />
  </CustomizationProvider>
);


export default App;