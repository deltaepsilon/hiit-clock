export default {
  ALGOLIA: {
    INDICES: {
      TIMERS: 'hiit-clock-prod-2019:timers',
    },
    DB_INDICES: {
      TIMERS: 'timers',
    },
  },
  CHROMECAST: {
    APPLICATIONS: {
      'local.chrisesplin.com': 'A6AF8FB4',
      'localhost:3000': 'A6AF8FB4',
      'v2.hiitclock.com': 'CDBF9AE6',
      'www.hiitclock.com': 'CED65B6F',
    },
    NAMESPACE: 'urn:x-cast:com.hiitclock.namespace',
  },
  COLORS: {
    PRIMARY: '#011627',
    PRIMARY_LIGHT: '#2a3c4f',
    ENABLED_LIGHT: '#ffffff',
    DISABLED_LIGHT: '#666666',
    WARNING: '#a5000f',
    PREPARE: ['#333333'],
    WORK: ['#ff5400', '#f00081', '#ffbd00', '#109648', '#1d4e89', '#d15eff'],
    REST: ['#4f4f4f'],
    HIGHLIGHT: '#df2935',
    BUTTON_ON_WHITE: '#3d3b3c',
    PROGRESS_BAR: 'rgba(0, 0, 0, 0.75)',
  },
  DIMENSIONS: {
    CYCLE_PROGRESS: {
      INSET_X: 0,
      INSET_Y: 8,
      INSET_PROGRESS: 25,
    },
    PREVIEW_IMAGE: {
      MAX_HEIGHT: 600,
      MAX_WIDTH: 600,
    },
  },
  LOCALSTORAGE: {
    ADVERTISEMENT: 'advertisement',
    PROFILE: 'profile',
    SETTINGS: 'settings',
    TIMERS: 'timers',
    TIMER_FORM: 'timer-form',
    TIMER_STATE: 'timer-state',
    URL_HISTORY: 'url-history',
  },
  PATHS: {
    ACCOUNT_CIRCLE: '/images/material-design-icons/account-circle-512px.png',
  },
  PERIOD_TYPES: {
    PREPARE: 'prepare',
    WORK: 'work',
    REST: 'rest',
  },
  PLAY_STATES: {
    PLAYING: 'playing',
    PAUSED: 'paused',
    STOPPED: 'stopped',
  },
  PREPARE_PERIOD: {
    id: 'prepare',
    name: 'Prepare',
    totalSeconds: 10,
    type: 'prepare',
  },
  ROUTES: {
    LANDING: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    SETTINGS: '/settings',
    SUPPORT: '/support',
    TIMER: {
      CHROMECAST: '/timer/chromecast',
      CREATE: '/timer/create',
      DETAIL: '/timer',
      EDIT: '/timer/edit',
      PLAY: '/timer/play',
      SHARED: '/timer/shared',
    },
    BROWSE: {
      CROSSFIT: '/browse/crossfit',
      CUSTOM: '/browse/custom',
      POWERLIFTING: '/browse/powerlifting',
      STRONGLIFTS: '/browse/stronglifts',
      TABATA: '/browse/tabata',
    },
  },
  SHARED_USER: 'shared-user',
  SOUNDS: [
    { src: '/sounds/double-chime.mp3', name: 'Chime' },
    { src: '/sounds/heartbeat.mp3', name: 'Heartbeat' },
    { src: '/sounds/reverb-chime.mp3', name: 'Reverb' },
  ],
  TEXT: {
    REST: 'Rest',
    WORK: 'Work',
  },
  TIMES: {
    SECONDS_TO_SKIP: 10,
    MILLIS_TO_POLL: 100,
    REMAINDER_SECONDS_TO_ALERT: 1,
    FLASH_SECONDS: 3,
  },
  TITLES: {
    '/': 'HIIT Clock',
    '/login': 'Login',
    '/dashboard': 'HIIT Clock',
    '/settings': 'settings',
    '/timer/create': 'Create Timer',
    '/timer/edit': 'Edit Timer',
  },
  TOUCH_EVENTS: {
    LONG_PRESS_MILLIS: 300,
    SWIPE_THRESHOLD_PX: 100,
  },
};
