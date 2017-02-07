import backend from '../backend/users'
import editableList from './editableList'

const reject = require('ramda/src/reject')
const eq = require('ramda/src/equals')


/*
(function mock(){
	const originalReq = m.request
	m.request = (...attrs) => {
		const conf = attrs[0]
		if( conf.method !== 'PUT' ){ return originalReq.apply(null, attrs) }
		const deferred = m.deferred();
		setTimeout(function() {
			deferred.resolve(conf.data);
		}, 3000);
		return deferred.promise;
	}
})();
*/

const URL_REGEX = /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/;


export default function(user){
	return editableList({
		title: 'Origin configured list',
		//explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et faucibus metus. Donec pulvinar varius nisl, ac feugiat magna vestibulum eu. Nunc tincidunt scelerisque nibh vel bibendum. Curabitur ipsum dolor, ornare id elit id, varius efficitur nunc. Sed ut velit turpis. Nulla eget rutrum nulla, vel viverra dolor. Phasellus aliquet finibus imperdiet. Fusce tellus nunc, tempus sit amet massa in, malesuada congue risus.,',
		explanation: "All request where it's Origin header ends with any string on this list will be allowed. So if you add example.com the headers example.com and subdomain.example.com would be allowed",
		itemName: 'Origin URL',
		inputPlaceholder: 'Enter an URL',

		//validateInput: maybeUrl => URL_REGEX.test(maybeUrl) ? null : 'Invalid URL',
		validateInput: maybeUrl => null,
		
		onAddItem: item => {
			if( ! user().originList ){ user().originList = [] }
			user().originList.push(item)
			return backend.update(user())
		},

		onRemoveItem: item => {
			const u = user()
			u.originList = reject(eq(item), u.originList)
			return backend.update(u)
		}
	})
}

