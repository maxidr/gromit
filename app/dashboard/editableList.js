import m from 'mithril'
import './editableList.css'
import { inline as spinner } from '../ui/spinner'

/**
* Editable List Component
* 
* Show a list of items that can remove or add new
* The add and remove if handle through callback functions
*/

/**
* @param api { Object }
* @param api.onAddItem { Function: (item) -> Promise }
* @param api.onRemoveItem { Function: (item) -> Promise }
* @param api.validateInput { Function: (String) -> String | null } 
*        Validate the input and returns
*        and error message (String) or null (if valid)
*
* @param api.title { String }
* @param api.explanation { String }
* @param api.itemName { String }
* @param api.inputPlaceholder { String }
*/
export default function(api = {}){

	const vm = {
		showInput: m.prop(false),
		inputValue: m.prop(''),
		focusOnInputValue: false,
		syncingItemAdded: m.prop(false),
		syncingItemRemoved: m.prop(false),
		invalidInputMsg: null
	}

	function focus(el, isInit){
		if( !isInit || vm.focusOnInputValue ){
			el.focus()
			vm.focusOnInputValue = false
		}
	}

	const removeItemFromModel = (itemToRemove) => () => {
		vm.syncingItemRemoved(itemToRemove)

		// Use setTimeout inmediate return of this function and show spinner
		setTimeout(() => {
			m.startComputation();
			api.onRemoveItem(itemToRemove)
				.then(vm.syncingItemRemoved.bind(null, false))
				.then(m.endComputation)
		}, 10)

		return false
	}

	const addItemToModel = () => {

		vm.invalidInputMsg = api.validateInput(vm.inputValue())
		
		if( vm.invalidInputMsg ){ return false }

		vm.syncingItemAdded(true)

		// Use setTimeout inmediate return of this function and show spinner
		setTimeout(() => {
			m.startComputation()
			api.onAddItem(vm.inputValue())
				.then(vm.inputValue.bind(null, ''))
				.then(() => { vm.focusOnInputValue = true })
				.then(vm.syncingItemAdded.bind(null, false))
				.then(m.endComputation)
		}, 10)

		return false
	}


	const newItemInput = () => m('.editable-list__field', [
		m('form', { onsubmit: addItemToModel }, [
			m('input[type=text].field__input-new',
				{ config: focus, placeholder: api.inputPlaceholder,
					onchange: m.withAttr('value', vm.inputValue),
					value: vm.inputValue(), tabindex: 1, disabled: vm.syncingItemAdded() }),
			vm.syncingItemAdded() ? m(spinner) : m('button[type=submit].field__add', { tabindex: 2 }, `add ${api.itemName}`),
			vm.invalidInputMsg ? m('.field__error', vm.invalidInputMsg) : null
		])
	])

	const itemView = item => {
		const isRemoving = vm.syncingItemRemoved() === item 
		return m('li.editable-list__item', [
			m('i.editable-list__item__pre-icon.icon-dots-three-vertical'),
			m('.editable-list__item__url', item),
			isRemoving ? m(spinner) 
				: m('a.editable-list__item__remove', { onclick: removeItemFromModel(item) }, 'remove')
		])
	}

	const view = (list) => m('.editable-list', [
		m('h2.editable-list__title', api.title),
		m('.editable-list__explanation', api.explanation),
		m('ul.editable-list__items', (list || []).map(itemView)),
		vm.showInput() ? newItemInput() 
			: m('a.editable-list__add-new', { onclick: vm.showInput.bind(null, true), tabindex: 3 }, `input new ${api.itemName}`)
	])

	return view
}
