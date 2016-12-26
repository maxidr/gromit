const m = require('mithril')
//m.route(document.body, '/', {})
/*
redirect(isAnonimous, '/login', {
	'/dashboard': dashboard,
  '/logout': logout
})
*/
const init = require('ramda/src/init')
//const reduce = require('ramda/src/reduce')
const map = require('ramda/src/map')
const all = require('ramda/src/all')

function redirect(precondition, redirectTo, routeMaps){
	var routes = {}
	Object.keys(routeMaps).forEach(function(route){
		routes[route] = preconditionWrapper(routeMaps[route], precondition, redirectTo)
	})
	return routes
}


function use(...args){
	const routeMaps = args[args.length - 1]
	const filters = init(args)

	return map(wrapModuleWith(filters), routeMaps)
	//return reduce(wrapModule(filters), {}, Object.keys(routeMaps))

	/*
	Object.keys(routeMaps).forEach(function(path){
		const module = routeMaps[path]
		routes[path] = wrapModule(module, filters)
	})*/
	//return routes
}

function wrapModuleWith(filters){
	return function(module){
		return {
			view: module.view,
			controller: function(...args){
				for( i = 0; i < filters.length; i++ ){
					filter = filters[i]
					if( ! filter() ){ break }
				}

				

				if( module.controller ) {
					//var controller = module.controller.bind.apply(module.controller, arguments)
					return new module.controller(...args)
				}
			}
		}
	}
}


function moduleWrapper(module, middlewares){
	return {
		controller: function(){
			if( module.controller ) {
				var controller = module.controller.bind.apply(module.controller, arguments)
				return new controller()
			}
		},
		view: module.view
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

module.exports = { redirect }

/*
route(document.body, '/', filter(redirect(isAnonimous, '/login'), {
  '/dashboard': dashboard,
  '/logout': logout
}))


route(document.body, '/', {
  '/dashboard': pre(fetchUser, fetchAccounts ,dashboard),
  '/logout': logout
})
*/
