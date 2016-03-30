import m from 'mithril';

const dashboard = {}

dashboard.controller = function() {
  console.log('load container')
}

dashboard.view = () => m('.fullscreen-content', [
  m('h1', 'Dashboard')
])


export default dashboard;
