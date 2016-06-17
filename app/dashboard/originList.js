import m from 'mithril'
import './originList.css'
import spinner from '../ui/spinner'
import backend from '../backend/users'

const state = {
	showNewOriginInput: m.prop(false),
	originInputValue: m.prop(''),
	focusOriginInputValue: false,
	updatingUser: m.prop(false)
}

function focus(el, isInit){
	if( !isInit || state.focusOriginInputValue ){
		el.focus()
		state.focusOriginInputValue = false
	}
}

const addOriginToUser = user => () => {
	if( ! user.originList ){ user.originList = [] }
	user.originList.push(state.originInputValue())
	state.originInputValue('')
	state.focusOriginInputValue = true
	state.updatingUser(false)
	backend.update(user)
		.then(state.updatingUser.bind(false))
	/*
	state.originInputValue('')
	state.focusOriginInputValue = true
	*/
	return false
}

const newOriginInput = (user) => m('.origins-config__origin-field', [
	m('form', { onsubmit: addOriginToUser(user) }, [
		m('input[type=url].origin-field__input-new',
			{ config: focus, placeholder: 'Enter an URL',
				onchange: m.withAttr('value', state.originInputValue),
				value: state.originInputValue(), tabindex: 1 }),
		m('button[type=submit].origin-field__add', { tabindex: 2 }, 'add origin')
	])
])


const view = user => m('.origins-config', [
	m('h2.origins-config__title', 'Origin configured list'),
	m('.origins-config__explanation', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et faucibus metus. Donec pulvinar varius nisl, ac feugiat magna vestibulum eu. Nunc tincidunt scelerisque nibh vel bibendum. Curabitur ipsum dolor, ornare id elit id, varius efficitur nunc. Sed ut velit turpis. Nulla eget rutrum nulla, vel viverra dolor. Phasellus aliquet finibus imperdiet. Fusce tellus nunc, tempus sit amet massa in, malesuada congue risus.'),
	m('ul', (user.originList || []).map(origin => m('li', origin))),
	state.showNewOriginInput() ? newOriginInput(user) : null,
	m('a.origins-config__add-new',
		{ onclick: state.showNewOriginInput.bind(null, true), tabindex: 3 }, 'input new origin')
])

export default view
