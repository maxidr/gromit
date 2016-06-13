import m from 'mithril';
const inlineErrors = require('../../lib/inlineErrorView')
const constraints = require('../../lib/promisedValidator')
const pipe = require('ramda/src/pipeP')
const backend = require('../backend/users')

require('./index.css')

const validate = constraints((user, errors) => {
  if( ! user.email() ){ errors('email', 'The email is required') }
  if( ! user.password() ){ errors('password', 'The password is required') }
})

const successView = (email) => m('.success-register.content', [
  closeBtn,
  m('h1', 'Perfect, we could reset your password!'),
  m('h2', 'In short you will receive an email in your account (' + email + ') with the next steps to access to your dashboard'),
  m("a[href='/login'].btn", { config: m.route }, 'Go back to the login page')
])

const formView = (ctrl) => m('.auth.forgot-password', [
  m('h1.auth__title', 'Forgot Password'),
	m('.auth__service-errors', ctrl.errors('service')),
  m('form', { onsubmit: ctrl.submit }, [
    m('.auth__field',[
      m('label.auth__field__label', 'Email'),
      m('input[type=email].auth__field__input', { onchange: m.withAttr('value', ctrl.user.email) }),
      ctrl.errors('email')
    ]),
    m('.auth__field',[
      m('label.auth__field__label', 'New password'),
      m('input[type=password].auth__field__input', { onchange: m.withAttr('value', ctrl.user.password) }),
      ctrl.errors('password')
    ]),
    m('.auth__field',[
      m('button[type=submit].auth__submit', 'Reset my password')
    ]),
    m('.auth__more-options', [
      m('div', m('a.more-options__login', { href: '#/login' }, 'I remember my password now')),
      m('div', m('a.more-options__register', { href: '#/register' }, "you don't have an user yet?"))
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

  ctrl.submit = () => {
    pipe(validate,
      backend.resetPassword,
      ctrl.showSuccessMsg.bind(null, true)
    )(ctrl.user).catch(handleErrors)

    return false
  }

  return ctrl
}

forgotPassword.view = (ctrl) => ctrl.showSuccessMsg() ? successView(ctrl.user.email()) : formView(ctrl)

export default forgotPassword;
