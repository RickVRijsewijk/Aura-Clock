import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ClockSettings, ClockComponent } from '../types';
import { CLOCKS } from '../constants';

// Initialize default settings from the CLOCKS constant
const initialSettings: { [key: string]: ClockSettings } = {};
CLOCKS.forEach((clock: ClockComponent) => {
  initialSettings[clock.name] = {};
  clock.customizationOptions.forEach(option => {
    initialSettings[clock.name][option.id] = option.defaultValue;
  });
});

interface CustomizationContextType {
  settings: { [key: string]: ClockSettings };
  updateSetting: (clockName: string, settingId: string, value: string | boolean) => void;
  resetSettings: (clockName: string) => void;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export const CustomizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState(initialSettings);

  const updateSetting = useCallback((clockName: string, settingId: string, value: string | boolean) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [clockName]: {
        ...prevSettings[clockName],
        [settingId]: value,
      },
    }));
  }, []);
  
  const resetSettings = useCallback((clockName: string) => {
    const clockToReset = CLOCKS.find(c => c.name === clockName);
    if (!clockToReset) return;

    const defaultSettings: ClockSettings = {};
    clockToReset.customizationOptions.forEach(option => {
      defaultSettings[option.id] = option.defaultValue;
    });

    setSettings(prevSettings => ({
      ...prevSettings,
      [clockName]: defaultSettings,
    }));
  }, []);

  return (
    <CustomizationContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};