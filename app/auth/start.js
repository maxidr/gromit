const m = require('mithril')
const spinner = require('../ui/spinner')
const backend = require('../backend/users')
const session = require('../../lib/session')

function saveTokenOnSession(response){
  if( response && response.token ) session({ token: response.token })
  return response
}

const routeToDashboard = () => m.route('/dashboard')

function controller(){
  const signupHash = m.route.param('signupHash')
  if( ! signupHash ) { 
    m.route('/')
    return
  }
  console.log('registerByCode: ' + signupHash)
  backend
    .registerByCode(signupHash)
    .then(saveTokenOnSession)
    .then(routeToDashboard)
    .catch(e => {
      console.error('Fails when try to register by code')
      console.error(e)
      m.route('/')
    })
}

function view(){ return m(spinner.page) }


module.exports = { view, controller }