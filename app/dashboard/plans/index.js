const m = require('mithril')
const fetchPlans = require('../../backend/subscriptions').plans
const spinner = require('../../ui/spinner').inline
require('./styles.css')

const header = () => m('header.header-primary', [
  m('.container', [
    m('.logo', [ 'Gromit', m('b', '.io') ]),
    m('ul.menu', [
      m('li', m('a[href="/logout"]', { config: m.route }, 'Logout'))
    ])
  ])
])



function showListOfPlans(plans){
  return m('.columns', 
    plans.map(plan => m('.column',
      m('ul.plan-block',[
        m('li.header', plan.name),
        m('li.price', `${plan.amount} ${plan.currency}`),
        m('li', plan.usageLimit.toLocaleString() + ' of hits by month'),
        m('li.grey', 
          m('.btn', 'Sign Up')
        )
      ])
    ))
  )
}

function controller(){
  const plans = m.prop()

  fetchPlans().then(plans)

  return plans
}

function view(plans){
  return m('.fullscreen-content', [
    header(),
    m('.content',[
      m('h1', 'Plans'),
      m('a.link', { onclick: () => m.route('/') },'Back to the dashboard'),
      plans() ? showListOfPlans(plans()) : m(spinner)
    ])
  ])
}


module.exports = { view, controller }