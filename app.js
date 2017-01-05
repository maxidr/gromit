const m = require('mithril')
window.m = m

require('./css/index.css')
//require('./css/icons.css')
//var css = require('./css/app.css')
//require('./css/base.css')

// Landing page style. See: http://maps.stamen.com/
require('./app/tile.stamen')

import session from './lib/session'

import layout from './app/layout'
import login from './app/auth/login'
import forgotPassword from './app/auth/forgotPassword'
import register from './app/auth/register'
import dashboard from './app/dashboard'
import logout from './app/logout'
import changePlan from './app/changePlan'
const start = require('./app/auth/start')

const complement = require('ramda/src/complement')
const merge = require('ramda/src/merge')

const isLogged = () => (session() || {}).token
const isNotLogged = complement(isLogged)
const emptyView = { view: () => '' }


const redirect = require('./lib/route-helpers').redirect
const routes = merge(
  redirect(isNotLogged, '/login', {
    '/change-plan': m(layout, changePlan),
    '/': m(layout, dashboard),
    '/logout': logout,
    '/subscription': { controller: () => m.route('/') }
  }),
  redirect(isLogged, '/', {
    '/login': login,
    '/forgot-password': forgotPassword,
    '/register': register,
    '/start/:signupHash': start
  })
  // TODO: add -> https://app.gromit.io/#/start/{signup-token}
  // With this, call to API (delay 10 or 15 seconds, so show an spinner)
  // GET https://app.gromit.io/users/signUp?c=863C45E3B89F8172B961F28460EC7A2833CBC86A76B53F8F123D419172EA8EAB004A495C451B6517C8379C9A015A46832AD86C1BFF37C1C0F86C201FBB428517
  // <- return token (the same of POST /users/token)
)

m.route.mode = "hash";
m.route(document.querySelector('#container'), '/', routes)

function hideLandingPageLayout(){
  [ document.getElementById('main'),
    document.getElementById('map-container') ].forEach(
      (el) => el.style.display = 'none'
  )
}

function showLandingPageLayout(){
  [ document.getElementById('main'),
    document.getElementById('map-container') ].forEach((el) => el.style.display = '' )
}

require('autotrack')
require('autotrack/lib/plugins/clean-url-tracker')
require('autotrack/lib/plugins/url-change-tracker')