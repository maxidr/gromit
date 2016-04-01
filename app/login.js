const m = require('mithril')
const constraints = require('../lib/promisedValidator')
const inlineErrors = require('../lib/inlineErrorView')
const pipe = require('ramda/src/pipeP')
const backend = require('./backend/users')
const closeBtn = require('./closeBtn')
const session = require('../lib/session')

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

login.view = (ctrl) => m('.login.content', [
  closeBtn,
  m('h1', 'Login to your account'),
  m('.service-errors', ctrl.errors('service')),
  m('form', { onsubmit: ctrl.submit }, [
    m('.field',[
      m('label', 'Email'),
      m('input[type=email]', { onchange: m.withAttr('value', ctrl.user.email) }),
      ctrl.errors('email')
    ]),
    m('.field', [
      m('label', 'Password'),
      m('input[type=password]', { onchange: m.withAttr('value', ctrl.user.password) }),
      ctrl.errors('password')
    ]),
    m('.field', [
      m('button[type=submit]', 'Login')
    ]),
    m('.more', [
      m('.field',
        m("a.forgot-password[href='/forgot-password']", { config: m.route }, 'Forgot your password?')
      ),
      m('.field',
        m('a.register[href="/register"]', { config: m.route }, "you don't have an user yet?")
      )
    ])
  ])
])

export default login;
