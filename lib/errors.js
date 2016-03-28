/*

# API example:

let errors = require('errors');

errors()                   => Return an object with all the errors  =>  { key: [messages] }
errors('name')             => Return a list of errors for 'name' key
errors('name', 'add name') => add error to the field name

errors.clear()
errors.load(
  { 'email': [ 'error msg'], 'password': [ 'error msg 1', 'error msg 2' ] }
)

*/
function allErrors(errors){ return emptyObject(errors) ? null : errors }
function errorByKey(key, errors){ return errors[key] }
function setError(key, msg, errors){ errors[key] = (errors[key] || []).concat(msg) }

function emptyObject(obj){ return Object.keys(obj).length === 0 }

const actions = [ allErrors, errorByKey, setError ]

const errors = () => {
  "use strict";

  let errors = {};

  const api = function(){
    const args = Array.prototype.slice.call(arguments, 0)
    return (actions[args.length]).apply(null, args.concat(errors))
  }

  api.clear = function(){ errors = {} }
  api.load = function(loadErrors){ errors = loadErrors }

  return api
}

module.exports = errors
