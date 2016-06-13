const m = require('mithril');
const constraints = require('../../lib/promisedValidator')
const inlineErrors = require('../../lib/inlineErrorView')
const pipe = require('ramda/src/pipeP')
const backend = require('../backend/users')

const validate = constraints((user, errors) => {
  if( ! user.email() ){ errors('email', 'The email is required') }
  if( ! user.password() ){ errors('password', 'The password is required') }
  else {
    if( ! user.retypedPassword() ){ errors('retypedPassword', 'Please, retype the password') }
    else if( user.retypedPassword() !== user.password() ) {
      errors('retypedPassword', 'the password not match')
    }
  }
})

const focus = (el, isInit) => {
	if( !isInit ){ el.focus() }
}

const register = {}

register.controller = function(){
  const ctrl = {};
  ctrl.user = {
    email: m.prop(''),
    password: m.prop(''),
    retypedPassword: m.prop('')
  }

  ctrl.showSuccessMsg = m.prop(false)

  ctrl.errors = inlineErrors()

  const handleErrors = (errors) => {
    ctrl.errors.clear();
    if( errors.type === 'validation' ){ ctrl.errors = inlineErrors(errors) }
    if( errors.type === 'service' ){
      ctrl.errors('service', errors.error.message)
    }
  }

  ctrl.submit = () => {
    pipe(validate, backend.register, ctrl.showSuccessMsg.bind(null, true))(ctrl.user)
      .catch(handleErrors)
    return false
  }

  return ctrl
}

const successView = (email) => m('.success-register.content', [
  m('h1', 'Perfect, now you are registered!'),
  m('h2', 'In short you will receive an email in your account (' + email + ') with the next steps to access to your dashboard'),
  m("a[href='/login']", { config: m.route }, 'Go back to the login page')
])

const formView = (ctrl) => m('.auth.register', [
  m('h1.auth__title', 'Register'),
  m('.auth__service-errors', ctrl.errors('service')),
  m('form', { onsubmit: ctrl.submit }, [
    m('.auth__field', [
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
      m('label.auth__field__label', 'Retype your password'),
      m('input[type=password].auth__field__input', { onchange: m.withAttr('value', ctrl.user.retypedPassword) }),
      ctrl.errors('retypedPassword')
    ]),
    m('button[type=submit].auth__submit', 'Create my user'),
		m('.auth__more-options', [
      m('div', m('a.more-options__login', { href: '#/login' }, "I already have an account"))
  	])
	])
])

register.view = (ctrl) => ctrl.showSuccessMsg() ? successView(ctrl.user.email()) : formView(ctrl)


export default register;
