import { ClockComponent } from './types';
import DigitalClock from './components/DigitalClock';
import AnalogClock from './components/AnalogClock';
import WordClock from './components/WordClock';
import BinaryClock from './components/BinaryClock';
import FlipClock from './components/FlipClock';
import SundialClock from './components/SundialClock';
import MorseCodeClock from './components/MorseCodeClock';
import NixieClock from './components/NixieClock';
import AbstractClock from './components/AbstractClock';
import SegmentClock from './components/SegmentClock';
import RomanClock from './components/RomanClock';

export const CLOCKS: ClockComponent[] = [
  {
    name: 'Digital',
    component: DigitalClock,
    customizationOptions: [
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#FFFFFF' },
      { id: 'font', label: 'Font', type: 'select', defaultValue: 'Orbitron, sans-serif', options: [
        { value: 'Orbitron, sans-serif', label: 'Orbitron' },
        { value: 'Roboto Mono, monospace', label: 'Roboto Mono' },
        { value: 'Cutive Mono, monospace', label: 'Cutive Mono' },
      ]},
      { id: 'showSeconds', label: 'Show Seconds', type: 'toggle', defaultValue: true },
      { id: 'showDate', label: 'Show Date', type: 'toggle', defaultValue: true },
    ],
  },
  {
    name: 'Analog',
    component: AnalogClock,
    customizationOptions: [
      { id: 'handColor', label: 'Hand Color', type: 'color', defaultValue: '#FFFFFF' },
      { id: 'secondHandColor', label: 'Second Hand Color', type: 'color', defaultValue: '#FF0000' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#888888' },
      { id: 'showMarkings', label: 'Show Markings', type: 'toggle', defaultValue: true },
    ],
  },
  {
    name: 'Roman',
    component: RomanClock,
    customizationOptions: [
      { id: 'handColor', label: 'Hand Color', type: 'color', defaultValue: '#d1d5db' },
      { id: 'secondHandColor', label: 'Second Hand Color', type: 'color', defaultValue: '#f87171' },
      { id: 'faceColor', label: 'Face Color', type: 'color', defaultValue: '#1f2937' },
      { id: 'numeralColor', label: 'Numeral Color', type: 'color', defaultValue: '#d1d5db' },
    ],
  },
  {
    name: 'Segment',
    component: SegmentClock,
    customizationOptions: [
        { id: 'onColor', label: 'Segment On Color', type: 'color', defaultValue: '#ef4444' },
        { id: 'offColor', label: 'Segment Off Color', type: 'color', defaultValue: '#ef444420' },
        { id: 'glowColor', label: 'Glow Color', type: 'color', defaultValue: '#ef4444' },
    ],
  },
  {
    name: 'Nixie',
    component: NixieClock,
    customizationOptions: [
      { id: 'digitColor', label: 'Digit Color', type: 'color', defaultValue: '#ff8a00' },
      { id: 'glowColor', label: 'Glow Color', type: 'color', defaultValue: '#ff8a00' },
      { id: 'showGlassEffect', label: 'Glass Effect', type: 'toggle', defaultValue: true },
    ],
  },
  {
    name: 'Abstract',
    component: AbstractClock,
    customizationOptions: [
      { id: 'hourColor', label: 'Hour Color', type: 'color', defaultValue: '#d032f0' },
      { id: 'minuteColor', label: 'Minute Color', type: 'color', defaultValue: '#77e609' },
      { id: 'secondColor', label: 'Second Color', type: 'color', defaultValue: '#00c4e2' },
      { id: 'trackColor', label: 'Track Color', type: 'color', defaultValue: '#222222' },
    ],
  },
  {
    name: 'Flip',
    component: FlipClock,
    customizationOptions: [
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#FFFFFF' },
      { id: 'backgroundColor', label: 'Panel Color', type: 'color', defaultValue: '#1f2937' },
    ],
  },
  {
    name: 'Word',
    component: WordClock,
    customizationOptions: [
      { id: 'activeColor', label: 'Active Color', type: 'color', defaultValue: '#FFFFFF' },
      { id: 'inactiveColor', label: 'Inactive Color', type: 'color', defaultValue: '#374151' },
    ],
  },
  {
    name: 'Binary',
    component: BinaryClock,
    customizationOptions: [
      { id: 'onColor', label: 'On Color', type: 'color', defaultValue: '#06b6d4' },
      { id: 'offColor', label: 'Off Color', type: 'color', defaultValue: '#1f2937' },
    ],
  },
  {
    name: 'Sundial',
    component: SundialClock,
    customizationOptions: [
       { id: 'dialColor', label: 'Dial Color', type: 'color', defaultValue: '#A0A0A0' },
       { id: 'gnomonColor', label: 'Gnomon Color', type: 'color', defaultValue: '#333333' },
    ],
  },
  {
    name: 'Morse',
    component: MorseCodeClock,
    customizationOptions: [
       { id: 'dotColor', label: 'Pulse Color', type: 'color', defaultValue: '#FFFF00' },
       { id: 'showHint', label: 'Show Hint', type: 'toggle', defaultValue: true },
    ],
  },
];
