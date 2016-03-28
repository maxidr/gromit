import merge from 'ramda/src/merge'
import pipe from 'ramda/src/pipe'

const STORAGE_ID = 'gromit.session'

function get(){
	const session = localStorage.getItem(STORAGE_ID);
	return session ? JSON.parse(session) : null;
}

const saveInStorage = localStorage.setItem.bind(localStorage, STORAGE_ID)
const update = pipe(merge, JSON.stringify, saveInStorage)

function set(newData){
	update(get() || {}, newData)
}

const clean = localStorage.removeItem.bind(localStorage, STORAGE_ID)

/*
	currentUser({ key: value })  // Set or update values
	currentUser(null)  					 // Clear session
	currentUser() 							 // Get current user object
*/
module.exports = function currentUser(params){
	if( params ){ set(params); return null; }
	if( params === null ){ clean(); return null; }
	if( params === undefined ){ return get(); }
};
