/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _login = __webpack_require__(1);
	
	var _login2 = _interopRequireDefault(_login);
	
	var _forgotPassword = __webpack_require__(44);
	
	var _forgotPassword2 = _interopRequireDefault(_forgotPassword);
	
	var _register = __webpack_require__(45);
	
	var _register2 = _interopRequireDefault(_register);
	
	var _dashboard = __webpack_require__(46);
	
	var _dashboard2 = _interopRequireDefault(_dashboard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var m = __webpack_require__(2);
	//require('./index.css')
	
	
	m.route.mode = "hash";
	m.route(document.querySelector('#app-container'), '/', {
	  '/': { view: view },
	  '/login': _login2.default,
	  '/forgot-password': _forgotPassword2.default,
	  '/register': _register2.default,
	  '/dashboard': _dashboard2.default
	});
	
	function view() {
	  return '';
	}
	
	__webpack_require__(47);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var m = __webpack_require__(2);
	var constraints = __webpack_require__(4);
	var inlineErrors = __webpack_require__(19);
	var pipe = __webpack_require__(40);
	var backend = __webpack_require__(42);
	var closeBtn = __webpack_require__(43);
	
	var validate = constraints(function (user, errors) {
	  if (!user.email()) {
	    errors('email', 'The email is required');
	  }
	  if (!user.password()) {
	    errors('password', 'The password is required');
	  }
	});
	
	var login = {};
	
	login.controller = function () {
	  var ctrl = {};
	
	  var resolveErrors = {
	    'validation': function validation(errors) {
	      ctrl.errors = inlineErrors(errors);
	    },
	    'service': function service() {
	      return ctrl.errors('service', 'The user or password is incorrect');
	    }
	  };
	
	  ctrl.user = { email: m.prop(), password: m.prop() };
	
	  ctrl.errors = inlineErrors();
	
	  function handleErrors(errors) {
	    ctrl.errors.clear();
	    resolveErrors[errors.type](errors);
	  }
	
	  var routeToDashboard = function routeToDashboard() {
	    return m.route('/dashboard');
	  };
	
	  ctrl.submit = function () {
	    return pipe(validate, backend.login, routeToDashboard)(ctrl.user).catch(handleErrors);
	  };
	
	  return ctrl;
	};
	
	login.view = function (ctrl) {
	  return m('.login.content', [closeBtn, m('h1', 'Login to your account'), m('.service-errors', ctrl.errors('service')), m('form', { onsubmit: ctrl.submit }, [m('.field', [m('label', 'Email'), m('input[type=email]', { onchange: m.withAttr('value', ctrl.user.email) }), ctrl.errors('email')]), m('.field', [m('label', 'Password'), m('input[type=password]', { onchange: m.withAttr('value', ctrl.user.password) }), ctrl.errors('password')]), m('.field', [m('button[type=submit]', 'Login')]), m('.more', [m('.field', m('a.forgot-password', { href: '#/forgot-password' }, 'Forgot your password?')), m('.field', m('a.register', { href: '#/register' }, "you don't have an user yet?"))])])]);
	};
	
	exports.default = login;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {;(function (global, factory) { // eslint-disable-line
		"use strict"
		/* eslint-disable no-undef */
		var m = factory(global)
		if (typeof module === "object" && module != null && module.exports) {
			module.exports = m
		} else if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return m }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
		} else {
			global.m = m
		}
		/* eslint-enable no-undef */
	})(typeof window !== "undefined" ? window : {}, function (global, undefined) { // eslint-disable-line
		"use strict"
	
		m.version = function () {
			return "v0.2.3"
		}
	
		var hasOwn = {}.hasOwnProperty
		var type = {}.toString
	
		function isFunction(object) {
			return typeof object === "function"
		}
	
		function isObject(object) {
			return type.call(object) === "[object Object]"
		}
	
		function isString(object) {
			return type.call(object) === "[object String]"
		}
	
		var isArray = Array.isArray || function (object) {
			return type.call(object) === "[object Array]"
		}
	
		function noop() {}
	
		var voidElements = {
			AREA: 1,
			BASE: 1,
			BR: 1,
			COL: 1,
			COMMAND: 1,
			EMBED: 1,
			HR: 1,
			IMG: 1,
			INPUT: 1,
			KEYGEN: 1,
			LINK: 1,
			META: 1,
			PARAM: 1,
			SOURCE: 1,
			TRACK: 1,
			WBR: 1
		}
	
		// caching commonly used variables
		var $document, $location, $requestAnimationFrame, $cancelAnimationFrame
	
		// self invoking function needed because of the way mocks work
		function initialize(mock) {
			$document = mock.document
			$location = mock.location
			$cancelAnimationFrame = mock.cancelAnimationFrame || mock.clearTimeout
			$requestAnimationFrame = mock.requestAnimationFrame || mock.setTimeout
		}
	
		// testing API
		m.deps = function (mock) {
			initialize(global = mock || window)
			return global
		}
	
		m.deps(global)
	
		/**
		 * @typedef {String} Tag
		 * A string that looks like -> div.classname#id[param=one][param2=two]
		 * Which describes a DOM node
		 */
	
		function parseTagAttrs(cell, tag) {
			var classes = []
			var parser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g
			var match
	
			while ((match = parser.exec(tag))) {
				if (match[1] === "" && match[2]) {
					cell.tag = match[2]
				} else if (match[1] === "#") {
					cell.attrs.id = match[2]
				} else if (match[1] === ".") {
					classes.push(match[2])
				} else if (match[3][0] === "[") {
					var pair = /\[(.+?)(?:=("|'|)(.*?)\2)?\]/.exec(match[3])
					cell.attrs[pair[1]] = pair[3] || (pair[2] ? "" : true)
				}
			}
	
			return classes
		}
	
		function getVirtualChildren(args, hasAttrs) {
			var children = hasAttrs ? args.slice(1) : args
	
			if (children.length === 1 && isArray(children[0])) {
				return children[0]
			} else {
				return children
			}
		}
	
		function assignAttrs(target, attrs, classes) {
			var classAttr = "class" in attrs ? "class" : "className"
	
			for (var attrName in attrs) {
				if (hasOwn.call(attrs, attrName)) {
					if (attrName === classAttr &&
							attrs[attrName] != null &&
							attrs[attrName] !== "") {
						classes.push(attrs[attrName])
						// create key in correct iteration order
						target[attrName] = ""
					} else {
						target[attrName] = attrs[attrName]
					}
				}
			}
	
			if (classes.length) target[classAttr] = classes.join(" ")
		}
	
		/**
		 *
		 * @param {Tag} The DOM node tag
		 * @param {Object=[]} optional key-value pairs to be mapped to DOM attrs
		 * @param {...mNode=[]} Zero or more Mithril child nodes. Can be an array,
		 *                      or splat (optional)
		 */
		function m(tag, pairs) {
			var args = [].slice.call(arguments, 1)
	
			if (isObject(tag)) return parameterize(tag, args)
	
			if (!isString(tag)) {
				throw new Error("selector in m(selector, attrs, children) should " +
					"be a string")
			}
	
			var hasAttrs = pairs != null && isObject(pairs) &&
				!("tag" in pairs || "view" in pairs || "subtree" in pairs)
	
			var attrs = hasAttrs ? pairs : {}
			var cell = {
				tag: "div",
				attrs: {},
				children: getVirtualChildren(args, hasAttrs)
			}
	
			assignAttrs(cell.attrs, attrs, parseTagAttrs(cell, tag))
			return cell
		}
	
		function forEach(list, f) {
			for (var i = 0; i < list.length && !f(list[i], i++);) {
				// function called in condition
			}
		}
	
		function forKeys(list, f) {
			forEach(list, function (attrs, i) {
				return (attrs = attrs && attrs.attrs) &&
					attrs.key != null &&
					f(attrs, i)
			})
		}
		// This function was causing deopts in Chrome.
		function dataToString(data) {
			// data.toString() might throw or return null if data is the return
			// value of Console.log in some versions of Firefox (behavior depends on
			// version)
			try {
				if (data != null && data.toString() != null) return data
			} catch (e) {
				// silently ignore errors
			}
			return ""
		}
	
		// This function was causing deopts in Chrome.
		function injectTextNode(parentElement, first, index, data) {
			try {
				insertNode(parentElement, first, index)
				first.nodeValue = data
			} catch (e) {
				// IE erroneously throws error when appending an empty text node
				// after a null
			}
		}
	
		function flatten(list) {
			// recursively flatten array
			for (var i = 0; i < list.length; i++) {
				if (isArray(list[i])) {
					list = list.concat.apply([], list)
					// check current index again and flatten until there are no more
					// nested arrays at that index
					i--
				}
			}
			return list
		}
	
		function insertNode(parentElement, node, index) {
			parentElement.insertBefore(node,
				parentElement.childNodes[index] || null)
		}
	
		var DELETION = 1
		var INSERTION = 2
		var MOVE = 3
	
		function handleKeysDiffer(data, existing, cached, parentElement) {
			forKeys(data, function (key, i) {
				existing[key = key.key] = existing[key] ? {
					action: MOVE,
					index: i,
					from: existing[key].index,
					element: cached.nodes[existing[key].index] ||
						$document.createElement("div")
				} : {action: INSERTION, index: i}
			})
	
			var actions = []
			for (var prop in existing) if (hasOwn.call(existing, prop)) {
				actions.push(existing[prop])
			}
	
			var changes = actions.sort(sortChanges)
			var newCached = new Array(cached.length)
	
			newCached.nodes = cached.nodes.slice()
	
			forEach(changes, function (change) {
				var index = change.index
				if (change.action === DELETION) {
					clear(cached[index].nodes, cached[index])
					newCached.splice(index, 1)
				}
				if (change.action === INSERTION) {
					var dummy = $document.createElement("div")
					dummy.key = data[index].attrs.key
					insertNode(parentElement, dummy, index)
					newCached.splice(index, 0, {
						attrs: {key: data[index].attrs.key},
						nodes: [dummy]
					})
					newCached.nodes[index] = dummy
				}
	
				if (change.action === MOVE) {
					var changeElement = change.element
					var maybeChanged = parentElement.childNodes[index]
					if (maybeChanged !== changeElement && changeElement !== null) {
						parentElement.insertBefore(changeElement,
							maybeChanged || null)
					}
					newCached[index] = cached[change.from]
					newCached.nodes[index] = changeElement
				}
			})
	
			return newCached
		}
	
		function diffKeys(data, cached, existing, parentElement) {
			var keysDiffer = data.length !== cached.length
	
			if (!keysDiffer) {
				forKeys(data, function (attrs, i) {
					var cachedCell = cached[i]
					return keysDiffer = cachedCell &&
						cachedCell.attrs &&
						cachedCell.attrs.key !== attrs.key
				})
			}
	
			if (keysDiffer) {
				return handleKeysDiffer(data, existing, cached, parentElement)
			} else {
				return cached
			}
		}
	
		function diffArray(data, cached, nodes) {
			// diff the array itself
	
			// update the list of DOM nodes by collecting the nodes from each item
			forEach(data, function (_, i) {
				if (cached[i] != null) nodes.push.apply(nodes, cached[i].nodes)
			})
			// remove items from the end of the array if the new array is shorter
			// than the old one. if errors ever happen here, the issue is most
			// likely a bug in the construction of the `cached` data structure
			// somewhere earlier in the program
			forEach(cached.nodes, function (node, i) {
				if (node.parentNode != null && nodes.indexOf(node) < 0) {
					clear([node], [cached[i]])
				}
			})
	
			if (data.length < cached.length) cached.length = data.length
			cached.nodes = nodes
		}
	
		function buildArrayKeys(data) {
			var guid = 0
			forKeys(data, function () {
				forEach(data, function (attrs) {
					if ((attrs = attrs && attrs.attrs) && attrs.key == null) {
						attrs.key = "__mithril__" + guid++
					}
				})
				return 1
			})
		}
	
		function isDifferentEnough(data, cached, dataAttrKeys) {
			if (data.tag !== cached.tag) return true
	
			if (dataAttrKeys.sort().join() !==
					Object.keys(cached.attrs).sort().join()) {
				return true
			}
	
			if (data.attrs.id !== cached.attrs.id) {
				return true
			}
	
			if (data.attrs.key !== cached.attrs.key) {
				return true
			}
	
			if (m.redraw.strategy() === "all") {
				return !cached.configContext || cached.configContext.retain !== true
			}
	
			if (m.redraw.strategy() === "diff") {
				return cached.configContext && cached.configContext.retain === false
			}
	
			return false
		}
	
		function maybeRecreateObject(data, cached, dataAttrKeys) {
			// if an element is different enough from the one in cache, recreate it
			if (isDifferentEnough(data, cached, dataAttrKeys)) {
				if (cached.nodes.length) clear(cached.nodes)
	
				if (cached.configContext &&
						isFunction(cached.configContext.onunload)) {
					cached.configContext.onunload()
				}
	
				if (cached.controllers) {
					forEach(cached.controllers, function (controller) {
						if (controller.onunload) controller.onunload({preventDefault: noop});
					});
				}
			}
		}
	
		function getObjectNamespace(data, namespace) {
			if (data.attrs.xmlns) return data.attrs.xmlns
			if (data.tag === "svg") return "http://www.w3.org/2000/svg"
			if (data.tag === "math") return "http://www.w3.org/1998/Math/MathML"
			return namespace
		}
	
		var pendingRequests = 0
		m.startComputation = function () { pendingRequests++ }
		m.endComputation = function () {
			if (pendingRequests > 1) {
				pendingRequests--
			} else {
				pendingRequests = 0
				m.redraw()
			}
		}
	
		function unloadCachedControllers(cached, views, controllers) {
			if (controllers.length) {
				cached.views = views
				cached.controllers = controllers
				forEach(controllers, function (controller) {
					if (controller.onunload && controller.onunload.$old) {
						controller.onunload = controller.onunload.$old
					}
	
					if (pendingRequests && controller.onunload) {
						var onunload = controller.onunload
						controller.onunload = noop
						controller.onunload.$old = onunload
					}
				})
			}
		}
	
		function scheduleConfigsToBeCalled(configs, data, node, isNew, cached) {
			// schedule configs to be called. They are called after `build` finishes
			// running
			if (isFunction(data.attrs.config)) {
				var context = cached.configContext = cached.configContext || {}
	
				// bind
				configs.push(function () {
					return data.attrs.config.call(data, node, !isNew, context,
						cached)
				})
			}
		}
	
		function buildUpdatedNode(
			cached,
			data,
			editable,
			hasKeys,
			namespace,
			views,
			configs,
			controllers
		) {
			var node = cached.nodes[0]
	
			if (hasKeys) {
				setAttributes(node, data.tag, data.attrs, cached.attrs, namespace)
			}
	
			cached.children = build(
				node,
				data.tag,
				undefined,
				undefined,
				data.children,
				cached.children,
				false,
				0,
				data.attrs.contenteditable ? node : editable,
				namespace,
				configs
			)
	
			cached.nodes.intact = true
	
			if (controllers.length) {
				cached.views = views
				cached.controllers = controllers
			}
	
			return node
		}
	
		function handleNonexistentNodes(data, parentElement, index) {
			var nodes
			if (data.$trusted) {
				nodes = injectHTML(parentElement, index, data)
			} else {
				nodes = [$document.createTextNode(data)]
				if (!(parentElement.nodeName in voidElements)) {
					insertNode(parentElement, nodes[0], index)
				}
			}
	
			var cached
	
			if (typeof data === "string" ||
					typeof data === "number" ||
					typeof data === "boolean") {
				cached = new data.constructor(data)
			} else {
				cached = data
			}
	
			cached.nodes = nodes
			return cached
		}
	
		function reattachNodes(
			data,
			cached,
			parentElement,
			editable,
			index,
			parentTag
		) {
			var nodes = cached.nodes
			if (!editable || editable !== $document.activeElement) {
				if (data.$trusted) {
					clear(nodes, cached)
					nodes = injectHTML(parentElement, index, data)
				} else if (parentTag === "textarea") {
					// <textarea> uses `value` instead of `nodeValue`.
					parentElement.value = data
				} else if (editable) {
					// contenteditable nodes use `innerHTML` instead of `nodeValue`.
					editable.innerHTML = data
				} else {
					// was a trusted string
					if (nodes[0].nodeType === 1 || nodes.length > 1 ||
							(nodes[0].nodeValue.trim &&
								!nodes[0].nodeValue.trim())) {
						clear(cached.nodes, cached)
						nodes = [$document.createTextNode(data)]
					}
	
					injectTextNode(parentElement, nodes[0], index, data)
				}
			}
			cached = new data.constructor(data)
			cached.nodes = nodes
			return cached
		}
	
		function handleTextNode(
			cached,
			data,
			index,
			parentElement,
			shouldReattach,
			editable,
			parentTag
		) {
			if (!cached.nodes.length) {
				return handleNonexistentNodes(data, parentElement, index)
			} else if (cached.valueOf() !== data.valueOf() || shouldReattach) {
				return reattachNodes(data, cached, parentElement, editable, index,
					parentTag)
			} else {
				return (cached.nodes.intact = true, cached)
			}
		}
	
		function getSubArrayCount(item) {
			if (item.$trusted) {
				// fix offset of next element if item was a trusted string w/ more
				// than one html element
				// the first clause in the regexp matches elements
				// the second clause (after the pipe) matches text nodes
				var match = item.match(/<[^\/]|\>\s*[^<]/g)
				if (match != null) return match.length
			} else if (isArray(item)) {
				return item.length
			}
			return 1
		}
	
		function buildArray(
			data,
			cached,
			parentElement,
			index,
			parentTag,
			shouldReattach,
			editable,
			namespace,
			configs
		) {
			data = flatten(data)
			var nodes = []
			var intact = cached.length === data.length
			var subArrayCount = 0
	
			// keys algorithm: sort elements without recreating them if keys are
			// present
			//
			// 1) create a map of all existing keys, and mark all for deletion
			// 2) add new keys to map and mark them for addition
			// 3) if key exists in new list, change action from deletion to a move
			// 4) for each key, handle its corresponding action as marked in
			//    previous steps
	
			var existing = {}
			var shouldMaintainIdentities = false
	
			forKeys(cached, function (attrs, i) {
				shouldMaintainIdentities = true
				existing[cached[i].attrs.key] = {action: DELETION, index: i}
			})
	
			buildArrayKeys(data)
			if (shouldMaintainIdentities) {
				cached = diffKeys(data, cached, existing, parentElement)
			}
			// end key algorithm
	
			var cacheCount = 0
			// faster explicitly written
			for (var i = 0, len = data.length; i < len; i++) {
				// diff each item in the array
				var item = build(
					parentElement,
					parentTag,
					cached,
					index,
					data[i],
					cached[cacheCount],
					shouldReattach,
					index + subArrayCount || subArrayCount,
					editable,
					namespace,
					configs)
	
				if (item !== undefined) {
					intact = intact && item.nodes.intact
					subArrayCount += getSubArrayCount(item)
					cached[cacheCount++] = item
				}
			}
	
			if (!intact) diffArray(data, cached, nodes)
			return cached
		}
	
		function makeCache(data, cached, index, parentIndex, parentCache) {
			if (cached != null) {
				if (type.call(cached) === type.call(data)) return cached
	
				if (parentCache && parentCache.nodes) {
					var offset = index - parentIndex
					var end = offset + (isArray(data) ? data : cached.nodes).length
					clear(
						parentCache.nodes.slice(offset, end),
						parentCache.slice(offset, end))
				} else if (cached.nodes) {
					clear(cached.nodes, cached)
				}
			}
	
			cached = new data.constructor()
			// if constructor creates a virtual dom element, use a blank object as
			// the base cached node instead of copying the virtual el (#277)
			if (cached.tag) cached = {}
			cached.nodes = []
			return cached
		}
	
		function constructNode(data, namespace) {
			if (data.attrs.is) {
				if (namespace == null) {
					return $document.createElement(data.tag, data.attrs.is)
				} else {
					return $document.createElementNS(namespace, data.tag,
						data.attrs.is)
				}
			} else if (namespace == null) {
				return $document.createElement(data.tag)
			} else {
				return $document.createElementNS(namespace, data.tag)
			}
		}
	
		function constructAttrs(data, node, namespace, hasKeys) {
			if (hasKeys) {
				return setAttributes(node, data.tag, data.attrs, {}, namespace)
			} else {
				return data.attrs
			}
		}
	
		function constructChildren(
			data,
			node,
			cached,
			editable,
			namespace,
			configs
		) {
			if (data.children != null && data.children.length > 0) {
				return build(
					node,
					data.tag,
					undefined,
					undefined,
					data.children,
					cached.children,
					true,
					0,
					data.attrs.contenteditable ? node : editable,
					namespace,
					configs)
			} else {
				return data.children
			}
		}
	
		function reconstructCached(
			data,
			attrs,
			children,
			node,
			namespace,
			views,
			controllers
		) {
			var cached = {
				tag: data.tag,
				attrs: attrs,
				children: children,
				nodes: [node]
			}
	
			unloadCachedControllers(cached, views, controllers)
	
			if (cached.children && !cached.children.nodes) {
				cached.children.nodes = []
			}
	
			// edge case: setting value on <select> doesn't work before children
			// exist, so set it again after children have been created
			if (data.tag === "select" && "value" in data.attrs) {
				setAttributes(node, data.tag, {value: data.attrs.value}, {},
					namespace)
			}
	
			return cached
		}
	
		function getController(views, view, cachedControllers, controller) {
			var controllerIndex
	
			if (m.redraw.strategy() === "diff" && views) {
				controllerIndex = views.indexOf(view)
			} else {
				controllerIndex = -1
			}
	
			if (controllerIndex > -1) {
				return cachedControllers[controllerIndex]
			} else if (isFunction(controller)) {
				return new controller()
			} else {
				return {}
			}
		}
	
		var unloaders = []
	
		function updateLists(views, controllers, view, controller) {
			if (controller.onunload != null && unloaders.map(function(u) {return u.handler}).indexOf(controller.onunload) < 0) {
				unloaders.push({
					controller: controller,
					handler: controller.onunload
				})
			}
	
			views.push(view)
			controllers.push(controller)
		}
	
		var forcing = false
		function checkView(data, view, cached, cachedControllers, controllers, views) {
			var controller = getController(cached.views, view, cachedControllers, data.controller)
			var key = data && data.attrs && data.attrs.key
			data = pendingRequests === 0 || forcing || cachedControllers && cachedControllers.indexOf(controller) > -1 ? data.view(controller) : {tag: "placeholder"}
			if (data.subtree === "retain") return data;
			data.attrs = data.attrs || {}
			data.attrs.key = key
			updateLists(views, controllers, view, controller)
			return data
		}
	
		function markViews(data, cached, views, controllers) {
			var cachedControllers = cached && cached.controllers
	
			while (data.view != null) {
				data = checkView(
					data,
					data.view.$original || data.view,
					cached,
					cachedControllers,
					controllers,
					views)
			}
	
			return data
		}
	
		function buildObject( // eslint-disable-line max-statements
			data,
			cached,
			editable,
			parentElement,
			index,
			shouldReattach,
			namespace,
			configs
		) {
			var views = []
			var controllers = []
	
			data = markViews(data, cached, views, controllers)
	
			if (data.subtree === "retain") return cached
	
			if (!data.tag && controllers.length) {
				throw new Error("Component template must return a virtual " +
					"element, not an array, string, etc.")
			}
	
			data.attrs = data.attrs || {}
			cached.attrs = cached.attrs || {}
	
			var dataAttrKeys = Object.keys(data.attrs)
			var hasKeys = dataAttrKeys.length > ("key" in data.attrs ? 1 : 0)
	
			maybeRecreateObject(data, cached, dataAttrKeys)
	
			if (!isString(data.tag)) return
	
			var isNew = cached.nodes.length === 0
	
			namespace = getObjectNamespace(data, namespace)
	
			var node
			if (isNew) {
				node = constructNode(data, namespace)
				// set attributes first, then create children
				var attrs = constructAttrs(data, node, namespace, hasKeys)
	
				var children = constructChildren(data, node, cached, editable,
					namespace, configs)
	
				cached = reconstructCached(
					data,
					attrs,
					children,
					node,
					namespace,
					views,
					controllers)
			} else {
				node = buildUpdatedNode(
					cached,
					data,
					editable,
					hasKeys,
					namespace,
					views,
					configs,
					controllers)
			}
	
			if (isNew || shouldReattach === true && node != null) {
				insertNode(parentElement, node, index)
			}
	
			// The configs are called after `build` finishes running
			scheduleConfigsToBeCalled(configs, data, node, isNew, cached)
	
			return cached
		}
	
		function build(
			parentElement,
			parentTag,
			parentCache,
			parentIndex,
			data,
			cached,
			shouldReattach,
			index,
			editable,
			namespace,
			configs
		) {
			/*
			 * `build` is a recursive function that manages creation/diffing/removal
			 * of DOM elements based on comparison between `data` and `cached` the
			 * diff algorithm can be summarized as this:
			 *
			 * 1 - compare `data` and `cached`
			 * 2 - if they are different, copy `data` to `cached` and update the DOM
			 *     based on what the difference is
			 * 3 - recursively apply this algorithm for every array and for the
			 *     children of every virtual element
			 *
			 * The `cached` data structure is essentially the same as the previous
			 * redraw's `data` data structure, with a few additions:
			 * - `cached` always has a property called `nodes`, which is a list of
			 *    DOM elements that correspond to the data represented by the
			 *    respective virtual element
			 * - in order to support attaching `nodes` as a property of `cached`,
			 *    `cached` is *always* a non-primitive object, i.e. if the data was
			 *    a string, then cached is a String instance. If data was `null` or
			 *    `undefined`, cached is `new String("")`
			 * - `cached also has a `configContext` property, which is the state
			 *    storage object exposed by config(element, isInitialized, context)
			 * - when `cached` is an Object, it represents a virtual element; when
			 *    it's an Array, it represents a list of elements; when it's a
			 *    String, Number or Boolean, it represents a text node
			 *
			 * `parentElement` is a DOM element used for W3C DOM API calls
			 * `parentTag` is only used for handling a corner case for textarea
			 * values
			 * `parentCache` is used to remove nodes in some multi-node cases
			 * `parentIndex` and `index` are used to figure out the offset of nodes.
			 * They're artifacts from before arrays started being flattened and are
			 * likely refactorable
			 * `data` and `cached` are, respectively, the new and old nodes being
			 * diffed
			 * `shouldReattach` is a flag indicating whether a parent node was
			 * recreated (if so, and if this node is reused, then this node must
			 * reattach itself to the new parent)
			 * `editable` is a flag that indicates whether an ancestor is
			 * contenteditable
			 * `namespace` indicates the closest HTML namespace as it cascades down
			 * from an ancestor
			 * `configs` is a list of config functions to run after the topmost
			 * `build` call finishes running
			 *
			 * there's logic that relies on the assumption that null and undefined
			 * data are equivalent to empty strings
			 * - this prevents lifecycle surprises from procedural helpers that mix
			 *   implicit and explicit return statements (e.g.
			 *   function foo() {if (cond) return m("div")}
			 * - it simplifies diffing code
			 */
			data = dataToString(data)
			if (data.subtree === "retain") return cached
			cached = makeCache(data, cached, index, parentIndex, parentCache)
	
			if (isArray(data)) {
				return buildArray(
					data,
					cached,
					parentElement,
					index,
					parentTag,
					shouldReattach,
					editable,
					namespace,
					configs)
			} else if (data != null && isObject(data)) {
				return buildObject(
					data,
					cached,
					editable,
					parentElement,
					index,
					shouldReattach,
					namespace,
					configs)
			} else if (!isFunction(data)) {
				return handleTextNode(
					cached,
					data,
					index,
					parentElement,
					shouldReattach,
					editable,
					parentTag)
			} else {
				return cached
			}
		}
	
		function sortChanges(a, b) {
			return a.action - b.action || a.index - b.index
		}
	
		function copyStyleAttrs(node, dataAttr, cachedAttr) {
			for (var rule in dataAttr) if (hasOwn.call(dataAttr, rule)) {
				if (cachedAttr == null || cachedAttr[rule] !== dataAttr[rule]) {
					node.style[rule] = dataAttr[rule]
				}
			}
	
			for (rule in cachedAttr) if (hasOwn.call(cachedAttr, rule)) {
				if (!hasOwn.call(dataAttr, rule)) node.style[rule] = ""
			}
		}
	
		var shouldUseSetAttribute = {
			list: 1,
			style: 1,
			form: 1,
			type: 1,
			width: 1,
			height: 1
		}
	
		function setSingleAttr(
			node,
			attrName,
			dataAttr,
			cachedAttr,
			tag,
			namespace
		) {
			if (attrName === "config" || attrName === "key") {
				// `config` isn't a real attribute, so ignore it
				return true
			} else if (isFunction(dataAttr) && attrName.slice(0, 2) === "on") {
				// hook event handlers to the auto-redrawing system
				node[attrName] = autoredraw(dataAttr, node)
			} else if (attrName === "style" && dataAttr != null &&
					isObject(dataAttr)) {
				// handle `style: {...}`
				copyStyleAttrs(node, dataAttr, cachedAttr)
			} else if (namespace != null) {
				// handle SVG
				if (attrName === "href") {
					node.setAttributeNS("http://www.w3.org/1999/xlink",
						"href", dataAttr)
				} else {
					node.setAttribute(
						attrName === "className" ? "class" : attrName,
						dataAttr)
				}
			} else if (attrName in node && !shouldUseSetAttribute[attrName]) {
				// handle cases that are properties (but ignore cases where we
				// should use setAttribute instead)
				//
				// - list and form are typically used as strings, but are DOM
				//   element references in js
				//
				// - when using CSS selectors (e.g. `m("[style='']")`), style is
				//   used as a string, but it's an object in js
				//
				// #348 don't set the value if not needed - otherwise, cursor
				// placement breaks in Chrome
				try {
					if (tag !== "input" || node[attrName] !== dataAttr) {
						node[attrName] = dataAttr
					}
				} catch (e) {
					node.setAttribute(attrName, dataAttr)
				}
			}
			else node.setAttribute(attrName, dataAttr)
		}
	
		function trySetAttr(
			node,
			attrName,
			dataAttr,
			cachedAttr,
			cachedAttrs,
			tag,
			namespace
		) {
			if (!(attrName in cachedAttrs) || (cachedAttr !== dataAttr)) {
				cachedAttrs[attrName] = dataAttr
				try {
					return setSingleAttr(
						node,
						attrName,
						dataAttr,
						cachedAttr,
						tag,
						namespace)
				} catch (e) {
					// swallow IE's invalid argument errors to mimic HTML's
					// fallback-to-doing-nothing-on-invalid-attributes behavior
					if (e.message.indexOf("Invalid argument") < 0) throw e
				}
			} else if (attrName === "value" && tag === "input" &&
					node.value !== dataAttr) {
				// #348 dataAttr may not be a string, so use loose comparison
				node.value = dataAttr
			}
		}
	
		function setAttributes(node, tag, dataAttrs, cachedAttrs, namespace) {
			for (var attrName in dataAttrs) if (hasOwn.call(dataAttrs, attrName)) {
				if (trySetAttr(
						node,
						attrName,
						dataAttrs[attrName],
						cachedAttrs[attrName],
						cachedAttrs,
						tag,
						namespace)) {
					continue
				}
			}
			return cachedAttrs
		}
	
		function clear(nodes, cached) {
			for (var i = nodes.length - 1; i > -1; i--) {
				if (nodes[i] && nodes[i].parentNode) {
					try {
						nodes[i].parentNode.removeChild(nodes[i])
					} catch (e) {
						/* eslint-disable max-len */
						// ignore if this fails due to order of events (see
						// http://stackoverflow.com/questions/21926083/failed-to-execute-removechild-on-node)
						/* eslint-enable max-len */
					}
					cached = [].concat(cached)
					if (cached[i]) unload(cached[i])
				}
			}
			// release memory if nodes is an array. This check should fail if nodes
			// is a NodeList (see loop above)
			if (nodes.length) {
				nodes.length = 0
			}
		}
	
		function unload(cached) {
			if (cached.configContext && isFunction(cached.configContext.onunload)) {
				cached.configContext.onunload()
				cached.configContext.onunload = null
			}
			if (cached.controllers) {
				forEach(cached.controllers, function (controller) {
					if (isFunction(controller.onunload)) {
						controller.onunload({preventDefault: noop})
					}
				})
			}
			if (cached.children) {
				if (isArray(cached.children)) forEach(cached.children, unload)
				else if (cached.children.tag) unload(cached.children)
			}
		}
	
		function appendTextFragment(parentElement, data) {
			try {
				parentElement.appendChild(
					$document.createRange().createContextualFragment(data))
			} catch (e) {
				parentElement.insertAdjacentHTML("beforeend", data)
			}
		}
	
		function injectHTML(parentElement, index, data) {
			var nextSibling = parentElement.childNodes[index]
			if (nextSibling) {
				var isElement = nextSibling.nodeType !== 1
				var placeholder = $document.createElement("span")
				if (isElement) {
					parentElement.insertBefore(placeholder, nextSibling || null)
					placeholder.insertAdjacentHTML("beforebegin", data)
					parentElement.removeChild(placeholder)
				} else {
					nextSibling.insertAdjacentHTML("beforebegin", data)
				}
			} else {
				appendTextFragment(parentElement, data)
			}
	
			var nodes = []
	
			while (parentElement.childNodes[index] !== nextSibling) {
				nodes.push(parentElement.childNodes[index])
				index++
			}
	
			return nodes
		}
	
		function autoredraw(callback, object) {
			return function (e) {
				e = e || event
				m.redraw.strategy("diff")
				m.startComputation()
				try {
					return callback.call(object, e)
				} finally {
					endFirstComputation()
				}
			}
		}
	
		var html
		var documentNode = {
			appendChild: function (node) {
				if (html === undefined) html = $document.createElement("html")
				if ($document.documentElement &&
						$document.documentElement !== node) {
					$document.replaceChild(node, $document.documentElement)
				} else {
					$document.appendChild(node)
				}
	
				this.childNodes = $document.childNodes
			},
	
			insertBefore: function (node) {
				this.appendChild(node)
			},
	
			childNodes: []
		}
	
		var nodeCache = []
		var cellCache = {}
	
		m.render = function (root, cell, forceRecreation) {
			if (!root) {
				throw new Error("Ensure the DOM element being passed to " +
					"m.route/m.mount/m.render is not undefined.")
			}
			var configs = []
			var id = getCellCacheKey(root)
			var isDocumentRoot = root === $document
			var node
	
			if (isDocumentRoot || root === $document.documentElement) {
				node = documentNode
			} else {
				node = root
			}
	
			if (isDocumentRoot && cell.tag !== "html") {
				cell = {tag: "html", attrs: {}, children: cell}
			}
	
			if (cellCache[id] === undefined) clear(node.childNodes)
			if (forceRecreation === true) reset(root)
	
			cellCache[id] = build(
				node,
				null,
				undefined,
				undefined,
				cell,
				cellCache[id],
				false,
				0,
				null,
				undefined,
				configs)
	
			forEach(configs, function (config) { config() })
		}
	
		function getCellCacheKey(element) {
			var index = nodeCache.indexOf(element)
			return index < 0 ? nodeCache.push(element) - 1 : index
		}
	
		m.trust = function (value) {
			value = new String(value) // eslint-disable-line no-new-wrappers
			value.$trusted = true
			return value
		}
	
		function gettersetter(store) {
			function prop() {
				if (arguments.length) store = arguments[0]
				return store
			}
	
			prop.toJSON = function () {
				return store
			}
	
			return prop
		}
	
		m.prop = function (store) {
			if ((store != null && isObject(store) || isFunction(store)) &&
					isFunction(store.then)) {
				return propify(store)
			}
	
			return gettersetter(store)
		}
	
		var roots = []
		var components = []
		var controllers = []
		var lastRedrawId = null
		var lastRedrawCallTime = 0
		var computePreRedrawHook = null
		var computePostRedrawHook = null
		var topComponent
		var FRAME_BUDGET = 16 // 60 frames per second = 1 call per 16 ms
	
		function parameterize(component, args) {
			function controller() {
				/* eslint-disable no-invalid-this */
				return (component.controller || noop).apply(this, args) || this
				/* eslint-enable no-invalid-this */
			}
	
			if (component.controller) {
				controller.prototype = component.controller.prototype
			}
	
			function view(ctrl) {
				var currentArgs = [ctrl].concat(args)
				for (var i = 1; i < arguments.length; i++) {
					currentArgs.push(arguments[i])
				}
	
				return component.view.apply(component, currentArgs)
			}
	
			view.$original = component.view
			var output = {controller: controller, view: view}
			if (args[0] && args[0].key != null) output.attrs = {key: args[0].key}
			return output
		}
	
		m.component = function (component) {
			var args = [].slice.call(arguments, 1)
	
			return parameterize(component, args)
		}
	
		function checkPrevented(component, root, index, isPrevented) {
			if (!isPrevented) {
				m.redraw.strategy("all")
				m.startComputation()
				roots[index] = root
				var currentComponent
	
				if (component) {
					currentComponent = topComponent = component
				} else {
					currentComponent = topComponent = component = {controller: noop}
				}
	
				var controller = new (component.controller || noop)()
	
				// controllers may call m.mount recursively (via m.route redirects,
				// for example)
				// this conditional ensures only the last recursive m.mount call is
				// applied
				if (currentComponent === topComponent) {
					controllers[index] = controller
					components[index] = component
				}
				endFirstComputation()
				if (component === null) {
					removeRootElement(root, index)
				}
				return controllers[index]
			} else if (component == null) {
				removeRootElement(root, index)
			}
		}
	
		m.mount = m.module = function (root, component) {
			if (!root) {
				throw new Error("Please ensure the DOM element exists before " +
					"rendering a template into it.")
			}
	
			var index = roots.indexOf(root)
			if (index < 0) index = roots.length
	
			var isPrevented = false
			var event = {
				preventDefault: function () {
					isPrevented = true
					computePreRedrawHook = computePostRedrawHook = null
				}
			}
	
			forEach(unloaders, function (unloader) {
				unloader.handler.call(unloader.controller, event)
				unloader.controller.onunload = null
			})
	
			if (isPrevented) {
				forEach(unloaders, function (unloader) {
					unloader.controller.onunload = unloader.handler
				})
			} else {
				unloaders = []
			}
	
			if (controllers[index] && isFunction(controllers[index].onunload)) {
				controllers[index].onunload(event)
			}
	
			return checkPrevented(component, root, index, isPrevented)
		}
	
		function removeRootElement(root, index) {
			roots.splice(index, 1)
			controllers.splice(index, 1)
			components.splice(index, 1)
			reset(root)
			nodeCache.splice(getCellCacheKey(root), 1)
		}
	
		var redrawing = false
		m.redraw = function (force) {
			if (redrawing) return
			redrawing = true
			if (force) forcing = true
	
			try {
				// lastRedrawId is a positive number if a second redraw is requested
				// before the next animation frame
				// lastRedrawID is null if it's the first redraw and not an event
				// handler
				if (lastRedrawId && !force) {
					// when setTimeout: only reschedule redraw if time between now
					// and previous redraw is bigger than a frame, otherwise keep
					// currently scheduled timeout
					// when rAF: always reschedule redraw
					if ($requestAnimationFrame === global.requestAnimationFrame ||
							new Date() - lastRedrawCallTime > FRAME_BUDGET) {
						if (lastRedrawId > 0) $cancelAnimationFrame(lastRedrawId)
						lastRedrawId = $requestAnimationFrame(redraw, FRAME_BUDGET)
					}
				} else {
					redraw()
					lastRedrawId = $requestAnimationFrame(function () {
						lastRedrawId = null
					}, FRAME_BUDGET)
				}
			} finally {
				redrawing = forcing = false
			}
		}
	
		m.redraw.strategy = m.prop()
		function redraw() {
			if (computePreRedrawHook) {
				computePreRedrawHook()
				computePreRedrawHook = null
			}
			forEach(roots, function (root, i) {
				var component = components[i]
				if (controllers[i]) {
					var args = [controllers[i]]
					m.render(root,
						component.view ? component.view(controllers[i], args) : "")
				}
			})
			// after rendering within a routed context, we need to scroll back to
			// the top, and fetch the document title for history.pushState
			if (computePostRedrawHook) {
				computePostRedrawHook()
				computePostRedrawHook = null
			}
			lastRedrawId = null
			lastRedrawCallTime = new Date()
			m.redraw.strategy("diff")
		}
	
		function endFirstComputation() {
			if (m.redraw.strategy() === "none") {
				pendingRequests--
				m.redraw.strategy("diff")
			} else {
				m.endComputation()
			}
		}
	
		m.withAttr = function (prop, withAttrCallback, callbackThis) {
			return function (e) {
				e = e || event
				/* eslint-disable no-invalid-this */
				var currentTarget = e.currentTarget || this
				var _this = callbackThis || this
				/* eslint-enable no-invalid-this */
				var target = prop in currentTarget ?
					currentTarget[prop] :
					currentTarget.getAttribute(prop)
				withAttrCallback.call(_this, target)
			}
		}
	
		// routing
		var modes = {pathname: "", hash: "#", search: "?"}
		var redirect = noop
		var isDefaultRoute = false
		var routeParams, currentRoute
	
		m.route = function (root, arg1, arg2, vdom) { // eslint-disable-line
			// m.route()
			if (arguments.length === 0) return currentRoute
			// m.route(el, defaultRoute, routes)
			if (arguments.length === 3 && isString(arg1)) {
				redirect = function (source) {
					var path = currentRoute = normalizeRoute(source)
					if (!routeByValue(root, arg2, path)) {
						if (isDefaultRoute) {
							throw new Error("Ensure the default route matches " +
								"one of the routes defined in m.route")
						}
	
						isDefaultRoute = true
						m.route(arg1, true)
						isDefaultRoute = false
					}
				}
	
				var listener = m.route.mode === "hash" ?
					"onhashchange" :
					"onpopstate"
	
				global[listener] = function () {
					var path = $location[m.route.mode]
					if (m.route.mode === "pathname") path += $location.search
					if (currentRoute !== normalizeRoute(path)) redirect(path)
				}
	
				computePreRedrawHook = setScroll
				global[listener]()
	
				return
			}
	
			// config: m.route
			if (root.addEventListener || root.attachEvent) {
				var base = m.route.mode !== "pathname" ? $location.pathname : ""
				root.href = base + modes[m.route.mode] + vdom.attrs.href
				if (root.addEventListener) {
					root.removeEventListener("click", routeUnobtrusive)
					root.addEventListener("click", routeUnobtrusive)
				} else {
					root.detachEvent("onclick", routeUnobtrusive)
					root.attachEvent("onclick", routeUnobtrusive)
				}
	
				return
			}
			// m.route(route, params, shouldReplaceHistoryEntry)
			if (isString(root)) {
				var oldRoute = currentRoute
				currentRoute = root
	
				var args = arg1 || {}
				var queryIndex = currentRoute.indexOf("?")
				var params
	
				if (queryIndex > -1) {
					params = parseQueryString(currentRoute.slice(queryIndex + 1))
				} else {
					params = {}
				}
	
				for (var i in args) if (hasOwn.call(args, i)) {
					params[i] = args[i]
				}
	
				var querystring = buildQueryString(params)
				var currentPath
	
				if (queryIndex > -1) {
					currentPath = currentRoute.slice(0, queryIndex)
				} else {
					currentPath = currentRoute
				}
	
				if (querystring) {
					currentRoute = currentPath +
						(currentPath.indexOf("?") === -1 ? "?" : "&") +
						querystring
				}
	
				var replaceHistory =
					(arguments.length === 3 ? arg2 : arg1) === true ||
					oldRoute === root
	
				if (global.history.pushState) {
					var method = replaceHistory ? "replaceState" : "pushState"
					computePreRedrawHook = setScroll
					computePostRedrawHook = function () {
						global.history[method](null, $document.title,
							modes[m.route.mode] + currentRoute)
					}
					redirect(modes[m.route.mode] + currentRoute)
				} else {
					$location[m.route.mode] = currentRoute
					redirect(modes[m.route.mode] + currentRoute)
				}
			}
		}
	
		m.route.param = function (key) {
			if (!routeParams) {
				throw new Error("You must call m.route(element, defaultRoute, " +
					"routes) before calling m.route.param()")
			}
	
			if (!key) {
				return routeParams
			}
	
			return routeParams[key]
		}
	
		m.route.mode = "search"
	
		function normalizeRoute(route) {
			return route.slice(modes[m.route.mode].length)
		}
	
		function routeByValue(root, router, path) {
			routeParams = {}
	
			var queryStart = path.indexOf("?")
			if (queryStart !== -1) {
				routeParams = parseQueryString(
					path.substr(queryStart + 1, path.length))
				path = path.substr(0, queryStart)
			}
	
			// Get all routes and check if there's
			// an exact match for the current path
			var keys = Object.keys(router)
			var index = keys.indexOf(path)
	
			if (index !== -1){
				m.mount(root, router[keys [index]])
				return true
			}
	
			for (var route in router) if (hasOwn.call(router, route)) {
				if (route === path) {
					m.mount(root, router[route])
					return true
				}
	
				var matcher = new RegExp("^" + route
					.replace(/:[^\/]+?\.{3}/g, "(.*?)")
					.replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")
	
				if (matcher.test(path)) {
					/* eslint-disable no-loop-func */
					path.replace(matcher, function () {
						var keys = route.match(/:[^\/]+/g) || []
						var values = [].slice.call(arguments, 1, -2)
						forEach(keys, function (key, i) {
							routeParams[key.replace(/:|\./g, "")] =
								decodeURIComponent(values[i])
						})
						m.mount(root, router[route])
					})
					/* eslint-enable no-loop-func */
					return true
				}
			}
		}
	
		function routeUnobtrusive(e) {
			e = e || event
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
	
			if (e.preventDefault) {
				e.preventDefault()
			} else {
				e.returnValue = false
			}
	
			var currentTarget = e.currentTarget || e.srcElement
			var args
	
			if (m.route.mode === "pathname" && currentTarget.search) {
				args = parseQueryString(currentTarget.search.slice(1))
			} else {
				args = {}
			}
	
			while (currentTarget && !/a/i.test(currentTarget.nodeName)) {
				currentTarget = currentTarget.parentNode
			}
	
			// clear pendingRequests because we want an immediate route change
			pendingRequests = 0
			m.route(currentTarget[m.route.mode]
				.slice(modes[m.route.mode].length), args)
		}
	
		function setScroll() {
			if (m.route.mode !== "hash" && $location.hash) {
				$location.hash = $location.hash
			} else {
				global.scrollTo(0, 0)
			}
		}
	
		function buildQueryString(object, prefix) {
			var duplicates = {}
			var str = []
	
			for (var prop in object) if (hasOwn.call(object, prop)) {
				var key = prefix ? prefix + "[" + prop + "]" : prop
				var value = object[prop]
	
				if (value === null) {
					str.push(encodeURIComponent(key))
				} else if (isObject(value)) {
					str.push(buildQueryString(value, key))
				} else if (isArray(value)) {
					var keys = []
					duplicates[key] = duplicates[key] || {}
					/* eslint-disable no-loop-func */
					forEach(value, function (item) {
						/* eslint-enable no-loop-func */
						if (!duplicates[key][item]) {
							duplicates[key][item] = true
							keys.push(encodeURIComponent(key) + "=" +
								encodeURIComponent(item))
						}
					})
					str.push(keys.join("&"))
				} else if (value !== undefined) {
					str.push(encodeURIComponent(key) + "=" +
						encodeURIComponent(value))
				}
			}
			return str.join("&")
		}
	
		function parseQueryString(str) {
			if (str === "" || str == null) return {}
			if (str.charAt(0) === "?") str = str.slice(1)
	
			var pairs = str.split("&")
			var params = {}
	
			forEach(pairs, function (string) {
				var pair = string.split("=")
				var key = decodeURIComponent(pair[0])
				var value = pair.length === 2 ? decodeURIComponent(pair[1]) : null
				if (params[key] != null) {
					if (!isArray(params[key])) params[key] = [params[key]]
					params[key].push(value)
				}
				else params[key] = value
			})
	
			return params
		}
	
		m.route.buildQueryString = buildQueryString
		m.route.parseQueryString = parseQueryString
	
		function reset(root) {
			var cacheKey = getCellCacheKey(root)
			clear(root.childNodes, cellCache[cacheKey])
			cellCache[cacheKey] = undefined
		}
	
		m.deferred = function () {
			var deferred = new Deferred()
			deferred.promise = propify(deferred.promise)
			return deferred
		}
	
		function propify(promise, initialValue) {
			var prop = m.prop(initialValue)
			promise.then(prop)
			prop.then = function (resolve, reject) {
				return propify(promise.then(resolve, reject), initialValue)
			}
	
			prop.catch = prop.then.bind(null, null)
			return prop
		}
		// Promiz.mithril.js | Zolmeister | MIT
		// a modified version of Promiz.js, which does not conform to Promises/A+
		// for two reasons:
		//
		// 1) `then` callbacks are called synchronously (because setTimeout is too
		//    slow, and the setImmediate polyfill is too big
		//
		// 2) throwing subclasses of Error cause the error to be bubbled up instead
		//    of triggering rejection (because the spec does not account for the
		//    important use case of default browser error handling, i.e. message w/
		//    line number)
	
		var RESOLVING = 1
		var REJECTING = 2
		var RESOLVED = 3
		var REJECTED = 4
	
		function Deferred(onSuccess, onFailure) {
			var self = this
			var state = 0
			var promiseValue = 0
			var next = []
	
			self.promise = {}
	
			self.resolve = function (value) {
				if (!state) {
					promiseValue = value
					state = RESOLVING
	
					fire()
				}
	
				return self
			}
	
			self.reject = function (value) {
				if (!state) {
					promiseValue = value
					state = REJECTING
	
					fire()
				}
	
				return self
			}
	
			self.promise.then = function (onSuccess, onFailure) {
				var deferred = new Deferred(onSuccess, onFailure)
	
				if (state === RESOLVED) {
					deferred.resolve(promiseValue)
				} else if (state === REJECTED) {
					deferred.reject(promiseValue)
				} else {
					next.push(deferred)
				}
	
				return deferred.promise
			}
	
			function finish(type) {
				state = type || REJECTED
				next.map(function (deferred) {
					if (state === RESOLVED) {
						deferred.resolve(promiseValue)
					} else {
						deferred.reject(promiseValue)
					}
				})
			}
	
			function thennable(then, success, failure, notThennable) {
				if (((promiseValue != null && isObject(promiseValue)) ||
						isFunction(promiseValue)) && isFunction(then)) {
					try {
						// count protects against abuse calls from spec checker
						var count = 0
						then.call(promiseValue, function (value) {
							if (count++) return
							promiseValue = value
							success()
						}, function (value) {
							if (count++) return
							promiseValue = value
							failure()
						})
					} catch (e) {
						m.deferred.onerror(e)
						promiseValue = e
						failure()
					}
				} else {
					notThennable()
				}
			}
	
			function fire() {
				// check if it's a thenable
				var then
				try {
					then = promiseValue && promiseValue.then
				} catch (e) {
					m.deferred.onerror(e)
					promiseValue = e
					state = REJECTING
					return fire()
				}
	
				if (state === REJECTING) {
					m.deferred.onerror(promiseValue)
				}
	
				thennable(then, function () {
					state = RESOLVING
					fire()
				}, function () {
					state = REJECTING
					fire()
				}, function () {
					try {
						if (state === RESOLVING && isFunction(onSuccess)) {
							promiseValue = onSuccess(promiseValue)
						} else if (state === REJECTING && isFunction(onFailure)) {
							promiseValue = onFailure(promiseValue)
							state = RESOLVING
						}
					} catch (e) {
						m.deferred.onerror(e)
						promiseValue = e
						return finish()
					}
	
					if (promiseValue === self) {
						promiseValue = TypeError()
						finish()
					} else {
						thennable(then, function () {
							finish(RESOLVED)
						}, finish, function () {
							finish(state === RESOLVING && RESOLVED)
						})
					}
				})
			}
		}
	
		m.deferred.onerror = function (e) {
			if (type.call(e) === "[object Error]" &&
					!/ Error/.test(e.constructor.toString())) {
				pendingRequests = 0
				throw e
			}
		}
	
		m.sync = function (args) {
			var deferred = m.deferred()
			var outstanding = args.length
			var results = new Array(outstanding)
			var method = "resolve"
	
			function synchronizer(pos, resolved) {
				return function (value) {
					results[pos] = value
					if (!resolved) method = "reject"
					if (--outstanding === 0) {
						deferred.promise(results)
						deferred[method](results)
					}
					return value
				}
			}
	
			if (args.length > 0) {
				forEach(args, function (arg, i) {
					arg.then(synchronizer(i, true), synchronizer(i, false))
				})
			} else {
				deferred.resolve([])
			}
	
			return deferred.promise
		}
	
		function identity(value) { return value }
	
		function handleJsonp(options) {
			var callbackKey = "mithril_callback_" +
				new Date().getTime() + "_" +
				(Math.round(Math.random() * 1e16)).toString(36)
	
			var script = $document.createElement("script")
	
			global[callbackKey] = function (resp) {
				script.parentNode.removeChild(script)
				options.onload({
					type: "load",
					target: {
						responseText: resp
					}
				})
				global[callbackKey] = undefined
			}
	
			script.onerror = function () {
				script.parentNode.removeChild(script)
	
				options.onerror({
					type: "error",
					target: {
						status: 500,
						responseText: JSON.stringify({
							error: "Error making jsonp request"
						})
					}
				})
				global[callbackKey] = undefined
	
				return false
			}
	
			script.onload = function () {
				return false
			}
	
			script.src = options.url +
				(options.url.indexOf("?") > 0 ? "&" : "?") +
				(options.callbackKey ? options.callbackKey : "callback") +
				"=" + callbackKey +
				"&" + buildQueryString(options.data || {})
	
			$document.body.appendChild(script)
		}
	
		function createXhr(options) {
			var xhr = new global.XMLHttpRequest()
			xhr.open(options.method, options.url, true, options.user,
				options.password)
	
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status >= 200 && xhr.status < 300) {
						options.onload({type: "load", target: xhr})
					} else {
						options.onerror({type: "error", target: xhr})
					}
				}
			}
	
			if (options.serialize === JSON.stringify &&
					options.data &&
					options.method !== "GET") {
				xhr.setRequestHeader("Content-Type",
					"application/json; charset=utf-8")
			}
	
			if (options.deserialize === JSON.parse) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
	
			if (isFunction(options.config)) {
				var maybeXhr = options.config(xhr, options)
				if (maybeXhr != null) xhr = maybeXhr
			}
	
			var data = options.method === "GET" || !options.data ? "" : options.data
	
			if (data && !isString(data) && data.constructor !== global.FormData) {
				throw new Error("Request data should be either be a string or " +
					"FormData. Check the `serialize` option in `m.request`")
			}
	
			xhr.send(data)
			return xhr
		}
	
		function ajax(options) {
			if (options.dataType && options.dataType.toLowerCase() === "jsonp") {
				return handleJsonp(options)
			} else {
				return createXhr(options)
			}
		}
	
		function bindData(options, data, serialize) {
			if (options.method === "GET" && options.dataType !== "jsonp") {
				var prefix = options.url.indexOf("?") < 0 ? "?" : "&"
				var querystring = buildQueryString(data)
				options.url += (querystring ? prefix + querystring : "")
			} else {
				options.data = serialize(data)
			}
		}
	
		function parameterizeUrl(url, data) {
			if (data) {
				url = url.replace(/:[a-z]\w+/gi, function(token){
					var key = token.slice(1)
					var value = data[key]
					delete data[key]
					return value
				})
			}
			return url
		}
	
		m.request = function (options) {
			if (options.background !== true) m.startComputation()
			var deferred = new Deferred()
			var isJSONP = options.dataType &&
				options.dataType.toLowerCase() === "jsonp"
	
			var serialize, deserialize, extract
	
			if (isJSONP) {
				serialize = options.serialize =
				deserialize = options.deserialize = identity
	
				extract = function (jsonp) { return jsonp.responseText }
			} else {
				serialize = options.serialize = options.serialize || JSON.stringify
	
				deserialize = options.deserialize =
					options.deserialize || JSON.parse
				extract = options.extract || function (xhr) {
					if (xhr.responseText.length || deserialize !== JSON.parse) {
						return xhr.responseText
					} else {
						return null
					}
				}
			}
	
			options.method = (options.method || "GET").toUpperCase()
			options.url = parameterizeUrl(options.url, options.data)
			bindData(options, options.data, serialize)
			options.onload = options.onerror = function (ev) {
				try {
					ev = ev || event
					var response = deserialize(extract(ev.target, options))
					if (ev.type === "load") {
						if (options.unwrapSuccess) {
							response = options.unwrapSuccess(response, ev.target)
						}
	
						if (isArray(response) && options.type) {
							forEach(response, function (res, i) {
								response[i] = new options.type(res)
							})
						} else if (options.type) {
							response = new options.type(response)
						}
	
						deferred.resolve(response)
					} else {
						if (options.unwrapError) {
							response = options.unwrapError(response, ev.target)
						}
	
						deferred.reject(response)
					}
				} catch (e) {
					deferred.reject(e)
				} finally {
					if (options.background !== true) m.endComputation()
				}
			}
	
			ajax(options)
			deferred.promise = propify(deferred.promise, options.initialValue)
			return deferred.promise
		}
	
		return m
	})
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var validator = __webpack_require__(5);
	var m = __webpack_require__(2);
	
	module.exports = function promisedValidator(constraints, externalErrors) {
	  "use strict";
	
	  var validate = validator(constraints, externalErrors);
	
	  function api(model) {
	    var promise = m.deferred();
	    if (validate(model)) {
	      return promise.resolve(model).promise;
	    } else {
	      var errors = validate.errors();
	      errors.type = 'validation';
	      return promise.reject(errors).promise;
	    }
	  }
	
	  api.errors = validate.errors;
	
	  return api;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*
	
	API:
	
	import buildValidator from 'validator';
	const validation = buildValidator(function(model, errors){
	  if( ! model.name() ){ errors('name', 'name must be James') }
	  if( ! model.password() ){ errors('password', 'The password is required') }
	})
	
	if( ! validation(user) ){
	  validation.errors()
	}
	
	*/
	
	module.exports = function validator(constraints, externalErrors) {
	  var errors = externalErrors || __webpack_require__(6)();
	
	  var api = function api(model) {
	    errors.clear();
	    constraints(model, errors);
	    return !errors();
	  };
	
	  api.errors = errors;
	
	  return api;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _keys = __webpack_require__(7);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	
	# API example:
	
	let errors = require('errors');
	
	errors()                   => Return an object with all the errors  =>  { key: [messages] }
	errors('name')             => Return a list of errors for 'name' key
	errors('name', 'add name') => add error to the field name
	
	errors.clear()
	errors.load(
	  { 'email': [ 'error msg'], 'password': [ 'error msg 1', 'error msg 2' ] }
	)
	
	*/
	function allErrors(errors) {
	  return emptyObject(errors) ? null : errors;
	}
	function errorByKey(key, errors) {
	  return errors[key];
	}
	function setError(key, msg, errors) {
	  errors[key] = (errors[key] || []).concat(msg);
	}
	
	function emptyObject(obj) {
	  return (0, _keys2.default)(obj).length === 0;
	}
	
	var actions = [allErrors, errorByKey, setError];
	
	var errors = function errors() {
	  "use strict";
	
	  var errors = {};
	
	  var api = function api() {
	    var args = Array.prototype.slice.call(arguments, 0);
	    return actions[args.length].apply(null, args.concat(errors));
	  };
	
	  api.clear = function () {
	    errors = {};
	  };
	  api.load = function (loadErrors) {
	    errors = loadErrors;
	  };
	
	  return api;
	};
	
	module.exports = errors;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	module.exports = __webpack_require__(15).Object.keys;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(10);
	
	__webpack_require__(12)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(11);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(13)
	  , core    = __webpack_require__(15)
	  , fails   = __webpack_require__(18);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(14)
	  , core      = __webpack_require__(15)
	  , ctx       = __webpack_require__(16)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 14 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(17);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var m = __webpack_require__(2);
	var pipe = __webpack_require__(20);
	var takeFirst = __webpack_require__(37);
	
	var viewMap = function viewMap(errorMgs) {
	  return errorMgs ? errorMgs.map(function (errorMsg) {
	    return m('.error', errorMsg);
	  }) : "";
	};
	
	var renderErrorMsg = function renderErrorMsg(errors) {
	  return pipe(takeFirst, errors, viewMap);
	};
	var delegateTo = function delegateTo(target) {
	  return function (arg) {
	    return target.apply(null, arg);
	  };
	};
	
	/*
	
	# How to use:
	
	const errors = require('./inlineErrorView')
	errors({
	  'email': [ 'errors msg 1', 'errors msg 2' ],
	  'password': [ 'errors msg' ]
	})
	
	errors('email')
	// => [
	//  m('.error', 'error msg 1')
	//  m('.error', 'error msg 2')
	// ]
	
	errors('user')
	// => ''
	
	errors('user', 'the user must be not empty')
	errors('user')
	// => '[ m('.error', 'the user must be not empty') ]'
	
	*/
	
	module.exports = function (previousErrors) {
	  var errors = __webpack_require__(6)();
	
	  if (previousErrors) {
	    errors.load(previousErrors);
	  }
	
	  var api = function api() {
	    return (arguments.length === 1 ? renderErrorMsg(errors) : delegateTo(errors))(arguments);
	  };
	
	  api.clear = errors.clear;
	
	  return api;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(21);
	var _pipe = __webpack_require__(22);
	var reduce = __webpack_require__(23);
	var tail = __webpack_require__(33);
	
	
	/**
	 * Performs left-to-right function composition. The leftmost function may have
	 * any arity; the remaining functions must be unary.
	 *
	 * In some libraries this function is named `sequence`.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
	 * @param {...Function} functions
	 * @return {Function}
	 * @see R.compose
	 * @example
	 *
	 *      var f = R.pipe(Math.pow, R.negate, R.inc);
	 *
	 *      f(3, 4); // -(3^4) + 1
	 */
	module.exports = function pipe() {
	  if (arguments.length === 0) {
	    throw new Error('pipe requires at least one argument');
	  }
	  return _arity(arguments[0].length,
	                reduce(_pipe, arguments[0], tail(arguments)));
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function _arity(n, fn) {
	  /* eslint-disable no-unused-vars */
	  switch (n) {
	    case 0: return function() { return fn.apply(this, arguments); };
	    case 1: return function(a0) { return fn.apply(this, arguments); };
	    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
	    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
	    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
	    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
	    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
	    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
	    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
	    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
	    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
	    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	  }
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function _pipe(f, g) {
	  return function() {
	    return g.call(this, f.apply(this, arguments));
	  };
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var _curry3 = __webpack_require__(24);
	var _reduce = __webpack_require__(28);
	
	
	/**
	 * Returns a single item by iterating through the list, successively calling
	 * the iterator function and passing it an accumulator value and the current
	 * value from the array, and then passing the result to the next call.
	 *
	 * The iterator function receives two values: *(acc, value)*. It may use
	 * `R.reduced` to shortcut the iteration.
	 *
	 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
	 * arrays), unlike the native `Array.prototype.reduce` method. For more details
	 * on this behavior, see:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
	 *
	 * Dispatches to the `reduce` method of the third argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig ((a, b) -> a) -> a -> [b] -> a
	 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	 *        current element from the array.
	 * @param {*} acc The accumulator value.
	 * @param {Array} list The list to iterate over.
	 * @return {*} The final, accumulated value.
	 * @see R.reduced, R.addIndex
	 * @example
	 *
	 *      var numbers = [1, 2, 3];
	 *      var add = (a, b) => a + b;
	 *
	 *      R.reduce(add, 10, numbers); //=> 16
	 */
	module.exports = _curry3(_reduce);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(25);
	var _curry2 = __webpack_require__(27);
	var _isPlaceholder = __webpack_require__(26);
	
	
	/**
	 * Optimized internal three-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry3(fn) {
	  return function f3(a, b, c) {
	    switch (arguments.length) {
	      case 0:
	        return f3;
	      case 1:
	        return _isPlaceholder(a) ? f3
	             : _curry2(function(_b, _c) { return fn(a, _b, _c); });
	      case 2:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f3
	             : _isPlaceholder(a) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
	             : _isPlaceholder(b) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
	             : _curry1(function(_c) { return fn(a, b, _c); });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3
	             : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) { return fn(_a, _b, c); })
	             : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
	             : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
	             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b, c); })
	             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b, c); })
	             : _isPlaceholder(c) ? _curry1(function(_c) { return fn(a, b, _c); })
	             : fn(a, b, c);
	    }
	  };
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var _isPlaceholder = __webpack_require__(26);
	
	
	/**
	 * Optimized internal one-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry1(fn) {
	  return function f1(a) {
	    if (arguments.length === 0 || _isPlaceholder(a)) {
	      return f1;
	    } else {
	      return fn.apply(this, arguments);
	    }
	  };
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function _isPlaceholder(a) {
	  return a != null &&
	         typeof a === 'object' &&
	         a['@@functional/placeholder'] === true;
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(25);
	var _isPlaceholder = __webpack_require__(26);
	
	
	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    switch (arguments.length) {
	      case 0:
	        return f2;
	      case 1:
	        return _isPlaceholder(a) ? f2
	             : _curry1(function(_b) { return fn(a, _b); });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f2
	             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b); })
	             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b); })
	             : fn(a, b);
	    }
	  };
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var _xwrap = __webpack_require__(29);
	var bind = __webpack_require__(30);
	var isArrayLike = __webpack_require__(31);
	
	
	module.exports = (function() {
	  function _arrayReduce(xf, acc, list) {
	    var idx = 0;
	    var len = list.length;
	    while (idx < len) {
	      acc = xf['@@transducer/step'](acc, list[idx]);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      idx += 1;
	    }
	    return xf['@@transducer/result'](acc);
	  }
	
	  function _iterableReduce(xf, acc, iter) {
	    var step = iter.next();
	    while (!step.done) {
	      acc = xf['@@transducer/step'](acc, step.value);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      step = iter.next();
	    }
	    return xf['@@transducer/result'](acc);
	  }
	
	  function _methodReduce(xf, acc, obj) {
	    return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
	  }
	
	  var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
	  return function _reduce(fn, acc, list) {
	    if (typeof fn === 'function') {
	      fn = _xwrap(fn);
	    }
	    if (isArrayLike(list)) {
	      return _arrayReduce(fn, acc, list);
	    }
	    if (typeof list.reduce === 'function') {
	      return _methodReduce(fn, acc, list);
	    }
	    if (list[symIterator] != null) {
	      return _iterableReduce(fn, acc, list[symIterator]());
	    }
	    if (typeof list.next === 'function') {
	      return _iterableReduce(fn, acc, list);
	    }
	    throw new TypeError('reduce: list must be array or iterable');
	  };
	}());


/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = (function() {
	  function XWrap(fn) {
	    this.f = fn;
	  }
	  XWrap.prototype['@@transducer/init'] = function() {
	    throw new Error('init not implemented on XWrap');
	  };
	  XWrap.prototype['@@transducer/result'] = function(acc) { return acc; };
	  XWrap.prototype['@@transducer/step'] = function(acc, x) {
	    return this.f(acc, x);
	  };
	
	  return function _xwrap(fn) { return new XWrap(fn); };
	}());


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(21);
	var _curry2 = __webpack_require__(27);
	
	
	/**
	 * Creates a function that is bound to a context.
	 * Note: `R.bind` does not provide the additional argument-binding capabilities of
	 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	 *
	 * @func
	 * @memberOf R
	 * @since v0.6.0
	 * @category Function
	 * @category Object
	 * @sig (* -> *) -> {*} -> (* -> *)
	 * @param {Function} fn The function to bind to context
	 * @param {Object} thisObj The context to bind `fn` to
	 * @return {Function} A function that will execute in the context of `thisObj`.
	 * @see R.partial
	 */
	module.exports = _curry2(function bind(fn, thisObj) {
	  return _arity(fn.length, function() {
	    return fn.apply(thisObj, arguments);
	  });
	});


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(25);
	var _isArray = __webpack_require__(32);
	
	
	/**
	 * Tests whether or not an object is similar to an array.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.5.0
	 * @category Type
	 * @category List
	 * @sig * -> Boolean
	 * @param {*} x The object to test.
	 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
	 * @example
	 *
	 *      R.isArrayLike([]); //=> true
	 *      R.isArrayLike(true); //=> false
	 *      R.isArrayLike({}); //=> false
	 *      R.isArrayLike({length: 10}); //=> false
	 *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
	 */
	module.exports = _curry1(function isArrayLike(x) {
	  if (_isArray(x)) { return true; }
	  if (!x) { return false; }
	  if (typeof x !== 'object') { return false; }
	  if (x instanceof String) { return false; }
	  if (x.nodeType === 1) { return !!x.length; }
	  if (x.length === 0) { return true; }
	  if (x.length > 0) {
	    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
	  }
	  return false;
	});


/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * Tests whether or not an object is an array.
	 *
	 * @private
	 * @param {*} val The object to test.
	 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
	 * @example
	 *
	 *      _isArray([]); //=> true
	 *      _isArray(null); //=> false
	 *      _isArray({}); //=> false
	 */
	module.exports = Array.isArray || function _isArray(val) {
	  return (val != null &&
	          val.length >= 0 &&
	          Object.prototype.toString.call(val) === '[object Array]');
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var _checkForMethod = __webpack_require__(34);
	var slice = __webpack_require__(36);
	
	
	/**
	 * Returns all but the first element of the given list or string (or object
	 * with a `tail` method).
	 *
	 * Dispatches to the `slice` method of the first argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig [a] -> [a]
	 * @sig String -> String
	 * @param {*} list
	 * @return {*}
	 * @see R.head, R.init, R.last
	 * @example
	 *
	 *      R.tail([1, 2, 3]);  //=> [2, 3]
	 *      R.tail([1, 2]);     //=> [2]
	 *      R.tail([1]);        //=> []
	 *      R.tail([]);         //=> []
	 *
	 *      R.tail('abc');  //=> 'bc'
	 *      R.tail('ab');   //=> 'b'
	 *      R.tail('a');    //=> ''
	 *      R.tail('');     //=> ''
	 */
	module.exports = _checkForMethod('tail', slice(1, Infinity));


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var _isArray = __webpack_require__(32);
	var _slice = __webpack_require__(35);
	
	
	/**
	 * Similar to hasMethod, this checks whether a function has a [methodname]
	 * function. If it isn't an array it will execute that function otherwise it
	 * will default to the ramda implementation.
	 *
	 * @private
	 * @param {Function} fn ramda implemtation
	 * @param {String} methodname property to check for a custom implementation
	 * @return {Object} Whatever the return value of the method is.
	 */
	module.exports = function _checkForMethod(methodname, fn) {
	  return function() {
	    var length = arguments.length;
	    if (length === 0) {
	      return fn();
	    }
	    var obj = arguments[length - 1];
	    return (_isArray(obj) || typeof obj[methodname] !== 'function') ?
	      fn.apply(this, arguments) :
	      obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
	  };
	};


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * An optimized, private array `slice` implementation.
	 *
	 * @private
	 * @param {Arguments|Array} args The array or arguments object to consider.
	 * @param {Number} [from=0] The array index to slice from, inclusive.
	 * @param {Number} [to=args.length] The array index to slice to, exclusive.
	 * @return {Array} A new, sliced array.
	 * @example
	 *
	 *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
	 *
	 *      var firstThreeArgs = function(a, b, c, d) {
	 *        return _slice(arguments, 0, 3);
	 *      };
	 *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
	 */
	module.exports = function _slice(args, from, to) {
	  switch (arguments.length) {
	    case 1: return _slice(args, 0, args.length);
	    case 2: return _slice(args, from, args.length);
	    default:
	      var list = [];
	      var idx = 0;
	      var len = Math.max(0, Math.min(args.length, to) - from);
	      while (idx < len) {
	        list[idx] = args[from + idx];
	        idx += 1;
	      }
	      return list;
	  }
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var _checkForMethod = __webpack_require__(34);
	var _curry3 = __webpack_require__(24);
	
	
	/**
	 * Returns the elements of the given list or string (or object with a `slice`
	 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
	 *
	 * Dispatches to the `slice` method of the third argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.4
	 * @category List
	 * @sig Number -> Number -> [a] -> [a]
	 * @sig Number -> Number -> String -> String
	 * @param {Number} fromIndex The start index (inclusive).
	 * @param {Number} toIndex The end index (exclusive).
	 * @param {*} list
	 * @return {*}
	 * @example
	 *
	 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
	 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
	 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
	 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
	 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
	 */
	module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
	  return Array.prototype.slice.call(list, fromIndex, toIndex);
	}));


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var nth = __webpack_require__(38);
	
	
	/**
	 * Returns the first element of the given list or string. In some libraries
	 * this function is named `first`.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig [a] -> a | Undefined
	 * @sig String -> String
	 * @param {Array|String} list
	 * @return {*}
	 * @see R.tail, R.init, R.last
	 * @example
	 *
	 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
	 *      R.head([]); //=> undefined
	 *
	 *      R.head('abc'); //=> 'a'
	 *      R.head(''); //=> ''
	 */
	module.exports = nth(0);


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(27);
	var _isString = __webpack_require__(39);
	
	
	/**
	 * Returns the nth element of the given list or string. If n is negative the
	 * element at index length + n is returned.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig Number -> [a] -> a | Undefined
	 * @sig Number -> String -> String
	 * @param {Number} offset
	 * @param {*} list
	 * @return {*}
	 * @example
	 *
	 *      var list = ['foo', 'bar', 'baz', 'quux'];
	 *      R.nth(1, list); //=> 'bar'
	 *      R.nth(-1, list); //=> 'quux'
	 *      R.nth(-99, list); //=> undefined
	 *
	 *      R.nth('abc', 2); //=> 'c'
	 *      R.nth('abc', 3); //=> ''
	 */
	module.exports = _curry2(function nth(offset, list) {
	  var idx = offset < 0 ? list.length + offset : offset;
	  return _isString(list) ? list.charAt(idx) : list[idx];
	});


/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = function _isString(x) {
	  return Object.prototype.toString.call(x) === '[object String]';
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(21);
	var _pipeP = __webpack_require__(41);
	var reduce = __webpack_require__(23);
	var tail = __webpack_require__(33);
	
	
	/**
	 * Performs left-to-right composition of one or more Promise-returning
	 * functions. The leftmost function may have any arity; the remaining functions
	 * must be unary.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.10.0
	 * @category Function
	 * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
	 * @param {...Function} functions
	 * @return {Function}
	 * @see R.composeP
	 * @example
	 *
	 *      //  followersForUser :: String -> Promise [User]
	 *      var followersForUser = R.pipeP(db.getUserById, db.getFollowers);
	 */
	module.exports = function pipeP() {
	  if (arguments.length === 0) {
	    throw new Error('pipeP requires at least one argument');
	  }
	  return _arity(arguments[0].length,
	                reduce(_pipeP, arguments[0], tail(arguments)));
	};


/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function _pipeP(f, g) {
	  return function() {
	    var ctx = this;
	    return f.apply(ctx, arguments).then(function(x) {
	      return g.call(ctx, x);
	    });
	  };
	};


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var m = __webpack_require__(2);
	
	var serverUrl = 'http://localhost';
	
	function unwrapError(response, xhr) {
	  console.log('unwrapError');
	  return { type: 'service', code: xhr.status, error: response };
	}
	
	var users = {};
	
	users.login = function (user) {
	  return m.request({
	    method: 'POST',
	    url: serverUrl + '/users/token',
	    data: { email: user.email(), password: user.password() },
	    unwrapError: unwrapError
	  });
	};
	
	users.register = function (user) {
	  return m.request({
	    method: 'POST', url: serverUrl + '/users/signUp',
	    data: { email: user.email(), password: user.password() },
	    unwrapError: unwrapError
	  });
	};
	
	users.resetPassword = function (user) {
	  return m.request({
	    method: 'POST', url: serverUrl + '/users/reset',
	    data: { email: user.email(), password: user.password() },
	    unwrapError: unwrapError
	  });
	};
	
	module.exports = users;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var m = __webpack_require__(2);
	var btn = m('.close', m('a[href="/"].icon-cross', { config: m.route }));
	
	exports.default = btn;
	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mithril = __webpack_require__(2);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var inlineErrors = __webpack_require__(19);
	var constraints = __webpack_require__(4);
	var pipe = __webpack_require__(40);
	var backend = __webpack_require__(42);
	var closeBtn = __webpack_require__(43);
	
	var validate = constraints(function (user, errors) {
	  if (!user.email()) {
	    errors('email', 'The email is required');
	  }
	  if (!user.password()) {
	    errors('password', 'The password is required');
	  }
	});
	
	var successView = function successView(email) {
	  return (0, _mithril2.default)('.success-register.content', [closeBtn, (0, _mithril2.default)('h1', 'Perfect, we could reset your password!'), (0, _mithril2.default)('h2', 'In short you will receive an email in your account (' + email + ') with the next steps to access to your dashboard'), (0, _mithril2.default)("a[href='/login'].btn", { config: _mithril2.default.route }, 'Go back to the login page')]);
	};
	
	var formView = function formView(ctrl) {
	  return (0, _mithril2.default)('.forgot-password.content', [closeBtn, (0, _mithril2.default)('h1', 'Forgot Password'), ctrl.errors('service'), (0, _mithril2.default)('form', { onsubmit: ctrl.submit }, [(0, _mithril2.default)('.field', [(0, _mithril2.default)('label', 'Email'), (0, _mithril2.default)('input[type=email]', { onchange: _mithril2.default.withAttr('value', ctrl.user.email) }), ctrl.errors('email')]), (0, _mithril2.default)('.field', [(0, _mithril2.default)('label', 'New password'), (0, _mithril2.default)('input[type=password]', { onchange: _mithril2.default.withAttr('value', ctrl.user.password) }), ctrl.errors('password')]), (0, _mithril2.default)('.field', [(0, _mithril2.default)('button[type=submit]', 'Reset my password')]), (0, _mithril2.default)('.more', [(0, _mithril2.default)('.field', (0, _mithril2.default)('a.login', { href: '#/login' }, 'I remember my password now')), (0, _mithril2.default)('.field', (0, _mithril2.default)('a.register', { href: '#/register' }, "you don't have an user yet?"))])])]);
	};
	
	var forgotPassword = {};
	
	forgotPassword.controller = function () {
	  var ctrl = {};
	
	  var handleErrors = function handleErrors(errors) {
	    ctrl.errors.clear();
	    if (errors.type === 'validation') {
	      ctrl.errors = inlineErrors(errors);
	    }
	    if (errors.type === 'service') {
	      ctrl.errors('service', errors.error.message);
	    }
	  };
	
	  ctrl.user = { email: _mithril2.default.prop(), password: _mithril2.default.prop() };
	  ctrl.showSuccessMsg = _mithril2.default.prop(false);
	  ctrl.errors = inlineErrors();
	
	  ctrl.submit = function () {
	    return pipe(validate, backend.resetPassword, ctrl.showSuccessMsg.bind(null, true))(ctrl.user).catch(handleErrors);
	  };
	
	  return ctrl;
	};
	
	forgotPassword.view = function (ctrl) {
	  return ctrl.showSuccessMsg() ? successView(ctrl.user.email()) : formView(ctrl);
	};
	
	exports.default = forgotPassword;
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var m = __webpack_require__(2);
	var constraints = __webpack_require__(4);
	var inlineErrors = __webpack_require__(19);
	var pipe = __webpack_require__(40);
	var backend = __webpack_require__(42);
	var closeBtn = __webpack_require__(43);
	
	var validate = constraints(function (user, errors) {
	  if (!user.email()) {
	    errors('email', 'The email is required');
	  }
	  if (!user.password()) {
	    errors('password', 'The password is required');
	  } else {
	    if (!user.retypedPassword()) {
	      errors('retypedPassword', 'Please, retype the password');
	    } else if (user.retypedPassword() !== user.password()) {
	      errors('retypedPassword', 'the password not match');
	    }
	  }
	});
	
	var register = {};
	
	register.controller = function () {
	  var ctrl = {};
	  ctrl.user = {
	    email: m.prop(''),
	    password: m.prop(''),
	    retypedPassword: m.prop('')
	  };
	
	  ctrl.showSuccessMsg = m.prop(false);
	
	  ctrl.errors = inlineErrors();
	
	  var handleErrors = function handleErrors(errors) {
	    ctrl.errors.clear();
	    if (errors.type === 'validation') {
	      ctrl.errors = inlineErrors(errors);
	    }
	    if (errors.type === 'service') {
	      ctrl.errors('service', errors.error.message);
	    }
	  };
	
	  ctrl.submit = function () {
	    return pipe(validate, backend.register, ctrl.showSuccessMsg.bind(null, true))(ctrl.user).catch(handleErrors);
	  };
	
	  return ctrl;
	};
	
	var successView = function successView(email) {
	  return m('.success-register', [closeBtn, m('h1', 'Perfect, now you are registered!'), m('h2', 'In short you will receive an email in your account (' + email + ') with the next steps to access to your dashboard'), m("a[href='/login']", { config: m.route }, 'Go back to the login page')]);
	};
	
	var formView = function formView(ctrl) {
	  return m('.register.content', [closeBtn, m('h1', 'Register'), m('.service-errors', ctrl.errors('service')), m('form', { onsubmit: ctrl.submit }, [m('.field', [m('label', 'Email'), m('input[type=email]', { onchange: m.withAttr('value', ctrl.user.email) }), ctrl.errors('email')]), m('.field', [m('label', 'Password'), m('input[type=password]', { onchange: m.withAttr('value', ctrl.user.password) }), ctrl.errors('password')]), m('.field', [m('label', 'Retype your password'), m('input[type=password]', { onchange: m.withAttr('value', ctrl.user.retypedPassword) }), ctrl.errors('retypedPassword')]), m('button[type=submit]', 'Create my user')])]);
	};
	
	register.view = function (ctrl) {
	  return ctrl.showSuccessMsg() ? successView(ctrl.user.email()) : formView(ctrl);
	};
	
	exports.default = register;
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mithril = __webpack_require__(2);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var dashboard = {};
	
	dashboard.controller = function () {
	  console.log('load container');
	};
	
	dashboard.view = function () {
	  return (0, _mithril2.default)('.fullscreen-content', [(0, _mithril2.default)('h1', 'Dashboard')]);
	};
	
	exports.default = dashboard;
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _stringify = __webpack_require__(48);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _keys = __webpack_require__(7);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sinon = __webpack_require__(50);
	var server = sinon.fakeServer.create();
	server.autoRespond = true;
	//server.autoRespondAfter = 3000;
	
	var backendUrl = 'http://localhost';
	
	function logObj(obj, defaultResponse) {
	  if (!obj) return defaultResponse || '';
	  return '{ ' + (0, _keys2.default)(obj).map(function (key) {
	    return key + ": " + obj[key];
	  }).join(', ') + ' }';
	}
	
	function proxy(type, endpoint, handler) {
	  server.respondWith(type, backendUrl + endpoint, function (req) {
	    console.info('FAKE backend -> ' + type + ' ' + endpoint);
	    var body = JSON.parse(req.requestBody);
	    handler(body, jsonResponse(req));
	  });
	}
	
	function jsonResponse(req) {
	  var response = function response(status, json) {
	    console.log('<- [' + status + '] ' + logObj(json, '- EMPTY -'));
	    req.respond(status, { 'Content-Type': 'application/json' }, json ? (0, _stringify2.default)(json) : null);
	  };
	  response.error = function (status, error, msg) {
	    response(status, { 'timestamp': 1430245398014, 'status': status, 'error': error, 'message': msg });
	  };
	  return response;
	}
	
	/*
	POST /user/token
	body: { email: 'john.doe@gmail.com', password: '12345' }
	
	response:
	  200 OK
	  { token: 'xx213yhqUxOQ9nU001' }
	
	  403 Forbidden
	 */
	proxy('POST', '/users/token', function (user, response) {
	  if (user.email === 'maxidr@gmail.com' && user.password === '1234') {
	    console.log("email: " + user.email + " password: " + user.password);
	    response(200, { token: 'xx213yhqUxOQ9nU001' });
	  } else {
	    response(403);
	  }
	});
	
	proxy('POST', '/users/signUp', function (user, response) {
	  if (user.email === 'maxidr@gmail.com') {
	    response.error(409, 'Conflict', 'email already registered.');
	    return;
	  }
	  if (user.password.length < 4) {
	    response.error(400, '', 'password is not valid');
	  }
	  response(204);
	});
	
	proxy('POST', '/users/reset', function (user, response) {
	  if (user.email === 'maxidr@gmail.com') {
	    response(201);
	  } else {
	    // Not found
	    response.error(404, 'Not found', 'email was not found');
	  }
	});
	
	/*
	GET /account
	Headers: { Authorization: Bearer xxxxxx }
	response:
	
	OK:
		Code: 200 OK
		Body: { email: 'john.doe@gmail.com', firstName: '...', lastName: '...', ... }
	FAIL
		Code: 403 Forbidden
	
	Without authorization token
		Code: 401 Unauthorized
	
	*/
	server.respondWith('GET', backendUrl + '/account', function (req) {
	  if (!withAuthToken(req)) {
	    req.respond(401);return;
	  }
	  respondWithJSON(req, { email: 'john.doe@gmail.com', firstName: 'John', lastName: 'Doe' });
	});
	
	/*
	GET /subscriptions
	Headers: { Authorization: Bearer xxxxxx }
	response:
	
	OK
	  Code: 200 OK
	  Body: [ { plan: 'Developer', key: 'e9b4004a-19d9-4842-9389-4c09ad6da630', usage: 120, limit: 3000, period: 'monthly' } ]
	
	Without authorization token:
	  Code: 401 Unauthorized
	*/
	server.respondWith('GET', backendUrl + '/subscriptions', function (req) {
	  if (!withAuthToken(req)) {
	    req.respond(401);return;
	  }
	  respondWithJSON(req, [{ planName: 'Developer', planCode: 'free', key: 'e9b4004a-19d9-4842-9389-4c09ad6da630', usage: 120, limit: 3000, period: 'monthly' }]);
	});
	
	function respondWithJSON(req, obj, code) {
	  return req.respond(code || 200, { 'Content-Type': 'application/json' }, (0, _stringify2.default)(obj));
	}
	
	function withAuthToken(req) {
	  var auth = req.requestHeaders['Authorization'];
	  return (/^Bearer\s/.test(auth)
	  );
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(49), __esModule: true };

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(15);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module, process, setImmediate, clearImmediate) {/*** IMPORTS FROM imports-loader ***/
	var define = false;
	var require = false;
	
	/**
	 * Sinon.JS 1.17.3, 2016/01/27
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @author Contributors: https://github.com/cjohansen/Sinon.JS/blob/master/AUTHORS
	 *
	 * (The BSD License)
	 * 
	 * Copyright (c) 2010-2014, Christian Johansen, christian@cjohansen.no
	 * All rights reserved.
	 * 
	 * Redistribution and use in source and binary forms, with or without modification,
	 * are permitted provided that the following conditions are met:
	 * 
	 *     * Redistributions of source code must retain the above copyright notice,
	 *       this list of conditions and the following disclaimer.
	 *     * Redistributions in binary form must reproduce the above copyright notice,
	 *       this list of conditions and the following disclaimer in the documentation
	 *       and/or other materials provided with the distribution.
	 *     * Neither the name of Christian Johansen nor the names of his contributors
	 *       may be used to endorse or promote products derived from this software
	 *       without specific prior written permission.
	 * 
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
	 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
	 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
	 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
	 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
	 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	
	(function (root, factory) {
	  'use strict';
	  if (typeof define === 'function' && define.amd) {
	    define('sinon', [], function () {
	      return (root.sinon = factory());
	    });
	  } else if (true) {
	    module.exports = factory();
	  } else {
	    root.sinon = factory();
	  }
	}(this, function () {
	  'use strict';
	  var samsam, formatio, lolex;
	  (function () {
	                function define(mod, deps, fn) {
	                  if (mod == "samsam") {
	                    samsam = deps();
	                  } else if (typeof deps === "function" && mod.length === 0) {
	                    lolex = deps();
	                  } else if (typeof fn === "function") {
	                    formatio = fn(samsam);
	                  }
	                }
	    define.amd = {};
	((typeof define === "function" && define.amd && function (m) { define("samsam", m); }) ||
	 (typeof module === "object" &&
	      function (m) { module.exports = m(); }) || // Node
	 function (m) { this.samsam = m(); } // Browser globals
	)(function () {
	    var o = Object.prototype;
	    var div = typeof document !== "undefined" && document.createElement("div");
	
	    function isNaN(value) {
	        // Unlike global isNaN, this avoids type coercion
	        // typeof check avoids IE host object issues, hat tip to
	        // lodash
	        var val = value; // JsLint thinks value !== value is "weird"
	        return typeof value === "number" && value !== val;
	    }
	
	    function getClass(value) {
	        // Returns the internal [[Class]] by calling Object.prototype.toString
	        // with the provided value as this. Return value is a string, naming the
	        // internal class, e.g. "Array"
	        return o.toString.call(value).split(/[ \]]/)[1];
	    }
	
	    /**
	     * @name samsam.isArguments
	     * @param Object object
	     *
	     * Returns ``true`` if ``object`` is an ``arguments`` object,
	     * ``false`` otherwise.
	     */
	    function isArguments(object) {
	        if (getClass(object) === 'Arguments') { return true; }
	        if (typeof object !== "object" || typeof object.length !== "number" ||
	                getClass(object) === "Array") {
	            return false;
	        }
	        if (typeof object.callee == "function") { return true; }
	        try {
	            object[object.length] = 6;
	            delete object[object.length];
	        } catch (e) {
	            return true;
	        }
	        return false;
	    }
	
	    /**
	     * @name samsam.isElement
	     * @param Object object
	     *
	     * Returns ``true`` if ``object`` is a DOM element node. Unlike
	     * Underscore.js/lodash, this function will return ``false`` if ``object``
	     * is an *element-like* object, i.e. a regular object with a ``nodeType``
	     * property that holds the value ``1``.
	     */
	    function isElement(object) {
	        if (!object || object.nodeType !== 1 || !div) { return false; }
	        try {
	            object.appendChild(div);
	            object.removeChild(div);
	        } catch (e) {
	            return false;
	        }
	        return true;
	    }
	
	    /**
	     * @name samsam.keys
	     * @param Object object
	     *
	     * Return an array of own property names.
	     */
	    function keys(object) {
	        var ks = [], prop;
	        for (prop in object) {
	            if (o.hasOwnProperty.call(object, prop)) { ks.push(prop); }
	        }
	        return ks;
	    }
	
	    /**
	     * @name samsam.isDate
	     * @param Object value
	     *
	     * Returns true if the object is a ``Date``, or *date-like*. Duck typing
	     * of date objects work by checking that the object has a ``getTime``
	     * function whose return value equals the return value from the object's
	     * ``valueOf``.
	     */
	    function isDate(value) {
	        return typeof value.getTime == "function" &&
	            value.getTime() == value.valueOf();
	    }
	
	    /**
	     * @name samsam.isNegZero
	     * @param Object value
	     *
	     * Returns ``true`` if ``value`` is ``-0``.
	     */
	    function isNegZero(value) {
	        return value === 0 && 1 / value === -Infinity;
	    }
	
	    /**
	     * @name samsam.equal
	     * @param Object obj1
	     * @param Object obj2
	     *
	     * Returns ``true`` if two objects are strictly equal. Compared to
	     * ``===`` there are two exceptions:
	     *
	     *   - NaN is considered equal to NaN
	     *   - -0 and +0 are not considered equal
	     */
	    function identical(obj1, obj2) {
	        if (obj1 === obj2 || (isNaN(obj1) && isNaN(obj2))) {
	            return obj1 !== 0 || isNegZero(obj1) === isNegZero(obj2);
	        }
	    }
	
	
	    /**
	     * @name samsam.deepEqual
	     * @param Object obj1
	     * @param Object obj2
	     *
	     * Deep equal comparison. Two values are "deep equal" if:
	     *
	     *   - They are equal, according to samsam.identical
	     *   - They are both date objects representing the same time
	     *   - They are both arrays containing elements that are all deepEqual
	     *   - They are objects with the same set of properties, and each property
	     *     in ``obj1`` is deepEqual to the corresponding property in ``obj2``
	     *
	     * Supports cyclic objects.
	     */
	    function deepEqualCyclic(obj1, obj2) {
	
	        // used for cyclic comparison
	        // contain already visited objects
	        var objects1 = [],
	            objects2 = [],
	        // contain pathes (position in the object structure)
	        // of the already visited objects
	        // indexes same as in objects arrays
	            paths1 = [],
	            paths2 = [],
	        // contains combinations of already compared objects
	        // in the manner: { "$1['ref']$2['ref']": true }
	            compared = {};
	
	        /**
	         * used to check, if the value of a property is an object
	         * (cyclic logic is only needed for objects)
	         * only needed for cyclic logic
	         */
	        function isObject(value) {
	
	            if (typeof value === 'object' && value !== null &&
	                    !(value instanceof Boolean) &&
	                    !(value instanceof Date)    &&
	                    !(value instanceof Number)  &&
	                    !(value instanceof RegExp)  &&
	                    !(value instanceof String)) {
	
	                return true;
	            }
	
	            return false;
	        }
	
	        /**
	         * returns the index of the given object in the
	         * given objects array, -1 if not contained
	         * only needed for cyclic logic
	         */
	        function getIndex(objects, obj) {
	
	            var i;
	            for (i = 0; i < objects.length; i++) {
	                if (objects[i] === obj) {
	                    return i;
	                }
	            }
	
	            return -1;
	        }
	
	        // does the recursion for the deep equal check
	        return (function deepEqual(obj1, obj2, path1, path2) {
	            var type1 = typeof obj1;
	            var type2 = typeof obj2;
	
	            // == null also matches undefined
	            if (obj1 === obj2 ||
	                    isNaN(obj1) || isNaN(obj2) ||
	                    obj1 == null || obj2 == null ||
	                    type1 !== "object" || type2 !== "object") {
	
	                return identical(obj1, obj2);
	            }
	
	            // Elements are only equal if identical(expected, actual)
	            if (isElement(obj1) || isElement(obj2)) { return false; }
	
	            var isDate1 = isDate(obj1), isDate2 = isDate(obj2);
	            if (isDate1 || isDate2) {
	                if (!isDate1 || !isDate2 || obj1.getTime() !== obj2.getTime()) {
	                    return false;
	                }
	            }
	
	            if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
	                if (obj1.toString() !== obj2.toString()) { return false; }
	            }
	
	            var class1 = getClass(obj1);
	            var class2 = getClass(obj2);
	            var keys1 = keys(obj1);
	            var keys2 = keys(obj2);
	
	            if (isArguments(obj1) || isArguments(obj2)) {
	                if (obj1.length !== obj2.length) { return false; }
	            } else {
	                if (type1 !== type2 || class1 !== class2 ||
	                        keys1.length !== keys2.length) {
	                    return false;
	                }
	            }
	
	            var key, i, l,
	                // following vars are used for the cyclic logic
	                value1, value2,
	                isObject1, isObject2,
	                index1, index2,
	                newPath1, newPath2;
	
	            for (i = 0, l = keys1.length; i < l; i++) {
	                key = keys1[i];
	                if (!o.hasOwnProperty.call(obj2, key)) {
	                    return false;
	                }
	
	                // Start of the cyclic logic
	
	                value1 = obj1[key];
	                value2 = obj2[key];
	
	                isObject1 = isObject(value1);
	                isObject2 = isObject(value2);
	
	                // determine, if the objects were already visited
	                // (it's faster to check for isObject first, than to
	                // get -1 from getIndex for non objects)
	                index1 = isObject1 ? getIndex(objects1, value1) : -1;
	                index2 = isObject2 ? getIndex(objects2, value2) : -1;
	
	                // determine the new pathes of the objects
	                // - for non cyclic objects the current path will be extended
	                //   by current property name
	                // - for cyclic objects the stored path is taken
	                newPath1 = index1 !== -1
	                    ? paths1[index1]
	                    : path1 + '[' + JSON.stringify(key) + ']';
	                newPath2 = index2 !== -1
	                    ? paths2[index2]
	                    : path2 + '[' + JSON.stringify(key) + ']';
	
	                // stop recursion if current objects are already compared
	                if (compared[newPath1 + newPath2]) {
	                    return true;
	                }
	
	                // remember the current objects and their pathes
	                if (index1 === -1 && isObject1) {
	                    objects1.push(value1);
	                    paths1.push(newPath1);
	                }
	                if (index2 === -1 && isObject2) {
	                    objects2.push(value2);
	                    paths2.push(newPath2);
	                }
	
	                // remember that the current objects are already compared
	                if (isObject1 && isObject2) {
	                    compared[newPath1 + newPath2] = true;
	                }
	
	                // End of cyclic logic
	
	                // neither value1 nor value2 is a cycle
	                // continue with next level
	                if (!deepEqual(value1, value2, newPath1, newPath2)) {
	                    return false;
	                }
	            }
	
	            return true;
	
	        }(obj1, obj2, '$1', '$2'));
	    }
	
	    var match;
	
	    function arrayContains(array, subset) {
	        if (subset.length === 0) { return true; }
	        var i, l, j, k;
	        for (i = 0, l = array.length; i < l; ++i) {
	            if (match(array[i], subset[0])) {
	                for (j = 0, k = subset.length; j < k; ++j) {
	                    if (!match(array[i + j], subset[j])) { return false; }
	                }
	                return true;
	            }
	        }
	        return false;
	    }
	
	    /**
	     * @name samsam.match
	     * @param Object object
	     * @param Object matcher
	     *
	     * Compare arbitrary value ``object`` with matcher.
	     */
	    match = function match(object, matcher) {
	        if (matcher && typeof matcher.test === "function") {
	            return matcher.test(object);
	        }
	
	        if (typeof matcher === "function") {
	            return matcher(object) === true;
	        }
	
	        if (typeof matcher === "string") {
	            matcher = matcher.toLowerCase();
	            var notNull = typeof object === "string" || !!object;
	            return notNull &&
	                (String(object)).toLowerCase().indexOf(matcher) >= 0;
	        }
	
	        if (typeof matcher === "number") {
	            return matcher === object;
	        }
	
	        if (typeof matcher === "boolean") {
	            return matcher === object;
	        }
	
	        if (typeof(matcher) === "undefined") {
	            return typeof(object) === "undefined";
	        }
	
	        if (matcher === null) {
	            return object === null;
	        }
	
	        if (getClass(object) === "Array" && getClass(matcher) === "Array") {
	            return arrayContains(object, matcher);
	        }
	
	        if (matcher && typeof matcher === "object") {
	            if (matcher === object) {
	                return true;
	            }
	            var prop;
	            for (prop in matcher) {
	                var value = object[prop];
	                if (typeof value === "undefined" &&
	                        typeof object.getAttribute === "function") {
	                    value = object.getAttribute(prop);
	                }
	                if (matcher[prop] === null || typeof matcher[prop] === 'undefined') {
	                    if (value !== matcher[prop]) {
	                        return false;
	                    }
	                } else if (typeof  value === "undefined" || !match(value, matcher[prop])) {
	                    return false;
	                }
	            }
	            return true;
	        }
	
	        throw new Error("Matcher was not a string, a number, a " +
	                        "function, a boolean or an object");
	    };
	
	    return {
	        isArguments: isArguments,
	        isElement: isElement,
	        isDate: isDate,
	        isNegZero: isNegZero,
	        identical: identical,
	        deepEqual: deepEqualCyclic,
	        match: match,
	        keys: keys
	    };
	});
	((typeof define === "function" && define.amd && function (m) {
	    define("formatio", ["samsam"], m);
	}) || (typeof module === "object" && function (m) {
	    module.exports = m(require("samsam"));
	}) || function (m) { this.formatio = m(this.samsam); }
	)(function (samsam) {
	    
	    var formatio = {
	        excludeConstructors: ["Object", /^.$/],
	        quoteStrings: true,
	        limitChildrenCount: 0
	    };
	
	    var hasOwn = Object.prototype.hasOwnProperty;
	
	    var specialObjects = [];
	    if (typeof global !== "undefined") {
	        specialObjects.push({ object: global, value: "[object global]" });
	    }
	    if (typeof document !== "undefined") {
	        specialObjects.push({
	            object: document,
	            value: "[object HTMLDocument]"
	        });
	    }
	    if (typeof window !== "undefined") {
	        specialObjects.push({ object: window, value: "[object Window]" });
	    }
	
	    function functionName(func) {
	        if (!func) { return ""; }
	        if (func.displayName) { return func.displayName; }
	        if (func.name) { return func.name; }
	        var matches = func.toString().match(/function\s+([^\(]+)/m);
	        return (matches && matches[1]) || "";
	    }
	
	    function constructorName(f, object) {
	        var name = functionName(object && object.constructor);
	        var excludes = f.excludeConstructors ||
	                formatio.excludeConstructors || [];
	
	        var i, l;
	        for (i = 0, l = excludes.length; i < l; ++i) {
	            if (typeof excludes[i] === "string" && excludes[i] === name) {
	                return "";
	            } else if (excludes[i].test && excludes[i].test(name)) {
	                return "";
	            }
	        }
	
	        return name;
	    }
	
	    function isCircular(object, objects) {
	        if (typeof object !== "object") { return false; }
	        var i, l;
	        for (i = 0, l = objects.length; i < l; ++i) {
	            if (objects[i] === object) { return true; }
	        }
	        return false;
	    }
	
	    function ascii(f, object, processed, indent) {
	        if (typeof object === "string") {
	            var qs = f.quoteStrings;
	            var quote = typeof qs !== "boolean" || qs;
	            return processed || quote ? '"' + object + '"' : object;
	        }
	
	        if (typeof object === "function" && !(object instanceof RegExp)) {
	            return ascii.func(object);
	        }
	
	        processed = processed || [];
	
	        if (isCircular(object, processed)) { return "[Circular]"; }
	
	        if (Object.prototype.toString.call(object) === "[object Array]") {
	            return ascii.array.call(f, object, processed);
	        }
	
	        if (!object) { return String((1/object) === -Infinity ? "-0" : object); }
	        if (samsam.isElement(object)) { return ascii.element(object); }
	
	        if (typeof object.toString === "function" &&
	                object.toString !== Object.prototype.toString) {
	            return object.toString();
	        }
	
	        var i, l;
	        for (i = 0, l = specialObjects.length; i < l; i++) {
	            if (object === specialObjects[i].object) {
	                return specialObjects[i].value;
	            }
	        }
	
	        return ascii.object.call(f, object, processed, indent);
	    }
	
	    ascii.func = function (func) {
	        return "function " + functionName(func) + "() {}";
	    };
	
	    ascii.array = function (array, processed) {
	        processed = processed || [];
	        processed.push(array);
	        var pieces = [];
	        var i, l;
	        l = (this.limitChildrenCount > 0) ? 
	            Math.min(this.limitChildrenCount, array.length) : array.length;
	
	        for (i = 0; i < l; ++i) {
	            pieces.push(ascii(this, array[i], processed));
	        }
	
	        if(l < array.length)
	            pieces.push("[... " + (array.length - l) + " more elements]");
	
	        return "[" + pieces.join(", ") + "]";
	    };
	
	    ascii.object = function (object, processed, indent) {
	        processed = processed || [];
	        processed.push(object);
	        indent = indent || 0;
	        var pieces = [], properties = samsam.keys(object).sort();
	        var length = 3;
	        var prop, str, obj, i, k, l;
	        l = (this.limitChildrenCount > 0) ? 
	            Math.min(this.limitChildrenCount, properties.length) : properties.length;
	
	        for (i = 0; i < l; ++i) {
	            prop = properties[i];
	            obj = object[prop];
	
	            if (isCircular(obj, processed)) {
	                str = "[Circular]";
	            } else {
	                str = ascii(this, obj, processed, indent + 2);
	            }
	
	            str = (/\s/.test(prop) ? '"' + prop + '"' : prop) + ": " + str;
	            length += str.length;
	            pieces.push(str);
	        }
	
	        var cons = constructorName(this, object);
	        var prefix = cons ? "[" + cons + "] " : "";
	        var is = "";
	        for (i = 0, k = indent; i < k; ++i) { is += " "; }
	
	        if(l < properties.length)
	            pieces.push("[... " + (properties.length - l) + " more elements]");
	
	        if (length + indent > 80) {
	            return prefix + "{\n  " + is + pieces.join(",\n  " + is) + "\n" +
	                is + "}";
	        }
	        return prefix + "{ " + pieces.join(", ") + " }";
	    };
	
	    ascii.element = function (element) {
	        var tagName = element.tagName.toLowerCase();
	        var attrs = element.attributes, attr, pairs = [], attrName, i, l, val;
	
	        for (i = 0, l = attrs.length; i < l; ++i) {
	            attr = attrs.item(i);
	            attrName = attr.nodeName.toLowerCase().replace("html:", "");
	            val = attr.nodeValue;
	            if (attrName !== "contenteditable" || val !== "inherit") {
	                if (!!val) { pairs.push(attrName + "=\"" + val + "\""); }
	            }
	        }
	
	        var formatted = "<" + tagName + (pairs.length > 0 ? " " : "");
	        var content = element.innerHTML;
	
	        if (content.length > 20) {
	            content = content.substr(0, 20) + "[...]";
	        }
	
	        var res = formatted + pairs.join(" ") + ">" + content +
	                "</" + tagName + ">";
	
	        return res.replace(/ contentEditable="inherit"/, "");
	    };
	
	    function Formatio(options) {
	        for (var opt in options) {
	            this[opt] = options[opt];
	        }
	    }
	
	    Formatio.prototype = {
	        functionName: functionName,
	
	        configure: function (options) {
	            return new Formatio(options);
	        },
	
	        constructorName: function (object) {
	            return constructorName(this, object);
	        },
	
	        ascii: function (object, processed, indent) {
	            return ascii(this, object, processed, indent);
	        }
	    };
	
	    return Formatio.prototype;
	});
	!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.lolex=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	(function (global){
	/*global global, window*/
	/**
	 * @author Christian Johansen (christian@cjohansen.no) and contributors
	 * @license BSD
	 *
	 * Copyright (c) 2010-2014 Christian Johansen
	 */
	
	(function (global) {
	    
	    // Make properties writable in IE, as per
	    // http://www.adequatelygood.com/Replacing-setTimeout-Globally.html
	    // JSLint being anal
	    var glbl = global;
	
	    global.setTimeout = glbl.setTimeout;
	    global.clearTimeout = glbl.clearTimeout;
	    global.setInterval = glbl.setInterval;
	    global.clearInterval = glbl.clearInterval;
	    global.Date = glbl.Date;
	
	    // setImmediate is not a standard function
	    // avoid adding the prop to the window object if not present
	    if('setImmediate' in global) {
	        global.setImmediate = glbl.setImmediate;
	        global.clearImmediate = glbl.clearImmediate;
	    }
	
	    // node expects setTimeout/setInterval to return a fn object w/ .ref()/.unref()
	    // browsers, a number.
	    // see https://github.com/cjohansen/Sinon.JS/pull/436
	
	    var NOOP = function () { return undefined; };
	    var timeoutResult = setTimeout(NOOP, 0);
	    var addTimerReturnsObject = typeof timeoutResult === "object";
	    clearTimeout(timeoutResult);
	
	    var NativeDate = Date;
	    var uniqueTimerId = 1;
	
	    /**
	     * Parse strings like "01:10:00" (meaning 1 hour, 10 minutes, 0 seconds) into
	     * number of milliseconds. This is used to support human-readable strings passed
	     * to clock.tick()
	     */
	    function parseTime(str) {
	        if (!str) {
	            return 0;
	        }
	
	        var strings = str.split(":");
	        var l = strings.length, i = l;
	        var ms = 0, parsed;
	
	        if (l > 3 || !/^(\d\d:){0,2}\d\d?$/.test(str)) {
	            throw new Error("tick only understands numbers, 'm:s' and 'h:m:s'. Each part must be two digits");
	        }
	
	        while (i--) {
	            parsed = parseInt(strings[i], 10);
	
	            if (parsed >= 60) {
	                throw new Error("Invalid time " + str);
	            }
	
	            ms += parsed * Math.pow(60, (l - i - 1));
	        }
	
	        return ms * 1000;
	    }
	
	    /**
	     * Used to grok the `now` parameter to createClock.
	     */
	    function getEpoch(epoch) {
	        if (!epoch) { return 0; }
	        if (typeof epoch.getTime === "function") { return epoch.getTime(); }
	        if (typeof epoch === "number") { return epoch; }
	        throw new TypeError("now should be milliseconds since UNIX epoch");
	    }
	
	    function inRange(from, to, timer) {
	        return timer && timer.callAt >= from && timer.callAt <= to;
	    }
	
	    function mirrorDateProperties(target, source) {
	        var prop;
	        for (prop in source) {
	            if (source.hasOwnProperty(prop)) {
	                target[prop] = source[prop];
	            }
	        }
	
	        // set special now implementation
	        if (source.now) {
	            target.now = function now() {
	                return target.clock.now;
	            };
	        } else {
	            delete target.now;
	        }
	
	        // set special toSource implementation
	        if (source.toSource) {
	            target.toSource = function toSource() {
	                return source.toSource();
	            };
	        } else {
	            delete target.toSource;
	        }
	
	        // set special toString implementation
	        target.toString = function toString() {
	            return source.toString();
	        };
	
	        target.prototype = source.prototype;
	        target.parse = source.parse;
	        target.UTC = source.UTC;
	        target.prototype.toUTCString = source.prototype.toUTCString;
	
	        return target;
	    }
	
	    function createDate() {
	        function ClockDate(year, month, date, hour, minute, second, ms) {
	            // Defensive and verbose to avoid potential harm in passing
	            // explicit undefined when user does not pass argument
	            switch (arguments.length) {
	            case 0:
	                return new NativeDate(ClockDate.clock.now);
	            case 1:
	                return new NativeDate(year);
	            case 2:
	                return new NativeDate(year, month);
	            case 3:
	                return new NativeDate(year, month, date);
	            case 4:
	                return new NativeDate(year, month, date, hour);
	            case 5:
	                return new NativeDate(year, month, date, hour, minute);
	            case 6:
	                return new NativeDate(year, month, date, hour, minute, second);
	            default:
	                return new NativeDate(year, month, date, hour, minute, second, ms);
	            }
	        }
	
	        return mirrorDateProperties(ClockDate, NativeDate);
	    }
	
	    function addTimer(clock, timer) {
	        if (timer.func === undefined) {
	            throw new Error("Callback must be provided to timer calls");
	        }
	
	        if (!clock.timers) {
	            clock.timers = {};
	        }
	
	        timer.id = uniqueTimerId++;
	        timer.createdAt = clock.now;
	        timer.callAt = clock.now + (timer.delay || (clock.duringTick ? 1 : 0));
	
	        clock.timers[timer.id] = timer;
	
	        if (addTimerReturnsObject) {
	            return {
	                id: timer.id,
	                ref: NOOP,
	                unref: NOOP
	            };
	        }
	
	        return timer.id;
	    }
	
	
	    function compareTimers(a, b) {
	        // Sort first by absolute timing
	        if (a.callAt < b.callAt) {
	            return -1;
	        }
	        if (a.callAt > b.callAt) {
	            return 1;
	        }
	
	        // Sort next by immediate, immediate timers take precedence
	        if (a.immediate && !b.immediate) {
	            return -1;
	        }
	        if (!a.immediate && b.immediate) {
	            return 1;
	        }
	
	        // Sort next by creation time, earlier-created timers take precedence
	        if (a.createdAt < b.createdAt) {
	            return -1;
	        }
	        if (a.createdAt > b.createdAt) {
	            return 1;
	        }
	
	        // Sort next by id, lower-id timers take precedence
	        if (a.id < b.id) {
	            return -1;
	        }
	        if (a.id > b.id) {
	            return 1;
	        }
	
	        // As timer ids are unique, no fallback `0` is necessary
	    }
	
	    function firstTimerInRange(clock, from, to) {
	        var timers = clock.timers,
	            timer = null,
	            id,
	            isInRange;
	
	        for (id in timers) {
	            if (timers.hasOwnProperty(id)) {
	                isInRange = inRange(from, to, timers[id]);
	
	                if (isInRange && (!timer || compareTimers(timer, timers[id]) === 1)) {
	                    timer = timers[id];
	                }
	            }
	        }
	
	        return timer;
	    }
	
	    function firstTimer(clock) {
	        var timers = clock.timers,
	            timer = null,
	            id;
	
	        for (id in timers) {
	            if (timers.hasOwnProperty(id)) {
	                if (!timer || compareTimers(timer, timers[id]) === 1) {
	                    timer = timers[id];
	                }
	            }
	        }
	
	        return timer;
	    }
	
	    function callTimer(clock, timer) {
	        var exception;
	
	        if (typeof timer.interval === "number") {
	            clock.timers[timer.id].callAt += timer.interval;
	        } else {
	            delete clock.timers[timer.id];
	        }
	
	        try {
	            if (typeof timer.func === "function") {
	                timer.func.apply(null, timer.args);
	            } else {
	                eval(timer.func);
	            }
	        } catch (e) {
	            exception = e;
	        }
	
	        if (!clock.timers[timer.id]) {
	            if (exception) {
	                throw exception;
	            }
	            return;
	        }
	
	        if (exception) {
	            throw exception;
	        }
	    }
	
	    function timerType(timer) {
	        if (timer.immediate) {
	            return "Immediate";
	        } else if (typeof timer.interval !== "undefined") {
	            return "Interval";
	        } else {
	            return "Timeout";
	        }
	    }
	
	    function clearTimer(clock, timerId, ttype) {
	        if (!timerId) {
	            // null appears to be allowed in most browsers, and appears to be
	            // relied upon by some libraries, like Bootstrap carousel
	            return;
	        }
	
	        if (!clock.timers) {
	            clock.timers = [];
	        }
	
	        // in Node, timerId is an object with .ref()/.unref(), and
	        // its .id field is the actual timer id.
	        if (typeof timerId === "object") {
	            timerId = timerId.id;
	        }
	
	        if (clock.timers.hasOwnProperty(timerId)) {
	            // check that the ID matches a timer of the correct type
	            var timer = clock.timers[timerId];
	            if (timerType(timer) === ttype) {
	                delete clock.timers[timerId];
	            } else {
					throw new Error("Cannot clear timer: timer created with set" + ttype + "() but cleared with clear" + timerType(timer) + "()");
				}
	        }
	    }
	
	    function uninstall(clock, target) {
	        var method,
	            i,
	            l;
	
	        for (i = 0, l = clock.methods.length; i < l; i++) {
	            method = clock.methods[i];
	
	            if (target[method].hadOwnProperty) {
	                target[method] = clock["_" + method];
	            } else {
	                try {
	                    delete target[method];
	                } catch (ignore) {}
	            }
	        }
	
	        // Prevent multiple executions which will completely remove these props
	        clock.methods = [];
	    }
	
	    function hijackMethod(target, method, clock) {
	        var prop;
	
	        clock[method].hadOwnProperty = Object.prototype.hasOwnProperty.call(target, method);
	        clock["_" + method] = target[method];
	
	        if (method === "Date") {
	            var date = mirrorDateProperties(clock[method], target[method]);
	            target[method] = date;
	        } else {
	            target[method] = function () {
	                return clock[method].apply(clock, arguments);
	            };
	
	            for (prop in clock[method]) {
	                if (clock[method].hasOwnProperty(prop)) {
	                    target[method][prop] = clock[method][prop];
	                }
	            }
	        }
	
	        target[method].clock = clock;
	    }
	
	    var timers = {
	        setTimeout: setTimeout,
	        clearTimeout: clearTimeout,
	        setImmediate: global.setImmediate,
	        clearImmediate: global.clearImmediate,
	        setInterval: setInterval,
	        clearInterval: clearInterval,
	        Date: Date
	    };
	
	    var keys = Object.keys || function (obj) {
	        var ks = [],
	            key;
	
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                ks.push(key);
	            }
	        }
	
	        return ks;
	    };
	
	    exports.timers = timers;
	
	    function createClock(now) {
	        var clock = {
	            now: getEpoch(now),
	            timeouts: {},
	            Date: createDate()
	        };
	
	        clock.Date.clock = clock;
	
	        clock.setTimeout = function setTimeout(func, timeout) {
	            return addTimer(clock, {
	                func: func,
	                args: Array.prototype.slice.call(arguments, 2),
	                delay: timeout
	            });
	        };
	
	        clock.clearTimeout = function clearTimeout(timerId) {
	            return clearTimer(clock, timerId, "Timeout");
	        };
	
	        clock.setInterval = function setInterval(func, timeout) {
	            return addTimer(clock, {
	                func: func,
	                args: Array.prototype.slice.call(arguments, 2),
	                delay: timeout,
	                interval: timeout
	            });
	        };
	
	        clock.clearInterval = function clearInterval(timerId) {
	            return clearTimer(clock, timerId, "Interval");
	        };
	
	        clock.setImmediate = function setImmediate(func) {
	            return addTimer(clock, {
	                func: func,
	                args: Array.prototype.slice.call(arguments, 1),
	                immediate: true
	            });
	        };
	
	        clock.clearImmediate = function clearImmediate(timerId) {
	            return clearTimer(clock, timerId, "Immediate");
	        };
	
	        clock.tick = function tick(ms) {
	            ms = typeof ms === "number" ? ms : parseTime(ms);
	            var tickFrom = clock.now, tickTo = clock.now + ms, previous = clock.now;
	            var timer = firstTimerInRange(clock, tickFrom, tickTo);
	            var oldNow;
	
	            clock.duringTick = true;
	
	            var firstException;
	            while (timer && tickFrom <= tickTo) {
	                if (clock.timers[timer.id]) {
	                    tickFrom = clock.now = timer.callAt;
	                    try {
	                        oldNow = clock.now;
	                        callTimer(clock, timer);
	                        // compensate for any setSystemTime() call during timer callback
	                        if (oldNow !== clock.now) {
	                            tickFrom += clock.now - oldNow;
	                            tickTo += clock.now - oldNow;
	                            previous += clock.now - oldNow;
	                        }
	                    } catch (e) {
	                        firstException = firstException || e;
	                    }
	                }
	
	                timer = firstTimerInRange(clock, previous, tickTo);
	                previous = tickFrom;
	            }
	
	            clock.duringTick = false;
	            clock.now = tickTo;
	
	            if (firstException) {
	                throw firstException;
	            }
	
	            return clock.now;
	        };
	
	        clock.next = function next() {
	            var timer = firstTimer(clock);
	            if (!timer) {
	                return clock.now;
	            }
	
	            clock.duringTick = true;
	            try {
	                clock.now = timer.callAt;
	                callTimer(clock, timer);
	                return clock.now;
	            } finally {
	                clock.duringTick = false;
	            }
	        };
	
	        clock.reset = function reset() {
	            clock.timers = {};
	        };
	
	        clock.setSystemTime = function setSystemTime(now) {
	            // determine time difference
	            var newNow = getEpoch(now);
	            var difference = newNow - clock.now;
	
	            // update 'system clock'
	            clock.now = newNow;
	
	            // update timers and intervals to keep them stable
	            for (var id in clock.timers) {
	                if (clock.timers.hasOwnProperty(id)) {
	                    var timer = clock.timers[id];
	                    timer.createdAt += difference;
	                    timer.callAt += difference;
	                }
	            }
	        };
	
	        return clock;
	    }
	    exports.createClock = createClock;
	
	    exports.install = function install(target, now, toFake) {
	        var i,
	            l;
	
	        if (typeof target === "number") {
	            toFake = now;
	            now = target;
	            target = null;
	        }
	
	        if (!target) {
	            target = global;
	        }
	
	        var clock = createClock(now);
	
	        clock.uninstall = function () {
	            uninstall(clock, target);
	        };
	
	        clock.methods = toFake || [];
	
	        if (clock.methods.length === 0) {
	            clock.methods = keys(timers);
	        }
	
	        for (i = 0, l = clock.methods.length; i < l; i++) {
	            hijackMethod(target, clock.methods[i], clock);
	        }
	
	        return clock;
	    };
	
	}(global || this));
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}]},{},[1])(1)
	});
	  })();
	  var define;
	/**
	 * Sinon core utilities. For internal use only.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	var sinon = (function () {
	"use strict";
	 // eslint-disable-line no-unused-vars
	    
	    var sinonModule;
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        sinonModule = module.exports = require("./sinon/util/core");
	        require("./sinon/extend");
	        require("./sinon/walk");
	        require("./sinon/typeOf");
	        require("./sinon/times_in_words");
	        require("./sinon/spy");
	        require("./sinon/call");
	        require("./sinon/behavior");
	        require("./sinon/stub");
	        require("./sinon/mock");
	        require("./sinon/collection");
	        require("./sinon/assert");
	        require("./sinon/sandbox");
	        require("./sinon/test");
	        require("./sinon/test_case");
	        require("./sinon/match");
	        require("./sinon/format");
	        require("./sinon/log_error");
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	    } else if (isNode) {
	        loadDependencies(require, module.exports, module);
	        sinonModule = module.exports;
	    } else {
	        sinonModule = {};
	    }
	
	    return sinonModule;
	}());
	
	/**
	 * @depend ../../sinon.js
	 */
	/**
	 * Sinon core utilities. For internal use only.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    var div = typeof document !== "undefined" && document.createElement("div");
	    var hasOwn = Object.prototype.hasOwnProperty;
	
	    function isDOMNode(obj) {
	        var success = false;
	
	        try {
	            obj.appendChild(div);
	            success = div.parentNode === obj;
	        } catch (e) {
	            return false;
	        } finally {
	            try {
	                obj.removeChild(div);
	            } catch (e) {
	                // Remove failed, not much we can do about that
	            }
	        }
	
	        return success;
	    }
	
	    function isElement(obj) {
	        return div && obj && obj.nodeType === 1 && isDOMNode(obj);
	    }
	
	    function isFunction(obj) {
	        return typeof obj === "function" || !!(obj && obj.constructor && obj.call && obj.apply);
	    }
	
	    function isReallyNaN(val) {
	        return typeof val === "number" && isNaN(val);
	    }
	
	    function mirrorProperties(target, source) {
	        for (var prop in source) {
	            if (!hasOwn.call(target, prop)) {
	                target[prop] = source[prop];
	            }
	        }
	    }
	
	    function isRestorable(obj) {
	        return typeof obj === "function" && typeof obj.restore === "function" && obj.restore.sinon;
	    }
	
	    // Cheap way to detect if we have ES5 support.
	    var hasES5Support = "keys" in Object;
	
	    function makeApi(sinon) {
	        sinon.wrapMethod = function wrapMethod(object, property, method) {
	            if (!object) {
	                throw new TypeError("Should wrap property of object");
	            }
	
	            if (typeof method !== "function" && typeof method !== "object") {
	                throw new TypeError("Method wrapper should be a function or a property descriptor");
	            }
	
	            function checkWrappedMethod(wrappedMethod) {
	                var error;
	
	                if (!isFunction(wrappedMethod)) {
	                    error = new TypeError("Attempted to wrap " + (typeof wrappedMethod) + " property " +
	                                        property + " as function");
	                } else if (wrappedMethod.restore && wrappedMethod.restore.sinon) {
	                    error = new TypeError("Attempted to wrap " + property + " which is already wrapped");
	                } else if (wrappedMethod.calledBefore) {
	                    var verb = wrappedMethod.returns ? "stubbed" : "spied on";
	                    error = new TypeError("Attempted to wrap " + property + " which is already " + verb);
	                }
	
	                if (error) {
	                    if (wrappedMethod && wrappedMethod.stackTrace) {
	                        error.stack += "\n--------------\n" + wrappedMethod.stackTrace;
	                    }
	                    throw error;
	                }
	            }
	
	            var error, wrappedMethod, i;
	
	            // IE 8 does not support hasOwnProperty on the window object and Firefox has a problem
	            // when using hasOwn.call on objects from other frames.
	            var owned = object.hasOwnProperty ? object.hasOwnProperty(property) : hasOwn.call(object, property);
	
	            if (hasES5Support) {
	                var methodDesc = (typeof method === "function") ? {value: method} : method;
	                var wrappedMethodDesc = sinon.getPropertyDescriptor(object, property);
	
	                if (!wrappedMethodDesc) {
	                    error = new TypeError("Attempted to wrap " + (typeof wrappedMethod) + " property " +
	                                        property + " as function");
	                } else if (wrappedMethodDesc.restore && wrappedMethodDesc.restore.sinon) {
	                    error = new TypeError("Attempted to wrap " + property + " which is already wrapped");
	                }
	                if (error) {
	                    if (wrappedMethodDesc && wrappedMethodDesc.stackTrace) {
	                        error.stack += "\n--------------\n" + wrappedMethodDesc.stackTrace;
	                    }
	                    throw error;
	                }
	
	                var types = sinon.objectKeys(methodDesc);
	                for (i = 0; i < types.length; i++) {
	                    wrappedMethod = wrappedMethodDesc[types[i]];
	                    checkWrappedMethod(wrappedMethod);
	                }
	
	                mirrorProperties(methodDesc, wrappedMethodDesc);
	                for (i = 0; i < types.length; i++) {
	                    mirrorProperties(methodDesc[types[i]], wrappedMethodDesc[types[i]]);
	                }
	                Object.defineProperty(object, property, methodDesc);
	            } else {
	                wrappedMethod = object[property];
	                checkWrappedMethod(wrappedMethod);
	                object[property] = method;
	                method.displayName = property;
	            }
	
	            method.displayName = property;
	
	            // Set up a stack trace which can be used later to find what line of
	            // code the original method was created on.
	            method.stackTrace = (new Error("Stack Trace for original")).stack;
	
	            method.restore = function () {
	                // For prototype properties try to reset by delete first.
	                // If this fails (ex: localStorage on mobile safari) then force a reset
	                // via direct assignment.
	                if (!owned) {
	                    // In some cases `delete` may throw an error
	                    try {
	                        delete object[property];
	                    } catch (e) {} // eslint-disable-line no-empty
	                    // For native code functions `delete` fails without throwing an error
	                    // on Chrome < 43, PhantomJS, etc.
	                } else if (hasES5Support) {
	                    Object.defineProperty(object, property, wrappedMethodDesc);
	                }
	
	                // Use strict equality comparison to check failures then force a reset
	                // via direct assignment.
	                if (object[property] === method) {
	                    object[property] = wrappedMethod;
	                }
	            };
	
	            method.restore.sinon = true;
	
	            if (!hasES5Support) {
	                mirrorProperties(method, wrappedMethod);
	            }
	
	            return method;
	        };
	
	        sinon.create = function create(proto) {
	            var F = function () {};
	            F.prototype = proto;
	            return new F();
	        };
	
	        sinon.deepEqual = function deepEqual(a, b) {
	            if (sinon.match && sinon.match.isMatcher(a)) {
	                return a.test(b);
	            }
	
	            if (typeof a !== "object" || typeof b !== "object") {
	                return isReallyNaN(a) && isReallyNaN(b) || a === b;
	            }
	
	            if (isElement(a) || isElement(b)) {
	                return a === b;
	            }
	
	            if (a === b) {
	                return true;
	            }
	
	            if ((a === null && b !== null) || (a !== null && b === null)) {
	                return false;
	            }
	
	            if (a instanceof RegExp && b instanceof RegExp) {
	                return (a.source === b.source) && (a.global === b.global) &&
	                    (a.ignoreCase === b.ignoreCase) && (a.multiline === b.multiline);
	            }
	
	            var aString = Object.prototype.toString.call(a);
	            if (aString !== Object.prototype.toString.call(b)) {
	                return false;
	            }
	
	            if (aString === "[object Date]") {
	                return a.valueOf() === b.valueOf();
	            }
	
	            var prop;
	            var aLength = 0;
	            var bLength = 0;
	
	            if (aString === "[object Array]" && a.length !== b.length) {
	                return false;
	            }
	
	            for (prop in a) {
	                if (a.hasOwnProperty(prop)) {
	                    aLength += 1;
	
	                    if (!(prop in b)) {
	                        return false;
	                    }
	
	                    if (!deepEqual(a[prop], b[prop])) {
	                        return false;
	                    }
	                }
	            }
	
	            for (prop in b) {
	                if (b.hasOwnProperty(prop)) {
	                    bLength += 1;
	                }
	            }
	
	            return aLength === bLength;
	        };
	
	        sinon.functionName = function functionName(func) {
	            var name = func.displayName || func.name;
	
	            // Use function decomposition as a last resort to get function
	            // name. Does not rely on function decomposition to work - if it
	            // doesn't debugging will be slightly less informative
	            // (i.e. toString will say 'spy' rather than 'myFunc').
	            if (!name) {
	                var matches = func.toString().match(/function ([^\s\(]+)/);
	                name = matches && matches[1];
	            }
	
	            return name;
	        };
	
	        sinon.functionToString = function toString() {
	            if (this.getCall && this.callCount) {
	                var thisValue,
	                    prop;
	                var i = this.callCount;
	
	                while (i--) {
	                    thisValue = this.getCall(i).thisValue;
	
	                    for (prop in thisValue) {
	                        if (thisValue[prop] === this) {
	                            return prop;
	                        }
	                    }
	                }
	            }
	
	            return this.displayName || "sinon fake";
	        };
	
	        sinon.objectKeys = function objectKeys(obj) {
	            if (obj !== Object(obj)) {
	                throw new TypeError("sinon.objectKeys called on a non-object");
	            }
	
	            var keys = [];
	            var key;
	            for (key in obj) {
	                if (hasOwn.call(obj, key)) {
	                    keys.push(key);
	                }
	            }
	
	            return keys;
	        };
	
	        sinon.getPropertyDescriptor = function getPropertyDescriptor(object, property) {
	            var proto = object;
	            var descriptor;
	
	            while (proto && !(descriptor = Object.getOwnPropertyDescriptor(proto, property))) {
	                proto = Object.getPrototypeOf(proto);
	            }
	            return descriptor;
	        };
	
	        sinon.getConfig = function (custom) {
	            var config = {};
	            custom = custom || {};
	            var defaults = sinon.defaultConfig;
	
	            for (var prop in defaults) {
	                if (defaults.hasOwnProperty(prop)) {
	                    config[prop] = custom.hasOwnProperty(prop) ? custom[prop] : defaults[prop];
	                }
	            }
	
	            return config;
	        };
	
	        sinon.defaultConfig = {
	            injectIntoThis: true,
	            injectInto: null,
	            properties: ["spy", "stub", "mock", "clock", "server", "requests"],
	            useFakeTimers: true,
	            useFakeServer: true
	        };
	
	        sinon.timesInWords = function timesInWords(count) {
	            return count === 1 && "once" ||
	                count === 2 && "twice" ||
	                count === 3 && "thrice" ||
	                (count || 0) + " times";
	        };
	
	        sinon.calledInOrder = function (spies) {
	            for (var i = 1, l = spies.length; i < l; i++) {
	                if (!spies[i - 1].calledBefore(spies[i]) || !spies[i].called) {
	                    return false;
	                }
	            }
	
	            return true;
	        };
	
	        sinon.orderByFirstCall = function (spies) {
	            return spies.sort(function (a, b) {
	                // uuid, won't ever be equal
	                var aCall = a.getCall(0);
	                var bCall = b.getCall(0);
	                var aId = aCall && aCall.callId || -1;
	                var bId = bCall && bCall.callId || -1;
	
	                return aId < bId ? -1 : 1;
	            });
	        };
	
	        sinon.createStubInstance = function (constructor) {
	            if (typeof constructor !== "function") {
	                throw new TypeError("The constructor should be a function.");
	            }
	            return sinon.stub(sinon.create(constructor.prototype));
	        };
	
	        sinon.restore = function (object) {
	            if (object !== null && typeof object === "object") {
	                for (var prop in object) {
	                    if (isRestorable(object[prop])) {
	                        object[prop].restore();
	                    }
	                }
	            } else if (isRestorable(object)) {
	                object.restore();
	            }
	        };
	
	        return sinon;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports) {
	        makeApi(exports);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	
	        // Adapted from https://developer.mozilla.org/en/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug
	        var hasDontEnumBug = (function () {
	            var obj = {
	                constructor: function () {
	                    return "0";
	                },
	                toString: function () {
	                    return "1";
	                },
	                valueOf: function () {
	                    return "2";
	                },
	                toLocaleString: function () {
	                    return "3";
	                },
	                prototype: function () {
	                    return "4";
	                },
	                isPrototypeOf: function () {
	                    return "5";
	                },
	                propertyIsEnumerable: function () {
	                    return "6";
	                },
	                hasOwnProperty: function () {
	                    return "7";
	                },
	                length: function () {
	                    return "8";
	                },
	                unique: function () {
	                    return "9";
	                }
	            };
	
	            var result = [];
	            for (var prop in obj) {
	                if (obj.hasOwnProperty(prop)) {
	                    result.push(obj[prop]());
	                }
	            }
	            return result.join("") !== "0123456789";
	        })();
	
	        /* Public: Extend target in place with all (own) properties from sources in-order. Thus, last source will
	         *         override properties in previous sources.
	         *
	         * target - The Object to extend
	         * sources - Objects to copy properties from.
	         *
	         * Returns the extended target
	         */
	        function extend(target /*, sources */) {
	            var sources = Array.prototype.slice.call(arguments, 1);
	            var source, i, prop;
	
	            for (i = 0; i < sources.length; i++) {
	                source = sources[i];
	
	                for (prop in source) {
	                    if (source.hasOwnProperty(prop)) {
	                        target[prop] = source[prop];
	                    }
	                }
	
	                // Make sure we copy (own) toString method even when in JScript with DontEnum bug
	                // See https://developer.mozilla.org/en/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug
	                if (hasDontEnumBug && source.hasOwnProperty("toString") && source.toString !== target.toString) {
	                    target.toString = source.toString;
	                }
	            }
	
	            return target;
	        }
	
	        sinon.extend = extend;
	        return sinon.extend;
	    }
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        module.exports = makeApi(sinon);
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	
	        function timesInWords(count) {
	            switch (count) {
	                case 1:
	                    return "once";
	                case 2:
	                    return "twice";
	                case 3:
	                    return "thrice";
	                default:
	                    return (count || 0) + " times";
	            }
	        }
	
	        sinon.timesInWords = timesInWords;
	        return sinon.timesInWords;
	    }
	
	    function loadDependencies(require, exports, module) {
	        var core = require("./util/core");
	        module.exports = makeApi(core);
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 */
	/**
	 * Format functions
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2014 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        function typeOf(value) {
	            if (value === null) {
	                return "null";
	            } else if (value === undefined) {
	                return "undefined";
	            }
	            var string = Object.prototype.toString.call(value);
	            return string.substring(8, string.length - 1).toLowerCase();
	        }
	
	        sinon.typeOf = typeOf;
	        return sinon.typeOf;
	    }
	
	    function loadDependencies(require, exports, module) {
	        var core = require("./util/core");
	        module.exports = makeApi(core);
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 * @depend typeOf.js
	 */
	/*jslint eqeqeq: false, onevar: false, plusplus: false*/
	/*global module, require, sinon*/
	/**
	 * Match functions
	 *
	 * @author Maximilian Antoni (mail@maxantoni.de)
	 * @license BSD
	 *
	 * Copyright (c) 2012 Maximilian Antoni
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        function assertType(value, type, name) {
	            var actual = sinon.typeOf(value);
	            if (actual !== type) {
	                throw new TypeError("Expected type of " + name + " to be " +
	                    type + ", but was " + actual);
	            }
	        }
	
	        var matcher = {
	            toString: function () {
	                return this.message;
	            }
	        };
	
	        function isMatcher(object) {
	            return matcher.isPrototypeOf(object);
	        }
	
	        function matchObject(expectation, actual) {
	            if (actual === null || actual === undefined) {
	                return false;
	            }
	            for (var key in expectation) {
	                if (expectation.hasOwnProperty(key)) {
	                    var exp = expectation[key];
	                    var act = actual[key];
	                    if (isMatcher(exp)) {
	                        if (!exp.test(act)) {
	                            return false;
	                        }
	                    } else if (sinon.typeOf(exp) === "object") {
	                        if (!matchObject(exp, act)) {
	                            return false;
	                        }
	                    } else if (!sinon.deepEqual(exp, act)) {
	                        return false;
	                    }
	                }
	            }
	            return true;
	        }
	
	        function match(expectation, message) {
	            var m = sinon.create(matcher);
	            var type = sinon.typeOf(expectation);
	            switch (type) {
	            case "object":
	                if (typeof expectation.test === "function") {
	                    m.test = function (actual) {
	                        return expectation.test(actual) === true;
	                    };
	                    m.message = "match(" + sinon.functionName(expectation.test) + ")";
	                    return m;
	                }
	                var str = [];
	                for (var key in expectation) {
	                    if (expectation.hasOwnProperty(key)) {
	                        str.push(key + ": " + expectation[key]);
	                    }
	                }
	                m.test = function (actual) {
	                    return matchObject(expectation, actual);
	                };
	                m.message = "match(" + str.join(", ") + ")";
	                break;
	            case "number":
	                m.test = function (actual) {
	                    // we need type coercion here
	                    return expectation == actual; // eslint-disable-line eqeqeq
	                };
	                break;
	            case "string":
	                m.test = function (actual) {
	                    if (typeof actual !== "string") {
	                        return false;
	                    }
	                    return actual.indexOf(expectation) !== -1;
	                };
	                m.message = "match(\"" + expectation + "\")";
	                break;
	            case "regexp":
	                m.test = function (actual) {
	                    if (typeof actual !== "string") {
	                        return false;
	                    }
	                    return expectation.test(actual);
	                };
	                break;
	            case "function":
	                m.test = expectation;
	                if (message) {
	                    m.message = message;
	                } else {
	                    m.message = "match(" + sinon.functionName(expectation) + ")";
	                }
	                break;
	            default:
	                m.test = function (actual) {
	                    return sinon.deepEqual(expectation, actual);
	                };
	            }
	            if (!m.message) {
	                m.message = "match(" + expectation + ")";
	            }
	            return m;
	        }
	
	        matcher.or = function (m2) {
	            if (!arguments.length) {
	                throw new TypeError("Matcher expected");
	            } else if (!isMatcher(m2)) {
	                m2 = match(m2);
	            }
	            var m1 = this;
	            var or = sinon.create(matcher);
	            or.test = function (actual) {
	                return m1.test(actual) || m2.test(actual);
	            };
	            or.message = m1.message + ".or(" + m2.message + ")";
	            return or;
	        };
	
	        matcher.and = function (m2) {
	            if (!arguments.length) {
	                throw new TypeError("Matcher expected");
	            } else if (!isMatcher(m2)) {
	                m2 = match(m2);
	            }
	            var m1 = this;
	            var and = sinon.create(matcher);
	            and.test = function (actual) {
	                return m1.test(actual) && m2.test(actual);
	            };
	            and.message = m1.message + ".and(" + m2.message + ")";
	            return and;
	        };
	
	        match.isMatcher = isMatcher;
	
	        match.any = match(function () {
	            return true;
	        }, "any");
	
	        match.defined = match(function (actual) {
	            return actual !== null && actual !== undefined;
	        }, "defined");
	
	        match.truthy = match(function (actual) {
	            return !!actual;
	        }, "truthy");
	
	        match.falsy = match(function (actual) {
	            return !actual;
	        }, "falsy");
	
	        match.same = function (expectation) {
	            return match(function (actual) {
	                return expectation === actual;
	            }, "same(" + expectation + ")");
	        };
	
	        match.typeOf = function (type) {
	            assertType(type, "string", "type");
	            return match(function (actual) {
	                return sinon.typeOf(actual) === type;
	            }, "typeOf(\"" + type + "\")");
	        };
	
	        match.instanceOf = function (type) {
	            assertType(type, "function", "type");
	            return match(function (actual) {
	                return actual instanceof type;
	            }, "instanceOf(" + sinon.functionName(type) + ")");
	        };
	
	        function createPropertyMatcher(propertyTest, messagePrefix) {
	            return function (property, value) {
	                assertType(property, "string", "property");
	                var onlyProperty = arguments.length === 1;
	                var message = messagePrefix + "(\"" + property + "\"";
	                if (!onlyProperty) {
	                    message += ", " + value;
	                }
	                message += ")";
	                return match(function (actual) {
	                    if (actual === undefined || actual === null ||
	                            !propertyTest(actual, property)) {
	                        return false;
	                    }
	                    return onlyProperty || sinon.deepEqual(value, actual[property]);
	                }, message);
	            };
	        }
	
	        match.has = createPropertyMatcher(function (actual, property) {
	            if (typeof actual === "object") {
	                return property in actual;
	            }
	            return actual[property] !== undefined;
	        }, "has");
	
	        match.hasOwn = createPropertyMatcher(function (actual, property) {
	            return actual.hasOwnProperty(property);
	        }, "hasOwn");
	
	        match.bool = match.typeOf("boolean");
	        match.number = match.typeOf("number");
	        match.string = match.typeOf("string");
	        match.object = match.typeOf("object");
	        match.func = match.typeOf("function");
	        match.array = match.typeOf("array");
	        match.regexp = match.typeOf("regexp");
	        match.date = match.typeOf("date");
	
	        sinon.match = match;
	        return match;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        require("./typeOf");
	        module.exports = makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 */
	/**
	 * Format functions
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2014 Christian Johansen
	 */
	(function (sinonGlobal, formatio) {
	    
	    function makeApi(sinon) {
	        function valueFormatter(value) {
	            return "" + value;
	        }
	
	        function getFormatioFormatter() {
	            var formatter = formatio.configure({
	                    quoteStrings: false,
	                    limitChildrenCount: 250
	                });
	
	            function format() {
	                return formatter.ascii.apply(formatter, arguments);
	            }
	
	            return format;
	        }
	
	        function getNodeFormatter() {
	            try {
	                var util = require("util");
	            } catch (e) {
	                /* Node, but no util module - would be very old, but better safe than sorry */
	            }
	
	            function format(v) {
	                var isObjectWithNativeToString = typeof v === "object" && v.toString === Object.prototype.toString;
	                return isObjectWithNativeToString ? util.inspect(v) : v;
	            }
	
	            return util ? format : valueFormatter;
	        }
	
	        var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	        var formatter;
	
	        if (isNode) {
	            try {
	                formatio = require("formatio");
	            }
	            catch (e) {} // eslint-disable-line no-empty
	        }
	
	        if (formatio) {
	            formatter = getFormatioFormatter();
	        } else if (isNode) {
	            formatter = getNodeFormatter();
	        } else {
	            formatter = valueFormatter;
	        }
	
	        sinon.format = formatter;
	        return sinon.format;
	    }
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        module.exports = makeApi(sinon);
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon, // eslint-disable-line no-undef
	    typeof formatio === "object" && formatio // eslint-disable-line no-undef
	));
	
	/**
	  * @depend util/core.js
	  * @depend match.js
	  * @depend format.js
	  */
	/**
	  * Spy calls
	  *
	  * @author Christian Johansen (christian@cjohansen.no)
	  * @author Maximilian Antoni (mail@maxantoni.de)
	  * @license BSD
	  *
	  * Copyright (c) 2010-2013 Christian Johansen
	  * Copyright (c) 2013 Maximilian Antoni
	  */
	(function (sinonGlobal) {
	    
	    var slice = Array.prototype.slice;
	
	    function makeApi(sinon) {
	        function throwYieldError(proxy, text, args) {
	            var msg = sinon.functionName(proxy) + text;
	            if (args.length) {
	                msg += " Received [" + slice.call(args).join(", ") + "]";
	            }
	            throw new Error(msg);
	        }
	
	        var callProto = {
	            calledOn: function calledOn(thisValue) {
	                if (sinon.match && sinon.match.isMatcher(thisValue)) {
	                    return thisValue.test(this.thisValue);
	                }
	                return this.thisValue === thisValue;
	            },
	
	            calledWith: function calledWith() {
	                var l = arguments.length;
	                if (l > this.args.length) {
	                    return false;
	                }
	                for (var i = 0; i < l; i += 1) {
	                    if (!sinon.deepEqual(arguments[i], this.args[i])) {
	                        return false;
	                    }
	                }
	
	                return true;
	            },
	
	            calledWithMatch: function calledWithMatch() {
	                var l = arguments.length;
	                if (l > this.args.length) {
	                    return false;
	                }
	                for (var i = 0; i < l; i += 1) {
	                    var actual = this.args[i];
	                    var expectation = arguments[i];
	                    if (!sinon.match || !sinon.match(expectation).test(actual)) {
	                        return false;
	                    }
	                }
	                return true;
	            },
	
	            calledWithExactly: function calledWithExactly() {
	                return arguments.length === this.args.length &&
	                    this.calledWith.apply(this, arguments);
	            },
	
	            notCalledWith: function notCalledWith() {
	                return !this.calledWith.apply(this, arguments);
	            },
	
	            notCalledWithMatch: function notCalledWithMatch() {
	                return !this.calledWithMatch.apply(this, arguments);
	            },
	
	            returned: function returned(value) {
	                return sinon.deepEqual(value, this.returnValue);
	            },
	
	            threw: function threw(error) {
	                if (typeof error === "undefined" || !this.exception) {
	                    return !!this.exception;
	                }
	
	                return this.exception === error || this.exception.name === error;
	            },
	
	            calledWithNew: function calledWithNew() {
	                return this.proxy.prototype && this.thisValue instanceof this.proxy;
	            },
	
	            calledBefore: function (other) {
	                return this.callId < other.callId;
	            },
	
	            calledAfter: function (other) {
	                return this.callId > other.callId;
	            },
	
	            callArg: function (pos) {
	                this.args[pos]();
	            },
	
	            callArgOn: function (pos, thisValue) {
	                this.args[pos].apply(thisValue);
	            },
	
	            callArgWith: function (pos) {
	                this.callArgOnWith.apply(this, [pos, null].concat(slice.call(arguments, 1)));
	            },
	
	            callArgOnWith: function (pos, thisValue) {
	                var args = slice.call(arguments, 2);
	                this.args[pos].apply(thisValue, args);
	            },
	
	            "yield": function () {
	                this.yieldOn.apply(this, [null].concat(slice.call(arguments, 0)));
	            },
	
	            yieldOn: function (thisValue) {
	                var args = this.args;
	                for (var i = 0, l = args.length; i < l; ++i) {
	                    if (typeof args[i] === "function") {
	                        args[i].apply(thisValue, slice.call(arguments, 1));
	                        return;
	                    }
	                }
	                throwYieldError(this.proxy, " cannot yield since no callback was passed.", args);
	            },
	
	            yieldTo: function (prop) {
	                this.yieldToOn.apply(this, [prop, null].concat(slice.call(arguments, 1)));
	            },
	
	            yieldToOn: function (prop, thisValue) {
	                var args = this.args;
	                for (var i = 0, l = args.length; i < l; ++i) {
	                    if (args[i] && typeof args[i][prop] === "function") {
	                        args[i][prop].apply(thisValue, slice.call(arguments, 2));
	                        return;
	                    }
	                }
	                throwYieldError(this.proxy, " cannot yield to '" + prop +
	                    "' since no callback was passed.", args);
	            },
	
	            getStackFrames: function () {
	                // Omit the error message and the two top stack frames in sinon itself:
	                return this.stack && this.stack.split("\n").slice(3);
	            },
	
	            toString: function () {
	                var callStr = this.proxy ? this.proxy.toString() + "(" : "";
	                var args = [];
	
	                if (!this.args) {
	                    return ":(";
	                }
	
	                for (var i = 0, l = this.args.length; i < l; ++i) {
	                    args.push(sinon.format(this.args[i]));
	                }
	
	                callStr = callStr + args.join(", ") + ")";
	
	                if (typeof this.returnValue !== "undefined") {
	                    callStr += " => " + sinon.format(this.returnValue);
	                }
	
	                if (this.exception) {
	                    callStr += " !" + this.exception.name;
	
	                    if (this.exception.message) {
	                        callStr += "(" + this.exception.message + ")";
	                    }
	                }
	                if (this.stack) {
	                    callStr += this.getStackFrames()[0].replace(/^\s*(?:at\s+|@)?/, " at ");
	
	                }
	
	                return callStr;
	            }
	        };
	
	        callProto.invokeCallback = callProto.yield;
	
	        function createSpyCall(spy, thisValue, args, returnValue, exception, id, stack) {
	            if (typeof id !== "number") {
	                throw new TypeError("Call id is not a number");
	            }
	            var proxyCall = sinon.create(callProto);
	            proxyCall.proxy = spy;
	            proxyCall.thisValue = thisValue;
	            proxyCall.args = args;
	            proxyCall.returnValue = returnValue;
	            proxyCall.exception = exception;
	            proxyCall.callId = id;
	            proxyCall.stack = stack;
	
	            return proxyCall;
	        }
	        createSpyCall.toString = callProto.toString; // used by mocks
	
	        sinon.spyCall = createSpyCall;
	        return createSpyCall;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        require("./match");
	        require("./format");
	        module.exports = makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	  * @depend times_in_words.js
	  * @depend util/core.js
	  * @depend extend.js
	  * @depend call.js
	  * @depend format.js
	  */
	/**
	  * Spy functions
	  *
	  * @author Christian Johansen (christian@cjohansen.no)
	  * @license BSD
	  *
	  * Copyright (c) 2010-2013 Christian Johansen
	  */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        var push = Array.prototype.push;
	        var slice = Array.prototype.slice;
	        var callId = 0;
	
	        function spy(object, property, types) {
	            if (!property && typeof object === "function") {
	                return spy.create(object);
	            }
	
	            if (!object && !property) {
	                return spy.create(function () { });
	            }
	
	            if (types) {
	                var methodDesc = sinon.getPropertyDescriptor(object, property);
	                for (var i = 0; i < types.length; i++) {
	                    methodDesc[types[i]] = spy.create(methodDesc[types[i]]);
	                }
	                return sinon.wrapMethod(object, property, methodDesc);
	            }
	
	            return sinon.wrapMethod(object, property, spy.create(object[property]));
	        }
	
	        function matchingFake(fakes, args, strict) {
	            if (!fakes) {
	                return undefined;
	            }
	
	            for (var i = 0, l = fakes.length; i < l; i++) {
	                if (fakes[i].matches(args, strict)) {
	                    return fakes[i];
	                }
	            }
	        }
	
	        function incrementCallCount() {
	            this.called = true;
	            this.callCount += 1;
	            this.notCalled = false;
	            this.calledOnce = this.callCount === 1;
	            this.calledTwice = this.callCount === 2;
	            this.calledThrice = this.callCount === 3;
	        }
	
	        function createCallProperties() {
	            this.firstCall = this.getCall(0);
	            this.secondCall = this.getCall(1);
	            this.thirdCall = this.getCall(2);
	            this.lastCall = this.getCall(this.callCount - 1);
	        }
	
	        var vars = "a,b,c,d,e,f,g,h,i,j,k,l";
	        function createProxy(func, proxyLength) {
	            // Retain the function length:
	            var p;
	            if (proxyLength) {
	                eval("p = (function proxy(" + vars.substring(0, proxyLength * 2 - 1) + // eslint-disable-line no-eval
	                    ") { return p.invoke(func, this, slice.call(arguments)); });");
	            } else {
	                p = function proxy() {
	                    return p.invoke(func, this, slice.call(arguments));
	                };
	            }
	            p.isSinonProxy = true;
	            return p;
	        }
	
	        var uuid = 0;
	
	        // Public API
	        var spyApi = {
	            reset: function () {
	                if (this.invoking) {
	                    var err = new Error("Cannot reset Sinon function while invoking it. " +
	                                        "Move the call to .reset outside of the callback.");
	                    err.name = "InvalidResetException";
	                    throw err;
	                }
	
	                this.called = false;
	                this.notCalled = true;
	                this.calledOnce = false;
	                this.calledTwice = false;
	                this.calledThrice = false;
	                this.callCount = 0;
	                this.firstCall = null;
	                this.secondCall = null;
	                this.thirdCall = null;
	                this.lastCall = null;
	                this.args = [];
	                this.returnValues = [];
	                this.thisValues = [];
	                this.exceptions = [];
	                this.callIds = [];
	                this.stacks = [];
	                if (this.fakes) {
	                    for (var i = 0; i < this.fakes.length; i++) {
	                        this.fakes[i].reset();
	                    }
	                }
	
	                return this;
	            },
	
	            create: function create(func, spyLength) {
	                var name;
	
	                if (typeof func !== "function") {
	                    func = function () { };
	                } else {
	                    name = sinon.functionName(func);
	                }
	
	                if (!spyLength) {
	                    spyLength = func.length;
	                }
	
	                var proxy = createProxy(func, spyLength);
	
	                sinon.extend(proxy, spy);
	                delete proxy.create;
	                sinon.extend(proxy, func);
	
	                proxy.reset();
	                proxy.prototype = func.prototype;
	                proxy.displayName = name || "spy";
	                proxy.toString = sinon.functionToString;
	                proxy.instantiateFake = sinon.spy.create;
	                proxy.id = "spy#" + uuid++;
	
	                return proxy;
	            },
	
	            invoke: function invoke(func, thisValue, args) {
	                var matching = matchingFake(this.fakes, args);
	                var exception, returnValue;
	
	                incrementCallCount.call(this);
	                push.call(this.thisValues, thisValue);
	                push.call(this.args, args);
	                push.call(this.callIds, callId++);
	
	                // Make call properties available from within the spied function:
	                createCallProperties.call(this);
	
	                try {
	                    this.invoking = true;
	
	                    if (matching) {
	                        returnValue = matching.invoke(func, thisValue, args);
	                    } else {
	                        returnValue = (this.func || func).apply(thisValue, args);
	                    }
	
	                    var thisCall = this.getCall(this.callCount - 1);
	                    if (thisCall.calledWithNew() && typeof returnValue !== "object") {
	                        returnValue = thisValue;
	                    }
	                } catch (e) {
	                    exception = e;
	                } finally {
	                    delete this.invoking;
	                }
	
	                push.call(this.exceptions, exception);
	                push.call(this.returnValues, returnValue);
	                push.call(this.stacks, new Error().stack);
	
	                // Make return value and exception available in the calls:
	                createCallProperties.call(this);
	
	                if (exception !== undefined) {
	                    throw exception;
	                }
	
	                return returnValue;
	            },
	
	            named: function named(name) {
	                this.displayName = name;
	                return this;
	            },
	
	            getCall: function getCall(i) {
	                if (i < 0 || i >= this.callCount) {
	                    return null;
	                }
	
	                return sinon.spyCall(this, this.thisValues[i], this.args[i],
	                                        this.returnValues[i], this.exceptions[i],
	                                        this.callIds[i], this.stacks[i]);
	            },
	
	            getCalls: function () {
	                var calls = [];
	                var i;
	
	                for (i = 0; i < this.callCount; i++) {
	                    calls.push(this.getCall(i));
	                }
	
	                return calls;
	            },
	
	            calledBefore: function calledBefore(spyFn) {
	                if (!this.called) {
	                    return false;
	                }
	
	                if (!spyFn.called) {
	                    return true;
	                }
	
	                return this.callIds[0] < spyFn.callIds[spyFn.callIds.length - 1];
	            },
	
	            calledAfter: function calledAfter(spyFn) {
	                if (!this.called || !spyFn.called) {
	                    return false;
	                }
	
	                return this.callIds[this.callCount - 1] > spyFn.callIds[spyFn.callCount - 1];
	            },
	
	            withArgs: function () {
	                var args = slice.call(arguments);
	
	                if (this.fakes) {
	                    var match = matchingFake(this.fakes, args, true);
	
	                    if (match) {
	                        return match;
	                    }
	                } else {
	                    this.fakes = [];
	                }
	
	                var original = this;
	                var fake = this.instantiateFake();
	                fake.matchingAguments = args;
	                fake.parent = this;
	                push.call(this.fakes, fake);
	
	                fake.withArgs = function () {
	                    return original.withArgs.apply(original, arguments);
	                };
	
	                for (var i = 0; i < this.args.length; i++) {
	                    if (fake.matches(this.args[i])) {
	                        incrementCallCount.call(fake);
	                        push.call(fake.thisValues, this.thisValues[i]);
	                        push.call(fake.args, this.args[i]);
	                        push.call(fake.returnValues, this.returnValues[i]);
	                        push.call(fake.exceptions, this.exceptions[i]);
	                        push.call(fake.callIds, this.callIds[i]);
	                    }
	                }
	                createCallProperties.call(fake);
	
	                return fake;
	            },
	
	            matches: function (args, strict) {
	                var margs = this.matchingAguments;
	
	                if (margs.length <= args.length &&
	                    sinon.deepEqual(margs, args.slice(0, margs.length))) {
	                    return !strict || margs.length === args.length;
	                }
	            },
	
	            printf: function (format) {
	                var spyInstance = this;
	                var args = slice.call(arguments, 1);
	                var formatter;
	
	                return (format || "").replace(/%(.)/g, function (match, specifyer) {
	                    formatter = spyApi.formatters[specifyer];
	
	                    if (typeof formatter === "function") {
	                        return formatter.call(null, spyInstance, args);
	                    } else if (!isNaN(parseInt(specifyer, 10))) {
	                        return sinon.format(args[specifyer - 1]);
	                    }
	
	                    return "%" + specifyer;
	                });
	            }
	        };
	
	        function delegateToCalls(method, matchAny, actual, notCalled) {
	            spyApi[method] = function () {
	                if (!this.called) {
	                    if (notCalled) {
	                        return notCalled.apply(this, arguments);
	                    }
	                    return false;
	                }
	
	                var currentCall;
	                var matches = 0;
	
	                for (var i = 0, l = this.callCount; i < l; i += 1) {
	                    currentCall = this.getCall(i);
	
	                    if (currentCall[actual || method].apply(currentCall, arguments)) {
	                        matches += 1;
	
	                        if (matchAny) {
	                            return true;
	                        }
	                    }
	                }
	
	                return matches === this.callCount;
	            };
	        }
	
	        delegateToCalls("calledOn", true);
	        delegateToCalls("alwaysCalledOn", false, "calledOn");
	        delegateToCalls("calledWith", true);
	        delegateToCalls("calledWithMatch", true);
	        delegateToCalls("alwaysCalledWith", false, "calledWith");
	        delegateToCalls("alwaysCalledWithMatch", false, "calledWithMatch");
	        delegateToCalls("calledWithExactly", true);
	        delegateToCalls("alwaysCalledWithExactly", false, "calledWithExactly");
	        delegateToCalls("neverCalledWith", false, "notCalledWith", function () {
	            return true;
	        });
	        delegateToCalls("neverCalledWithMatch", false, "notCalledWithMatch", function () {
	            return true;
	        });
	        delegateToCalls("threw", true);
	        delegateToCalls("alwaysThrew", false, "threw");
	        delegateToCalls("returned", true);
	        delegateToCalls("alwaysReturned", false, "returned");
	        delegateToCalls("calledWithNew", true);
	        delegateToCalls("alwaysCalledWithNew", false, "calledWithNew");
	        delegateToCalls("callArg", false, "callArgWith", function () {
	            throw new Error(this.toString() + " cannot call arg since it was not yet invoked.");
	        });
	        spyApi.callArgWith = spyApi.callArg;
	        delegateToCalls("callArgOn", false, "callArgOnWith", function () {
	            throw new Error(this.toString() + " cannot call arg since it was not yet invoked.");
	        });
	        spyApi.callArgOnWith = spyApi.callArgOn;
	        delegateToCalls("yield", false, "yield", function () {
	            throw new Error(this.toString() + " cannot yield since it was not yet invoked.");
	        });
	        // "invokeCallback" is an alias for "yield" since "yield" is invalid in strict mode.
	        spyApi.invokeCallback = spyApi.yield;
	        delegateToCalls("yieldOn", false, "yieldOn", function () {
	            throw new Error(this.toString() + " cannot yield since it was not yet invoked.");
	        });
	        delegateToCalls("yieldTo", false, "yieldTo", function (property) {
	            throw new Error(this.toString() + " cannot yield to '" + property +
	                "' since it was not yet invoked.");
	        });
	        delegateToCalls("yieldToOn", false, "yieldToOn", function (property) {
	            throw new Error(this.toString() + " cannot yield to '" + property +
	                "' since it was not yet invoked.");
	        });
	
	        spyApi.formatters = {
	            c: function (spyInstance) {
	                return sinon.timesInWords(spyInstance.callCount);
	            },
	
	            n: function (spyInstance) {
	                return spyInstance.toString();
	            },
	
	            C: function (spyInstance) {
	                var calls = [];
	
	                for (var i = 0, l = spyInstance.callCount; i < l; ++i) {
	                    var stringifiedCall = "    " + spyInstance.getCall(i).toString();
	                    if (/\n/.test(calls[i - 1])) {
	                        stringifiedCall = "\n" + stringifiedCall;
	                    }
	                    push.call(calls, stringifiedCall);
	                }
	
	                return calls.length > 0 ? "\n" + calls.join("\n") : "";
	            },
	
	            t: function (spyInstance) {
	                var objects = [];
	
	                for (var i = 0, l = spyInstance.callCount; i < l; ++i) {
	                    push.call(objects, sinon.format(spyInstance.thisValues[i]));
	                }
	
	                return objects.join(", ");
	            },
	
	            "*": function (spyInstance, args) {
	                var formatted = [];
	
	                for (var i = 0, l = args.length; i < l; ++i) {
	                    push.call(formatted, sinon.format(args[i]));
	                }
	
	                return formatted.join(", ");
	            }
	        };
	
	        sinon.extend(spy, spyApi);
	
	        spy.spyCall = sinon.spyCall;
	        sinon.spy = spy;
	
	        return spy;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var core = require("./util/core");
	        require("./call");
	        require("./extend");
	        require("./times_in_words");
	        require("./format");
	        module.exports = makeApi(core);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 * @depend extend.js
	 */
	/**
	 * Stub behavior
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @author Tim Fischbach (mail@timfischbach.de)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    var slice = Array.prototype.slice;
	    var join = Array.prototype.join;
	    var useLeftMostCallback = -1;
	    var useRightMostCallback = -2;
	
	    var nextTick = (function () {
	        if (typeof process === "object" && typeof process.nextTick === "function") {
	            return process.nextTick;
	        }
	
	        if (typeof setImmediate === "function") {
	            return setImmediate;
	        }
	
	        return function (callback) {
	            setTimeout(callback, 0);
	        };
	    })();
	
	    function throwsException(error, message) {
	        if (typeof error === "string") {
	            this.exception = new Error(message || "");
	            this.exception.name = error;
	        } else if (!error) {
	            this.exception = new Error("Error");
	        } else {
	            this.exception = error;
	        }
	
	        return this;
	    }
	
	    function getCallback(behavior, args) {
	        var callArgAt = behavior.callArgAt;
	
	        if (callArgAt >= 0) {
	            return args[callArgAt];
	        }
	
	        var argumentList;
	
	        if (callArgAt === useLeftMostCallback) {
	            argumentList = args;
	        }
	
	        if (callArgAt === useRightMostCallback) {
	            argumentList = slice.call(args).reverse();
	        }
	
	        var callArgProp = behavior.callArgProp;
	
	        for (var i = 0, l = argumentList.length; i < l; ++i) {
	            if (!callArgProp && typeof argumentList[i] === "function") {
	                return argumentList[i];
	            }
	
	            if (callArgProp && argumentList[i] &&
	                typeof argumentList[i][callArgProp] === "function") {
	                return argumentList[i][callArgProp];
	            }
	        }
	
	        return null;
	    }
	
	    function makeApi(sinon) {
	        function getCallbackError(behavior, func, args) {
	            if (behavior.callArgAt < 0) {
	                var msg;
	
	                if (behavior.callArgProp) {
	                    msg = sinon.functionName(behavior.stub) +
	                        " expected to yield to '" + behavior.callArgProp +
	                        "', but no object with such a property was passed.";
	                } else {
	                    msg = sinon.functionName(behavior.stub) +
	                        " expected to yield, but no callback was passed.";
	                }
	
	                if (args.length > 0) {
	                    msg += " Received [" + join.call(args, ", ") + "]";
	                }
	
	                return msg;
	            }
	
	            return "argument at index " + behavior.callArgAt + " is not a function: " + func;
	        }
	
	        function callCallback(behavior, args) {
	            if (typeof behavior.callArgAt === "number") {
	                var func = getCallback(behavior, args);
	
	                if (typeof func !== "function") {
	                    throw new TypeError(getCallbackError(behavior, func, args));
	                }
	
	                if (behavior.callbackAsync) {
	                    nextTick(function () {
	                        func.apply(behavior.callbackContext, behavior.callbackArguments);
	                    });
	                } else {
	                    func.apply(behavior.callbackContext, behavior.callbackArguments);
	                }
	            }
	        }
	
	        var proto = {
	            create: function create(stub) {
	                var behavior = sinon.extend({}, sinon.behavior);
	                delete behavior.create;
	                behavior.stub = stub;
	
	                return behavior;
	            },
	
	            isPresent: function isPresent() {
	                return (typeof this.callArgAt === "number" ||
	                        this.exception ||
	                        typeof this.returnArgAt === "number" ||
	                        this.returnThis ||
	                        this.returnValueDefined);
	            },
	
	            invoke: function invoke(context, args) {
	                callCallback(this, args);
	
	                if (this.exception) {
	                    throw this.exception;
	                } else if (typeof this.returnArgAt === "number") {
	                    return args[this.returnArgAt];
	                } else if (this.returnThis) {
	                    return context;
	                }
	
	                return this.returnValue;
	            },
	
	            onCall: function onCall(index) {
	                return this.stub.onCall(index);
	            },
	
	            onFirstCall: function onFirstCall() {
	                return this.stub.onFirstCall();
	            },
	
	            onSecondCall: function onSecondCall() {
	                return this.stub.onSecondCall();
	            },
	
	            onThirdCall: function onThirdCall() {
	                return this.stub.onThirdCall();
	            },
	
	            withArgs: function withArgs(/* arguments */) {
	                throw new Error(
	                    "Defining a stub by invoking \"stub.onCall(...).withArgs(...)\" " +
	                    "is not supported. Use \"stub.withArgs(...).onCall(...)\" " +
	                    "to define sequential behavior for calls with certain arguments."
	                );
	            },
	
	            callsArg: function callsArg(pos) {
	                if (typeof pos !== "number") {
	                    throw new TypeError("argument index is not number");
	                }
	
	                this.callArgAt = pos;
	                this.callbackArguments = [];
	                this.callbackContext = undefined;
	                this.callArgProp = undefined;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            callsArgOn: function callsArgOn(pos, context) {
	                if (typeof pos !== "number") {
	                    throw new TypeError("argument index is not number");
	                }
	                if (typeof context !== "object") {
	                    throw new TypeError("argument context is not an object");
	                }
	
	                this.callArgAt = pos;
	                this.callbackArguments = [];
	                this.callbackContext = context;
	                this.callArgProp = undefined;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            callsArgWith: function callsArgWith(pos) {
	                if (typeof pos !== "number") {
	                    throw new TypeError("argument index is not number");
	                }
	
	                this.callArgAt = pos;
	                this.callbackArguments = slice.call(arguments, 1);
	                this.callbackContext = undefined;
	                this.callArgProp = undefined;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            callsArgOnWith: function callsArgWith(pos, context) {
	                if (typeof pos !== "number") {
	                    throw new TypeError("argument index is not number");
	                }
	                if (typeof context !== "object") {
	                    throw new TypeError("argument context is not an object");
	                }
	
	                this.callArgAt = pos;
	                this.callbackArguments = slice.call(arguments, 2);
	                this.callbackContext = context;
	                this.callArgProp = undefined;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            yields: function () {
	                this.callArgAt = useLeftMostCallback;
	                this.callbackArguments = slice.call(arguments, 0);
	                this.callbackContext = undefined;
	                this.callArgProp = undefined;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            yieldsRight: function () {
	                this.callArgAt = useRightMostCallback;
	                this.callbackArguments = slice.call(arguments, 0);
	                this.callbackContext = undefined;
	                this.callArgProp = undefined;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            yieldsOn: function (context) {
	                if (typeof context !== "object") {
	                    throw new TypeError("argument context is not an object");
	                }
	
	                this.callArgAt = useLeftMostCallback;
	                this.callbackArguments = slice.call(arguments, 1);
	                this.callbackContext = context;
	                this.callArgProp = undefined;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            yieldsTo: function (prop) {
	                this.callArgAt = useLeftMostCallback;
	                this.callbackArguments = slice.call(arguments, 1);
	                this.callbackContext = undefined;
	                this.callArgProp = prop;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            yieldsToOn: function (prop, context) {
	                if (typeof context !== "object") {
	                    throw new TypeError("argument context is not an object");
	                }
	
	                this.callArgAt = useLeftMostCallback;
	                this.callbackArguments = slice.call(arguments, 2);
	                this.callbackContext = context;
	                this.callArgProp = prop;
	                this.callbackAsync = false;
	
	                return this;
	            },
	
	            throws: throwsException,
	            throwsException: throwsException,
	
	            returns: function returns(value) {
	                this.returnValue = value;
	                this.returnValueDefined = true;
	                this.exception = undefined;
	
	                return this;
	            },
	
	            returnsArg: function returnsArg(pos) {
	                if (typeof pos !== "number") {
	                    throw new TypeError("argument index is not number");
	                }
	
	                this.returnArgAt = pos;
	
	                return this;
	            },
	
	            returnsThis: function returnsThis() {
	                this.returnThis = true;
	
	                return this;
	            }
	        };
	
	        function createAsyncVersion(syncFnName) {
	            return function () {
	                var result = this[syncFnName].apply(this, arguments);
	                this.callbackAsync = true;
	                return result;
	            };
	        }
	
	        // create asynchronous versions of callsArg* and yields* methods
	        for (var method in proto) {
	            // need to avoid creating anotherasync versions of the newly added async methods
	            if (proto.hasOwnProperty(method) && method.match(/^(callsArg|yields)/) && !method.match(/Async/)) {
	                proto[method + "Async"] = createAsyncVersion(method);
	            }
	        }
	
	        sinon.behavior = proto;
	        return proto;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        require("./extend");
	        module.exports = makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        function walkInternal(obj, iterator, context, originalObj, seen) {
	            var proto, prop;
	
	            if (typeof Object.getOwnPropertyNames !== "function") {
	                // We explicitly want to enumerate through all of the prototype's properties
	                // in this case, therefore we deliberately leave out an own property check.
	                /* eslint-disable guard-for-in */
	                for (prop in obj) {
	                    iterator.call(context, obj[prop], prop, obj);
	                }
	                /* eslint-enable guard-for-in */
	
	                return;
	            }
	
	            Object.getOwnPropertyNames(obj).forEach(function (k) {
	                if (!seen[k]) {
	                    seen[k] = true;
	                    var target = typeof Object.getOwnPropertyDescriptor(obj, k).get === "function" ?
	                        originalObj : obj;
	                    iterator.call(context, target[k], k, target);
	                }
	            });
	
	            proto = Object.getPrototypeOf(obj);
	            if (proto) {
	                walkInternal(proto, iterator, context, originalObj, seen);
	            }
	        }
	
	        /* Public: walks the prototype chain of an object and iterates over every own property
	         * name encountered. The iterator is called in the same fashion that Array.prototype.forEach
	         * works, where it is passed the value, key, and own object as the 1st, 2nd, and 3rd positional
	         * argument, respectively. In cases where Object.getOwnPropertyNames is not available, walk will
	         * default to using a simple for..in loop.
	         *
	         * obj - The object to walk the prototype chain for.
	         * iterator - The function to be called on each pass of the walk.
	         * context - (Optional) When given, the iterator will be called with this object as the receiver.
	         */
	        function walk(obj, iterator, context) {
	            return walkInternal(obj, iterator, context, obj, {});
	        }
	
	        sinon.walk = walk;
	        return sinon.walk;
	    }
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        module.exports = makeApi(sinon);
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 * @depend extend.js
	 * @depend spy.js
	 * @depend behavior.js
	 * @depend walk.js
	 */
	/**
	 * Stub functions
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        function stub(object, property, func) {
	            if (!!func && typeof func !== "function" && typeof func !== "object") {
	                throw new TypeError("Custom stub should be a function or a property descriptor");
	            }
	
	            var wrapper;
	
	            if (func) {
	                if (typeof func === "function") {
	                    wrapper = sinon.spy && sinon.spy.create ? sinon.spy.create(func) : func;
	                } else {
	                    wrapper = func;
	                    if (sinon.spy && sinon.spy.create) {
	                        var types = sinon.objectKeys(wrapper);
	                        for (var i = 0; i < types.length; i++) {
	                            wrapper[types[i]] = sinon.spy.create(wrapper[types[i]]);
	                        }
	                    }
	                }
	            } else {
	                var stubLength = 0;
	                if (typeof object === "object" && typeof object[property] === "function") {
	                    stubLength = object[property].length;
	                }
	                wrapper = stub.create(stubLength);
	            }
	
	            if (!object && typeof property === "undefined") {
	                return sinon.stub.create();
	            }
	
	            if (typeof property === "undefined" && typeof object === "object") {
	                sinon.walk(object || {}, function (value, prop, propOwner) {
	                    // we don't want to stub things like toString(), valueOf(), etc. so we only stub if the object
	                    // is not Object.prototype
	                    if (
	                        propOwner !== Object.prototype &&
	                        prop !== "constructor" &&
	                        typeof sinon.getPropertyDescriptor(propOwner, prop).value === "function"
	                    ) {
	                        stub(object, prop);
	                    }
	                });
	
	                return object;
	            }
	
	            return sinon.wrapMethod(object, property, wrapper);
	        }
	
	
	        /*eslint-disable no-use-before-define*/
	        function getParentBehaviour(stubInstance) {
	            return (stubInstance.parent && getCurrentBehavior(stubInstance.parent));
	        }
	
	        function getDefaultBehavior(stubInstance) {
	            return stubInstance.defaultBehavior ||
	                    getParentBehaviour(stubInstance) ||
	                    sinon.behavior.create(stubInstance);
	        }
	
	        function getCurrentBehavior(stubInstance) {
	            var behavior = stubInstance.behaviors[stubInstance.callCount - 1];
	            return behavior && behavior.isPresent() ? behavior : getDefaultBehavior(stubInstance);
	        }
	        /*eslint-enable no-use-before-define*/
	
	        var uuid = 0;
	
	        var proto = {
	            create: function create(stubLength) {
	                var functionStub = function () {
	                    return getCurrentBehavior(functionStub).invoke(this, arguments);
	                };
	
	                functionStub.id = "stub#" + uuid++;
	                var orig = functionStub;
	                functionStub = sinon.spy.create(functionStub, stubLength);
	                functionStub.func = orig;
	
	                sinon.extend(functionStub, stub);
	                functionStub.instantiateFake = sinon.stub.create;
	                functionStub.displayName = "stub";
	                functionStub.toString = sinon.functionToString;
	
	                functionStub.defaultBehavior = null;
	                functionStub.behaviors = [];
	
	                return functionStub;
	            },
	
	            resetBehavior: function () {
	                var i;
	
	                this.defaultBehavior = null;
	                this.behaviors = [];
	
	                delete this.returnValue;
	                delete this.returnArgAt;
	                this.returnThis = false;
	
	                if (this.fakes) {
	                    for (i = 0; i < this.fakes.length; i++) {
	                        this.fakes[i].resetBehavior();
	                    }
	                }
	            },
	
	            onCall: function onCall(index) {
	                if (!this.behaviors[index]) {
	                    this.behaviors[index] = sinon.behavior.create(this);
	                }
	
	                return this.behaviors[index];
	            },
	
	            onFirstCall: function onFirstCall() {
	                return this.onCall(0);
	            },
	
	            onSecondCall: function onSecondCall() {
	                return this.onCall(1);
	            },
	
	            onThirdCall: function onThirdCall() {
	                return this.onCall(2);
	            }
	        };
	
	        function createBehavior(behaviorMethod) {
	            return function () {
	                this.defaultBehavior = this.defaultBehavior || sinon.behavior.create(this);
	                this.defaultBehavior[behaviorMethod].apply(this.defaultBehavior, arguments);
	                return this;
	            };
	        }
	
	        for (var method in sinon.behavior) {
	            if (sinon.behavior.hasOwnProperty(method) &&
	                !proto.hasOwnProperty(method) &&
	                method !== "create" &&
	                method !== "withArgs" &&
	                method !== "invoke") {
	                proto[method] = createBehavior(method);
	            }
	        }
	
	        sinon.extend(stub, proto);
	        sinon.stub = stub;
	
	        return stub;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var core = require("./util/core");
	        require("./behavior");
	        require("./spy");
	        require("./extend");
	        module.exports = makeApi(core);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend times_in_words.js
	 * @depend util/core.js
	 * @depend call.js
	 * @depend extend.js
	 * @depend match.js
	 * @depend spy.js
	 * @depend stub.js
	 * @depend format.js
	 */
	/**
	 * Mock functions.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        var push = [].push;
	        var match = sinon.match;
	
	        function mock(object) {
	            // if (typeof console !== undefined && console.warn) {
	            //     console.warn("mock will be removed from Sinon.JS v2.0");
	            // }
	
	            if (!object) {
	                return sinon.expectation.create("Anonymous mock");
	            }
	
	            return mock.create(object);
	        }
	
	        function each(collection, callback) {
	            if (!collection) {
	                return;
	            }
	
	            for (var i = 0, l = collection.length; i < l; i += 1) {
	                callback(collection[i]);
	            }
	        }
	
	        function arrayEquals(arr1, arr2, compareLength) {
	            if (compareLength && (arr1.length !== arr2.length)) {
	                return false;
	            }
	
	            for (var i = 0, l = arr1.length; i < l; i++) {
	                if (!sinon.deepEqual(arr1[i], arr2[i])) {
	                    return false;
	                }
	            }
	            return true;
	        }
	
	        sinon.extend(mock, {
	            create: function create(object) {
	                if (!object) {
	                    throw new TypeError("object is null");
	                }
	
	                var mockObject = sinon.extend({}, mock);
	                mockObject.object = object;
	                delete mockObject.create;
	
	                return mockObject;
	            },
	
	            expects: function expects(method) {
	                if (!method) {
	                    throw new TypeError("method is falsy");
	                }
	
	                if (!this.expectations) {
	                    this.expectations = {};
	                    this.proxies = [];
	                }
	
	                if (!this.expectations[method]) {
	                    this.expectations[method] = [];
	                    var mockObject = this;
	
	                    sinon.wrapMethod(this.object, method, function () {
	                        return mockObject.invokeMethod(method, this, arguments);
	                    });
	
	                    push.call(this.proxies, method);
	                }
	
	                var expectation = sinon.expectation.create(method);
	                push.call(this.expectations[method], expectation);
	
	                return expectation;
	            },
	
	            restore: function restore() {
	                var object = this.object;
	
	                each(this.proxies, function (proxy) {
	                    if (typeof object[proxy].restore === "function") {
	                        object[proxy].restore();
	                    }
	                });
	            },
	
	            verify: function verify() {
	                var expectations = this.expectations || {};
	                var messages = [];
	                var met = [];
	
	                each(this.proxies, function (proxy) {
	                    each(expectations[proxy], function (expectation) {
	                        if (!expectation.met()) {
	                            push.call(messages, expectation.toString());
	                        } else {
	                            push.call(met, expectation.toString());
	                        }
	                    });
	                });
	
	                this.restore();
	
	                if (messages.length > 0) {
	                    sinon.expectation.fail(messages.concat(met).join("\n"));
	                } else if (met.length > 0) {
	                    sinon.expectation.pass(messages.concat(met).join("\n"));
	                }
	
	                return true;
	            },
	
	            invokeMethod: function invokeMethod(method, thisValue, args) {
	                var expectations = this.expectations && this.expectations[method] ? this.expectations[method] : [];
	                var expectationsWithMatchingArgs = [];
	                var currentArgs = args || [];
	                var i, available;
	
	                for (i = 0; i < expectations.length; i += 1) {
	                    var expectedArgs = expectations[i].expectedArguments || [];
	                    if (arrayEquals(expectedArgs, currentArgs, expectations[i].expectsExactArgCount)) {
	                        expectationsWithMatchingArgs.push(expectations[i]);
	                    }
	                }
	
	                for (i = 0; i < expectationsWithMatchingArgs.length; i += 1) {
	                    if (!expectationsWithMatchingArgs[i].met() &&
	                        expectationsWithMatchingArgs[i].allowsCall(thisValue, args)) {
	                        return expectationsWithMatchingArgs[i].apply(thisValue, args);
	                    }
	                }
	
	                var messages = [];
	                var exhausted = 0;
	
	                for (i = 0; i < expectationsWithMatchingArgs.length; i += 1) {
	                    if (expectationsWithMatchingArgs[i].allowsCall(thisValue, args)) {
	                        available = available || expectationsWithMatchingArgs[i];
	                    } else {
	                        exhausted += 1;
	                    }
	                }
	
	                if (available && exhausted === 0) {
	                    return available.apply(thisValue, args);
	                }
	
	                for (i = 0; i < expectations.length; i += 1) {
	                    push.call(messages, "    " + expectations[i].toString());
	                }
	
	                messages.unshift("Unexpected call: " + sinon.spyCall.toString.call({
	                    proxy: method,
	                    args: args
	                }));
	
	                sinon.expectation.fail(messages.join("\n"));
	            }
	        });
	
	        var times = sinon.timesInWords;
	        var slice = Array.prototype.slice;
	
	        function callCountInWords(callCount) {
	            if (callCount === 0) {
	                return "never called";
	            }
	
	            return "called " + times(callCount);
	        }
	
	        function expectedCallCountInWords(expectation) {
	            var min = expectation.minCalls;
	            var max = expectation.maxCalls;
	
	            if (typeof min === "number" && typeof max === "number") {
	                var str = times(min);
	
	                if (min !== max) {
	                    str = "at least " + str + " and at most " + times(max);
	                }
	
	                return str;
	            }
	
	            if (typeof min === "number") {
	                return "at least " + times(min);
	            }
	
	            return "at most " + times(max);
	        }
	
	        function receivedMinCalls(expectation) {
	            var hasMinLimit = typeof expectation.minCalls === "number";
	            return !hasMinLimit || expectation.callCount >= expectation.minCalls;
	        }
	
	        function receivedMaxCalls(expectation) {
	            if (typeof expectation.maxCalls !== "number") {
	                return false;
	            }
	
	            return expectation.callCount === expectation.maxCalls;
	        }
	
	        function verifyMatcher(possibleMatcher, arg) {
	            var isMatcher = match && match.isMatcher(possibleMatcher);
	
	            return isMatcher && possibleMatcher.test(arg) || true;
	        }
	
	        sinon.expectation = {
	            minCalls: 1,
	            maxCalls: 1,
	
	            create: function create(methodName) {
	                var expectation = sinon.extend(sinon.stub.create(), sinon.expectation);
	                delete expectation.create;
	                expectation.method = methodName;
	
	                return expectation;
	            },
	
	            invoke: function invoke(func, thisValue, args) {
	                this.verifyCallAllowed(thisValue, args);
	
	                return sinon.spy.invoke.apply(this, arguments);
	            },
	
	            atLeast: function atLeast(num) {
	                if (typeof num !== "number") {
	                    throw new TypeError("'" + num + "' is not number");
	                }
	
	                if (!this.limitsSet) {
	                    this.maxCalls = null;
	                    this.limitsSet = true;
	                }
	
	                this.minCalls = num;
	
	                return this;
	            },
	
	            atMost: function atMost(num) {
	                if (typeof num !== "number") {
	                    throw new TypeError("'" + num + "' is not number");
	                }
	
	                if (!this.limitsSet) {
	                    this.minCalls = null;
	                    this.limitsSet = true;
	                }
	
	                this.maxCalls = num;
	
	                return this;
	            },
	
	            never: function never() {
	                return this.exactly(0);
	            },
	
	            once: function once() {
	                return this.exactly(1);
	            },
	
	            twice: function twice() {
	                return this.exactly(2);
	            },
	
	            thrice: function thrice() {
	                return this.exactly(3);
	            },
	
	            exactly: function exactly(num) {
	                if (typeof num !== "number") {
	                    throw new TypeError("'" + num + "' is not a number");
	                }
	
	                this.atLeast(num);
	                return this.atMost(num);
	            },
	
	            met: function met() {
	                return !this.failed && receivedMinCalls(this);
	            },
	
	            verifyCallAllowed: function verifyCallAllowed(thisValue, args) {
	                if (receivedMaxCalls(this)) {
	                    this.failed = true;
	                    sinon.expectation.fail(this.method + " already called " + times(this.maxCalls));
	                }
	
	                if ("expectedThis" in this && this.expectedThis !== thisValue) {
	                    sinon.expectation.fail(this.method + " called with " + thisValue + " as thisValue, expected " +
	                        this.expectedThis);
	                }
	
	                if (!("expectedArguments" in this)) {
	                    return;
	                }
	
	                if (!args) {
	                    sinon.expectation.fail(this.method + " received no arguments, expected " +
	                        sinon.format(this.expectedArguments));
	                }
	
	                if (args.length < this.expectedArguments.length) {
	                    sinon.expectation.fail(this.method + " received too few arguments (" + sinon.format(args) +
	                        "), expected " + sinon.format(this.expectedArguments));
	                }
	
	                if (this.expectsExactArgCount &&
	                    args.length !== this.expectedArguments.length) {
	                    sinon.expectation.fail(this.method + " received too many arguments (" + sinon.format(args) +
	                        "), expected " + sinon.format(this.expectedArguments));
	                }
	
	                for (var i = 0, l = this.expectedArguments.length; i < l; i += 1) {
	
	                    if (!verifyMatcher(this.expectedArguments[i], args[i])) {
	                        sinon.expectation.fail(this.method + " received wrong arguments " + sinon.format(args) +
	                            ", didn't match " + this.expectedArguments.toString());
	                    }
	
	                    if (!sinon.deepEqual(this.expectedArguments[i], args[i])) {
	                        sinon.expectation.fail(this.method + " received wrong arguments " + sinon.format(args) +
	                            ", expected " + sinon.format(this.expectedArguments));
	                    }
	                }
	            },
	
	            allowsCall: function allowsCall(thisValue, args) {
	                if (this.met() && receivedMaxCalls(this)) {
	                    return false;
	                }
	
	                if ("expectedThis" in this && this.expectedThis !== thisValue) {
	                    return false;
	                }
	
	                if (!("expectedArguments" in this)) {
	                    return true;
	                }
	
	                args = args || [];
	
	                if (args.length < this.expectedArguments.length) {
	                    return false;
	                }
	
	                if (this.expectsExactArgCount &&
	                    args.length !== this.expectedArguments.length) {
	                    return false;
	                }
	
	                for (var i = 0, l = this.expectedArguments.length; i < l; i += 1) {
	                    if (!verifyMatcher(this.expectedArguments[i], args[i])) {
	                        return false;
	                    }
	
	                    if (!sinon.deepEqual(this.expectedArguments[i], args[i])) {
	                        return false;
	                    }
	                }
	
	                return true;
	            },
	
	            withArgs: function withArgs() {
	                this.expectedArguments = slice.call(arguments);
	                return this;
	            },
	
	            withExactArgs: function withExactArgs() {
	                this.withArgs.apply(this, arguments);
	                this.expectsExactArgCount = true;
	                return this;
	            },
	
	            on: function on(thisValue) {
	                this.expectedThis = thisValue;
	                return this;
	            },
	
	            toString: function () {
	                var args = (this.expectedArguments || []).slice();
	
	                if (!this.expectsExactArgCount) {
	                    push.call(args, "[...]");
	                }
	
	                var callStr = sinon.spyCall.toString.call({
	                    proxy: this.method || "anonymous mock expectation",
	                    args: args
	                });
	
	                var message = callStr.replace(", [...", "[, ...") + " " +
	                    expectedCallCountInWords(this);
	
	                if (this.met()) {
	                    return "Expectation met: " + message;
	                }
	
	                return "Expected " + message + " (" +
	                    callCountInWords(this.callCount) + ")";
	            },
	
	            verify: function verify() {
	                if (!this.met()) {
	                    sinon.expectation.fail(this.toString());
	                } else {
	                    sinon.expectation.pass(this.toString());
	                }
	
	                return true;
	            },
	
	            pass: function pass(message) {
	                sinon.assert.pass(message);
	            },
	
	            fail: function fail(message) {
	                var exception = new Error(message);
	                exception.name = "ExpectationError";
	
	                throw exception;
	            }
	        };
	
	        sinon.mock = mock;
	        return mock;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        require("./times_in_words");
	        require("./call");
	        require("./extend");
	        require("./match");
	        require("./spy");
	        require("./stub");
	        require("./format");
	
	        module.exports = makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 * @depend spy.js
	 * @depend stub.js
	 * @depend mock.js
	 */
	/**
	 * Collections of stubs, spies and mocks.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    var push = [].push;
	    var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	    function getFakes(fakeCollection) {
	        if (!fakeCollection.fakes) {
	            fakeCollection.fakes = [];
	        }
	
	        return fakeCollection.fakes;
	    }
	
	    function each(fakeCollection, method) {
	        var fakes = getFakes(fakeCollection);
	
	        for (var i = 0, l = fakes.length; i < l; i += 1) {
	            if (typeof fakes[i][method] === "function") {
	                fakes[i][method]();
	            }
	        }
	    }
	
	    function compact(fakeCollection) {
	        var fakes = getFakes(fakeCollection);
	        var i = 0;
	        while (i < fakes.length) {
	            fakes.splice(i, 1);
	        }
	    }
	
	    function makeApi(sinon) {
	        var collection = {
	            verify: function resolve() {
	                each(this, "verify");
	            },
	
	            restore: function restore() {
	                each(this, "restore");
	                compact(this);
	            },
	
	            reset: function restore() {
	                each(this, "reset");
	            },
	
	            verifyAndRestore: function verifyAndRestore() {
	                var exception;
	
	                try {
	                    this.verify();
	                } catch (e) {
	                    exception = e;
	                }
	
	                this.restore();
	
	                if (exception) {
	                    throw exception;
	                }
	            },
	
	            add: function add(fake) {
	                push.call(getFakes(this), fake);
	                return fake;
	            },
	
	            spy: function spy() {
	                return this.add(sinon.spy.apply(sinon, arguments));
	            },
	
	            stub: function stub(object, property, value) {
	                if (property) {
	                    var original = object[property];
	
	                    if (typeof original !== "function") {
	                        if (!hasOwnProperty.call(object, property)) {
	                            throw new TypeError("Cannot stub non-existent own property " + property);
	                        }
	
	                        object[property] = value;
	
	                        return this.add({
	                            restore: function () {
	                                object[property] = original;
	                            }
	                        });
	                    }
	                }
	                if (!property && !!object && typeof object === "object") {
	                    var stubbedObj = sinon.stub.apply(sinon, arguments);
	
	                    for (var prop in stubbedObj) {
	                        if (typeof stubbedObj[prop] === "function") {
	                            this.add(stubbedObj[prop]);
	                        }
	                    }
	
	                    return stubbedObj;
	                }
	
	                return this.add(sinon.stub.apply(sinon, arguments));
	            },
	
	            mock: function mock() {
	                return this.add(sinon.mock.apply(sinon, arguments));
	            },
	
	            inject: function inject(obj) {
	                var col = this;
	
	                obj.spy = function () {
	                    return col.spy.apply(col, arguments);
	                };
	
	                obj.stub = function () {
	                    return col.stub.apply(col, arguments);
	                };
	
	                obj.mock = function () {
	                    return col.mock.apply(col, arguments);
	                };
	
	                return obj;
	            }
	        };
	
	        sinon.collection = collection;
	        return collection;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        require("./mock");
	        require("./spy");
	        require("./stub");
	        module.exports = makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * Fake timer API
	 * setTimeout
	 * setInterval
	 * clearTimeout
	 * clearInterval
	 * tick
	 * reset
	 * Date
	 *
	 * Inspired by jsUnitMockTimeOut from JsUnit
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function () {
	    
	    function makeApi(s, lol) {
	        /*global lolex */
	        var llx = typeof lolex !== "undefined" ? lolex : lol;
	
	        s.useFakeTimers = function () {
	            var now;
	            var methods = Array.prototype.slice.call(arguments);
	
	            if (typeof methods[0] === "string") {
	                now = 0;
	            } else {
	                now = methods.shift();
	            }
	
	            var clock = llx.install(now || 0, methods);
	            clock.restore = clock.uninstall;
	            return clock;
	        };
	
	        s.clock = {
	            create: function (now) {
	                return llx.createClock(now);
	            }
	        };
	
	        s.timers = {
	            setTimeout: setTimeout,
	            clearTimeout: clearTimeout,
	            setImmediate: (typeof setImmediate !== "undefined" ? setImmediate : undefined),
	            clearImmediate: (typeof clearImmediate !== "undefined" ? clearImmediate : undefined),
	            setInterval: setInterval,
	            clearInterval: clearInterval,
	            Date: Date
	        };
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, epxorts, module, lolex) {
	        var core = require("./core");
	        makeApi(core, lolex);
	        module.exports = core;
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	    } else if (isNode) {
	        loadDependencies(require, module.exports, module, require("lolex"));
	    } else {
	        makeApi(sinon); // eslint-disable-line no-undef
	    }
	}());
	
	/**
	 * Minimal Event interface implementation
	 *
	 * Original implementation by Sven Fuchs: https://gist.github.com/995028
	 * Modifications and tests by Christian Johansen.
	 *
	 * @author Sven Fuchs (svenfuchs@artweb-design.de)
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2011 Sven Fuchs, Christian Johansen
	 */
	if (typeof sinon === "undefined") {
	    this.sinon = {};
	}
	
	(function () {
	    
	    var push = [].push;
	
	    function makeApi(sinon) {
	        sinon.Event = function Event(type, bubbles, cancelable, target) {
	            this.initEvent(type, bubbles, cancelable, target);
	        };
	
	        sinon.Event.prototype = {
	            initEvent: function (type, bubbles, cancelable, target) {
	                this.type = type;
	                this.bubbles = bubbles;
	                this.cancelable = cancelable;
	                this.target = target;
	            },
	
	            stopPropagation: function () {},
	
	            preventDefault: function () {
	                this.defaultPrevented = true;
	            }
	        };
	
	        sinon.ProgressEvent = function ProgressEvent(type, progressEventRaw, target) {
	            this.initEvent(type, false, false, target);
	            this.loaded = progressEventRaw.loaded || null;
	            this.total = progressEventRaw.total || null;
	            this.lengthComputable = !!progressEventRaw.total;
	        };
	
	        sinon.ProgressEvent.prototype = new sinon.Event();
	
	        sinon.ProgressEvent.prototype.constructor = sinon.ProgressEvent;
	
	        sinon.CustomEvent = function CustomEvent(type, customData, target) {
	            this.initEvent(type, false, false, target);
	            this.detail = customData.detail || null;
	        };
	
	        sinon.CustomEvent.prototype = new sinon.Event();
	
	        sinon.CustomEvent.prototype.constructor = sinon.CustomEvent;
	
	        sinon.EventTarget = {
	            addEventListener: function addEventListener(event, listener) {
	                this.eventListeners = this.eventListeners || {};
	                this.eventListeners[event] = this.eventListeners[event] || [];
	                push.call(this.eventListeners[event], listener);
	            },
	
	            removeEventListener: function removeEventListener(event, listener) {
	                var listeners = this.eventListeners && this.eventListeners[event] || [];
	
	                for (var i = 0, l = listeners.length; i < l; ++i) {
	                    if (listeners[i] === listener) {
	                        return listeners.splice(i, 1);
	                    }
	                }
	            },
	
	            dispatchEvent: function dispatchEvent(event) {
	                var type = event.type;
	                var listeners = this.eventListeners && this.eventListeners[type] || [];
	
	                for (var i = 0; i < listeners.length; i++) {
	                    if (typeof listeners[i] === "function") {
	                        listeners[i].call(this, event);
	                    } else {
	                        listeners[i].handleEvent(event);
	                    }
	                }
	
	                return !!event.defaultPrevented;
	            }
	        };
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require) {
	        var sinon = require("./core");
	        makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	    } else if (isNode) {
	        loadDependencies(require);
	    } else {
	        makeApi(sinon); // eslint-disable-line no-undef
	    }
	}());
	
	/**
	 * @depend util/core.js
	 */
	/**
	 * Logs errors
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2014 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    // cache a reference to setTimeout, so that our reference won't be stubbed out
	    // when using fake timers and errors will still get logged
	    // https://github.com/cjohansen/Sinon.JS/issues/381
	    var realSetTimeout = setTimeout;
	
	    function makeApi(sinon) {
	
	        function log() {}
	
	        function logError(label, err) {
	            var msg = label + " threw exception: ";
	
	            function throwLoggedError() {
	                err.message = msg + err.message;
	                throw err;
	            }
	
	            sinon.log(msg + "[" + err.name + "] " + err.message);
	
	            if (err.stack) {
	                sinon.log(err.stack);
	            }
	
	            if (logError.useImmediateExceptions) {
	                throwLoggedError();
	            } else {
	                logError.setTimeout(throwLoggedError, 0);
	            }
	        }
	
	        // When set to true, any errors logged will be thrown immediately;
	        // If set to false, the errors will be thrown in separate execution frame.
	        logError.useImmediateExceptions = false;
	
	        // wrap realSetTimeout with something we can stub in tests
	        logError.setTimeout = function (func, timeout) {
	            realSetTimeout(func, timeout);
	        };
	
	        var exports = {};
	        exports.log = sinon.log = log;
	        exports.logError = sinon.logError = logError;
	
	        return exports;
	    }
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        module.exports = makeApi(sinon);
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend core.js
	 * @depend ../extend.js
	 * @depend event.js
	 * @depend ../log_error.js
	 */
	/**
	 * Fake XDomainRequest object
	 */
	
	/**
	 * Returns the global to prevent assigning values to 'this' when this is undefined.
	 * This can occur when files are interpreted by node in strict mode.
	 * @private
	 */
	function getGlobal() {
	    
	    return typeof window !== "undefined" ? window : global;
	}
	
	if (typeof sinon === "undefined") {
	    if (typeof this === "undefined") {
	        getGlobal().sinon = {};
	    } else {
	        this.sinon = {};
	    }
	}
	
	// wrapper for global
	(function (global) {
	    
	    var xdr = { XDomainRequest: global.XDomainRequest };
	    xdr.GlobalXDomainRequest = global.XDomainRequest;
	    xdr.supportsXDR = typeof xdr.GlobalXDomainRequest !== "undefined";
	    xdr.workingXDR = xdr.supportsXDR ? xdr.GlobalXDomainRequest : false;
	
	    function makeApi(sinon) {
	        sinon.xdr = xdr;
	
	        function FakeXDomainRequest() {
	            this.readyState = FakeXDomainRequest.UNSENT;
	            this.requestBody = null;
	            this.requestHeaders = {};
	            this.status = 0;
	            this.timeout = null;
	
	            if (typeof FakeXDomainRequest.onCreate === "function") {
	                FakeXDomainRequest.onCreate(this);
	            }
	        }
	
	        function verifyState(x) {
	            if (x.readyState !== FakeXDomainRequest.OPENED) {
	                throw new Error("INVALID_STATE_ERR");
	            }
	
	            if (x.sendFlag) {
	                throw new Error("INVALID_STATE_ERR");
	            }
	        }
	
	        function verifyRequestSent(x) {
	            if (x.readyState === FakeXDomainRequest.UNSENT) {
	                throw new Error("Request not sent");
	            }
	            if (x.readyState === FakeXDomainRequest.DONE) {
	                throw new Error("Request done");
	            }
	        }
	
	        function verifyResponseBodyType(body) {
	            if (typeof body !== "string") {
	                var error = new Error("Attempted to respond to fake XDomainRequest with " +
	                                    body + ", which is not a string.");
	                error.name = "InvalidBodyException";
	                throw error;
	            }
	        }
	
	        sinon.extend(FakeXDomainRequest.prototype, sinon.EventTarget, {
	            open: function open(method, url) {
	                this.method = method;
	                this.url = url;
	
	                this.responseText = null;
	                this.sendFlag = false;
	
	                this.readyStateChange(FakeXDomainRequest.OPENED);
	            },
	
	            readyStateChange: function readyStateChange(state) {
	                this.readyState = state;
	                var eventName = "";
	                switch (this.readyState) {
	                case FakeXDomainRequest.UNSENT:
	                    break;
	                case FakeXDomainRequest.OPENED:
	                    break;
	                case FakeXDomainRequest.LOADING:
	                    if (this.sendFlag) {
	                        //raise the progress event
	                        eventName = "onprogress";
	                    }
	                    break;
	                case FakeXDomainRequest.DONE:
	                    if (this.isTimeout) {
	                        eventName = "ontimeout";
	                    } else if (this.errorFlag || (this.status < 200 || this.status > 299)) {
	                        eventName = "onerror";
	                    } else {
	                        eventName = "onload";
	                    }
	                    break;
	                }
	
	                // raising event (if defined)
	                if (eventName) {
	                    if (typeof this[eventName] === "function") {
	                        try {
	                            this[eventName]();
	                        } catch (e) {
	                            sinon.logError("Fake XHR " + eventName + " handler", e);
	                        }
	                    }
	                }
	            },
	
	            send: function send(data) {
	                verifyState(this);
	
	                if (!/^(get|head)$/i.test(this.method)) {
	                    this.requestBody = data;
	                }
	                this.requestHeaders["Content-Type"] = "text/plain;charset=utf-8";
	
	                this.errorFlag = false;
	                this.sendFlag = true;
	                this.readyStateChange(FakeXDomainRequest.OPENED);
	
	                if (typeof this.onSend === "function") {
	                    this.onSend(this);
	                }
	            },
	
	            abort: function abort() {
	                this.aborted = true;
	                this.responseText = null;
	                this.errorFlag = true;
	
	                if (this.readyState > sinon.FakeXDomainRequest.UNSENT && this.sendFlag) {
	                    this.readyStateChange(sinon.FakeXDomainRequest.DONE);
	                    this.sendFlag = false;
	                }
	            },
	
	            setResponseBody: function setResponseBody(body) {
	                verifyRequestSent(this);
	                verifyResponseBodyType(body);
	
	                var chunkSize = this.chunkSize || 10;
	                var index = 0;
	                this.responseText = "";
	
	                do {
	                    this.readyStateChange(FakeXDomainRequest.LOADING);
	                    this.responseText += body.substring(index, index + chunkSize);
	                    index += chunkSize;
	                } while (index < body.length);
	
	                this.readyStateChange(FakeXDomainRequest.DONE);
	            },
	
	            respond: function respond(status, contentType, body) {
	                // content-type ignored, since XDomainRequest does not carry this
	                // we keep the same syntax for respond(...) as for FakeXMLHttpRequest to ease
	                // test integration across browsers
	                this.status = typeof status === "number" ? status : 200;
	                this.setResponseBody(body || "");
	            },
	
	            simulatetimeout: function simulatetimeout() {
	                this.status = 0;
	                this.isTimeout = true;
	                // Access to this should actually throw an error
	                this.responseText = undefined;
	                this.readyStateChange(FakeXDomainRequest.DONE);
	            }
	        });
	
	        sinon.extend(FakeXDomainRequest, {
	            UNSENT: 0,
	            OPENED: 1,
	            LOADING: 3,
	            DONE: 4
	        });
	
	        sinon.useFakeXDomainRequest = function useFakeXDomainRequest() {
	            sinon.FakeXDomainRequest.restore = function restore(keepOnCreate) {
	                if (xdr.supportsXDR) {
	                    global.XDomainRequest = xdr.GlobalXDomainRequest;
	                }
	
	                delete sinon.FakeXDomainRequest.restore;
	
	                if (keepOnCreate !== true) {
	                    delete sinon.FakeXDomainRequest.onCreate;
	                }
	            };
	            if (xdr.supportsXDR) {
	                global.XDomainRequest = sinon.FakeXDomainRequest;
	            }
	            return sinon.FakeXDomainRequest;
	        };
	
	        sinon.FakeXDomainRequest = FakeXDomainRequest;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./core");
	        require("../extend");
	        require("./event");
	        require("../log_error");
	        makeApi(sinon);
	        module.exports = sinon;
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	    } else if (isNode) {
	        loadDependencies(require, module.exports, module);
	    } else {
	        makeApi(sinon); // eslint-disable-line no-undef
	    }
	})(typeof global !== "undefined" ? global : self);
	
	/**
	 * @depend core.js
	 * @depend ../extend.js
	 * @depend event.js
	 * @depend ../log_error.js
	 */
	/**
	 * Fake XMLHttpRequest object
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal, global) {
	    
	    function getWorkingXHR(globalScope) {
	        var supportsXHR = typeof globalScope.XMLHttpRequest !== "undefined";
	        if (supportsXHR) {
	            return globalScope.XMLHttpRequest;
	        }
	
	        var supportsActiveX = typeof globalScope.ActiveXObject !== "undefined";
	        if (supportsActiveX) {
	            return function () {
	                return new globalScope.ActiveXObject("MSXML2.XMLHTTP.3.0");
	            };
	        }
	
	        return false;
	    }
	
	    var supportsProgress = typeof ProgressEvent !== "undefined";
	    var supportsCustomEvent = typeof CustomEvent !== "undefined";
	    var supportsFormData = typeof FormData !== "undefined";
	    var supportsArrayBuffer = typeof ArrayBuffer !== "undefined";
	    var supportsBlob = typeof Blob === "function";
	    var sinonXhr = { XMLHttpRequest: global.XMLHttpRequest };
	    sinonXhr.GlobalXMLHttpRequest = global.XMLHttpRequest;
	    sinonXhr.GlobalActiveXObject = global.ActiveXObject;
	    sinonXhr.supportsActiveX = typeof sinonXhr.GlobalActiveXObject !== "undefined";
	    sinonXhr.supportsXHR = typeof sinonXhr.GlobalXMLHttpRequest !== "undefined";
	    sinonXhr.workingXHR = getWorkingXHR(global);
	    sinonXhr.supportsCORS = sinonXhr.supportsXHR && "withCredentials" in (new sinonXhr.GlobalXMLHttpRequest());
	
	    var unsafeHeaders = {
	        "Accept-Charset": true,
	        "Accept-Encoding": true,
	        Connection: true,
	        "Content-Length": true,
	        Cookie: true,
	        Cookie2: true,
	        "Content-Transfer-Encoding": true,
	        Date: true,
	        Expect: true,
	        Host: true,
	        "Keep-Alive": true,
	        Referer: true,
	        TE: true,
	        Trailer: true,
	        "Transfer-Encoding": true,
	        Upgrade: true,
	        "User-Agent": true,
	        Via: true
	    };
	
	    // An upload object is created for each
	    // FakeXMLHttpRequest and allows upload
	    // events to be simulated using uploadProgress
	    // and uploadError.
	    function UploadProgress() {
	        this.eventListeners = {
	            progress: [],
	            load: [],
	            abort: [],
	            error: []
	        };
	    }
	
	    UploadProgress.prototype.addEventListener = function addEventListener(event, listener) {
	        this.eventListeners[event].push(listener);
	    };
	
	    UploadProgress.prototype.removeEventListener = function removeEventListener(event, listener) {
	        var listeners = this.eventListeners[event] || [];
	
	        for (var i = 0, l = listeners.length; i < l; ++i) {
	            if (listeners[i] === listener) {
	                return listeners.splice(i, 1);
	            }
	        }
	    };
	
	    UploadProgress.prototype.dispatchEvent = function dispatchEvent(event) {
	        var listeners = this.eventListeners[event.type] || [];
	
	        for (var i = 0, listener; (listener = listeners[i]) != null; i++) {
	            listener(event);
	        }
	    };
	
	    // Note that for FakeXMLHttpRequest to work pre ES5
	    // we lose some of the alignment with the spec.
	    // To ensure as close a match as possible,
	    // set responseType before calling open, send or respond;
	    function FakeXMLHttpRequest() {
	        this.readyState = FakeXMLHttpRequest.UNSENT;
	        this.requestHeaders = {};
	        this.requestBody = null;
	        this.status = 0;
	        this.statusText = "";
	        this.upload = new UploadProgress();
	        this.responseType = "";
	        this.response = "";
	        if (sinonXhr.supportsCORS) {
	            this.withCredentials = false;
	        }
	
	        var xhr = this;
	        var events = ["loadstart", "load", "abort", "loadend"];
	
	        function addEventListener(eventName) {
	            xhr.addEventListener(eventName, function (event) {
	                var listener = xhr["on" + eventName];
	
	                if (listener && typeof listener === "function") {
	                    listener.call(this, event);
	                }
	            });
	        }
	
	        for (var i = events.length - 1; i >= 0; i--) {
	            addEventListener(events[i]);
	        }
	
	        if (typeof FakeXMLHttpRequest.onCreate === "function") {
	            FakeXMLHttpRequest.onCreate(this);
	        }
	    }
	
	    function verifyState(xhr) {
	        if (xhr.readyState !== FakeXMLHttpRequest.OPENED) {
	            throw new Error("INVALID_STATE_ERR");
	        }
	
	        if (xhr.sendFlag) {
	            throw new Error("INVALID_STATE_ERR");
	        }
	    }
	
	    function getHeader(headers, header) {
	        header = header.toLowerCase();
	
	        for (var h in headers) {
	            if (h.toLowerCase() === header) {
	                return h;
	            }
	        }
	
	        return null;
	    }
	
	    // filtering to enable a white-list version of Sinon FakeXhr,
	    // where whitelisted requests are passed through to real XHR
	    function each(collection, callback) {
	        if (!collection) {
	            return;
	        }
	
	        for (var i = 0, l = collection.length; i < l; i += 1) {
	            callback(collection[i]);
	        }
	    }
	    function some(collection, callback) {
	        for (var index = 0; index < collection.length; index++) {
	            if (callback(collection[index]) === true) {
	                return true;
	            }
	        }
	        return false;
	    }
	    // largest arity in XHR is 5 - XHR#open
	    var apply = function (obj, method, args) {
	        switch (args.length) {
	        case 0: return obj[method]();
	        case 1: return obj[method](args[0]);
	        case 2: return obj[method](args[0], args[1]);
	        case 3: return obj[method](args[0], args[1], args[2]);
	        case 4: return obj[method](args[0], args[1], args[2], args[3]);
	        case 5: return obj[method](args[0], args[1], args[2], args[3], args[4]);
	        }
	    };
	
	    FakeXMLHttpRequest.filters = [];
	    FakeXMLHttpRequest.addFilter = function addFilter(fn) {
	        this.filters.push(fn);
	    };
	    var IE6Re = /MSIE 6/;
	    FakeXMLHttpRequest.defake = function defake(fakeXhr, xhrArgs) {
	        var xhr = new sinonXhr.workingXHR(); // eslint-disable-line new-cap
	
	        each([
	            "open",
	            "setRequestHeader",
	            "send",
	            "abort",
	            "getResponseHeader",
	            "getAllResponseHeaders",
	            "addEventListener",
	            "overrideMimeType",
	            "removeEventListener"
	        ], function (method) {
	            fakeXhr[method] = function () {
	                return apply(xhr, method, arguments);
	            };
	        });
	
	        var copyAttrs = function (args) {
	            each(args, function (attr) {
	                try {
	                    fakeXhr[attr] = xhr[attr];
	                } catch (e) {
	                    if (!IE6Re.test(navigator.userAgent)) {
	                        throw e;
	                    }
	                }
	            });
	        };
	
	        var stateChange = function stateChange() {
	            fakeXhr.readyState = xhr.readyState;
	            if (xhr.readyState >= FakeXMLHttpRequest.HEADERS_RECEIVED) {
	                copyAttrs(["status", "statusText"]);
	            }
	            if (xhr.readyState >= FakeXMLHttpRequest.LOADING) {
	                copyAttrs(["responseText", "response"]);
	            }
	            if (xhr.readyState === FakeXMLHttpRequest.DONE) {
	                copyAttrs(["responseXML"]);
	            }
	            if (fakeXhr.onreadystatechange) {
	                fakeXhr.onreadystatechange.call(fakeXhr, { target: fakeXhr });
	            }
	        };
	
	        if (xhr.addEventListener) {
	            for (var event in fakeXhr.eventListeners) {
	                if (fakeXhr.eventListeners.hasOwnProperty(event)) {
	
	                    /*eslint-disable no-loop-func*/
	                    each(fakeXhr.eventListeners[event], function (handler) {
	                        xhr.addEventListener(event, handler);
	                    });
	                    /*eslint-enable no-loop-func*/
	                }
	            }
	            xhr.addEventListener("readystatechange", stateChange);
	        } else {
	            xhr.onreadystatechange = stateChange;
	        }
	        apply(xhr, "open", xhrArgs);
	    };
	    FakeXMLHttpRequest.useFilters = false;
	
	    function verifyRequestOpened(xhr) {
	        if (xhr.readyState !== FakeXMLHttpRequest.OPENED) {
	            throw new Error("INVALID_STATE_ERR - " + xhr.readyState);
	        }
	    }
	
	    function verifyRequestSent(xhr) {
	        if (xhr.readyState === FakeXMLHttpRequest.DONE) {
	            throw new Error("Request done");
	        }
	    }
	
	    function verifyHeadersReceived(xhr) {
	        if (xhr.async && xhr.readyState !== FakeXMLHttpRequest.HEADERS_RECEIVED) {
	            throw new Error("No headers received");
	        }
	    }
	
	    function verifyResponseBodyType(body) {
	        if (typeof body !== "string") {
	            var error = new Error("Attempted to respond to fake XMLHttpRequest with " +
	                                 body + ", which is not a string.");
	            error.name = "InvalidBodyException";
	            throw error;
	        }
	    }
	
	    function convertToArrayBuffer(body) {
	        var buffer = new ArrayBuffer(body.length);
	        var view = new Uint8Array(buffer);
	        for (var i = 0; i < body.length; i++) {
	            var charCode = body.charCodeAt(i);
	            if (charCode >= 256) {
	                throw new TypeError("arraybuffer or blob responseTypes require binary string, " +
	                                    "invalid character " + body[i] + " found.");
	            }
	            view[i] = charCode;
	        }
	        return buffer;
	    }
	
	    function isXmlContentType(contentType) {
	        return !contentType || /(text\/xml)|(application\/xml)|(\+xml)/.test(contentType);
	    }
	
	    function convertResponseBody(responseType, contentType, body) {
	        if (responseType === "" || responseType === "text") {
	            return body;
	        } else if (supportsArrayBuffer && responseType === "arraybuffer") {
	            return convertToArrayBuffer(body);
	        } else if (responseType === "json") {
	            try {
	                return JSON.parse(body);
	            } catch (e) {
	                // Return parsing failure as null
	                return null;
	            }
	        } else if (supportsBlob && responseType === "blob") {
	            var blobOptions = {};
	            if (contentType) {
	                blobOptions.type = contentType;
	            }
	            return new Blob([convertToArrayBuffer(body)], blobOptions);
	        } else if (responseType === "document") {
	            if (isXmlContentType(contentType)) {
	                return FakeXMLHttpRequest.parseXML(body);
	            }
	            return null;
	        }
	        throw new Error("Invalid responseType " + responseType);
	    }
	
	    function clearResponse(xhr) {
	        if (xhr.responseType === "" || xhr.responseType === "text") {
	            xhr.response = xhr.responseText = "";
	        } else {
	            xhr.response = xhr.responseText = null;
	        }
	        xhr.responseXML = null;
	    }
	
	    FakeXMLHttpRequest.parseXML = function parseXML(text) {
	        // Treat empty string as parsing failure
	        if (text !== "") {
	            try {
	                if (typeof DOMParser !== "undefined") {
	                    var parser = new DOMParser();
	                    return parser.parseFromString(text, "text/xml");
	                }
	                var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
	                xmlDoc.async = "false";
	                xmlDoc.loadXML(text);
	                return xmlDoc;
	            } catch (e) {
	                // Unable to parse XML - no biggie
	            }
	        }
	
	        return null;
	    };
	
	    FakeXMLHttpRequest.statusCodes = {
	        100: "Continue",
	        101: "Switching Protocols",
	        200: "OK",
	        201: "Created",
	        202: "Accepted",
	        203: "Non-Authoritative Information",
	        204: "No Content",
	        205: "Reset Content",
	        206: "Partial Content",
	        207: "Multi-Status",
	        300: "Multiple Choice",
	        301: "Moved Permanently",
	        302: "Found",
	        303: "See Other",
	        304: "Not Modified",
	        305: "Use Proxy",
	        307: "Temporary Redirect",
	        400: "Bad Request",
	        401: "Unauthorized",
	        402: "Payment Required",
	        403: "Forbidden",
	        404: "Not Found",
	        405: "Method Not Allowed",
	        406: "Not Acceptable",
	        407: "Proxy Authentication Required",
	        408: "Request Timeout",
	        409: "Conflict",
	        410: "Gone",
	        411: "Length Required",
	        412: "Precondition Failed",
	        413: "Request Entity Too Large",
	        414: "Request-URI Too Long",
	        415: "Unsupported Media Type",
	        416: "Requested Range Not Satisfiable",
	        417: "Expectation Failed",
	        422: "Unprocessable Entity",
	        500: "Internal Server Error",
	        501: "Not Implemented",
	        502: "Bad Gateway",
	        503: "Service Unavailable",
	        504: "Gateway Timeout",
	        505: "HTTP Version Not Supported"
	    };
	
	    function makeApi(sinon) {
	        sinon.xhr = sinonXhr;
	
	        sinon.extend(FakeXMLHttpRequest.prototype, sinon.EventTarget, {
	            async: true,
	
	            open: function open(method, url, async, username, password) {
	                this.method = method;
	                this.url = url;
	                this.async = typeof async === "boolean" ? async : true;
	                this.username = username;
	                this.password = password;
	                clearResponse(this);
	                this.requestHeaders = {};
	                this.sendFlag = false;
	
	                if (FakeXMLHttpRequest.useFilters === true) {
	                    var xhrArgs = arguments;
	                    var defake = some(FakeXMLHttpRequest.filters, function (filter) {
	                        return filter.apply(this, xhrArgs);
	                    });
	                    if (defake) {
	                        return FakeXMLHttpRequest.defake(this, arguments);
	                    }
	                }
	                this.readyStateChange(FakeXMLHttpRequest.OPENED);
	            },
	
	            readyStateChange: function readyStateChange(state) {
	                this.readyState = state;
	
	                var readyStateChangeEvent = new sinon.Event("readystatechange", false, false, this);
	
	                if (typeof this.onreadystatechange === "function") {
	                    try {
	                        this.onreadystatechange(readyStateChangeEvent);
	                    } catch (e) {
	                        sinon.logError("Fake XHR onreadystatechange handler", e);
	                    }
	                }
	
	                switch (this.readyState) {
	                    case FakeXMLHttpRequest.DONE:
	                        if (supportsProgress) {
	                            this.upload.dispatchEvent(new sinon.ProgressEvent("progress", {loaded: 100, total: 100}));
	                            this.dispatchEvent(new sinon.ProgressEvent("progress", {loaded: 100, total: 100}));
	                        }
	                        this.upload.dispatchEvent(new sinon.Event("load", false, false, this));
	                        this.dispatchEvent(new sinon.Event("load", false, false, this));
	                        this.dispatchEvent(new sinon.Event("loadend", false, false, this));
	                        break;
	                }
	
	                this.dispatchEvent(readyStateChangeEvent);
	            },
	
	            setRequestHeader: function setRequestHeader(header, value) {
	                verifyState(this);
	
	                if (unsafeHeaders[header] || /^(Sec-|Proxy-)/.test(header)) {
	                    throw new Error("Refused to set unsafe header \"" + header + "\"");
	                }
	
	                if (this.requestHeaders[header]) {
	                    this.requestHeaders[header] += "," + value;
	                } else {
	                    this.requestHeaders[header] = value;
	                }
	            },
	
	            // Helps testing
	            setResponseHeaders: function setResponseHeaders(headers) {
	                verifyRequestOpened(this);
	                this.responseHeaders = {};
	
	                for (var header in headers) {
	                    if (headers.hasOwnProperty(header)) {
	                        this.responseHeaders[header] = headers[header];
	                    }
	                }
	
	                if (this.async) {
	                    this.readyStateChange(FakeXMLHttpRequest.HEADERS_RECEIVED);
	                } else {
	                    this.readyState = FakeXMLHttpRequest.HEADERS_RECEIVED;
	                }
	            },
	
	            // Currently treats ALL data as a DOMString (i.e. no Document)
	            send: function send(data) {
	                verifyState(this);
	
	                if (!/^(get|head)$/i.test(this.method)) {
	                    var contentType = getHeader(this.requestHeaders, "Content-Type");
	                    if (this.requestHeaders[contentType]) {
	                        var value = this.requestHeaders[contentType].split(";");
	                        this.requestHeaders[contentType] = value[0] + ";charset=utf-8";
	                    } else if (supportsFormData && !(data instanceof FormData)) {
	                        this.requestHeaders["Content-Type"] = "text/plain;charset=utf-8";
	                    }
	
	                    this.requestBody = data;
	                }
	
	                this.errorFlag = false;
	                this.sendFlag = this.async;
	                clearResponse(this);
	                this.readyStateChange(FakeXMLHttpRequest.OPENED);
	
	                if (typeof this.onSend === "function") {
	                    this.onSend(this);
	                }
	
	                this.dispatchEvent(new sinon.Event("loadstart", false, false, this));
	            },
	
	            abort: function abort() {
	                this.aborted = true;
	                clearResponse(this);
	                this.errorFlag = true;
	                this.requestHeaders = {};
	                this.responseHeaders = {};
	
	                if (this.readyState > FakeXMLHttpRequest.UNSENT && this.sendFlag) {
	                    this.readyStateChange(FakeXMLHttpRequest.DONE);
	                    this.sendFlag = false;
	                }
	
	                this.readyState = FakeXMLHttpRequest.UNSENT;
	
	                this.dispatchEvent(new sinon.Event("abort", false, false, this));
	
	                this.upload.dispatchEvent(new sinon.Event("abort", false, false, this));
	
	                if (typeof this.onerror === "function") {
	                    this.onerror();
	                }
	            },
	
	            getResponseHeader: function getResponseHeader(header) {
	                if (this.readyState < FakeXMLHttpRequest.HEADERS_RECEIVED) {
	                    return null;
	                }
	
	                if (/^Set-Cookie2?$/i.test(header)) {
	                    return null;
	                }
	
	                header = getHeader(this.responseHeaders, header);
	
	                return this.responseHeaders[header] || null;
	            },
	
	            getAllResponseHeaders: function getAllResponseHeaders() {
	                if (this.readyState < FakeXMLHttpRequest.HEADERS_RECEIVED) {
	                    return "";
	                }
	
	                var headers = "";
	
	                for (var header in this.responseHeaders) {
	                    if (this.responseHeaders.hasOwnProperty(header) &&
	                        !/^Set-Cookie2?$/i.test(header)) {
	                        headers += header + ": " + this.responseHeaders[header] + "\r\n";
	                    }
	                }
	
	                return headers;
	            },
	
	            setResponseBody: function setResponseBody(body) {
	                verifyRequestSent(this);
	                verifyHeadersReceived(this);
	                verifyResponseBodyType(body);
	                var contentType = this.getResponseHeader("Content-Type");
	
	                var isTextResponse = this.responseType === "" || this.responseType === "text";
	                clearResponse(this);
	                if (this.async) {
	                    var chunkSize = this.chunkSize || 10;
	                    var index = 0;
	
	                    do {
	                        this.readyStateChange(FakeXMLHttpRequest.LOADING);
	
	                        if (isTextResponse) {
	                            this.responseText = this.response += body.substring(index, index + chunkSize);
	                        }
	                        index += chunkSize;
	                    } while (index < body.length);
	                }
	
	                this.response = convertResponseBody(this.responseType, contentType, body);
	                if (isTextResponse) {
	                    this.responseText = this.response;
	                }
	
	                if (this.responseType === "document") {
	                    this.responseXML = this.response;
	                } else if (this.responseType === "" && isXmlContentType(contentType)) {
	                    this.responseXML = FakeXMLHttpRequest.parseXML(this.responseText);
	                }
	                this.readyStateChange(FakeXMLHttpRequest.DONE);
	            },
	
	            respond: function respond(status, headers, body) {
	                this.status = typeof status === "number" ? status : 200;
	                this.statusText = FakeXMLHttpRequest.statusCodes[this.status];
	                this.setResponseHeaders(headers || {});
	                this.setResponseBody(body || "");
	            },
	
	            uploadProgress: function uploadProgress(progressEventRaw) {
	                if (supportsProgress) {
	                    this.upload.dispatchEvent(new sinon.ProgressEvent("progress", progressEventRaw));
	                }
	            },
	
	            downloadProgress: function downloadProgress(progressEventRaw) {
	                if (supportsProgress) {
	                    this.dispatchEvent(new sinon.ProgressEvent("progress", progressEventRaw));
	                }
	            },
	
	            uploadError: function uploadError(error) {
	                if (supportsCustomEvent) {
	                    this.upload.dispatchEvent(new sinon.CustomEvent("error", {detail: error}));
	                }
	            }
	        });
	
	        sinon.extend(FakeXMLHttpRequest, {
	            UNSENT: 0,
	            OPENED: 1,
	            HEADERS_RECEIVED: 2,
	            LOADING: 3,
	            DONE: 4
	        });
	
	        sinon.useFakeXMLHttpRequest = function () {
	            FakeXMLHttpRequest.restore = function restore(keepOnCreate) {
	                if (sinonXhr.supportsXHR) {
	                    global.XMLHttpRequest = sinonXhr.GlobalXMLHttpRequest;
	                }
	
	                if (sinonXhr.supportsActiveX) {
	                    global.ActiveXObject = sinonXhr.GlobalActiveXObject;
	                }
	
	                delete FakeXMLHttpRequest.restore;
	
	                if (keepOnCreate !== true) {
	                    delete FakeXMLHttpRequest.onCreate;
	                }
	            };
	            if (sinonXhr.supportsXHR) {
	                global.XMLHttpRequest = FakeXMLHttpRequest;
	            }
	
	            if (sinonXhr.supportsActiveX) {
	                global.ActiveXObject = function ActiveXObject(objId) {
	                    if (objId === "Microsoft.XMLHTTP" || /^Msxml2\.XMLHTTP/i.test(objId)) {
	
	                        return new FakeXMLHttpRequest();
	                    }
	
	                    return new sinonXhr.GlobalActiveXObject(objId);
	                };
	            }
	
	            return FakeXMLHttpRequest;
	        };
	
	        sinon.FakeXMLHttpRequest = FakeXMLHttpRequest;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./core");
	        require("../extend");
	        require("./event");
	        require("../log_error");
	        makeApi(sinon);
	        module.exports = sinon;
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon, // eslint-disable-line no-undef
	    typeof global !== "undefined" ? global : self
	));
	
	/**
	 * @depend fake_xdomain_request.js
	 * @depend fake_xml_http_request.js
	 * @depend ../format.js
	 * @depend ../log_error.js
	 */
	/**
	 * The Sinon "server" mimics a web server that receives requests from
	 * sinon.FakeXMLHttpRequest and provides an API to respond to those requests,
	 * both synchronously and asynchronously. To respond synchronuously, canned
	 * answers have to be provided upfront.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function () {
	    
	    var push = [].push;
	
	    function responseArray(handler) {
	        var response = handler;
	
	        if (Object.prototype.toString.call(handler) !== "[object Array]") {
	            response = [200, {}, handler];
	        }
	
	        if (typeof response[2] !== "string") {
	            throw new TypeError("Fake server response body should be string, but was " +
	                                typeof response[2]);
	        }
	
	        return response;
	    }
	
	    var wloc = typeof window !== "undefined" ? window.location : {};
	    var rCurrLoc = new RegExp("^" + wloc.protocol + "//" + wloc.host);
	
	    function matchOne(response, reqMethod, reqUrl) {
	        var rmeth = response.method;
	        var matchMethod = !rmeth || rmeth.toLowerCase() === reqMethod.toLowerCase();
	        var url = response.url;
	        var matchUrl = !url || url === reqUrl || (typeof url.test === "function" && url.test(reqUrl));
	
	        return matchMethod && matchUrl;
	    }
	
	    function match(response, request) {
	        var requestUrl = request.url;
	
	        if (!/^https?:\/\//.test(requestUrl) || rCurrLoc.test(requestUrl)) {
	            requestUrl = requestUrl.replace(rCurrLoc, "");
	        }
	
	        if (matchOne(response, this.getHTTPMethod(request), requestUrl)) {
	            if (typeof response.response === "function") {
	                var ru = response.url;
	                var args = [request].concat(ru && typeof ru.exec === "function" ? ru.exec(requestUrl).slice(1) : []);
	                return response.response.apply(response, args);
	            }
	
	            return true;
	        }
	
	        return false;
	    }
	
	    function makeApi(sinon) {
	        sinon.fakeServer = {
	            create: function (config) {
	                var server = sinon.create(this);
	                server.configure(config);
	                if (!sinon.xhr.supportsCORS) {
	                    this.xhr = sinon.useFakeXDomainRequest();
	                } else {
	                    this.xhr = sinon.useFakeXMLHttpRequest();
	                }
	                server.requests = [];
	
	                this.xhr.onCreate = function (xhrObj) {
	                    server.addRequest(xhrObj);
	                };
	
	                return server;
	            },
	            configure: function (config) {
	                var whitelist = {
	                    "autoRespond": true,
	                    "autoRespondAfter": true,
	                    "respondImmediately": true,
	                    "fakeHTTPMethods": true
	                };
	                var setting;
	
	                config = config || {};
	                for (setting in config) {
	                    if (whitelist.hasOwnProperty(setting) && config.hasOwnProperty(setting)) {
	                        this[setting] = config[setting];
	                    }
	                }
	            },
	            addRequest: function addRequest(xhrObj) {
	                var server = this;
	                push.call(this.requests, xhrObj);
	
	                xhrObj.onSend = function () {
	                    server.handleRequest(this);
	
	                    if (server.respondImmediately) {
	                        server.respond();
	                    } else if (server.autoRespond && !server.responding) {
	                        setTimeout(function () {
	                            server.responding = false;
	                            server.respond();
	                        }, server.autoRespondAfter || 10);
	
	                        server.responding = true;
	                    }
	                };
	            },
	
	            getHTTPMethod: function getHTTPMethod(request) {
	                if (this.fakeHTTPMethods && /post/i.test(request.method)) {
	                    var matches = (request.requestBody || "").match(/_method=([^\b;]+)/);
	                    return matches ? matches[1] : request.method;
	                }
	
	                return request.method;
	            },
	
	            handleRequest: function handleRequest(xhr) {
	                if (xhr.async) {
	                    if (!this.queue) {
	                        this.queue = [];
	                    }
	
	                    push.call(this.queue, xhr);
	                } else {
	                    this.processRequest(xhr);
	                }
	            },
	
	            log: function log(response, request) {
	                var str;
	
	                str = "Request:\n" + sinon.format(request) + "\n\n";
	                str += "Response:\n" + sinon.format(response) + "\n\n";
	
	                sinon.log(str);
	            },
	
	            respondWith: function respondWith(method, url, body) {
	                if (arguments.length === 1 && typeof method !== "function") {
	                    this.response = responseArray(method);
	                    return;
	                }
	
	                if (!this.responses) {
	                    this.responses = [];
	                }
	
	                if (arguments.length === 1) {
	                    body = method;
	                    url = method = null;
	                }
	
	                if (arguments.length === 2) {
	                    body = url;
	                    url = method;
	                    method = null;
	                }
	
	                push.call(this.responses, {
	                    method: method,
	                    url: url,
	                    response: typeof body === "function" ? body : responseArray(body)
	                });
	            },
	
	            respond: function respond() {
	                if (arguments.length > 0) {
	                    this.respondWith.apply(this, arguments);
	                }
	
	                var queue = this.queue || [];
	                var requests = queue.splice(0, queue.length);
	
	                for (var i = 0; i < requests.length; i++) {
	                    this.processRequest(requests[i]);
	                }
	            },
	
	            processRequest: function processRequest(request) {
	                try {
	                    if (request.aborted) {
	                        return;
	                    }
	
	                    var response = this.response || [404, {}, ""];
	
	                    if (this.responses) {
	                        for (var l = this.responses.length, i = l - 1; i >= 0; i--) {
	                            if (match.call(this, this.responses[i], request)) {
	                                response = this.responses[i].response;
	                                break;
	                            }
	                        }
	                    }
	
	                    if (request.readyState !== 4) {
	                        this.log(response, request);
	
	                        request.respond(response[0], response[1], response[2]);
	                    }
	                } catch (e) {
	                    sinon.logError("Fake server request processing", e);
	                }
	            },
	
	            restore: function restore() {
	                return this.xhr.restore && this.xhr.restore.apply(this.xhr, arguments);
	            }
	        };
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./core");
	        require("./fake_xdomain_request");
	        require("./fake_xml_http_request");
	        require("../format");
	        makeApi(sinon);
	        module.exports = sinon;
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	    } else if (isNode) {
	        loadDependencies(require, module.exports, module);
	    } else {
	        makeApi(sinon); // eslint-disable-line no-undef
	    }
	}());
	
	/**
	 * @depend fake_server.js
	 * @depend fake_timers.js
	 */
	/**
	 * Add-on for sinon.fakeServer that automatically handles a fake timer along with
	 * the FakeXMLHttpRequest. The direct inspiration for this add-on is jQuery
	 * 1.3.x, which does not use xhr object's onreadystatehandler at all - instead,
	 * it polls the object for completion with setInterval. Dispite the direct
	 * motivation, there is nothing jQuery-specific in this file, so it can be used
	 * in any environment where the ajax implementation depends on setInterval or
	 * setTimeout.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function () {
	    
	    function makeApi(sinon) {
	        function Server() {}
	        Server.prototype = sinon.fakeServer;
	
	        sinon.fakeServerWithClock = new Server();
	
	        sinon.fakeServerWithClock.addRequest = function addRequest(xhr) {
	            if (xhr.async) {
	                if (typeof setTimeout.clock === "object") {
	                    this.clock = setTimeout.clock;
	                } else {
	                    this.clock = sinon.useFakeTimers();
	                    this.resetClock = true;
	                }
	
	                if (!this.longestTimeout) {
	                    var clockSetTimeout = this.clock.setTimeout;
	                    var clockSetInterval = this.clock.setInterval;
	                    var server = this;
	
	                    this.clock.setTimeout = function (fn, timeout) {
	                        server.longestTimeout = Math.max(timeout, server.longestTimeout || 0);
	
	                        return clockSetTimeout.apply(this, arguments);
	                    };
	
	                    this.clock.setInterval = function (fn, timeout) {
	                        server.longestTimeout = Math.max(timeout, server.longestTimeout || 0);
	
	                        return clockSetInterval.apply(this, arguments);
	                    };
	                }
	            }
	
	            return sinon.fakeServer.addRequest.call(this, xhr);
	        };
	
	        sinon.fakeServerWithClock.respond = function respond() {
	            var returnVal = sinon.fakeServer.respond.apply(this, arguments);
	
	            if (this.clock) {
	                this.clock.tick(this.longestTimeout || 0);
	                this.longestTimeout = 0;
	
	                if (this.resetClock) {
	                    this.clock.restore();
	                    this.resetClock = false;
	                }
	            }
	
	            return returnVal;
	        };
	
	        sinon.fakeServerWithClock.restore = function restore() {
	            if (this.clock) {
	                this.clock.restore();
	            }
	
	            return sinon.fakeServer.restore.apply(this, arguments);
	        };
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require) {
	        var sinon = require("./core");
	        require("./fake_server");
	        require("./fake_timers");
	        makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	    } else if (isNode) {
	        loadDependencies(require);
	    } else {
	        makeApi(sinon); // eslint-disable-line no-undef
	    }
	}());
	
	/**
	 * @depend util/core.js
	 * @depend extend.js
	 * @depend collection.js
	 * @depend util/fake_timers.js
	 * @depend util/fake_server_with_clock.js
	 */
	/**
	 * Manages fake collections as well as fake utilities such as Sinon's
	 * timers and fake XHR implementation in one convenient object.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        var push = [].push;
	
	        function exposeValue(sandbox, config, key, value) {
	            if (!value) {
	                return;
	            }
	
	            if (config.injectInto && !(key in config.injectInto)) {
	                config.injectInto[key] = value;
	                sandbox.injectedKeys.push(key);
	            } else {
	                push.call(sandbox.args, value);
	            }
	        }
	
	        function prepareSandboxFromConfig(config) {
	            var sandbox = sinon.create(sinon.sandbox);
	
	            if (config.useFakeServer) {
	                if (typeof config.useFakeServer === "object") {
	                    sandbox.serverPrototype = config.useFakeServer;
	                }
	
	                sandbox.useFakeServer();
	            }
	
	            if (config.useFakeTimers) {
	                if (typeof config.useFakeTimers === "object") {
	                    sandbox.useFakeTimers.apply(sandbox, config.useFakeTimers);
	                } else {
	                    sandbox.useFakeTimers();
	                }
	            }
	
	            return sandbox;
	        }
	
	        sinon.sandbox = sinon.extend(sinon.create(sinon.collection), {
	            useFakeTimers: function useFakeTimers() {
	                this.clock = sinon.useFakeTimers.apply(sinon, arguments);
	
	                return this.add(this.clock);
	            },
	
	            serverPrototype: sinon.fakeServer,
	
	            useFakeServer: function useFakeServer() {
	                var proto = this.serverPrototype || sinon.fakeServer;
	
	                if (!proto || !proto.create) {
	                    return null;
	                }
	
	                this.server = proto.create();
	                return this.add(this.server);
	            },
	
	            inject: function (obj) {
	                sinon.collection.inject.call(this, obj);
	
	                if (this.clock) {
	                    obj.clock = this.clock;
	                }
	
	                if (this.server) {
	                    obj.server = this.server;
	                    obj.requests = this.server.requests;
	                }
	
	                obj.match = sinon.match;
	
	                return obj;
	            },
	
	            restore: function () {
	                sinon.collection.restore.apply(this, arguments);
	                this.restoreContext();
	            },
	
	            restoreContext: function () {
	                if (this.injectedKeys) {
	                    for (var i = 0, j = this.injectedKeys.length; i < j; i++) {
	                        delete this.injectInto[this.injectedKeys[i]];
	                    }
	                    this.injectedKeys = [];
	                }
	            },
	
	            create: function (config) {
	                if (!config) {
	                    return sinon.create(sinon.sandbox);
	                }
	
	                var sandbox = prepareSandboxFromConfig(config);
	                sandbox.args = sandbox.args || [];
	                sandbox.injectedKeys = [];
	                sandbox.injectInto = config.injectInto;
	                var prop,
	                    value;
	                var exposed = sandbox.inject({});
	
	                if (config.properties) {
	                    for (var i = 0, l = config.properties.length; i < l; i++) {
	                        prop = config.properties[i];
	                        value = exposed[prop] || prop === "sandbox" && sandbox;
	                        exposeValue(sandbox, config, prop, value);
	                    }
	                } else {
	                    exposeValue(sandbox, config, "sandbox", value);
	                }
	
	                return sandbox;
	            },
	
	            match: sinon.match
	        });
	
	        sinon.sandbox.useFakeXMLHttpRequest = sinon.sandbox.useFakeServer;
	
	        return sinon.sandbox;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        require("./extend");
	        require("./util/fake_server_with_clock");
	        require("./util/fake_timers");
	        require("./collection");
	        module.exports = makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend util/core.js
	 * @depend sandbox.js
	 */
	/**
	 * Test function, sandboxes fakes
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    function makeApi(sinon) {
	        var slice = Array.prototype.slice;
	
	        function test(callback) {
	            var type = typeof callback;
	
	            if (type !== "function") {
	                throw new TypeError("sinon.test needs to wrap a test function, got " + type);
	            }
	
	            function sinonSandboxedTest() {
	                var config = sinon.getConfig(sinon.config);
	                config.injectInto = config.injectIntoThis && this || config.injectInto;
	                var sandbox = sinon.sandbox.create(config);
	                var args = slice.call(arguments);
	                var oldDone = args.length && args[args.length - 1];
	                var exception, result;
	
	                if (typeof oldDone === "function") {
	                    args[args.length - 1] = function sinonDone(res) {
	                        if (res) {
	                            sandbox.restore();
	                        } else {
	                            sandbox.verifyAndRestore();
	                        }
	                        oldDone(res);
	                    };
	                }
	
	                try {
	                    result = callback.apply(this, args.concat(sandbox.args));
	                } catch (e) {
	                    exception = e;
	                }
	
	                if (typeof oldDone !== "function") {
	                    if (typeof exception !== "undefined") {
	                        sandbox.restore();
	                        throw exception;
	                    } else {
	                        sandbox.verifyAndRestore();
	                    }
	                }
	
	                return result;
	            }
	
	            if (callback.length) {
	                return function sinonAsyncSandboxedTest(done) { // eslint-disable-line no-unused-vars
	                    return sinonSandboxedTest.apply(this, arguments);
	                };
	            }
	
	            return sinonSandboxedTest;
	        }
	
	        test.config = {
	            injectIntoThis: true,
	            injectInto: null,
	            properties: ["spy", "stub", "mock", "clock", "server", "requests"],
	            useFakeTimers: true,
	            useFakeServer: true
	        };
	
	        sinon.test = test;
	        return test;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var core = require("./util/core");
	        require("./sandbox");
	        module.exports = makeApi(core);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	    } else if (isNode) {
	        loadDependencies(require, module.exports, module);
	    } else if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(typeof sinon === "object" && sinon || null)); // eslint-disable-line no-undef
	
	/**
	 * @depend util/core.js
	 * @depend test.js
	 */
	/**
	 * Test case, sandboxes all test functions
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal) {
	    
	    function createTest(property, setUp, tearDown) {
	        return function () {
	            if (setUp) {
	                setUp.apply(this, arguments);
	            }
	
	            var exception, result;
	
	            try {
	                result = property.apply(this, arguments);
	            } catch (e) {
	                exception = e;
	            }
	
	            if (tearDown) {
	                tearDown.apply(this, arguments);
	            }
	
	            if (exception) {
	                throw exception;
	            }
	
	            return result;
	        };
	    }
	
	    function makeApi(sinon) {
	        function testCase(tests, prefix) {
	            if (!tests || typeof tests !== "object") {
	                throw new TypeError("sinon.testCase needs an object with test functions");
	            }
	
	            prefix = prefix || "test";
	            var rPrefix = new RegExp("^" + prefix);
	            var methods = {};
	            var setUp = tests.setUp;
	            var tearDown = tests.tearDown;
	            var testName,
	                property,
	                method;
	
	            for (testName in tests) {
	                if (tests.hasOwnProperty(testName) && !/^(setUp|tearDown)$/.test(testName)) {
	                    property = tests[testName];
	
	                    if (typeof property === "function" && rPrefix.test(testName)) {
	                        method = property;
	
	                        if (setUp || tearDown) {
	                            method = createTest(property, setUp, tearDown);
	                        }
	
	                        methods[testName] = sinon.test(method);
	                    } else {
	                        methods[testName] = tests[testName];
	                    }
	                }
	            }
	
	            return methods;
	        }
	
	        sinon.testCase = testCase;
	        return testCase;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var core = require("./util/core");
	        require("./test");
	        module.exports = makeApi(core);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon // eslint-disable-line no-undef
	));
	
	/**
	 * @depend times_in_words.js
	 * @depend util/core.js
	 * @depend match.js
	 * @depend format.js
	 */
	/**
	 * Assertions matching the test spy retrieval interface.
	 *
	 * @author Christian Johansen (christian@cjohansen.no)
	 * @license BSD
	 *
	 * Copyright (c) 2010-2013 Christian Johansen
	 */
	(function (sinonGlobal, global) {
	    
	    var slice = Array.prototype.slice;
	
	    function makeApi(sinon) {
	        var assert;
	
	        function verifyIsStub() {
	            var method;
	
	            for (var i = 0, l = arguments.length; i < l; ++i) {
	                method = arguments[i];
	
	                if (!method) {
	                    assert.fail("fake is not a spy");
	                }
	
	                if (method.proxy && method.proxy.isSinonProxy) {
	                    verifyIsStub(method.proxy);
	                } else {
	                    if (typeof method !== "function") {
	                        assert.fail(method + " is not a function");
	                    }
	
	                    if (typeof method.getCall !== "function") {
	                        assert.fail(method + " is not stubbed");
	                    }
	                }
	
	            }
	        }
	
	        function failAssertion(object, msg) {
	            object = object || global;
	            var failMethod = object.fail || assert.fail;
	            failMethod.call(object, msg);
	        }
	
	        function mirrorPropAsAssertion(name, method, message) {
	            if (arguments.length === 2) {
	                message = method;
	                method = name;
	            }
	
	            assert[name] = function (fake) {
	                verifyIsStub(fake);
	
	                var args = slice.call(arguments, 1);
	                var failed = false;
	
	                if (typeof method === "function") {
	                    failed = !method(fake);
	                } else {
	                    failed = typeof fake[method] === "function" ?
	                        !fake[method].apply(fake, args) : !fake[method];
	                }
	
	                if (failed) {
	                    failAssertion(this, (fake.printf || fake.proxy.printf).apply(fake, [message].concat(args)));
	                } else {
	                    assert.pass(name);
	                }
	            };
	        }
	
	        function exposedName(prefix, prop) {
	            return !prefix || /^fail/.test(prop) ? prop :
	                prefix + prop.slice(0, 1).toUpperCase() + prop.slice(1);
	        }
	
	        assert = {
	            failException: "AssertError",
	
	            fail: function fail(message) {
	                var error = new Error(message);
	                error.name = this.failException || assert.failException;
	
	                throw error;
	            },
	
	            pass: function pass() {},
	
	            callOrder: function assertCallOrder() {
	                verifyIsStub.apply(null, arguments);
	                var expected = "";
	                var actual = "";
	
	                if (!sinon.calledInOrder(arguments)) {
	                    try {
	                        expected = [].join.call(arguments, ", ");
	                        var calls = slice.call(arguments);
	                        var i = calls.length;
	                        while (i) {
	                            if (!calls[--i].called) {
	                                calls.splice(i, 1);
	                            }
	                        }
	                        actual = sinon.orderByFirstCall(calls).join(", ");
	                    } catch (e) {
	                        // If this fails, we'll just fall back to the blank string
	                    }
	
	                    failAssertion(this, "expected " + expected + " to be " +
	                                "called in order but were called as " + actual);
	                } else {
	                    assert.pass("callOrder");
	                }
	            },
	
	            callCount: function assertCallCount(method, count) {
	                verifyIsStub(method);
	
	                if (method.callCount !== count) {
	                    var msg = "expected %n to be called " + sinon.timesInWords(count) +
	                        " but was called %c%C";
	                    failAssertion(this, method.printf(msg));
	                } else {
	                    assert.pass("callCount");
	                }
	            },
	
	            expose: function expose(target, options) {
	                if (!target) {
	                    throw new TypeError("target is null or undefined");
	                }
	
	                var o = options || {};
	                var prefix = typeof o.prefix === "undefined" && "assert" || o.prefix;
	                var includeFail = typeof o.includeFail === "undefined" || !!o.includeFail;
	
	                for (var method in this) {
	                    if (method !== "expose" && (includeFail || !/^(fail)/.test(method))) {
	                        target[exposedName(prefix, method)] = this[method];
	                    }
	                }
	
	                return target;
	            },
	
	            match: function match(actual, expectation) {
	                var matcher = sinon.match(expectation);
	                if (matcher.test(actual)) {
	                    assert.pass("match");
	                } else {
	                    var formatted = [
	                        "expected value to match",
	                        "    expected = " + sinon.format(expectation),
	                        "    actual = " + sinon.format(actual)
	                    ];
	
	                    failAssertion(this, formatted.join("\n"));
	                }
	            }
	        };
	
	        mirrorPropAsAssertion("called", "expected %n to have been called at least once but was never called");
	        mirrorPropAsAssertion("notCalled", function (spy) {
	            return !spy.called;
	        }, "expected %n to not have been called but was called %c%C");
	        mirrorPropAsAssertion("calledOnce", "expected %n to be called once but was called %c%C");
	        mirrorPropAsAssertion("calledTwice", "expected %n to be called twice but was called %c%C");
	        mirrorPropAsAssertion("calledThrice", "expected %n to be called thrice but was called %c%C");
	        mirrorPropAsAssertion("calledOn", "expected %n to be called with %1 as this but was called with %t");
	        mirrorPropAsAssertion(
	            "alwaysCalledOn",
	            "expected %n to always be called with %1 as this but was called with %t"
	        );
	        mirrorPropAsAssertion("calledWithNew", "expected %n to be called with new");
	        mirrorPropAsAssertion("alwaysCalledWithNew", "expected %n to always be called with new");
	        mirrorPropAsAssertion("calledWith", "expected %n to be called with arguments %*%C");
	        mirrorPropAsAssertion("calledWithMatch", "expected %n to be called with match %*%C");
	        mirrorPropAsAssertion("alwaysCalledWith", "expected %n to always be called with arguments %*%C");
	        mirrorPropAsAssertion("alwaysCalledWithMatch", "expected %n to always be called with match %*%C");
	        mirrorPropAsAssertion("calledWithExactly", "expected %n to be called with exact arguments %*%C");
	        mirrorPropAsAssertion("alwaysCalledWithExactly", "expected %n to always be called with exact arguments %*%C");
	        mirrorPropAsAssertion("neverCalledWith", "expected %n to never be called with arguments %*%C");
	        mirrorPropAsAssertion("neverCalledWithMatch", "expected %n to never be called with match %*%C");
	        mirrorPropAsAssertion("threw", "%n did not throw exception%C");
	        mirrorPropAsAssertion("alwaysThrew", "%n did not always throw exception%C");
	
	        sinon.assert = assert;
	        return assert;
	    }
	
	    var isNode = typeof module !== "undefined" && module.exports && typeof require === "function";
	    var isAMD = typeof define === "function" && typeof define.amd === "object" && define.amd;
	
	    function loadDependencies(require, exports, module) {
	        var sinon = require("./util/core");
	        require("./match");
	        require("./format");
	        module.exports = makeApi(sinon);
	    }
	
	    if (isAMD) {
	        define(loadDependencies);
	        return;
	    }
	
	    if (isNode) {
	        loadDependencies(require, module.exports, module);
	        return;
	    }
	
	    if (sinonGlobal) {
	        makeApi(sinonGlobal);
	    }
	}(
	    typeof sinon === "object" && sinon, // eslint-disable-line no-undef
	    typeof global !== "undefined" ? global : self
	));
	
	  return sinon;
	}));
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3)(module), __webpack_require__(51), __webpack_require__(52).setImmediate, __webpack_require__(52).clearImmediate))

/***/ },
/* 51 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(51).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52).setImmediate, __webpack_require__(52).clearImmediate))

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map