const m = require('mithril')

const serverUrl = 'http://localhost'

function unwrapError(response, xhr){
  console.log('unwrapError')
  return { type: 'service', code: xhr.status, error: response }
}

const users = {};

users.login = (user) => m.request({
  method: 'POST',
  url: serverUrl + '/users/token',
  data: { email: user.email(), password: user.password() },
  unwrapError: unwrapError
})

users.register = (user) => m.request({
  method: 'POST', url: serverUrl + '/users/signUp',
  data: { email: user.email(), password: user.password() },
  unwrapError: unwrapError
})


users.resetPassword = (user) => m.request({
  method: 'POST', url: serverUrl + '/users/reset',
  data: { email: user.email(), password: user.password() },
  unwrapError: unwrapError
})

module.exports = users
