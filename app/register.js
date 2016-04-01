const m = require('mithril');
const constraints = require('../lib/promisedValidator')
const inlineErrors = require('../lib/inlineErrorView')
const pipe = require('ramda/src/pipeP')
const backend = require('./backend/users')
const closeBtn = require('./closeBtn')

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

const successView = (email) => m('.success-register', [
  closeBtn,
  m('h1', 'Perfect, now you are registered!'),
  m('h2', 'In short you will receive an email in your account (' + email + ') with the next steps to access to your dashboard'),
  m("a[href='/login']", { config: m.route }, 'Go back to the login page')
])

const formView = (ctrl) => m('.register.content', [
  closeBtn,
  m('h1', 'Register'),
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
      m('label', 'Retype your password'),
      m('input[type=password]', { onchange: m.withAttr('value', ctrl.user.retypedPassword) }),
      ctrl.errors('retypedPassword')
    ]),
    m('button[type=submit]', 'Create my user')
  ])
]);

register.view = (ctrl) => ctrl.showSuccessMsg() ? successView(ctrl.user.email()) : formView(ctrl)


export default register;
