export const iconSizes = {
  small: 16,
  medium: 24,
  large: 32,
  iconStyle: 'solid',
} as const;

export const icons = {
  // Exercise category icons
  pushDay: 'dumbbell',
  pullDay: 'running',
  legsDay: 'walking',

  // Navigation icons
  home: 'house',
  workout: 'stopwatch',
  progress: 'line-chart',
  profile: 'user',

  // Action icons
  add: 'plus',
  edit: 'pencil-square-o',
  delete: 'trash',
  save: 'floppy-o',
  settings: 'cog',

  // Exercise tracking icons
  weight: 'balance-scale',
  reps: 'list-ol',
  timer: 'clock-o',
  notes: 'sticky-note-o',
  alternatives: 'random',

  // Performance icons
  intensity: 'fire',
  volume: 'bar-chart',
  progression: 'trend-up',
  recovery: 'heartbeat',
} as const;

export type AppIcons = typeof icons;
