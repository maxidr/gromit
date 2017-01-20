/**
	Handle the backend (API) comunication
	
	[API user model](https://bitbucket.org/gromit-io/domain/src/3f1bba540e3ae7c3c19a52d45d15fb577d4a58b8/src/main/java/io/gromit/domain/AppUser.java?at=master&fileviewer=file-view-default)
*/
const request = require('./request')

const usernameAndPassword = (user) => ({ data: { username: user.email(), password: user.password() }})
const emailAndPassword = user => ({ data: { email: user.email(), password: user.password() }})


const users = module.exports = {}

users.login          = user => request('POST', '/users/token', usernameAndPassword(user))
users.register       = user => request('POST', '/users/signUp', { data: { email: user.email(), password: user.password() }})
users.registerByCode = code => request('GET', `/users/signUp?c=${code}`)
users.resetPassword  = user => request('POST', '/users/reset', emailAndPassword(user))
users.logout         = user => request('DELETE', '/users/current')
users.update 				 = user => request('PUT', '/users/current', { data: user })
users.fetch          = () => {
	return request('GET', '/users/current', { background: true })
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
}
