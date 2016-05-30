import m from 'mithril';
const user = require('./backend/users')
const spinner = require('../ui/spinner')
require('../css/dashboard.css')
//const JSONFormatter = require('json-formatter-js/src/index.js')
//const JSONFormatter = require('json-formatter-js')
//import JSONFormatter from 'json-formatter-js'
//require('json-formatter-js/dist/style.css')

const dashboard = {}

dashboard.controller = function() {
  const ctrl = this
  ctrl.user = m.prop()
  user.fetch().then(function(user){
    console.log('user: ' + user)
    ctrl.user(user)
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
function jqueryExample(){
  return m('.jquery-example', [
    m.trust('<pre style="background:#0c1021;color:#f8f8f8">' +
            '<span style="color:#fbde2d">$</span>.get(<span style="color:#61ce3c">' +
            'https://zpevg.gromit.io/api' + '</span>).then(<span style="color:#fbde2d">function</span>(response){' +
            "<span style='display: block; padding-left: 2em;'>" +
            '<span style="color:#ff6400;">console</span><span style="color:#8da6ce">.log</span>(response.<span style="color:#8da6ce">location</span>.country.<span style="color:#8da6ce">name</span>)' +
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
      m('li', [ m('.label', 'Endpoint'), m('.value', 'https://' + user.projectKey + '.gromit.io/api') ])
    ),
    m('.examples', [
      jqueryExample()
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

dashboard.view = (ctrl) => {
  return m('.fullscreen-content', [
    header(),
    m('.content.dashboard',[
      ctrl.user() ? renderInfo(ctrl.user()) : m(spinner)
    ])
  ])
}


export default dashboard;
