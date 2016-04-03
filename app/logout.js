const m = require('mithril')
const user = require('./backend/users')
const session = require('../lib/session')

const cleanSession = () => session(null)
const redirectToHome = () => m.route('/')
const logError = function(error){
  console.log('Fail when try to logout (' + error + ')')
}

const logout = {};
logout.controller = () => user.logout()
  .then(cleanSession, logError)
  .then(redirectToHome, logError)
logout.view = () => {}

module.exports = logout
