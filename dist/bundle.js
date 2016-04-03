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
	
	var _session = __webpack_require__(1);
	
	var _session2 = _interopRequireDefault(_session);
	
	var _login = __webpack_require__(26);
	
	var _login2 = _interopRequireDefault(_login);
	
	var _forgotPassword = __webpack_require__(51);
	
	var _forgotPassword2 = _interopRequireDefault(_forgotPassword);
	
	var _register = __webpack_require__(52);
	
	var _register2 = _interopRequireDefault(_register);
	
	var _dashboard = __webpack_require__(53);
	
	var _dashboard2 = _interopRequireDefault(_dashboard);
	
	var _logout = __webpack_require__(64);
	
	var _logout2 = _interopRequireDefault(_logout);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var m = __webpack_require__(27);
	//require('./index.css')
	
	
	m.route.mode = "hash";
	m.route(document.querySelector('#app-container'), '/dashboard', {
	  '/': redirectIfAlreadyLogedIn({ view: view }),
	  '/login': redirectIfAlreadyLogedIn(_login2.default),
	  '/forgot-password': redirectIfAlreadyLogedIn(_forgotPassword2.default),
	  '/register': redirectIfAlreadyLogedIn(_register2.default),
	  '/dashboard': secure(_dashboard2.default),
	  '/logout': secure(_logout2.default)
	});
	
	var noop = function noop() {};
	
	function redirectIfAlreadyLogedIn(component) {
	  return {
	    controller: function controller() {
	      if (((0, _session2.default)() || {}).token) {
	        return m.route('/dashboard');
	      }
	      return new (component.controller || noop)(arguments);
	    },
	    view: component.view
	  };
	}
	
	function secure(component) {
	  return {
	    controller: function controller() {
	      if (((0, _session2.default)() || {}).token) {
	        return new component.controller(arguments);
	      }
	      return m.route('/');
	    },
	    view: component.view
	  };
	}
	
	function view() {
	  return '';
	}
	
	// require('./mock/api');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _stringify = __webpack_require__(2);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var merge = __webpack_require__(5);
	var pipe = __webpack_require__(13);
	
	var STORAGE_ID = 'gromit.session';
	var session = fetchFromStorage();
	
	function fetchFromStorage() {
		var inStorage = localStorage.getItem(STORAGE_ID);
		return inStorage ? JSON.parse(inStorage) : null;
	}
	
	var setInStorage = localStorage.setItem.bind(localStorage, STORAGE_ID);
	var parseAndStore = pipe(_stringify2.default, setInStorage);
	var setSession = function setSession(newValue) {
		return session = newValue;
	};
	var getSession = function getSession() {
		return session;
	};
	var update = pipe(merge, setSession, parseAndStore, getSession);
	var clean = function clean() {
		session = null;
		localStorage.clear();
		return session;
	};
	
	module.exports = function (param) {
		if (param === null) {
			return clean();
		}
		if (param) {
			return update(session || {}, param);
		}
		return session;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(4);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var mergeWith = __webpack_require__(6);
	
	
	/**
	 * Create a new object with the own properties of the first object merged with
	 * the own properties of the second object. If a key exists in both objects,
	 * the value from the second object will be used.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Object
	 * @sig {k: v} -> {k: v} -> {k: v}
	 * @param {Object} l
	 * @param {Object} r
	 * @return {Object}
	 * @see R.mergeWith, R.mergeWithKey
	 * @example
	 *
	 *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
	 *      //=> { 'name': 'fred', 'age': 40 }
	 *
	 *      var resetToDefault = R.merge(R.__, {x: 0});
	 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
	 */
	module.exports = mergeWith(function(l, r) {
	  return r;
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var _curry3 = __webpack_require__(7);
	var mergeWithKey = __webpack_require__(11);
	
	
	/**
	 * Creates a new object with the own properties of the two provided objects. If
	 * a key exists in both objects, the provided function is applied to the values
	 * associated with the key in each object, with the result being used as the
	 * value associated with the key in the returned object. The key will be
	 * excluded from the returned object if the resulting value is `undefined`.
	 *
	 * @func
	 * @memberOf R
	 * @since 0.19.1
	 * @since 0.19.0
	 * @category Object
	 * @sig (a -> a -> a) -> {a} -> {a} -> {a}
	 * @param {Function} fn
	 * @param {Object} l
	 * @param {Object} r
	 * @return {Object}
	 * @see R.merge, R.mergeWithKey
	 * @example
	 *
	 *      R.mergeWith(R.concat,
	 *                  { a: true, values: [10, 20] },
	 *                  { b: true, values: [15, 35] });
	 *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
	 */
	module.exports = _curry3(function mergeWith(fn, l, r) {
	  return mergeWithKey(function(_, _l, _r) {
	    return fn(_l, _r);
	  }, l, r);
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(8);
	var _curry2 = __webpack_require__(10);
	var _isPlaceholder = __webpack_require__(9);
	
	
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var _isPlaceholder = __webpack_require__(9);
	
	
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
/* 9 */
/***/ function(module, exports) {

	module.exports = function _isPlaceholder(a) {
	  return a != null &&
	         typeof a === 'object' &&
	         a['@@functional/placeholder'] === true;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(8);
	var _isPlaceholder = __webpack_require__(9);
	
	
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var _curry3 = __webpack_require__(7);
	var _has = __webpack_require__(12);
	
	
	/**
	 * Creates a new object with the own properties of the two provided objects. If
	 * a key exists in both objects, the provided function is applied to the key
	 * and the values associated with the key in each object, with the result being
	 * used as the value associated with the key in the returned object. The key
	 * will be excluded from the returned object if the resulting value is
	 * `undefined`.
	 *
	 * @func
	 * @memberOf R
	 * @since 0.19.1
	 * @since 0.19.0
	 * @category Object
	 * @sig (String -> a -> a -> a) -> {a} -> {a} -> {a}
	 * @param {Function} fn
	 * @param {Object} l
	 * @param {Object} r
	 * @return {Object}
	 * @see R.merge, R.mergeWith
	 * @example
	 *
	 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
	 *      R.mergeWithKey(concatValues,
	 *                     { a: true, thing: 'foo', values: [10, 20] },
	 *                     { b: true, thing: 'bar', values: [15, 35] });
	 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
	 */
	module.exports = _curry3(function mergeWithKey(fn, l, r) {
	  var result = {};
	  var k;
	
	  for (k in l) {
	    if (_has(k, l)) {
	      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
	    }
	  }
	
	  for (k in r) {
	    if (_has(k, r) && !(_has(k, result))) {
	      result[k] = r[k];
	    }
	  }
	
	  return result;
	});


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function _has(prop, obj) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(14);
	var _pipe = __webpack_require__(15);
	var reduce = __webpack_require__(16);
	var tail = __webpack_require__(22);
	
	
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
/* 14 */
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
/* 15 */
/***/ function(module, exports) {

	module.exports = function _pipe(f, g) {
	  return function() {
	    return g.call(this, f.apply(this, arguments));
	  };
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var _curry3 = __webpack_require__(7);
	var _reduce = __webpack_require__(17);
	
	
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var _xwrap = __webpack_require__(18);
	var bind = __webpack_require__(19);
	var isArrayLike = __webpack_require__(20);
	
	
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
/* 18 */
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(14);
	var _curry2 = __webpack_require__(10);
	
	
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(8);
	var _isArray = __webpack_require__(21);
	
	
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
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var _checkForMethod = __webpack_require__(23);
	var slice = __webpack_require__(25);
	
	
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var _isArray = __webpack_require__(21);
	var _slice = __webpack_require__(24);
	
	
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
/* 24 */
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var _checkForMethod = __webpack_require__(23);
	var _curry3 = __webpack_require__(7);
	
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var m = __webpack_require__(27);
	var constraints = __webpack_require__(29);
	var inlineErrors = __webpack_require__(43);
	var pipe = __webpack_require__(47);
	var backend = __webpack_require__(49);
	var closeBtn = __webpack_require__(50);
	var session = __webpack_require__(1);
	
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
	
	  function saveTokenOnSession(response) {
	    session({ token: response.token });
	    return response;
	  }
	
	  var routeToDashboard = function routeToDashboard() {
	    return m.route('/dashboard');
	  };
	
	  ctrl.submit = function () {
	    pipe(validate, backend.login, saveTokenOnSession, routeToDashboard)(ctrl.user).catch(handleErrors);
	    return false;
	  };
	
	  return ctrl;
	};
	
	login.view = function (ctrl) {
	  return m('.login.content', [closeBtn, m('h1', 'Login to your account'), m('.service-errors', ctrl.errors('service')), m('form', { onsubmit: ctrl.submit }, [m('.field', [m('label', 'Email'), m('input[type=email]', { onchange: m.withAttr('value', ctrl.user.email) }), ctrl.errors('email')]), m('.field', [m('label', 'Password'), m('input[type=password]', { onchange: m.withAttr('value', ctrl.user.password) }), ctrl.errors('password')]), m('.field', [m('button[type=submit]', 'Login')]), m('.more', [m('.field', m("a.forgot-password[href='/forgot-password']", { config: m.route }, 'Forgot your password?')), m('.field', m('a.register[href="/register"]', { config: m.route }, "you don't have an user yet?"))])])]);
	};
	
	exports.default = login;
	module.exports = exports['default'];

/***/ },
/* 27 */
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)(module)))

/***/ },
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var validator = __webpack_require__(30);
	var m = __webpack_require__(27);
	
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
/* 30 */
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
	  var errors = externalErrors || __webpack_require__(31)();
	
	  var api = function api(model) {
	    errors.clear();
	    constraints(model, errors);
	    return !errors();
	  };
	
	  api.errors = errors;
	
	  return api;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _keys = __webpack_require__(32);
	
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(33), __esModule: true };

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(34);
	module.exports = __webpack_require__(4).Object.keys;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(35);
	
	__webpack_require__(37)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(36);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(38)
	  , core    = __webpack_require__(4)
	  , fails   = __webpack_require__(42);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(39)
	  , core      = __webpack_require__(4)
	  , ctx       = __webpack_require__(40)
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
/* 39 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(41);
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
/* 41 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var m = __webpack_require__(27);
	var pipe = __webpack_require__(13);
	var takeFirst = __webpack_require__(44);
	
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
	  var errors = __webpack_require__(31)();
	
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var nth = __webpack_require__(45);
	
	
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(10);
	var _isString = __webpack_require__(46);
	
	
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
/* 46 */
/***/ function(module, exports) {

	module.exports = function _isString(x) {
	  return Object.prototype.toString.call(x) === '[object String]';
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(14);
	var _pipeP = __webpack_require__(48);
	var reduce = __webpack_require__(16);
	var tail = __webpack_require__(22);
	
	
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
/* 48 */
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var m = __webpack_require__(27);
	var merge = __webpack_require__(5);
	var session = __webpack_require__(1);
	
	var serverUrl = 'https://app.gromit.io/api';
	//const serverUrl = 'http://localhost'
	
	var unwrapError = function unwrapError(response, xhr) {
	  return { type: 'service', code: xhr.status, error: response };
	};
	
	function addAuthorization(xhr) {
	  if (session() && session().token) {
	    xhr.setRequestHeader('Authorization', 'Bearer ' + session().token);
	  }
	}
	
	var request = function request(method, path, more) {
	  return m.request(merge({ method: method, url: serverUrl + path,
	    unwrapError: unwrapError, config: addAuthorization }, more || {}));
	};
	
	var authRequest = function authRequest(method, path, more) {
	  return request(method, path, merge({ config: addAuthorization }, more));
	};
	var emailAndPassword = function emailAndPassword(user) {
	  return { data: { username: user.email(), password: user.password() } };
	};
	
	var users = {};
	users.login = function (user) {
	  return request('POST', '/users/token', emailAndPassword(user));
	};
	users.register = function (user) {
	  return request('POST', '/users/signUp', emailAndPassword(user));
	};
	users.resetPassword = function (user) {
	  return request('POST', '/users/reset', emailAndPassword(user));
	};
	users.logout = function (user) {
	  return request('DELETE', '/users/current');
	};
	users.fetch = function () {
	  console.log('fetch user');
	  return request('GET', '/users/current', { background: true });
	  /*
	    const deferred = m.deferred();
	    //m.startComputation();
	    setTimeout(function() {
	      deferred.resolve({ userId: 'xx',
	        createdTime: 1430245398014,
	        updatedTime: 1430245398014,
	        email: 'maxidr@gmail.com',
	        password: null,
	        ipList: null,
	        originList: null,
	        projectKey: 'zpevg',
	        usages: 13219391,
	        billingDay: 1430245398014,
	        exceedAllowed: false,
	        plan: 'trial'
	      })
	      m.redraw();
	    }, 1500);
	    return deferred.promise;
	  */
	};
	
	module.exports = users;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var m = __webpack_require__(27);
	var btn = m('.close', m('a[href="/"].icon-cross', { config: m.route }));
	
	exports.default = btn;
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mithril = __webpack_require__(27);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var inlineErrors = __webpack_require__(43);
	var constraints = __webpack_require__(29);
	var pipe = __webpack_require__(47);
	var backend = __webpack_require__(49);
	var closeBtn = __webpack_require__(50);
	
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
	    pipe(validate, backend.resetPassword, ctrl.showSuccessMsg.bind(null, true))(ctrl.user).catch(handleErrors);
	
	    return false;
	  };
	
	  return ctrl;
	};
	
	forgotPassword.view = function (ctrl) {
	  return ctrl.showSuccessMsg() ? successView(ctrl.user.email()) : formView(ctrl);
	};
	
	exports.default = forgotPassword;
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var m = __webpack_require__(27);
	var constraints = __webpack_require__(29);
	var inlineErrors = __webpack_require__(43);
	var pipe = __webpack_require__(47);
	var backend = __webpack_require__(49);
	var closeBtn = __webpack_require__(50);
	
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
	    pipe(validate, backend.register, ctrl.showSuccessMsg.bind(null, true))(ctrl.user).catch(handleErrors);
	    return false;
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mithril = __webpack_require__(27);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	var _jsonFormatterJs = __webpack_require__(54);
	
	var _jsonFormatterJs2 = _interopRequireDefault(_jsonFormatterJs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var user = __webpack_require__(49);
	var spinner = __webpack_require__(55);
	__webpack_require__(60);
	//const JSONFormatter = require('json-formatter-js/src/index.js')
	//const JSONFormatter = require('json-formatter-js')
	
	__webpack_require__(62);
	
	var dashboard = {};
	
	dashboard.controller = function () {
	  var ctrl = this;
	  ctrl.user = _mithril2.default.prop();
	  user.fetch().then(function (user) {
	    console.log('user: ' + user);
	    ctrl.user(user);
	  });
	};
	
	/*
	const json = {"client":{"userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36","browser":{"family":"Chrome","major":"49","minor":"0","patch":"2623"},"os":{"family":"Mac OS X","major":"10","minor":"11","patch":"4"},"device":{"family":"Other"}},"location":{"ip":"8.8.8.8","latitude":37.3845,"longitude":-122.0881,"timeZone":{"countryIso":"US","id":"America/Los_Angeles","janOffset":-8.0,"julOffset":-7.0,"rawOffset":-8.0},"subdivisions":[{"name":"California","geonNameId":5332921},{"name":"Santa Clara County","geonNameId":5393021}],"country":{"area":9629091,"capital":"Washington","currencyCode":"USD","currencyName":"Dollar","language":"en-US","name":"United States","phone":"1","population":310232863,"iso":"US","geoNameId":6252001},"continent":{"geonameId":6255149,"iso":"NA","name":"North America"},"city":{"name":"Mountain View","geoNameId":5375480,"population":74066}}};
	var jsonFormat = new window.JSONFormatter(json)
	
	function renderJSON(element, initialize){
	  if( ! initialize ){
	    element.appendChild(jsonFormat.render())
	  }
	}
	*/
	
	// FROM http://markup.su/highlighter/
	function jqueryExample() {
	  return (0, _mithril2.default)('.jquery-example', [_mithril2.default.trust('<pre style="background:#0c1021;color:#f8f8f8">' + '<span style="color:#fbde2d">$</span>.get(<span style="color:#61ce3c">' + 'https://zpevg.gromit.io/api' + '</span>).then(<span style="color:#fbde2d">function</span>(response){' + "<span style='display: block; padding-left: 2em;'>" + '<span style="color:#ff6400;">console</span><span style="color:#8da6ce">.log</span>(response.<span style="color:#8da6ce">location</span>.country.<span style="color:#8da6ce">name</span>)' + '</span>' + "<span style='display: block'>})</span>" + "</pre>")]);
	  /*
	    m('pre', { style: "background:#0c1021;color:#f8f8f8" }, [
	      m('span', { style: "color:#fbde2d" }, '$'),
	      '.get(', m('span', { style: "color:#61ce3c">'https://zpevg.gromit.io/api' }), ').then(' , m('span', { style: "color:#fbde2d" }, 'function'), '(response){'
	      m('span', { style: 'display: block; padding-left: 2em;' }, [
	        m('span', { style: 'color:#ff6400' }, 'console'), m('span', { style: 'color:#8da6ce' }, '.log'), '(response.' ,
	        m('span', { style: 'color:#8da6ce' }, 'location')
	        <span style="color:#8da6ce">location</span>.country.<span style="color:#8da6ce">name</span>)
	        m('span', { style: })
	      ])
	    ])
	    */
	  /*
	    <pre style="background:#0c1021;color:#f8f8f8">
	      <span style="color:#fbde2d">$</span>.get(<span style="color:#61ce3c">'https://zpevg.gromit.io/api'</span>).then(<span style="color:#fbde2d">function</span>(response){
	      <span style="color:#ff6400">console</span><span style="color:#8da6ce">.log</span>(response.<span style="color:#8da6ce">location</span>.country.<span style="color:#8da6ce">name</span>)
	    })
	    </pre>
	    */
	}
	
	//m('.json-result', { config: renderJSON })
	var renderInfo = function renderInfo(user) {
	  return [(0, _mithril2.default)('h2', ['Welcome', (0, _mithril2.default)('span.account', user.email)]),
	  /*
	  m('dl', [
	    m('dt', 'Your key'), m('dd', user.projectKey),
	    m('dt', 'Plan'), m('dd', [ user.plan, m('a.upgrade-plan', 'Upgrade your plan') ]),
	    m('dt', 'Already used'), m('dd', formatNumber(user.usages, '.'))
	  ]),
	  */
	  (0, _mithril2.default)('ul', [(0, _mithril2.default)('li', [(0, _mithril2.default)('.label', 'Your key'), (0, _mithril2.default)('.value', user.projectKey)]), (0, _mithril2.default)('li', [(0, _mithril2.default)('.label', 'Plan'), (0, _mithril2.default)('.value', [user.plan, (0, _mithril2.default)('a.upgrade-plan', 'Upgrade your plan')])]), (0, _mithril2.default)('li', [(0, _mithril2.default)('.label', 'Already used'), (0, _mithril2.default)('.value', formatNumber(user.usages, '.'))])]), (0, _mithril2.default)('.how-to', [(0, _mithril2.default)('h2', 'How to use your API'), (0, _mithril2.default)('ul', (0, _mithril2.default)('li', [(0, _mithril2.default)('.label', 'Endpoint'), (0, _mithril2.default)('.value', 'https://' + user.projectKey + '.gromit.io/api')])), (0, _mithril2.default)('.examples', [jqueryExample()])])];
	};
	
	function formatNumber(number, separator) {
	  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
	}
	
	var header = function header() {
	  return (0, _mithril2.default)('header.header-primary', [(0, _mithril2.default)('.container', [(0, _mithril2.default)('.logo', ['Gromit', (0, _mithril2.default)('b', '.io')]), (0, _mithril2.default)('ul.menu', [(0, _mithril2.default)('li', (0, _mithril2.default)('a[href="/logout"]', { config: _mithril2.default.route }, 'Logout'))])])]);
	};
	
	dashboard.view = function (ctrl) {
	  return (0, _mithril2.default)('.fullscreen-content', [header(), (0, _mithril2.default)('.content.dashboard', [ctrl.user() ? renderInfo(ctrl.user()) : (0, _mithril2.default)(spinner)])]);
	};
	
	exports.default = dashboard;
	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	'use strict';
	
	/*
	 * Escapes `"` charachters from string
	 *
	 * @param {string} str
	 * @returns {string}
	*/
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.isObject = isObject;
	exports.getObjectName = getObjectName;
	exports.getType = getType;
	exports.getValuePreview = getValuePreview;
	exports.getPreview = getPreview;
	function escapeString(str) {
	  return str.replace('"', '\"');
	}
	
	/*
	 * Determines if a value is an object
	 *
	 * @param {any} value
	 *
	 * @returns {boolean}
	 *
	*/
	
	function isObject(value) {
	  var type = typeof value;
	  return !!value && type == 'object';
	}
	
	/*
	 * Gets constructor name of an object.
	 * From http://stackoverflow.com/a/332429
	 *
	 * @param {object} object
	 *
	 * @returns {string}
	 *
	*/
	
	function getObjectName(object) {
	  if (object === undefined) {
	    return '';
	  }
	  if (object === null) {
	    return 'Object';
	  }
	  if (typeof object === 'object' && !object.constructor) {
	    return 'Object';
	  }
	
	  var funcNameRegex = /function (.{1,})\(/;
	  var results = funcNameRegex.exec(object.constructor.toString());
	  if (results && results.length > 1) {
	    return results[1];
	  } else {
	    return '';
	  }
	}
	
	/*
	 * Gets type of an object. Returns "null" for null objects
	 *
	 * @param {object} object
	 *
	 * @returns {string}
	*/
	
	function getType(object) {
	  if (object === null) {
	    return 'null';
	  }
	  return typeof object;
	}
	
	/*
	 * Generates inline preview for a JavaScript object based on a value
	 * @param {object} object
	 * @param {string} value
	 *
	 * @returns {string}
	*/
	
	function getValuePreview(object, value) {
	  var type = getType(object);
	
	  if (type === 'null' || type === 'undefined') {
	    return type;
	  }
	
	  if (type === 'string') {
	    value = '"' + escapeString(value) + '"';
	  }
	  if (type === 'function') {
	
	    // Remove content of the function
	    return object.toString().replace(/[\r\n]/g, '').replace(/\{.*\}/, '') + '{…}';
	  }
	  return value;
	}
	
	/*
	 * Generates inline preview for a JavaScript object
	 * @param {object} object
	 *
	 * @returns {string}
	*/
	
	function getPreview(object) {
	  var value = '';
	  if (isObject(object)) {
	    value = getObjectName(object);
	    if (Array.isArray(object)) value += '[' + object.length + ']';
	  } else {
	    value = getValuePreview(object, object);
	  }
	  return value;
	}
	
	},{}],2:[function(require,module,exports){
	'use strict';
	
	/* globals JSONFormatter */
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _templateObject = _taggedTemplateLiteral(['\n          <span class="toggler"></span>\n        '], ['\n          <span class="toggler"></span>\n        ']),
	    _templateObject2 = _taggedTemplateLiteral(['\n          <span class="key">', ':</span>\n        '], ['\n          <span class="key">', ':</span>\n        ']),
	    _templateObject3 = _taggedTemplateLiteral(['\n            <span>\n              <span class="constructor-name">', '</span>\n\n              ', '\n\n            </span>\n          '], ['\n            <span>\n              <span class="constructor-name">', '</span>\n\n              ', '\n\n            </span>\n          ']),
	    _templateObject4 = _taggedTemplateLiteral(['\n                <span><span class="bracket">[</span><span class="number">', '</span><span class="bracket">]</span></span>\n              '], ['\n                <span><span class="bracket">[</span><span class="number">', '</span><span class="bracket">]</span></span>\n              ']),
	    _templateObject5 = _taggedTemplateLiteral(['\n\n            <', '\n              class="', ' ', ' ', '"\n              ', '\n            >', '</', '>\n\n          '], ['\n\n            <', '\n              class="', ' ', ' ', '"\n              ', '\n            >', '</', '>\n\n          ']),
	    _templateObject6 = _taggedTemplateLiteral(['date'], ['date']),
	    _templateObject7 = _taggedTemplateLiteral(['url'], ['url']),
	    _templateObject8 = _taggedTemplateLiteral(['href="', '"'], ['href="', '"']),
	    _templateObject9 = _taggedTemplateLiteral(['\n          <span class="preview-text">', '</span>\n        '], ['\n          <span class="preview-text">', '</span>\n        ']),
	    _templateObject10 = _taggedTemplateLiteral(['object'], ['object']),
	    _templateObject11 = _taggedTemplateLiteral(['array'], ['array']),
	    _templateObject12 = _taggedTemplateLiteral(['empty'], ['empty']);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	var _helpersJs = require('./helpers.js');
	
	/**
	 * @class JSONFormatter
	 *
	 * JSONFormatter allows you to render JSON objects in HTML with a
	 * **collapsible** navigation.
	*/
	
	var JSONFormatter = (function () {
	
	  /**
	   * @param {object} json The JSON object you want to render. It has to be an
	   * object or array. Do NOT pass raw JSON string.
	   *
	   * @param {number} [open=1] his number indicates up to how many levels the
	   * rendered tree should expand. Set it to `0` to make the whole tree collapsed
	   * or set it to `Infinity` to expand the tree deeply
	   *
	   * @param {object} [config=defaultConfig] -
	   *  defaultConfig = {
	   *   hoverPreviewEnabled: false,
	   *   hoverPreviewArrayCount: 100,
	   *   hoverPreviewFieldCount: 5
	   * }
	   *
	   * Available configurations:
	   *  #####Hover Preview
	   * * `hoverPreviewEnabled`:  enable preview on hover
	   * * `hoverPreviewArrayCount`: number of array items to show in preview Any
	   *    array larger than this number will be shown as `Array[XXX]` where `XXX`
	   *    is length of the array.
	   * * `hoverPreviewFieldCount`: number of object properties to show for object
	   *   preview. Any object with more properties that thin number will be
	   *   truncated.
	   *
	   * @param {string} [key=undefined] The key that this object in it's parent
	   * context
	  */
	
	  function JSONFormatter(json, open, config, key) {
	    _classCallCheck(this, JSONFormatter);
	
	    this.json = json;
	    this.key = key;
	    this.open = open === undefined ? 1 : open;
	    this.config = config || {};
	
	    this.config.hoverPreviewEnabled = this.config.hoverPreviewEnabled === undefined ? false : this.config.hoverPreviewEnabled;
	
	    this.config.hoverPreviewArrayCount = this.config.hoverPreviewArrayCount === undefined ? 100 : this.config.hoverPreviewArrayCount;
	
	    this.config.hoverPreviewFieldCount = this.config.hoverPreviewFieldCount === undefined ? 5 : this.config.hoverPreviewFieldCount;
	
	    this.type = (0, _helpersJs.getType)(this.json);
	    this.hasKey = typeof this.key !== 'undefined';
	
	    // If 'open' attribute is present
	    this.isOpen = this.open > 0;
	
	    if (this.type === 'string') {
	
	      // Add custom type for date
	      if (new Date(this.json).toString() !== 'Invalid Date') {
	        this.isDate = true;
	      }
	
	      // Add custom type for URLs
	      if (this.json.indexOf('http') === 0) {
	        this.isUrl = true;
	      }
	    }
	
	    this.isArray = Array.isArray(this.json);
	    this.isObject = (0, _helpersJs.isObject)(this.json);
	
	    this.keys = [];
	    if (this.isObject) {
	      this.keys = Object.keys(this.json).map(function (key) {
	        if (key === '') {
	          return '""';
	        }
	        return key;
	      });
	    }
	
	    this.isEmptyObject = !this.keys.length && this.isOpen && !this.isArray;
	    this.onstructorName = (0, _helpersJs.getObjectName)(this.json);
	    this.isEmpty = this.isEmptyObject || this.keys && !this.keys.length && this.isArray;
	
	    this.getValuePreview = _helpersJs.getValuePreview;
	  }
	
	  // TODO: UMD
	
	  /**
	   * Toggles `isOpen` state
	   *
	  */
	
	  _createClass(JSONFormatter, [{
	    key: 'toggleOpen',
	    value: function toggleOpen() {
	      this.isOpen = !this.isOpen;
	
	      if (this.isOpen) {
	        this.appendChildern();
	      } else {
	        this.removeChildren();
	      }
	
	      if (this.element) {
	        this.element.classList.toggle('open');
	      }
	    }
	
	    /**
	     * Generates inline preview
	     *
	     * @returns {string}
	    */
	  }, {
	    key: 'getInlinepreview',
	    value: function getInlinepreview() {
	      var _this = this;
	
	      if (this.isArray) {
	
	        // if array length is greater then 100 it shows "Array[101]"
	        if (this.json.length > this.config.hoverPreviewArrayCount) {
	          return 'Array[' + this.json.length + ']';
	        } else {
	          return '[' + this.json.map(_helpersJs.getPreview).join(', ') + ']';
	        }
	      } else {
	
	        var keys = this.keys;
	
	        // the first five keys (like Chrome Developer Tool)
	        var narrowKeys = keys.slice(0, this.config.hoverPreviewFieldCount);
	
	        // json value schematic information
	        var kvs = narrowKeys.map(function (key) {
	          return key + ':' + (0, _helpersJs.getPreview)(_this.json[key]);
	        });
	
	        // if keys count greater then 5 then show ellipsis
	        var ellipsis = keys.length >= 5 ? '…' : '';
	
	        return '{' + kvs.join(', ') + ellipsis + '}';
	      }
	    }
	
	    /**
	     * Generates HTML string  for this JSON based on the template
	     *
	     * @returns {string}
	    */
	  }, {
	    key: 'template',
	    value: function template() {
	
	      /*
	       * if condition for ES6 template strings
	       * to be used only in template string
	       *
	       * @example mystr = `Random is ${_if(Math.random() > 0.5)`greater than 0.5``
	       *
	       * @param {boolean} condition
	       *
	       * @returns {function} the template function
	      */
	      function _if(condition) {
	        return condition ? normal : empty;
	      }
	      function empty() {
	        return '';
	      }
	      function normal(template) {
	        for (var _len = arguments.length, expressions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          expressions[_key - 1] = arguments[_key];
	        }
	
	        return template.slice(1).reduce(function (accumulator, part, i) {
	          return accumulator + expressions[i] + part;
	        }, template[0]);
	      }
	
	      var templateString = '\n      <a class="toggler-link">\n        ' + _if(this.isObject)(_templateObject) + '\n\n        ' + _if(this.hasKey)(_templateObject2, this.key) + '\n\n        <span class="value">\n\n          ' + _if(this.isObject)(_templateObject3, this.onstructorName, _if(this.isArray)(_templateObject4, this.json && this.json.length)) + '\n\n          ' + _if(!this.isObject)(_templateObject5, this.isUrl ? 'a' : 'span', this.type, _if(this.isDate)(_templateObject6), _if(this.isUrl)(_templateObject7), _if(this.isUrl)(_templateObject8, this.json), this.getValuePreview(this.json, this.json), this.isUrl ? 'a' : 'span') + '\n\n        </span>\n\n        ' + _if(this.config.hoverPreviewEnabled && this.isObject)(_templateObject9, this.getInlinepreview()) + '\n      </a>\n\n      <div class="children ' + _if(this.isObject)(_templateObject10) + ' ' + _if(this.isArray)(_templateObject11) + ' ' + _if(this.isEmpty)(_templateObject12) + '"></div>\n    ';
	
	      return templateString.replace(/\s*\n/g, '\n'); // clean up empty lines
	    }
	
	    /**
	     * Renders an HTML element and installs event listeners
	     *
	     * @returns {HTMLDivElement}
	    */
	  }, {
	    key: 'render',
	    value: function render() {
	      var resultHTML = this.template();
	
	      this.element = document.createElement('div');
	      this.element.classList.add('json-formatter-row');
	
	      if (this.config && this.config.theme) {
	        this.element.classList.add('json-formatter-' + this.config.theme);
	      }
	
	      if (this.isOpen) {
	        this.element.classList.add('open');
	      }
	
	      this.element.innerHTML = resultHTML;
	
	      if (this.isObject && this.isOpen) {
	        this.appendChildern();
	      }
	
	      // add event listener for toggling
	      this.element.querySelector('a.toggler-link').addEventListener('click', this.toggleOpen.bind(this));
	
	      return this.element;
	    }
	
	    /**
	     * Appends all the children to `<div class="children"></div>` element
	     *
	    */
	  }, {
	    key: 'appendChildern',
	    value: function appendChildern() {
	      var _this2 = this;
	
	      var children = this.element.querySelector('div.children');
	
	      if (!children) {
	        return;
	      }
	
	      this.keys.forEach(function (key) {
	        var formatter = new JSONFormatter(_this2.json[key], _this2.open - 1, _this2.config, key);
	
	        children.appendChild(formatter.render());
	      });
	    }
	
	    /**
	     * Removes all the children from `<div class="children"></div>` element
	     *
	    */
	  }, {
	    key: 'removeChildren',
	    value: function removeChildren() {
	      if (this.element.querySelector('div.children')) {
	        this.element.querySelector('div.children').innerHTML = '';
	      }
	    }
	  }]);
	
	  return JSONFormatter;
	})();
	
	exports['default'] = JSONFormatter;
	window.JSONFormatter = JSONFormatter;
	module.exports = exports['default'];
	
	},{"./helpers.js":1}]},{},[2])
	//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbW9oc2VuL1Byb2plY3RzL2pzb24tZm9ybWF0dGVyLWpzL3NyYy9oZWxwZXJzLmpzIiwiL1VzZXJzL21vaHNlbi9Qcm9qZWN0cy9qc29uLWZvcm1hdHRlci1qcy9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRYixTQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDekIsU0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUMvQjs7Ozs7Ozs7Ozs7QUFVTSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUU7QUFDOUIsTUFBSSxJQUFJLEdBQUcsT0FBTyxLQUFLLENBQUM7QUFDeEIsU0FBTyxDQUFDLENBQUMsS0FBSyxJQUFLLElBQUksSUFBSSxRQUFRLEFBQUMsQ0FBQztDQUN0Qzs7Ozs7Ozs7Ozs7O0FBV00sU0FBUyxhQUFhLENBQUMsTUFBTSxFQUFFO0FBQ3BDLE1BQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtBQUN4QixXQUFPLEVBQUUsQ0FBQztHQUNYO0FBQ0QsTUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQ25CLFdBQU8sUUFBUSxDQUFDO0dBQ2pCO0FBQ0QsTUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQ25ELFdBQU8sUUFBUSxDQUFDO0dBQ25COztBQUVELE1BQU0sYUFBYSxHQUFHLG9CQUFvQixDQUFDO0FBQzNDLE1BQU0sT0FBTyxHQUFHLEFBQUMsYUFBYSxDQUFFLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBRSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUN0RSxNQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENB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SSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFBRTtBQUM5QyxZQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO09BQzNEO0tBQ0Y7OztTQTdSa0IsYUFBYTs7O3FCQUFiLGFBQWE7QUFpU2xDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLypcbiAqIEVzY2FwZXMgYFwiYCBjaGFyYWNodGVycyBmcm9tIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZnVuY3Rpb24gZXNjYXBlU3RyaW5nKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoJ1wiJywgJ1xcXCInKTtcbn1cblxuLypcbiAqIERldGVybWluZXMgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0Jyk7XG59XG5cbi8qXG4gKiBHZXRzIGNvbnN0cnVjdG9yIG5hbWUgb2YgYW4gb2JqZWN0LlxuICogRnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zMzI0MjlcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE9iamVjdE5hbWUob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAob2JqZWN0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuICdPYmplY3QnO1xuICB9XG4gIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiAhb2JqZWN0LmNvbnN0cnVjdG9yKSB7XG4gICAgICByZXR1cm4gJ09iamVjdCc7XG4gIH1cblxuICBjb25zdCBmdW5jTmFtZVJlZ2V4ID0gL2Z1bmN0aW9uICguezEsfSlcXCgvO1xuICBjb25zdCByZXN1bHRzID0gKGZ1bmNOYW1lUmVnZXgpLmV4ZWMoKG9iamVjdCkuY29uc3RydWN0b3IudG9TdHJpbmcoKSk7XG4gIGlmIChyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoID4gMSkge1xuICAgIHJldHVybiByZXN1bHRzWzFdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG4vKlxuICogR2V0cyB0eXBlIG9mIGFuIG9iamVjdC4gUmV0dXJucyBcIm51bGxcIiBmb3IgbnVsbCBvYmplY3RzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGUob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT09IG51bGwpIHsgcmV0dXJuICdudWxsJzsgfVxuICByZXR1cm4gdHlwZW9mIG9iamVjdDtcbn1cblxuLypcbiAqIEdlbmVyYXRlcyBpbmxpbmUgcHJldmlldyBmb3IgYSBKYXZhU2NyaXB0IG9iamVjdCBiYXNlZCBvbiBhIHZhbHVlXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRWYWx1ZVByZXZpZXcgKG9iamVjdCwgdmFsdWUpIHtcbiAgdmFyIHR5cGUgPSBnZXRUeXBlKG9iamVjdCk7XG5cbiAgaWYgKHR5cGUgPT09ICdudWxsJyB8fCB0eXBlID09PSAndW5kZWZpbmVkJykgeyByZXR1cm4gdHlwZTsgfVxuXG4gIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gJ1wiJyArIGVzY2FwZVN0cmluZyh2YWx1ZSkgKyAnXCInO1xuICB9XG4gIGlmICh0eXBlID09PSAnZnVuY3Rpb24nKXtcblxuICAgIC8vIFJlbW92ZSBjb250ZW50IG9mIHRoZSBmdW5jdGlvblxuICAgIHJldHVybiBvYmplY3QudG9TdHJpbmcoKVxuICAgICAgICAucmVwbGFjZSgvW1xcclxcbl0vZywgJycpXG4gICAgICAgIC5yZXBsYWNlKC9cXHsuKlxcfS8sICcnKSArICd74oCmfSc7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKlxuICogR2VuZXJhdGVzIGlubGluZSBwcmV2aWV3IGZvciBhIEphdmFTY3JpcHQgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJldmlldyhvYmplY3QpIHtcbiAgbGV0IHZhbHVlID0gJyc7XG4gIGlmIChpc09iamVjdChvYmplY3QpKSB7XG4gICAgdmFsdWUgPSBnZXRPYmplY3ROYW1lKG9iamVjdCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSlcbiAgICAgIHZhbHVlICs9ICdbJyArIG9iamVjdC5sZW5ndGggKyAnXSc7XG4gIH0gZWxzZSB7XG4gICAgdmFsdWUgPSBnZXRWYWx1ZVByZXZpZXcob2JqZWN0LCBvYmplY3QpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbHMgSlNPTkZvcm1hdHRlciAqL1xuXG5pbXBvcnQge1xuICBpc09iamVjdCxcbiAgZ2V0T2JqZWN0TmFtZSxcbiAgZ2V0VHlwZSxcbiAgZ2V0VmFsdWVQcmV2aWV3LFxuICBnZXRQcmV2aWV3XG59IGZyb20gJy4vaGVscGVycy5qcyc7XG5cbi8qKlxuICogQGNsYXNzIEpTT05Gb3JtYXR0ZXJcbiAqXG4gKiBKU09ORm9ybWF0dGVyIGFsbG93cyB5b3UgdG8gcmVuZGVyIEpTT04gb2JqZWN0cyBpbiBIVE1MIHdpdGggYVxuICogKipjb2xsYXBzaWJsZSoqIG5hdmlnYXRpb24uXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSlNPTkZvcm1hdHRlciB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIFRoZSBKU09OIG9iamVjdCB5b3Ugd2FudCB0byByZW5kZXIuIEl0IGhhcyB0byBiZSBhblxuICAgKiBvYmplY3Qgb3IgYXJyYXkuIERvIE5PVCBwYXNzIHJhdyBKU09OIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcGVuPTFdIGhpcyBudW1iZXIgaW5kaWNhdGVzIHVwIHRvIGhvdyBtYW55IGxldmVscyB0aGVcbiAgICogcmVuZGVyZWQgdHJlZSBzaG91bGQgZXhwYW5kLiBTZXQgaXQgdG8gYDBgIHRvIG1ha2UgdGhlIHdob2xlIHRyZWUgY29sbGFwc2VkXG4gICAqIG9yIHNldCBpdCB0byBgSW5maW5pdHlgIHRvIGV4cGFuZCB0aGUgdHJlZSBkZWVwbHlcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IFtjb25maWc9ZGVmYXVsdENvbmZpZ10gLVxuICAgKiAgZGVmYXVsdENvbmZpZyA9IHtcbiAgICogICBob3ZlclByZXZpZXdFbmFibGVkOiBmYWxzZSxcbiAgICogICBob3ZlclByZXZpZXdBcnJheUNvdW50OiAxMDAsXG4gICAqICAgaG92ZXJQcmV2aWV3RmllbGRDb3VudDogNVxuICAgKiB9XG4gICAqXG4gICAqIEF2YWlsYWJsZSBjb25maWd1cmF0aW9uczpcbiAgICogICMjIyMjSG92ZXIgUHJldmlld1xuICAgKiAqIGBob3ZlclByZXZpZXdFbmFibGVkYDogIGVuYWJsZSBwcmV2aWV3IG9uIGhvdmVyXG4gICAqICogYGhvdmVyUHJldmlld0FycmF5Q291bnRgOiBudW1iZXIgb2YgYXJyYXkgaXRlbXMgdG8gc2hvdyBpbiBwcmV2aWV3IEFueVxuICAgKiAgICBhcnJheSBsYXJnZXIgdGhhbiB0aGlzIG51bWJlciB3aWxsIGJlIHNob3duIGFzIGBBcnJheVtYWFhdYCB3aGVyZSBgWFhYYFxuICAgKiAgICBpcyBsZW5ndGggb2YgdGhlIGFycmF5LlxuICAgKiAqIGBob3ZlclByZXZpZXdGaWVsZENvdW50YDogbnVtYmVyIG9mIG9iamVjdCBwcm9wZXJ0aWVzIHRvIHNob3cgZm9yIG9iamVjdFxuICAgKiAgIHByZXZpZXcuIEFueSBvYmplY3Qgd2l0aCBtb3JlIHByb3BlcnRpZXMgdGhhdCB0aGluIG51bWJlciB3aWxsIGJlXG4gICAqICAgdHJ1bmNhdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2tleT11bmRlZmluZWRdIFRoZSBrZXkgdGhhdCB0aGlzIG9iamVjdCBpbiBpdCdzIHBhcmVudFxuICAgKiBjb250ZXh0XG4gICovXG4gIGNvbnN0cnVjdG9yKGpzb24sIG9wZW4sIGNvbmZpZywga2V5KSB7XG4gICAgdGhpcy5qc29uID0ganNvbjtcbiAgICB0aGlzLmtleSA9IGtleTtcbiAgICB0aGlzLm9wZW4gPSBvcGVuID09PSB1bmRlZmluZWQgPyAxIDogb3BlbjtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblxuICAgIHRoaXMuY29uZmlnLmhvdmVyUHJldmlld0VuYWJsZWQgPVxuICAgICAgdGhpcy5jb25maWcuaG92ZXJQcmV2aWV3RW5hYmxlZCA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOlxuICAgICAgdGhpcy5jb25maWcuaG92ZXJQcmV2aWV3RW5hYmxlZDtcblxuICAgIHRoaXMuY29uZmlnLmhvdmVyUHJldmlld0FycmF5Q291bnQgPVxuICAgICAgdGhpcy5jb25maWcuaG92ZXJQcmV2aWV3QXJyYXlDb3VudCA9PT0gdW5kZWZpbmVkID8gMTAwIDpcbiAgICAgIHRoaXMuY29uZmlnLmhvdmVyUHJldmlld0FycmF5Q291bnQ7XG5cbiAgICB0aGlzLmNvbmZpZy5ob3ZlclByZXZpZXdGaWVsZENvdW50ID1cbiAgICAgIHRoaXMuY29uZmlnLmhvdmVyUHJldmlld0ZpZWxkQ291bnQgPT09IHVuZGVmaW5lZCA/IDUgOlxuICAgICAgdGhpcy5jb25maWcuaG92ZXJQcmV2aWV3RmllbGRDb3VudDtcblxuICAgIHRoaXMudHlwZSA9IGdldFR5cGUodGhpcy5qc29uKTtcbiAgICB0aGlzLmhhc0tleSA9IHR5cGVvZiB0aGlzLmtleSAhPT0gJ3VuZGVmaW5lZCc7XG5cbiAgICAvLyBJZiAnb3BlbicgYXR0cmlidXRlIGlzIHByZXNlbnRcbiAgICB0aGlzLmlzT3BlbiA9IHRoaXMub3BlbiA+IDA7XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAnc3RyaW5nJyl7XG5cbiAgICAgIC8vIEFkZCBjdXN0b20gdHlwZSBmb3IgZGF0ZVxuICAgICAgaWYoKG5ldyBEYXRlKHRoaXMuanNvbikpLnRvU3RyaW5nKCkgIT09ICdJbnZhbGlkIERhdGUnKSB7XG4gICAgICAgIHRoaXMuaXNEYXRlID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGN1c3RvbSB0eXBlIGZvciBVUkxzXG4gICAgICBpZiAodGhpcy5qc29uLmluZGV4T2YoJ2h0dHAnKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmlzVXJsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlzQXJyYXkgPSBBcnJheS5pc0FycmF5KHRoaXMuanNvbik7XG4gICAgdGhpcy5pc09iamVjdCA9IGlzT2JqZWN0KHRoaXMuanNvbik7XG5cbiAgICB0aGlzLmtleXMgPSBbXTtcbiAgICBpZiAodGhpcy5pc09iamVjdCkge1xuICAgICAgdGhpcy5rZXlzID0gT2JqZWN0LmtleXModGhpcy5qc29uKS5tYXAoKGtleSk9PiB7XG4gICAgICAgIGlmIChrZXkgPT09ICcnKSB7IHJldHVybiAnXCJcIic7IH1cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuaXNFbXB0eU9iamVjdCA9ICF0aGlzLmtleXMubGVuZ3RoICYmIHRoaXMuaXNPcGVuICYmICF0aGlzLmlzQXJyYXk7XG4gICAgdGhpcy5vbnN0cnVjdG9yTmFtZSA9IGdldE9iamVjdE5hbWUodGhpcy5qc29uKTtcbiAgICB0aGlzLmlzRW1wdHkgPSB0aGlzLmlzRW1wdHlPYmplY3QgfHwgKHRoaXMua2V5cyAmJlxuICAgICAgIXRoaXMua2V5cy5sZW5ndGggJiZcbiAgICAgIHRoaXMuaXNBcnJheSk7XG5cbiAgICB0aGlzLmdldFZhbHVlUHJldmlldyA9IGdldFZhbHVlUHJldmlldztcbiAgfVxuXG5cblxuICAvKipcbiAgICogVG9nZ2xlcyBgaXNPcGVuYCBzdGF0ZVxuICAgKlxuICAqL1xuICB0b2dnbGVPcGVuKCkge1xuICAgIHRoaXMuaXNPcGVuID0gIXRoaXMuaXNPcGVuO1xuXG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmFwcGVuZENoaWxkZXJuKCk7XG4gICAgfSBlbHNle1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZHJlbigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBpbmxpbmUgcHJldmlld1xuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAqL1xuICBnZXRJbmxpbmVwcmV2aWV3KCkge1xuICAgIGlmICh0aGlzLmlzQXJyYXkpIHtcblxuICAgICAgLy8gaWYgYXJyYXkgbGVuZ3RoIGlzIGdyZWF0ZXIgdGhlbiAxMDAgaXQgc2hvd3MgXCJBcnJheVsxMDFdXCJcbiAgICAgIGlmICh0aGlzLmpzb24ubGVuZ3RoID4gdGhpcy5jb25maWcuaG92ZXJQcmV2aWV3QXJyYXlDb3VudCkge1xuICAgICAgICByZXR1cm4gYEFycmF5WyR7dGhpcy5qc29uLmxlbmd0aH1dYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBgWyR7dGhpcy5qc29uLm1hcChnZXRQcmV2aWV3KS5qb2luKCcsICcpfV1gO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGNvbnN0IGtleXMgPSB0aGlzLmtleXM7XG5cbiAgICAgIC8vIHRoZSBmaXJzdCBmaXZlIGtleXMgKGxpa2UgQ2hyb21lIERldmVsb3BlciBUb29sKVxuICAgICAgY29uc3QgbmFycm93S2V5cyA9IGtleXMuc2xpY2UoMCwgdGhpcy5jb25maWcuaG92ZXJQcmV2aWV3RmllbGRDb3VudCk7XG5cbiAgICAgIC8vIGpzb24gdmFsdWUgc2NoZW1hdGljIGluZm9ybWF0aW9uXG4gICAgICBjb25zdCBrdnMgPSBuYXJyb3dLZXlzLm1hcChrZXkgPT4gYCR7a2V5fToke2dldFByZXZpZXcodGhpcy5qc29uW2tleV0pfWApO1xuXG4gICAgICAvLyBpZiBrZXlzIGNvdW50IGdyZWF0ZXIgdGhlbiA1IHRoZW4gc2hvdyBlbGxpcHNpc1xuICAgICAgY29uc3QgZWxsaXBzaXMgPSBrZXlzLmxlbmd0aCA+PSA1ID8gJ+KApicgOiAnJztcblxuICAgICAgcmV0dXJuIGB7JHtrdnMuam9pbignLCAnKX0ke2VsbGlwc2lzfX1gO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgSFRNTCBzdHJpbmcgIGZvciB0aGlzIEpTT04gYmFzZWQgb24gdGhlIHRlbXBsYXRlXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICovXG4gIHRlbXBsYXRlKCkge1xuXG4gICAgLypcbiAgICAgKiBpZiBjb25kaXRpb24gZm9yIEVTNiB0ZW1wbGF0ZSBzdHJpbmdzXG4gICAgICogdG8gYmUgdXNlZCBvbmx5IGluIHRlbXBsYXRlIHN0cmluZ1xuICAgICAqXG4gICAgICogQGV4YW1wbGUgbXlzdHIgPSBgUmFuZG9tIGlzICR7X2lmKE1hdGgucmFuZG9tKCkgPiAwLjUpYGdyZWF0ZXIgdGhhbiAwLjVgYFxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBjb25kaXRpb25cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gdGhlIHRlbXBsYXRlIGZ1bmN0aW9uXG4gICAgKi9cbiAgICBmdW5jdGlvbiBfaWYoY29uZGl0aW9uKSB7XG4gICAgICByZXR1cm4gY29uZGl0aW9uID8gbm9ybWFsIDogZW1wdHk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVtcHR5KCl7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG5vcm1hbCAodGVtcGxhdGUsIC4uLmV4cHJlc3Npb25zKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGUuc2xpY2UoMSkucmVkdWNlKChhY2N1bXVsYXRvciwgcGFydCwgaSkgPT4ge1xuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3IgKyBleHByZXNzaW9uc1tpXSArIHBhcnQ7XG4gICAgICB9LCB0ZW1wbGF0ZVswXSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGVtcGxhdGVTdHJpbmcgPSBgXG4gICAgICA8YSBjbGFzcz1cInRvZ2dsZXItbGlua1wiPlxuICAgICAgICAke19pZih0aGlzLmlzT2JqZWN0KWBcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInRvZ2dsZXJcIj48L3NwYW4+XG4gICAgICAgIGB9XG5cbiAgICAgICAgJHtfaWYodGhpcy5oYXNLZXkpYFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwia2V5XCI+JHt0aGlzLmtleX06PC9zcGFuPlxuICAgICAgICBgfVxuXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidmFsdWVcIj5cblxuICAgICAgICAgICR7X2lmKHRoaXMuaXNPYmplY3QpYFxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29uc3RydWN0b3ItbmFtZVwiPiR7dGhpcy5vbnN0cnVjdG9yTmFtZX08L3NwYW4+XG5cbiAgICAgICAgICAgICAgJHtfaWYodGhpcy5pc0FycmF5KWBcbiAgICAgICAgICAgICAgICA8c3Bhbj48c3BhbiBjbGFzcz1cImJyYWNrZXRcIj5bPC9zcGFuPjxzcGFuIGNsYXNzPVwibnVtYmVyXCI+JHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuanNvbiAmJiB0aGlzLmpzb24ubGVuZ3RoXG4gICAgICAgICAgICAgICAgfTwvc3Bhbj48c3BhbiBjbGFzcz1cImJyYWNrZXRcIj5dPC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgICAgYH1cblxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIGB9XG5cbiAgICAgICAgICAke19pZighdGhpcy5pc09iamVjdClgXG5cbiAgICAgICAgICAgIDwke3RoaXMuaXNVcmwgPyAnYScgOiAnc3Bhbid9XG4gICAgICAgICAgICAgIGNsYXNzPVwiJHtcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVcbiAgICAgICAgICAgICAgfSAke1xuICAgICAgICAgICAgICAgIF9pZih0aGlzLmlzRGF0ZSlgZGF0ZWBcbiAgICAgICAgICAgICAgfSAke1xuICAgICAgICAgICAgICAgIF9pZih0aGlzLmlzVXJsKWB1cmxgXG4gICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAke19pZih0aGlzLmlzVXJsKWBocmVmPVwiJHt0aGlzLmpzb259XCJgfVxuICAgICAgICAgICAgPiR7dGhpcy5nZXRWYWx1ZVByZXZpZXcodGhpcy5qc29uLCB0aGlzLmpzb24pfTwvJHtcbiAgICAgICAgICAgICAgdGhpcy5pc1VybCA/ICdhJyA6ICdzcGFuJ1xuICAgICAgICAgICAgfT5cblxuICAgICAgICAgIGB9XG5cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICR7X2lmKHRoaXMuY29uZmlnLmhvdmVyUHJldmlld0VuYWJsZWQgJiYgdGhpcy5pc09iamVjdClgXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmV2aWV3LXRleHRcIj4ke3RoaXMuZ2V0SW5saW5lcHJldmlldygpfTwvc3Bhbj5cbiAgICAgICAgYH1cbiAgICAgIDwvYT5cblxuICAgICAgPGRpdiBjbGFzcz1cImNoaWxkcmVuICR7XG4gICAgICAgIF9pZih0aGlzLmlzT2JqZWN0KWBvYmplY3RgXG4gICAgICB9ICR7XG4gICAgICAgIF9pZih0aGlzLmlzQXJyYXkpYGFycmF5YFxuICAgICAgfSAke1xuICAgICAgICBfaWYodGhpcy5pc0VtcHR5KWBlbXB0eWBcbiAgICAgIH1cIj48L2Rpdj5cbiAgICBgO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlU3RyaW5nLnJlcGxhY2UoL1xccypcXG4vZywgJ1xcbicpOyAvLyBjbGVhbiB1cCBlbXB0eSBsaW5lc1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgYW4gSFRNTCBlbGVtZW50IGFuZCBpbnN0YWxscyBldmVudCBsaXN0ZW5lcnNcbiAgICpcbiAgICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fVxuICAqL1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgcmVzdWx0SFRNTCA9IHRoaXMudGVtcGxhdGUoKTtcblxuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdqc29uLWZvcm1hdHRlci1yb3cnKTtcblxuICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy50aGVtZSkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoYGpzb24tZm9ybWF0dGVyLSR7dGhpcy5jb25maWcudGhlbWV9YCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSByZXN1bHRIVE1MO1xuXG4gICAgaWYgKHRoaXMuaXNPYmplY3QgJiYgdGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuYXBwZW5kQ2hpbGRlcm4oKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXIgZm9yIHRvZ2dsaW5nXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EudG9nZ2xlci1saW5rJylcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlT3Blbi5iaW5kKHRoaXMpKTtcblxuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyBhbGwgdGhlIGNoaWxkcmVuIHRvIGA8ZGl2IGNsYXNzPVwiY2hpbGRyZW5cIj48L2Rpdj5gIGVsZW1lbnRcbiAgICpcbiAgKi9cbiAgYXBwZW5kQ2hpbGRlcm4oKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmNoaWxkcmVuJyk7XG5cbiAgICBpZiAoIWNoaWxkcmVuKSB7IHJldHVybjsgfVxuXG4gICAgdGhpcy5rZXlzLmZvckVhY2goKGtleSk9PiB7XG4gICAgICBjb25zdCBmb3JtYXR0ZXIgPSBuZXcgSlNPTkZvcm1hdHRlcihcbiAgICAgICAgdGhpcy5qc29uW2tleV0sIHRoaXMub3BlbiAtIDEsIHRoaXMuY29uZmlnLCBrZXkpO1xuXG4gICAgICBjaGlsZHJlbi5hcHBlbmRDaGlsZChmb3JtYXR0ZXIucmVuZGVyKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIHRoZSBjaGlsZHJlbiBmcm9tIGA8ZGl2IGNsYXNzPVwiY2hpbGRyZW5cIj48L2Rpdj5gIGVsZW1lbnRcbiAgICpcbiAgKi9cbiAgcmVtb3ZlQ2hpbGRyZW4oKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuY2hpbGRyZW4nKSkge1xuICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5jaGlsZHJlbicpLmlubmVySFRNTCA9ICcnO1xuICAgIH1cbiAgfVxufVxuXG4vLyBUT0RPOiBVTURcbndpbmRvdy5KU09ORm9ybWF0dGVyID0gSlNPTkZvcm1hdHRlcjtcbiJdfQ==


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mithril = __webpack_require__(27);
	
	var _mithril2 = _interopRequireDefault(_mithril);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(56);
	
	module.exports = { view: function view() {
	    return (0, _mithril2.default)('.spinner', [(0, _mithril2.default)('.bounce1'), (0, _mithril2.default)('.bounce2'), (0, _mithril2.default)('.bounce3')]);
	  } };

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(57);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(59)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./spinner.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./spinner.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(58)();
	// imports
	
	
	// module
	exports.push([module.id, ".spinner {\n  margin: 100px auto 0;\n  width: 70px;\n  text-align: center;\n}\n\n.spinner > div {\n  width: 18px;\n  height: 18px;\n  background-color: #FC2940;\n\n  border-radius: 100%;\n  display: inline-block;\n  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n  animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n}\n\n.spinner .bounce1 {\n  -webkit-animation-delay: -0.32s;\n  animation-delay: -0.32s;\n}\n\n.spinner .bounce2 {\n  -webkit-animation-delay: -0.16s;\n  animation-delay: -0.16s;\n}\n\n@-webkit-keyframes sk-bouncedelay {\n  0%, 80%, 100% { -webkit-transform: scale(0) }\n  40% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes sk-bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  } 40% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n  }\n}\n", ""]);
	
	// exports


/***/ },
/* 58 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(61);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(59)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./dashboard.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./dashboard.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(58)();
	// imports
	
	
	// module
	exports.push([module.id, ".content {\n  padding: 50px 25px 25px 25px;\n}\n.dashboard h1 { text-transform: uppercase; }\n.dashboard h2 { font-weight: 100; }\n.dashboard h2 > .account { margin-left: 0.5em; font-weight: 600; }\n\n.dashboard ul { list-style: none; display: inline-block; }\n.dashboard ul li { text-align: left; }\n\nul li .label {\n  margin-right: 15px;\n  color: #7B7B7B;\n  font-size: 13px;\n  display: inline-block;\n  min-width: 10em;\n  text-align: right;\n}\nul li .value { font-weight: 600; display: inline; }\n\n.upgrade-plan {\n  margin-left: 15px;\n  font-weight: 100;\n  font-size: 0.8em;\n  background: #FC2940;\n  color: white;\n  padding: 5px 10px;\n  border-radius: 4px;\n  position: relative;\n  top: -2px;\n}\n\n.how-to {\n  margin-top: 40px;\n}\n\n.how-to ul { text-align: center; }\n.how-to ul li .label { min-width: auto; }\n\n\n.jquery-example {\n  display: inline-block;\n  padding: 10px;\n  font-size: 16px;\n  text-align: left;\n}\n\n.jquery-example > pre {\n    padding: 10px 20px;\n    border-radius: 4px;\n}\n", ""]);
	
	// exports


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(63);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(59)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./../../postcss-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./../../postcss-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(58)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!\n * json-formatter-js\n * https://github.com/mohsen1/json-formatter-js#readme\n * Version: 0.2.0 - 2015-10-30T17:24:20.952Z\n * License: MIT\n */\n\n\n.json-formatter-row {\n  font-family: monospace;\n}\n.json-formatter-row,\n.json-formatter-row a,\n.json-formatter-row a:hover {\n  color: black;\n  text-decoration: none;\n}\n.json-formatter-row .json-formatter-row {\n  margin-left: 1rem;\n}\n.json-formatter-row .children.empty {\n  opacity: 0.5;\n  margin-left: 1rem;\n}\n.json-formatter-row .children.empty:after {\n  display: none;\n}\n.json-formatter-row .children.empty.object:after {\n  content: \"No properties\";\n}\n.json-formatter-row .children.empty.array:after {\n  content: \"[]\";\n}\n.json-formatter-row .string {\n  color: green;\n  white-space: pre;\n  word-wrap: break-word;\n}\n.json-formatter-row .number {\n  color: blue;\n}\n.json-formatter-row .boolean {\n  color: red;\n}\n.json-formatter-row .null {\n  color: #855a00;\n}\n.json-formatter-row .undefined {\n  color: #ca0b69;\n}\n.json-formatter-row .function {\n  color: #ff20ed;\n}\n.json-formatter-row .date {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.json-formatter-row .url {\n  text-decoration: underline;\n  color: blue;\n  cursor: pointer;\n}\n.json-formatter-row .bracket {\n  color: blue;\n}\n.json-formatter-row .key {\n  color: #00008b;\n  cursor: pointer;\n}\n.json-formatter-row .constructor-name {\n  cursor: pointer;\n}\n.json-formatter-row .toggler {\n  line-height: 1.2rem;\n  font-size: 0.8em;\n  vertical-align: middle;\n  opacity: 0.6;\n  cursor: pointer;\n}\n.json-formatter-row .toggler:after {\n  display: inline-block;\n  -webkit-transition: -webkit-transform 100ms ease-in;\n  transition: -webkit-transform 100ms ease-in;\n  transition: transform 100ms ease-in;\n  transition: transform 100ms ease-in, -webkit-transform 100ms ease-in;\n  content: \"\\25BA\";\n}\n.json-formatter-row > a > .preview-text {\n  opacity: 0;\n  -webkit-transition: opacity 0.15s ease-in;\n  transition: opacity 0.15s ease-in;\n  font-style: italic;\n}\n.json-formatter-row:hover > a > .preview-text {\n  opacity: 0.6;\n}\n.json-formatter-row.open > .toggler-link .toggler:after {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n.json-formatter-row.open > .children:after {\n  display: inline-block;\n}\n.json-formatter-row.open > a > .preview-text {\n  display: none;\n}\n.json-formatter-dark.json-formatter-row {\n  font-family: monospace;\n}\n.json-formatter-dark.json-formatter-row,\n.json-formatter-dark.json-formatter-row a,\n.json-formatter-dark.json-formatter-row a:hover {\n  color: white;\n  text-decoration: none;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-row {\n  margin-left: 1rem;\n}\n.json-formatter-dark.json-formatter-row .children.empty {\n  opacity: 0.5;\n  margin-left: 1rem;\n}\n.json-formatter-dark.json-formatter-row .children.empty:after {\n  display: none;\n}\n.json-formatter-dark.json-formatter-row .children.empty.object:after {\n  content: \"No properties\";\n}\n.json-formatter-dark.json-formatter-row .children.empty.array:after {\n  content: \"[]\";\n}\n.json-formatter-dark.json-formatter-row .string {\n  color: #31f031;\n  white-space: pre;\n  word-wrap: break-word;\n}\n.json-formatter-dark.json-formatter-row .number {\n  color: #66c2ff;\n}\n.json-formatter-dark.json-formatter-row .boolean {\n  color: #ec4242;\n}\n.json-formatter-dark.json-formatter-row .null {\n  color: #eec97d;\n}\n.json-formatter-dark.json-formatter-row .undefined {\n  color: #ef8fbe;\n}\n.json-formatter-dark.json-formatter-row .function {\n  color: #fd48cb;\n}\n.json-formatter-dark.json-formatter-row .date {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.json-formatter-dark.json-formatter-row .url {\n  text-decoration: underline;\n  color: #027bff;\n  cursor: pointer;\n}\n.json-formatter-dark.json-formatter-row .bracket {\n  color: #9494ff;\n}\n.json-formatter-dark.json-formatter-row .key {\n  color: #23a0db;\n  cursor: pointer;\n}\n.json-formatter-dark.json-formatter-row .constructor-name {\n  cursor: pointer;\n}\n.json-formatter-dark.json-formatter-row .toggler {\n  line-height: 1.2rem;\n  font-size: 0.8em;\n  vertical-align: middle;\n  opacity: 0.6;\n  cursor: pointer;\n}\n.json-formatter-dark.json-formatter-row .toggler:after {\n  display: inline-block;\n  -webkit-transition: -webkit-transform 100ms ease-in;\n  transition: -webkit-transform 100ms ease-in;\n  transition: transform 100ms ease-in;\n  transition: transform 100ms ease-in, -webkit-transform 100ms ease-in;\n  content: \"\\25BA\";\n}\n.json-formatter-dark.json-formatter-row > a > .preview-text {\n  opacity: 0;\n  -webkit-transition: opacity 0.15s ease-in;\n  transition: opacity 0.15s ease-in;\n  font-style: italic;\n}\n.json-formatter-dark.json-formatter-row:hover > a > .preview-text {\n  opacity: 0.6;\n}\n.json-formatter-dark.json-formatter-row.open > .toggler-link .toggler:after {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n.json-formatter-dark.json-formatter-row.open > .children:after {\n  display: inline-block;\n}\n.json-formatter-dark.json-formatter-row.open > a > .preview-text {\n  display: none;\n}\n", ""]);
	
	// exports


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var m = __webpack_require__(27);
	var user = __webpack_require__(49);
	var session = __webpack_require__(1);
	
	var cleanSession = function cleanSession() {
	  return session(null);
	};
	var redirectToHome = function redirectToHome() {
	  return m.route('/');
	};
	var logError = function logError(error) {
	  console.log('Fail when try to logout (' + error + ')');
	};
	
	var logout = {};
	logout.controller = function () {
	  return user.logout().then(cleanSession, logError).then(redirectToHome, logError);
	};
	logout.view = function () {};
	
	module.exports = logout;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map