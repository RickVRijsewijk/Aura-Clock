import React from 'react';
import { ClockComponent, CustomizationOption } from '../types';
import { useCustomization } from '../context/CustomizationContext';
import { CloseIcon } from './icons';

interface CustomizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  clock: ClockComponent;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ isOpen, onClose, clock }) => {
  const { settings, updateSetting, resetSettings } = useCustomization();
  const currentSettings = settings[clock.name] || {};

  const handleSettingChange = (id: string, value: string | boolean) => {
    updateSetting(clock.name, id, value);
  };

  const renderOption = (option: CustomizationOption) => {
    const value = currentSettings[option.id] ?? option.defaultValue;

    switch (option.type) {
      case 'color':
        return (
          <div className="flex items-center justify-between">
            <label htmlFor={option.id} className="text-gray-300">{option.label}</label>
            <input
              type="color"
              id={option.id}
              value={value as string}
              onChange={(e) => handleSettingChange(option.id, e.target.value)}
              className="w-10 h-10 p-1 bg-gray-700 border border-gray-600 rounded-md cursor-pointer"
            />
          </div>
        );
      case 'toggle':
        return (
          <div className="flex items-center justify-between">
            <label htmlFor={option.id} className="text-gray-300">{option.label}</label>
            <button
              id={option.id}
              onClick={() => handleSettingChange(option.id, !value)}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${value ? 'bg-cyan-500' : 'bg-gray-600'}`}
            >
              <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        );
      case 'select':
        return (
          <div className="flex items-center justify-between">
            <label htmlFor={option.id} className="text-gray-300">{option.label}</label>
            <select
              id={option.id}
              value={value as string}
              onChange={(e) => handleSettingChange(option.id, e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500"
            >
              {option.options?.map((opt: { value: string, label: string }) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-gray-900/80 backdrop-blur-md shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col h-full">
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white font-orbitron">{clock.name} Settings</h2>
                <button
                    onClick={onClose}
                    className="p-2 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white focus:outline-none"
                    aria-label="Close settings"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
        <div className="flex-grow px-6 space-y-6 overflow-y-auto">
          {clock.customizationOptions.map(option => (
            <div key={option.id}>
              {renderOption(option)}
            </div>
          ))}
        </div>
        <div className="p-6 mt-auto">
            <button
                onClick={() => resetSettings(clock.name)}
                className="w-full px-4 py-2 font-bold text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white transition-colors"
            >
                Reset to Default
            </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;