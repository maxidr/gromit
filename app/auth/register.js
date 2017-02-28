const m = require('mithril');
const constraints = require('../../lib/promisedValidator')
const inlineErrors = require('../../lib/inlineErrorView')
const pipe = require('ramda/src/pipeP')
const backend = require('../backend/users')
const focus = require('../ui/focusOnField')

const validate = constraints((user, errors) => {
  if( ! user.email() ){ errors('email', 'The email is required') }
  if( ! user.password() ){ errors('password', 'The password is required') }
  else {
    if( user.password().length < 4 ){ errors('password', 'Should be 4 characters at least') }
  }
})


const register = {}

register.controller = function(){
  const ctrl = {};
  ctrl.user = {
    email: m.prop(''),
    password: m.prop('')
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

const successView = email => {
  ga('set', 'page', '/register/success')
  ga('set', 'userId', email)
  ga('send', 'pageView')
  return m('.success-register.content', [
    m('h1', 'Perfect, now you are registered!'),
    m('h2', 'In short you will receive an email in your account (' + email + ') with the next steps to access to your dashboard'),
    m("a[href='/login']", { config: m.route }, 'Go back to the login page')
  ])
}

const formView = (ctrl) => m('.auth.register', [
  m('h1.auth__title', 'Create your account'),
  m('h1.auth__sub-title', 'Start your FREE trial for 30 days. No credit card required'),
  m('.auth__service-errors', ctrl.errors('service')),
  m('form', { onsubmit: ctrl.submit }, [
    m('.auth__field', [
      m('label.auth__field__label', 'Your e-mail'),
      m('input[type=email].auth__field__input',
				{ onchange: m.withAttr('value', ctrl.user.email), config: focus }),
      ctrl.errors('email')
    ]),
    m('.auth__field', [
      m('label.auth__field__label', 'Create a password'),
      m('input[type=password].auth__field__input', { 
        onchange: m.withAttr('value', ctrl.user.password),
        placeholder: '4 characters or more'
      }),
      ctrl.errors('password')
    ]),
    m('button[type=submit].auth__submit', 'Create my account'),
		m('.auth__more-options', [
      m('div', m('a.more-options__login', { href: '#/login' }, "I already have an account"))
  	])
	])
])

register.view = (ctrl) => ctrl.showSuccessMsg() ? successView(ctrl.user.email()) : formView(ctrl)


export default register;
