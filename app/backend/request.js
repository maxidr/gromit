const m = require('mithril')
const session = require('../../lib/session')
const merge = require('ramda/src/merge')

const serverUrl = 'https://app.gromit.io'

const unwrapError = (response, xhr) => ({ type: 'service', code: xhr.status, error: response })

function addAuthorization(xhr){
  if( session() && session().token ){ xhr.setRequestHeader('Authorization', 'Bearer ' + session().token) }
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
  merge({ method: method, url: serverUrl + path,
    unwrapError: unwrapError, config: addAuthorization },
    more || {})
)