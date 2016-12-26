const m = require('mithril')

const header = () => m('header.header-primary', [
  m('.container', [
    m('.logo', [ 'Gromit', m('b', '.io') ]),
    m('ul.menu', [
      m('li', m('a[href="/logout"]', { config: m.route }, 'Logout'))
    ])
  ])
])

function view(_, content){
  return m('.fullscreen-content', [
    header(),
    m('.content', m(content))
  ])
}

module.exports = { view }