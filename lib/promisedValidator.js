const validator = require('./validator')
const m = require('mithril')

module.exports = function promisedValidator(constraints, externalErrors){
  "use strict";

  const validate = validator(constraints, externalErrors);

  function api(model){
    const promise = m.deferred()
    if( validate(model) ){
      return promise.resolve(model).promise
    } else {
      let errors = validate.errors();
      errors.type = 'validation'
      return promise.reject(errors).promise
    }
  }

  api.errors = validate.errors;

  return api;
}
