const m = require('mithril')
window.m = m

require('./css/index.css')
//require('./css/icons.css')
//var css = require('./css/app.css')
//require('./css/base.css')

// Landing page style. See: http://maps.stamen.com/

const session = require('./lib/session')

// Pages
const layout = require('./app/layout')
const login = require('./app/auth/login')
const forgotPassword = require('./app/auth/forgotPassword')
const register = require('./app/auth/register')
const dashboard = require('./app/dashboard')
const logout = require('./app/logout')
const changePlan = require('./app/changePlan')
const start = require('./app/auth/start')

const complement = require('ramda/src/complement')
const merge = require('ramda/src/merge')
const { redirect, middleware } = require('./lib/route-helpers')

require('./google-analitycs')('UA-80995199-1')

const isLogged = () => (session() || {}).token
const isNotLogged = complement(isLogged)
const trackPageView = middleware( () => {
  window.ga('set', 'page', m.route())
  window.ga('send', 'pageview') 
})


const routes = trackPageView(merge(
  redirect(isNotLogged, '/login', {
    '/change-plan': m(layout, changePlan),
    '/': m(layout, dashboard),
    '/logout': logout,
    '/subscription': { controller: () => m.route('/') }
  }),
  redirect(isLogged, '/', {
    '/login': m(layout, login),
    '/forgot-password': m(layout, forgotPassword),
    '/register': m(layout, register),
    '/start/:signupHash': m(layout, start)
  })
))

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

