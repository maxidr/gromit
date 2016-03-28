const test = require('tape')
const session = require('../lib/session')

test('session', (t) => {
  session(null);

  session({ x: 1, y: 2 })
  t.same({ x: 1, y: 2}, session())

  session({ y: 3, z: 4})
  t.same({ x: 1, y: 3, z: 4}, session())

  session(null);
  t.equal(null, session())

  t.end()
})
