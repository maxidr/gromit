import backend from '../backend/users'
import editableList from './editableList'
const reject = require('ramda/src/reject')
const eq = require('ramda/src/equals')


const IP_SEGMENT = "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)"
const IP_REGEX = new RegExp(`^${IP_SEGMENT}\.${IP_SEGMENT}\.${IP_SEGMENT}\.${IP_SEGMENT}$`)

export default function(user){
	return editableList({
		title: 'IP configured list',
		//explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et faucibus metus. Donec pulvinar varius nisl, ac feugiat magna vestibulum eu. Nunc tincidunt scelerisque nibh vel bibendum. Curabitur ipsum dolor, ornare id elit id, varius efficitur nunc. Sed ut velit turpis. Nulla eget rutrum nulla, vel viverra dolor. Phasellus aliquet finibus imperdiet. Fusce tellus nunc, tempus sit amet massa in, malesuada congue risus.,',
		explanation: "Filter request by Ipv4 or Ipv6. You can still use mask if you want. Ex. 192.0.0.0, 192.0.0.0/24, 2001:0db8:85a3:0000:0000:8a2e:0370:7334, 2001:0db8:85a3:0000:0000:8a2e:0370:7334/112",
		itemName: 'trusted IP',
		inputPlaceholder: 'Enter an IP',

		validateInput: maybeIP => IP_REGEX.test(maybeIP) ? null : 'Invalid IP',

		onAddItem: item => {
			if( ! user().ipList ){ user().ipList = [] }
			user().ipList.push(item)
			return backend.update(user())
		},

		onRemoveItem: item => {
			user().ipList = reject(eq(item), user().ipList)
			return backend.update(user())
		}
	})
}

