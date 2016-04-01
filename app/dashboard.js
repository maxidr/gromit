import m from 'mithril';
const user = require('./backend/users')

const dashboard = {}

dashboard.controller = function() {
  const ctrl = this
  ctrl.user = m.prop({})
  user.fetch().then(function(user){
    console.log('user: ' + user)
    ctrl.user(user)
  })
}

dashboard.view = (ctrl) => {
  console.log('ctrl: ' + ctrl)
  return m('.fullscreen-content', [
    m('h1', 'Dashboard'),
    m('h2', ctrl.user().email),
    m('ul', [
      m('li', 'project Key: ' + ctrl.user().projectKey),
      m('li', 'plan: ' + ctrl.user().plan),
      m('li', 'uses: ' + ctrl.user().usages)
    ])
  ])
}


export default dashboard;
