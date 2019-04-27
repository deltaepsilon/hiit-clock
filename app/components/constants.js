export default {
  ALGOLIA: {
    INDICES: {
      TIMERS: 'hiit-clock-prod-2019:timers',
    },
  },
  COLORS: {
    PRIMARY: '#011627',
    WORK: ['#f00081', '#ff5400', '#ffbd00', '#109648', '#1d4e89', '#d15eff'],
    REST: ['rgba(255, 255, 255, .2)'],
    HIGHLIGHT: '#df2935',
    BUTTON_ON_WHITE: '#3d3b3c',
    PROGRESS_BAR: 'rgba(0, 0, 0, 0.4)'
  },
  DIMENSIONS: {
    CYCLE_PROGRESS: {
      INSET_X: 16,
      INSET_Y: 8,
      INSET_PROGRESS: 16,
    },
  },
  LOCALSTORAGE: {
    PROFILE: 'profile',
    SETTINGS: 'settings',
    URL_HISTORY: 'urlHistory',
    TIMERS: 'timers',
    TIMER_STATE: 'timer-state',
  },
  PATHS: {
    ACCOUNT_CIRCLE: '/static/images/material-design-icons/account-circle-512px.png',
  },
  PERIOD_TYPES: {
    WORK: 'work',
    REST: 'rest',
  },
  PLAY_STATES: {
    PLAYING: 'playing',
    PAUSED: 'paused',
    STOPPED: 'stopped',
  },
  ROUTES: {
    BROWSE: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    SETTINGS: '/settings',
    TIMER: '/timer',
  },
  SECONDS_TO_SKIP: 10,
  TITLES: {
    '/': 'HiiT Clock',
    '/login/': 'Login',
    '/dashboard': 'HiiT Clock',
    '/settings': 'settings',
  },
};
