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


