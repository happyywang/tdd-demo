// Layout Constants
export const LAYOUT = {
  SLIDE_MIN_HEIGHT: 'calc(100vh - 200px)',
  CODE_BLOCK_MIN_HEIGHT: '600px',
  CODE_BLOCK_MAX_HEIGHT: '700px',
  NAVIGATION_HEIGHT: '200px',
  HEADER_PADDING_TOP: '12px',
  BOTTOM_PADDING: '24px'
} as const;

// TDD Statistics
export const TDD_STATS = {
  DEVELOPMENT_TIME_INCREASE: '15-35%',
  DEFECT_REDUCTION: '40-91%',
  QUALITY_IMPROVEMENT: '76%',
  CODE_COVERAGE_INCREASE: '10%',
  MAINTENANCE_COST_REDUCTION: '37%'
} as const;

// Animation Timings
export const ANIMATIONS = {
  PING_PONG_INTERVAL: 3000,
  BALL_TRANSITION_DURATION: 2000,
  SLIDE_TRANSITION: '300ms',
  BOUNCE_DURATION: '2s'
} as const;

// Design System - Color Scheme
export const COLORS = {
  // Semantic Colors
  PRIMARY: {
    50: 'bg-blue-50',
    100: 'bg-blue-100',
    500: 'bg-blue-500',
    600: 'bg-blue-600',
    700: 'bg-blue-700',
    900: 'bg-blue-900'
  },
  SECONDARY: {
    500: 'bg-purple-500',
    600: 'bg-purple-600',
    700: 'bg-purple-700'
  },
  SUCCESS: {
    500: 'bg-green-500',
    600: 'bg-green-600',
    700: 'bg-green-700',
    900: 'bg-green-900'
  },
  WARNING: {
    500: 'bg-yellow-500',
    600: 'bg-yellow-600'
  },
  ERROR: {
    500: 'bg-red-500',
    600: 'bg-red-600',
    700: 'bg-red-700',
    900: 'bg-red-900'
  },
  
  // TDD Phase Colors (semantic mapping)
  PHASES: {
    THINK: 'bg-purple-500',
    RED: 'bg-red-500',
    GREEN: 'bg-green-500',
    REFACTOR: 'bg-blue-500'
  },
  
  // Text Colors
  TEXT: {
    PRIMARY: 'text-white',
    SECONDARY: 'text-gray-300',
    MUTED: 'text-gray-500',
    SUCCESS: 'text-green-300',
    ERROR: 'text-red-300',
    WARNING: 'text-yellow-200'
  },
  
  // Background Colors
  BACKGROUNDS: {
    PRIMARY: 'bg-gray-900',
    SECONDARY: 'bg-gray-800',
    CARD: 'bg-gray-800',
    CODE: 'bg-black',
    NAVIGATION: 'bg-yellow-500',
    OVERLAY: 'bg-black bg-opacity-80'
  },
  
  // Border Colors
  BORDERS: {
    DEFAULT: 'border-gray-600',
    SUCCESS: 'border-green-400',
    ERROR: 'border-red-400',
    WARNING: 'border-yellow-400'
  },
  
  // Gradients
  GRADIENTS: {
    PRIMARY: 'from-red-400 via-green-400 to-blue-400',
    PURPLE_BLUE: 'from-purple-600 to-blue-600',
    GREEN_BLUE: 'from-green-400 to-blue-400',
    DARK: 'from-gray-900 to-gray-800'
  }
} as const;

// Typography Scale
export const TYPOGRAPHY = {
  SIZES: {
    XS: 'text-xs',      // 12px
    SM: 'text-sm',      // 14px  
    BASE: 'text-base',  // 16px
    LG: 'text-lg',      // 18px
    XL: 'text-xl',      // 20px
    '2XL': 'text-2xl',  // 24px
    '3XL': 'text-3xl',  // 30px
    '4XL': 'text-4xl',  // 36px
    '5XL': 'text-5xl'   // 48px
  },
  WEIGHTS: {
    NORMAL: 'font-normal',
    MEDIUM: 'font-medium', 
    SEMIBOLD: 'font-semibold',
    BOLD: 'font-bold',
    BLACK: 'font-black'
  },
  LEADING: {
    TIGHT: 'leading-tight',
    NORMAL: 'leading-normal',
    RELAXED: 'leading-relaxed'
  }
} as const;

// Spacing Scale
export const SPACING = {
  // Padding
  PADDING: {
    XS: 'p-1',    // 4px
    SM: 'p-2',    // 8px
    MD: 'p-4',    // 16px
    LG: 'p-6',    // 24px
    XL: 'p-8',    // 32px
    '2XL': 'p-12' // 48px
  },
  PADDING_X: {
    SM: 'px-2',
    MD: 'px-4', 
    LG: 'px-6',
    XL: 'px-8'
  },
  PADDING_Y: {
    SM: 'py-1',
    MD: 'py-2',
    LG: 'py-3',
    XL: 'py-4'
  },
  // Margins
  MARGIN: {
    XS: 'm-1',
    SM: 'm-2',
    MD: 'm-4',
    LG: 'm-6',
    XL: 'm-8'
  },
  MARGIN_B: {
    SM: 'mb-2',
    MD: 'mb-4',
    LG: 'mb-6',
    XL: 'mb-8'
  },
  // Gaps
  GAP: {
    SM: 'gap-2',
    MD: 'gap-4',
    LG: 'gap-6',
    XL: 'gap-8'
  }
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: 'sm',   // 640px
  MD: 'md',   // 768px  
  LG: 'lg',   // 1024px
  XL: 'xl',   // 1280px
  '2XL': '2xl' // 1536px
} as const;

// UI Components
export const UI_COMPONENTS = {
  BUTTONS: {
    PRIMARY: 'bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200',
    SECONDARY: 'bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200',
    SUCCESS: 'bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200',
    WARNING: 'bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200',
    ERROR: 'bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200',
    GHOST: 'bg-transparent hover:bg-gray-700 text-gray-300 hover:text-white font-medium px-6 py-3 rounded-lg transition-all duration-200',
    ICON: 'w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-200',
    NAVIGATION: 'px-4 py-2 rounded-lg font-bold transition-all duration-200'
  },
  CARDS: {
    DEFAULT: 'bg-gray-800 rounded-xl p-6 shadow-lg',
    ELEVATED: 'bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700',
    FLAT: 'bg-gray-800 rounded-lg p-4'
  },
  BADGES: {
    DEFAULT: 'px-3 py-1 rounded-full text-sm font-medium',
    LARGE: 'px-4 py-2 rounded-full text-base font-medium',
    SMALL: 'px-2 py-1 rounded-full text-xs font-medium'
  },
  CODE_BLOCKS: {
    DEFAULT: 'bg-black p-4 rounded-lg overflow-auto font-mono text-sm',
    LARGE: 'bg-black p-6 rounded-lg overflow-auto font-mono text-base',
    INLINE: 'bg-gray-700 px-2 py-1 rounded text-sm font-mono'
  }
} as const;

// Text Content
export const CONTENT = {
  NAVIGATION: {
    PREVIOUS: '← Previous',
    NEXT: '→ Next',
    PRESS_ARROW_TO_START: 'Press → to start or use navigation below'
  },
  TDD_PHASES: {
    RED: 'Red',
    GREEN: 'Green', 
    REFACTOR: 'Refactor',
    THINK: 'Think'
  },
  PING_PONG: {
    WRITE_FAILING_TEST: 'Write failing test',
    MAKE_TEST_PASS: 'Make the test pass',
    REFACTOR_CODE: 'Refactor code',
    FINAL_MESSAGE: 'Ping-pong Programming = Pair Programming + TDD'
  }
} as const;

// Demo Configuration
export const DEMO_CONFIG = {
  TOTAL_STEPS: 10,
  CYCLES_BEFORE_SUMMARY: 2,
  ANIMATION_CYCLES: 3
} as const;