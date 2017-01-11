const m = require('mithril')
const reduce = require('ramda/src/reduce')
const map = require('ramda/src/map')

module.exports = { redirect, middleware }


function redirect(precondition, redirectTo, routeMaps){
	var routes = {}
	Object.keys(routeMaps).forEach(function(route){
		routes[route] = preconditionWrapper(routeMaps[route], precondition, redirectTo)
	})
	return routes
}


/**
 * Append a middleware into a mithril component
 * @param  {function[]} middlewares - A list of middlewares (functions)
 * @return {function}                A function that expect an object with routes (like: { '/': Index })
 *
 * middleware(googleAnalitycs, Log)({ .... mithril routes .... })
 */
function middleware(...middlewares){
	return map(module => wrapMiddlewares(module, middlewares))
}


function wrapMiddlewares(module, middlewares){
	return {
		view: module.view,
		controller: function(){
			const controller = function(){
				middlewares.forEach(middleware => middleware())
				if( module.controller ) {
					return module.controller.apply(module.controller, arguments)
				}
			}
			return new controller()
		}
	}
}

function preconditionWrapper(module, precondition, redirectTo){
	return {
		controller: function(){
			if( precondition() ) return m.route(redirectTo)
			if( module.controller ) {
				var controller = module.controller.bind.apply(module.controller, arguments)
				return new controller()
			}
		},
		view: module.view
	}
}


