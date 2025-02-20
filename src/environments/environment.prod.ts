export const environment = {
  production: true,
  serviceWorker: false,
  baseHref: '/',
  language: {id: '3', name: 'English', tiny: 'en', full: 'en_US'},
  confirm: {
    email: '',
    password: ''
  },
  hosts: {
    'eforex.com': {
      mailTo: 'admin',
      apiUrl: 'https://web.eforex.com',
      pcUrl: ''
    },
    default: {
      mailTo: 'admin',
      apiUrl: 'https://api.boston-unisoft.com',
      pcUrl: ''
    }
  }
};
