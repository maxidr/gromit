const merge = require('ramda/src/merge');
const pipe = require('ramda/src/pipe');

const STORAGE_ID = 'gromit.session'
let session = fetchFromStorage();

function fetchFromStorage(){
	const inStorage = localStorage.getItem(STORAGE_ID);
	return inStorage ? JSON.parse(inStorage) : null;
}

const setInStorage = localStorage.setItem.bind(localStorage, STORAGE_ID)
const parseAndStore = pipe(JSON.stringify, setInStorage)
const setSession = (newValue) => session = newValue
const getSession = () => session
const update = pipe(merge, setSession, parseAndStore, getSession)
const clean = () => {
	session = null;
	localStorage.clear();
	return session;
}

/**
 * Control your session
 * @param  {Object|null|undefined} param - when the param is an Object then save in session. If null then clean the session
 *                                       and if not apply param the functin returns the value of the session
 * @return {Object} the session object
 */
module.exports = function(param){
	if( param === null ){ return clean() }
	if( param ){ return update(session || {}, param) }
	return session
}
