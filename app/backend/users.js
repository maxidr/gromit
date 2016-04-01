const m = require('mithril')
const merge = require('ramda/src/merge')
const session = require('../../lib/session')

//const serverUrl = 'https://app.gromit.io/api'
const serverUrl = ''

const unwrapError = (response, xhr) => ({ type: 'service', code: xhr.status, error: response })

function addAuthorization(xhr){
  if( session() && session().token ){ xhr.setRequestHeader('Authorization', 'Bearer ' + session().token) }
}

const request = (method, path, more) => m.request(
  merge({ method: method, url: serverUrl + path,
    unwrapError: unwrapError, config: addAuthorization },
    more || {})
)

const authRequest = (method, path, more) => request(method, path, merge({ config: addAuthorization }, more))
const emailAndPassword = (user) => ({ data: { username: user.email(), password: user.password() }})

const users = {};
users.login         = (user) => request('POST', '/users/token', emailAndPassword(user))
users.register      = (user) => request('POST', '/users/signUp', emailAndPassword(user))
users.resetPassword = (user) => request('POST', '/users/reset', emailAndPassword(user))
users.fetch         = () => {
  console.log('fetch user')
  //return request('GET', '/users/current')
  const deferred = m.deferred();
  m.startComputation();
  setTimeout(function() {
    deferred.resolve({ userId: 'xx',
      createdTime: 1430245398014,
      updatedTime: 1430245398014,
      email: 'maxidr@gmail.com',
      password: null,
      ipList: null,
      originList: null,
      projectKey: 'fc66e12767a',
      usages: 13219391,
      billingDay: 1430245398014,
      exceedAllowed: false,
      plan: 'trial'
    })
    m.endComputation();
  }, 1000);
  return deferred.promise;
}

module.exports = users
