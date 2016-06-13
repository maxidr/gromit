const m = require('mithril')

window.m = m
//require('./index.css')
var icons = require('./css/icons.css')
//var css = require('./css/app.css')
var css = require('./css/base.css')

// Landing page style. See: http://maps.stamen.com/
require('./app/tile.stamen')

import session from './lib/session'

import login from './app/auth/login'
import forgotPassword from './app/auth/forgotPassword'
import register from './app/auth/register'
import dashboard from './app/dashboard'
import logout from './app/logout'

import complement from 'ramda/src/complement'
import merge from 'ramda/src/merge'


const isLogged = () => session() && session().token
const isNotLogged = complement(isLogged)
const emptyView = { view: () => '' }

const redirect = require('./lib/route-helpers').redirect
const routes = merge(
	redirect(isNotLogged, '/login', {
		'/': dashboard,
	  '/logout': logout
	}),
	redirect(isLogged, '/', {
	  '/login': login,
	  '/forgot-password': forgotPassword,
	  '/register': register,
	})
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
