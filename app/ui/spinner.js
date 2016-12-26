/*
import m from 'mithril';
require('./spinner.css')

//module.exports = { view: () => m('.spinner', [ m('.bounce1'), m('.bounce2'), m('.bounce3') ]) }

const spinner = (type = 'page') => ({
	view: () => m('.spinner', { class: `spinner--${type}` }, [ m('.bounce1'), m('.bounce2'), m('.bounce3') ])
})

export default {
	page: spinner('page'), 
	inline: spinner('inline')
}

*/
const m = require('mithril')
require('./spinner.css')

function view(_, options = {}){
  return m('.spinner', options,
    [ m('.bounce1'), m('.bounce2'), m('.bounce3') ]
  )
}

const spinner = module.exports = { view }

module.exports.inline = m(spinner, { class: 'small-spinner' })
module.exports.page = m(spinner, { class: 'medium-spinner' })

