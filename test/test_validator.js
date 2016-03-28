const test = require('tape')
const validator = require('../lib/validator')

const validUser = { email: 'john.doe@gmail.com', password: '1234' }
const invalidUser = { email: '' }

const validate = validator(function(user, errors){
  if( ! user.email ){ errors('email', 'The emails is required') }
  if( ! user.password ){ errors('password', 'The password is required') }
})

test('for valid model (object)', (t) => {
  t.true(validate(validUser), 'should return true')
  t.equals(validate.errors(), null, '.errors() must be null')
  t.end();
})

test('for invalid model', (t) => {
  t.false(validate(invalidUser), 'should return false')
  t.same(validate.errors(), {
    email: ['The emails is required'],
    password: ['The password is required']
  }, '.errors() return an error object')
  t.end();
})
