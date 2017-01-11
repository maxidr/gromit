const m = require('mithril')
const session = require('../../lib/session')
const merge = require('ramda/src/merge')
const pipe = require('ramda/src/pipe')
const when = require('ramda/src/when')
const both = require('ramda/src/both')

const trace = function(label){
  return function(obj){
    console.log(label, obj)
    return obj
  }
}

const serverUrl = require('./serverUrl')

const unwrapError = (response, xhr) => {
  return { type: 'service', code: xhr.status, error: response }
}

const isForbidden = error => error.code === 403
const isLogged = () => (session() || {}).token

// TODO: Wrong. I use bussiness login in simple request function.  Remote to another function and compose both
const redirectOnForbidden = when(both(isForbidden, isLogged), () => { 
  session(null)
  m.route('/login')
})

function addAuthorization(xhr){
  if( session() && session().token ){ xhr.setRequestHeader('Authorization', 'bearer ' + session().token) }
}


/**
 * Function to make request into the API.
 * @param  {string} method - Must be the HTTP method (GET, POST, PUT, OPTIONS... etc)
 * @param  {string} path   - The path of the API. Not the complete URL, only the last part. (ex: /users/token)
 * @param  {Object} more   - More optiones used in m.request (@see http://mithril.js.org/mithril.request.html)
 * @return {Promise}
 *
 * @example
 * const request = require('./request')
 * request('GET', '/users/current')
 *   .then(userInfo => {
 *     console.log(`user information: ${userInfo}`)
 *   })
 * 
 */
module.exports = (method, path, more) => m.request(
  merge({ 
    method: method, url: serverUrl() + path,
    unwrapError: pipe(unwrapError, trace('Request error: '), redirectOnForbidden), 
    config: addAuthorization 
  }, more || {})
)