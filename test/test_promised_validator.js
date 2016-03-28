const test = require('tape')
const validator = require('../lib/promisedValidator')

const validUser = { email: 'john.doe@gmail.com', password: '1234' }
const invalidUser = { email: '' }

const validate = validator(function(user, errors){
  if( ! user.email ){ errors('email', 'The emails is required') }
  if( ! user.password ){ errors('password', 'The password is required') }
})


test('for valid model (object)', (t) => {
  validate(validUser)
    .then((user) => {
      t.same(validUser, user)
      t.equals(validate.errors(), null, '.errors() must be null')
      t.end();
    }, () => { t.fail('fail function in then not should be executed') })
})

test('for invalid model', (t) => {
  validate(invalidUser)
    .then(() => { t.fail('then not should be executed') })
    .catch((errors) => {
      t.same(errors, {
        email: ['The emails is required'],
        password: ['The password is required']
      }, '.errors() return an error object')
      t.end();
    })
})
