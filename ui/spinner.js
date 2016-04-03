import m from 'mithril';
require('../css/spinner.css')

module.exports = { view: () => m('.spinner', [ m('.bounce1'), m('.bounce2'), m('.bounce3') ]) }
