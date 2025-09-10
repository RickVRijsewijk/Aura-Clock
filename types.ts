import React from 'react';

export type CustomizationOptionType = 'color' | 'toggle' | 'select';

export interface CustomizationOption {
  id: string;
  label: string;
  type: CustomizationOptionType;
  defaultValue: string | boolean;
  options?: { value: string; label: string }[];
}

export interface ClockSettings {
  [key: string]: string | boolean;
}

export interface ClockProps {
  time: Date;
  settings: ClockSettings;
}

export interface ClockComponent {
  name: string;
  component: React.FC<ClockProps>;
  customizationOptions: CustomizationOption[];
}
