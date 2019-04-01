export default {
  ROUTES: {
    BROWSE: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    SETTINGS: '/settings',
    TIMER: '/timer',
  },
  PATHS: {
    ACCOUNT_CIRCLE: '/static/images/material-design-icons/account-circle-512px.png',
  },
  TITLES: {
    '/': 'HiiT Clock',
    '/login/': 'Login',
    '/dashboard': 'HiiT Clock',
    '/settings': 'settings',
  },
  LOCALSTORAGE: {
    PROFILE: 'profile',
    SETTINGS: 'settings',
    URL_HISTORY: 'urlHistory',
    TIMERS: 'timers',
  },
  COLORS: {
    PRIMARY: '#011627',
  },
  ALGOLIA: {
    INDICES: {
      TIMERS: 'hiit-clock-prod-2019:timers',
    },
  },
};