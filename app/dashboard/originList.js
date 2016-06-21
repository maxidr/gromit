import m from 'mithril'
import './originList.css'
import { inline as spinner } from '../ui/spinner'
import backend from '../backend/users'

/*
(function mock(){
	const originalReq = m.request
	m.request = (...attrs) => {
		const conf = attrs[0]
		if( conf.method !== 'PUT' ){ return originalReq.apply(null, attrs) }
		const deferred = m.deferred();
		setTimeout(function() {
			deferred.resolve(conf.data);
		}, 3000);
		return deferred.promise;
	}
})();
*/

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
	state.updatingUser(true)

	setTimeout(function() {
		m.startComputation()
		if( ! user.originList ){ user.originList = [] }
		user.originList.push(state.originInputValue())
		
		backend.update(user)
			.then(state.originInputValue.bind(null, ''))
			.then(() => { state.focusOriginInputValue = true })
			.then(state.updatingUser.bind(null, false))
			.then(m.endComputation)
	}, 10);

	return false
}

const removeOrigin = origin => () => {
	console.log('Remove: ' + origin)
}


const newOriginInput = (user) => m('.origins-config__origin-field', [
	m('form', { onsubmit: addOriginToUser(user) }, [
		m('input[type=url].origin-field__input-new',
			{ config: focus, placeholder: 'Enter an URL',
				onchange: m.withAttr('value', state.originInputValue),
				value: state.originInputValue(), tabindex: 1, disabled: state.updatingUser() }),
		state.updatingUser() ? m(spinner) : m('button[type=submit].origin-field__add', { tabindex: 2 }, 'add origin')
	])
])

const originItem = (origin) => m('li.origin-item', [
	m('i.origin-item__pre-icon.icon-dots-three-vertical'),
	m('.origin-item__url', origin),
	m('a.origin-item__remove', { onclick: removeOrigin(origin) }, 'remove')
])


const view = user => m('.origins-config', [
	m('h2.origins-config__title', 'Origin configured list'),
	m('.origins-config__explanation', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et faucibus metus. Donec pulvinar varius nisl, ac feugiat magna vestibulum eu. Nunc tincidunt scelerisque nibh vel bibendum. Curabitur ipsum dolor, ornare id elit id, varius efficitur nunc. Sed ut velit turpis. Nulla eget rutrum nulla, vel viverra dolor. Phasellus aliquet finibus imperdiet. Fusce tellus nunc, tempus sit amet massa in, malesuada congue risus.'),
	m('ul.origins-config__origins', (user.originList || []).map(originItem)),
	state.showNewOriginInput() ? newOriginInput(user) 
		: m('a.origins-config__add-new', { onclick: state.showNewOriginInput.bind(null, true), tabindex: 3 }, 'input new origin')
])

export default view
