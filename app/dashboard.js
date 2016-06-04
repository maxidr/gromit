import m from 'mithril';
const user = require('./backend/users')
const session = require('../lib/session')
const spinner = require('../ui/spinner')
const Clipboard = require('clipboard')

require('../css/dashboard.css')
//const JSONFormatter = require('json-formatter-js/src/index.js')
//const JSONFormatter = require('json-formatter-js')
//import JSONFormatter from 'json-formatter-js'
//require('json-formatter-js/dist/style.css')

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
  const ctrl = this

  ctrl.user = m.prop()

  m.startComputation();
  user.fetch().then(function(user){
    console.log(user)
    ctrl.user(user)
    m.endComputation();
  }).catch(function(){
    session(null)
    m.route('/');
  })
}

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
function jqueryExample(key){
  return m('.jquery-example', [
    m.trust('<pre style="background:#0c1021;color:#f8f8f8">' +
            '<span style="color:#fbde2d">$</span>.get(<span style="color:#61ce3c">' +
            '"https://' + key + '.gromit.io/api"' + '</span>).then(<span style="color:#fbde2d">function</span>(response){' +
            "<span style='display: block; padding-left: 2em;'>" +
            '<span style="color:#ff6400;">console</span><span style="color:#8da6ce">.log</span>(response.<span style="color:#8da6ce">location</span>)' +
            '</span>' +
            "<span style='display: block'>})</span>" +
            "</pre>"),
    //m('.json-result', { config: renderJSON })
  ])
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

const renderInfo = (user) => [
  m('h2', [ 'Welcome', m('span.account', user.email) ]),
  /*
  m('dl', [
    m('dt', 'Your key'), m('dd', user.projectKey),
    m('dt', 'Plan'), m('dd', [ user.plan, m('a.upgrade-plan', 'Upgrade your plan') ]),
    m('dt', 'Already used'), m('dd', formatNumber(user.usages, '.'))
  ]),
  */
  m('ul', [
    m('li', [ m('.label', 'Your key'), m('.value', user.projectKey) ]),
    m('li', [ m('.label', 'Plan'), m('.value', [
      user.plan, m('a.upgrade-plan', 'Upgrade your plan') ])
    ]),
    m('li', [ m('.label', 'Already used'), m('.value', formatNumber(user.usages, '.')) ])
  ]),
  m('.how-to', [
    m('h2', 'How to use your API'),
    m('ul',
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
    ])
  ])
]

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

dashboard.view = (ctrl) => {
  return m('.fullscreen-content', { config: loadClipboard }, [
    header(),
    m('.content.dashboard',[
      ctrl.user() ? renderInfo(ctrl.user()) : m(spinner)
    ])
  ])
}


export default dashboard;
