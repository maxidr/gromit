const m = require('mithril')
//require('./index.css')
import login from './app/login.js'
import forgotPassword from './app/forgotPassword.js'
import register from './app/register.js'
import dashboard from './app/dashboard.js'

m.route.mode = "hash";
m.route(document.querySelector('#app-container'), '/', {
  '/': { view: view },
  '/login': login,
  '/forgot-password': forgotPassword,
  '/register': register,
  '/dashboard': dashboard
})

function view(){ return '' }

require('./mock/api');
