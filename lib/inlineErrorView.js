const m = require('mithril')
const pipe = require('ramda/src/pipe')
const takeFirst = require('ramda/src/head')

const viewMap = (errorMgs) => {
  return errorMgs ? errorMgs.map((errorMsg) => m('.error', errorMsg)) : ""
}

const renderErrorMsg = (errors) => pipe(takeFirst, errors, viewMap);
const delegateTo = (target) => function(arg) {
  return target.apply(null, arg)
}


/*

# How to use:

const errors = require('./inlineErrorView')
errors({
  'email': [ 'errors msg 1', 'errors msg 2' ],
  'password': [ 'errors msg' ]
})

errors('email')
// => [
//  m('.error', 'error msg 1')
//  m('.error', 'error msg 2')
// ]

errors('user')
// => ''

errors('user', 'the user must be not empty')
errors('user')
// => '[ m('.error', 'the user must be not empty') ]'

*/

module.exports = (previousErrors) => {
  const errors = require('./errors')();

  if( previousErrors ){ errors.load(previousErrors) }

  const api = function(){
    return (arguments.length === 1 ? renderErrorMsg(errors) : delegateTo(errors))(arguments)
  }

  api.clear = errors.clear

  return api
}
