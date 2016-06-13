const m = require('mithril')

require('./index.css')

const constraints = require('../../lib/promisedValidator')
const inlineErrors = require('../../lib/inlineErrorView')
const pipe = require('ramda/src/pipeP')
const backend = require('../backend/users')
const closeBtn = require('../closeBtn')
const session = require('../../lib/session')
const focus = require('../ui/focusOnField')

const validate = constraints((user, errors) => {
  if( ! user.email() ){ errors('email', 'The email is required') }
  if( ! user.password() ){ errors('password', 'The password is required') }
})

const login = {};

login.controller = () => {
  const ctrl = {}

  const resolveErrors = {
    'validation': (errors) => { ctrl.errors = inlineErrors(errors) },
    'service': () => ctrl.errors('service', 'The user or password is incorrect')
  }

  ctrl.user = { email: m.prop(), password: m.prop() }

  ctrl.errors = inlineErrors()

  function handleErrors(errors){
    ctrl.errors.clear();
    resolveErrors[errors.type](errors)
  }

  function saveTokenOnSession(response){
    session({ token: response.token })
    return response
  }

  const routeToDashboard = () => m.route('/dashboard')

  ctrl.submit = () => {
    pipe(validate, backend.login, saveTokenOnSession, routeToDashboard)(ctrl.user).catch(handleErrors)
    return false
  }

  return ctrl
}

login.view = (ctrl) => m('.auth', [
  m('h1.auth__title', 'Login to your account'),
  m('.auth__service-errors', ctrl.errors('service')),
  m('form', { onsubmit: ctrl.submit }, [
    m('.auth__field',[
      m('label.auth__field__label', 'Email'),
      m('input[type=email].auth__field__input',
				{ onchange: m.withAttr('value', ctrl.user.email), config: focus }),
      ctrl.errors('email')
    ]),
    m('.auth__field', [
      m('label.auth__field__label', 'Password'),
      m('input[type=password].auth__field__input', { onchange: m.withAttr('value', ctrl.user.password) }),
      ctrl.errors('password')
    ]),
    m('.auth__field', [
      m('button[type=submit].auth__submit', 'Login')
    ]),
    m('.auth__more-options', [
      m('div',
        m("a.more-options__forgot-password[href='/forgot-password']", { config: m.route }, 'Forgot your password?')
      ),
      m('div',
        m('a.more-options__register[href="/register"]', { config: m.route }, "you don't have an user yet?")
      )
    ])
  ])
])

export default login;
