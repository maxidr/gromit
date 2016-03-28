/*

API:

import buildValidator from 'validator';
const validation = buildValidator(function(model, errors){
  if( ! model.name() ){ errors('name', 'name must be James') }
  if( ! model.password() ){ errors('password', 'The password is required') }
})

if( ! validation(user) ){
  validation.errors()
}

*/

module.exports = function validator(constraints, externalErrors){
  const errors = externalErrors || require('./errors')()

  const api = (model) => {
    errors.clear();
    constraints(model, errors);
    return ! errors();
  }

  api.errors = errors

  return api
}
