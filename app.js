const m = require('mithril')
//require('./index.css')
var icons = require('./css/icons.css')
var css = require('./css/app.css')

// Landing page style. See: http://maps.stamen.com/
require('./app/tile.stamen')

import session from './lib/session'
import login from './app/login.js'
import forgotPassword from './app/forgotPassword.js'
import register from './app/register.js'
import dashboard from './app/dashboard.js'
import logout from './app/logout'

m.route.mode = "hash";
m.route(document.querySelector('#app-container'), '/dashboard', {
  '/': redirectIfAlreadyLogedIn({ view: view }),
  '/login': redirectIfAlreadyLogedIn(login),
  '/forgot-password': redirectIfAlreadyLogedIn(forgotPassword),
  '/register': redirectIfAlreadyLogedIn(register),
  '/dashboard': secure(dashboard),
  '/logout': secure(logout)
})

const noop = () => {}

function redirectIfAlreadyLogedIn(component){
  return {
    controller: function(){
      if( (session() || {}).token ){ return m.route('/dashboard') }
      return component.controller ? new component.controller(arguments) : null
    },
    view: component.view
  }
}

function secure(component){
  return {
    controller: function(){
      if( (session() || {}).token ){
        return new component.controller(arguments)
      }
      return m.route('/')
    },
    view: component.view
  }
}

function view(){ return '' }

//require('./mock/api');
