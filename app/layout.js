const m = require('mithril')
const session = require('../lib/session')
const when = require('./ui/when')

const header = () => m('header.header-primary', [
  m('.container', [
    m('.logo', [ 'Gromit', m('b', '.io') ]),
    when(session(), 
      () => m('ul.menu', [
        m('li', m('a[href="http://docs.gromit.io/"]', { target: '_blank' }, 'Documentation')),
        m('li', m('a[href="/logout"]', { config: m.route }, 'Logout'))
      ])
    )
  ])
])

function view(_, content){
  return m('.fullscreen-content', [
    header(),
    m('.content', m(content))
  ])
}

module.exports = { view }