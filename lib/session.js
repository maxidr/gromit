"use strict";

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

module.exports = function(param){
	if( param === null ){ session = null; return null }
	if( param ){ return update(session || {}, param) }
	return session
}
