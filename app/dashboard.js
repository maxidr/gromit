import m from 'mithril';
const user = require('./backend/users')
const subscriptions = require('./backend/subscriptions')
const subscriptionView = require('./dashboard/subscriptionView')

const session = require('../lib/session')
import { page as spinner } from './ui/spinner'
const Clipboard = require('clipboard')

const when = require('ramda/src/when')
const identity = require('ramda/src/identity')

import originListView from './dashboard/originListView'
import ipListView from './dashboard/ipListView'
//require('../css/dashboard.css')
require('./dashboard.css')

import JSONFormatter from 'json-formatter-js'


m.deferred.onerror = function(e) {
	const { message, stack } = e || {}
	if( message ){ 
		console.error("Error: " + message)
		console.error(stack)
	}
	return e
}


const dashboard = {}

const copyToClipboardClicked = (() => {
	let copyToClipboardClicked = false;

	return (...args) => {
		if( args.length === 0 ){ return copyToClipboardClicked }
		copyToClipboardClicked = args[0];
		if( copyToClipboardClicked ){
			setTimeout(() => {
				copyToClipboardClicked = false; m.redraw()
			}, 3000)
		}
	}
})()



dashboard.controller = function() {
	const ctrl = {}

	ctrl.user = m.prop()
	ctrl.subscription = m.prop()

	ctrl.serviceResponse = m.prop()
	ctrl.originListView = originListView(ctrl.user)
	ctrl.ipListView = ipListView(ctrl.user)

	user.fetch()
		.then(ctrl.user)
		.then(m.redraw)
		.catch(() => {
			console.log('Fetch user fails, redirect to home /');
			session(null)
			m.route('/')
		})
		.then(() => {
			subscriptions.current()
				.then(ctrl.subscription)
				.catch(() => ctrl.subscription(null))
		})
		.then(() => {
			const user = ctrl.user()
			return m.request({ 
					method: 'GET', url: 'https://' + user.projectKey + '.gromit.io/api', background: true
				})
				.then(ctrl.serviceResponse)
				.then(m.redraw)
				.catch(() => {
					console.error("Fail when try to use the api with the user's key")
				})
		})
		/*
		// TODO: Si el request GET falla, el dashboard debería funcionar de todos modos
		.then(user => {
			return m.request({ method: 'GET', url: 'https://' + user.projectKey + '.gromit.io/api', background: true })
				.then(ctrl.serviceResponse)
				.then(m.endComputation)
		}).catch(function(){
			console.log('Fetch user fails, redirect to home /');
			session(null)
			m.endComputation()
			m.route('/')
		})
		*/

	return ctrl
}

//const json = {"client":{"userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36","browser":{"family":"Chrome","major":"49","minor":"0","patch":"2623"},"os":{"family":"Mac OS X","major":"10","minor":"11","patch":"4"},"device":{"family":"Other"}},"location":{"ip":"8.8.8.8","latitude":37.3845,"longitude":-122.0881,"timeZone":{"countryIso":"US","id":"America/Los_Angeles","janOffset":-8.0,"julOffset":-7.0,"rawOffset":-8.0},"subdivisions":[{"name":"California","geonNameId":5332921},{"name":"Santa Clara County","geonNameId":5393021}],"country":{"area":9629091,"capital":"Washington","currencyCode":"USD","currencyName":"Dollar","language":"en-US","name":"United States","phone":"1","population":310232863,"iso":"US","geoNameId":6252001},"continent":{"geonameId":6255149,"iso":"NA","name":"North America"},"city":{"name":"Mountain View","geoNameId":5375480,"population":74066}}};

function renderJSON(json){
	return function(element, initialize){
		if( ! initialize ){
			var jsonFormat = new JSONFormatter(json, 2, {
				theme: 'dark'
			})
			element.appendChild(jsonFormat.render())
		}
	}
}


// FROM http://markup.su/highlighter/
function jqueryExample(key){
	return m('.jquery-example', [
		m.trust('<pre style="background:#0c1021;color:#f8f8f8">' +
						'<span style="color:#fbde2d">$</span>.get(<span style="color:#61ce3c">' +
						'"https://' + key + '.gromit.io/api"' + '</span>).then(<span style="color:#fbde2d">function</span>(response){' +
						"<span style='display: block; padding-left: 2em;'>" +
						'<span style="color:#ff6400;">console</span><span style="color:#8da6ce">.log</span>(response.<span style="color:#8da6ce">location</span>)' +
						'</span>' +
						"<span style='display: block'>})</span>" +
						"</pre>")
	])
}

/*
const tabs = (contents) => m('.tabs',
	contents.map((content, index) => m('.tab', [
		m('input[type=radio]' + (content.visible ? '[checked=checked]' : '' ),
			{ name: 'tab-groups', id: 'tab-' + index }),
		m('label.tab__label', { for: 'tab-' + index }, content.title),
		m('.tab__content', content.body)
	]))
)
*/
const tabs = contents => m('.tabs',
	contents.map((content, index) => [
		m('input[type=radio]' + (content.visible ? '[checked=checked]' : '' ), { name: 'tab-groups', id: 'tab-' + index }),
		m('section', [
			m('h1', m('label', { for: 'tab-' + index }, content.title)),
			m('div', content.body)
		])
	])
)

const examplesView = ( user, serviceResponse ) => m('.how-to', [
	m('h2.how-to__title', 'How to use your API'),
	m('ul.how-to__list',
		m('li', [
			m('.label', 'Endpoint'),
			m('.value', 'https://' + user.projectKey + '.gromit.io/api'),
			m('a.copy-to-clipboard', {
					'data-clipboard-text': 'https://' + user.projectKey + '.gromit.io/api',
					 class: (copyToClipboardClicked() ? 'pulsate' : '') },
				copyToClipboardClicked() ? 'copied!' : 'copy to clipboard')
		])
	),
	m('.examples', [
		jqueryExample(user.projectKey)
	]),
	m('form', { action: 'https://jsbin.com?js,console', method: 'POST', target: '_blank' }, [
		m('input[type=hidden]', { name: 'javascript', value: '$.get("https://' + user.projectKey + '.gromit.io/api").then(function(response){\n\tconsole.log(response.location)\n})' }),
		m('input[type=hidden]', { name: 'html', value: '<!DOCTYPE html>\n<html>\n<head>\n<script src="https://code.jquery.com/jquery-2.1.4.js"></script>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width">\n<title>JS Bin</title>\n</head>\n<body>\n</body>\n</html>' }),
		m('button[type=submit].btn', 'Show in JSBin')
	]),
	when(identity, 
		() => m('.json-result', [
			m('h2.result-example', 'Service response example'),
			m('div', { config: renderJSON(serviceResponse) })
		])(serviceResponse)
	)
	
])


const renderInfo = ctrl => {
	const user = ctrl.user()
	const serviceResponse = ctrl.serviceResponse()
	const originListView = ctrl.originListView
	const ipListView = ctrl.ipListView
	return [
		m('h2', [ 'Welcome', m('span.account', user.email) ]),
		m('ul.config-list', [
			m('li', [ m('.label', 'Your key'), m('.value', user.projectKey) ]),
			//m('li', [ m('.label', 'Plan'), m('.value', user.plan) ]),//[ user.plan, m('a.upgrade-plan', 'Upgrade your plan') ])
			m('li', [ 
				m('.label', 'Plan'), 
				m('.value',
					m(subscriptionView, ctrl.subscription())
				) 
			]),
			m('li', [ m('.label', 'Already used'), m('.value', formatNumber(user.usages, '.')) ])
		]),
		tabs([
			{
				title: 'Examples',
				visible: true,
				body: examplesView(user, serviceResponse)
			},{
				title: 'Origin list',
				body: originListView(user.originList)
			},{
				title: 'IP list',
				body: ipListView(user.ipList)
			}
		])
	]
}

function formatNumber(number, separator) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

const header = () => m('header.header-primary', [
	m('.container', [
		m('.logo', [ 'Gromit', m('b', '.io') ]),
		m('ul.menu', [
			m('li', m('a[href="/logout"]', { config: m.route }, 'Logout'))
		])
	])
])

function loadClipboard(element, isInitialized){
	if( ! isInitialized ){
		const clipboard = new Clipboard('.copy-to-clipboard');
		clipboard.on('success', function(){
			copyToClipboardClicked(true)
			m.redraw()
		})
	}
}

dashboard.view = ctrl => m('.dashboard.txt-ac', { config: loadClipboard }, [
	ctrl.user() ? renderInfo(ctrl) : m(spinner)
])



export default dashboard;
