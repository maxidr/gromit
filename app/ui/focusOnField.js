/**

Use:

	const focus = require('./focusOnField')
	...
	m('input', { config: focus })

*/
module.exports = function focus(el, isInit){
	if( !isInit ){
		el.focus()
	}
}
