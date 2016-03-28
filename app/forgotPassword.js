import m from 'mithril';
const inlineErrors = require('../lib/inlineErrorView')
const constraints = require('../lib/promisedValidator')
const pipe = require('ramda/src/pipeP')
const backend = require('./backend/users')

const validate = constraints((user, errors) => {
  if( ! user.email() ){ errors('email', 'The email is required') }
  if( ! user.password() ){ errors('password', 'The password is required') }
})

const successView = (email) => m('.success-register', [
  m('h1', 'Perfect, we could reset your password!'),
  m('h2', 'In short you will receive an email in your account (' + email + ') with the next steps to access to your dashboard'),
  m("a[href='/login']", { config: m.route }, 'Go back to the login page')
])

const formView = (ctrl) => m('.forgot-password', [
  m('h1', 'Forgot Password'),
  ctrl.errors('service'),
  m('form', { onsubmit: ctrl.submit }, [
    m('.field',[
      m('label', 'Email'),
      m('input[type=email]', {
        onchange: m.withAttr('value', ctrl.user.email),
        placeholder: 'Enter your email' }),
      ctrl.errors('email')
    ]),
    m('.field',[
      m('label', 'New password'),
      m('input[type=password]', {
        onchange: m.withAttr('value', ctrl.user.password),
        placeholder: 'Enter a new password'
      }),
      ctrl.errors('password')
    ]),
    m('.field',[
      m('button[type=submit]', 'Reset my password')
    ]),
    m('.more', [
      m('a.login', { href: '#/login' }, 'I remember my password now'),
      m('a.register', { href: '#/register' }, "you don't have an user yet?")
    ])
  ]),

])


const forgotPassword = {}

forgotPassword.controller = () => {
  const ctrl = {};

  const handleErrors = (errors) => {
    ctrl.errors.clear();
    if( errors.type === 'validation' ){ ctrl.errors = inlineErrors(errors) }
    if( errors.type === 'service' ){
      ctrl.errors('service', errors.error.message)
    }
  }

  ctrl.user = { email: m.prop(), password: m.prop() }
  ctrl.showSuccessMsg = m.prop(false);
  ctrl.errors = inlineErrors()

  ctrl.submit = () => pipe(validate,
    backend.resetPassword,
    ctrl.showSuccessMsg.bind(null, true)
  )(ctrl.user).catch(handleErrors)

  return ctrl;
}

forgotPassword.view = (ctrl) => ctrl.showSuccessMsg() ? successView(ctrl.user.email()) : formView(ctrl)

export default forgotPassword;
