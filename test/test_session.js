const test = require('tape')
const session = require('../lib/session')

test('session', (t) => {
  fail()
  session(null);

  session({ x: 1, y: 2 })
  t.same(session(), { x: 1, y: 2})

  session({ y: 3, z: 4})
  t.same(session(), { x: 1, y: 3, z: 4})

  session(null);
  t.equal(session(), null)

  t.end()
})

test('start with data in localStorage', (t) => {
  localStorage.setItem('gromit.session', JSON.stringify({ x: 12 }))
  t.same(session(), { x: 12 });
})
