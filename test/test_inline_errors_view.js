const test = require('tape')
const m = require('mithril')
const inlineErrors = require('../lib/inlineErrorView')

test('inlineErrorView', function(t){
  var errors = inlineErrors();
  t.equals(errors('user'), "", 'return empty when no errors for a field')

  errors('user', 'is required')
  t.same(errors('user'), [ m('.error', 'is required') ], 'return a list with every error msg when there are errors')

  errors('user', 'must be an string')
  t.same(errors('user'), [
    m('.error', 'is required'),
    m('.error', 'must be an string')
  ])

  errors.clear()
  t.equals(errors('user'), "", 'return empty when clear errors')

  t.end();
})
