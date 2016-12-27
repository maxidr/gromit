const m = require('mithril')
const { plans: fetchPlans, subscribe } = require('../backend/subscriptions')
const spinner = require('../ui/spinner')
const overlay = require('../ui/overlay')
const session = require('../../lib/session')
const when = require('../ui/when')
const both = require('ramda/src/both')

const fetchCurrentSubscription = require('../backend/subscriptions').current
const isStatus = require('../backend/subscription.helpers').isStatus

require('./styles.css')

const isNotCancelled = subscription => isStatus('cancelled', subscription)
const areSameType = both(
  isNotCancelled,
  // compare types
  (one, another) => one.type === another.type
)

function showListOfPlans(plans, subscription, changePlan){
  return m('.columns', 
    plans.map(plan => m('.column',
      m('ul.plan-block', { class: areSameType(subscription, plan) ? 'subscribed' : '' }, [
        m('li.header', plan.name),
        m('li.price', `${plan.amount} ${plan.currency}`),
        m('li', plan.usageLimit.toLocaleString() + ' of hits by month'),
        m('li.grey',
          areSameType(subscription, plan)
          ? m('.subscribed-hint', 'You are subscribed to this plan')
          : m('.btn', { onclick: () => changePlan(plan) }, 'Sign Up')
        )
      ])
    ))
  )
}

function controller(){
  const plans = m.prop()
  const showSpinner = m.prop(false)
  const subscription = m.prop(session().subscription)

  const changePlan = plan => {
    showSpinner(true)
    m.redraw()
    subscribe(plan.paymentGatewayId)
      .then(response => window.location = response.subscription.approveUrl)
  }

  (function init(){
    const reject = require('ramda/src/reject')
    const isNil = require('ramda/src/isNil')
    const pipe = require('ramda/src/pipe')
    const compact = reject(isNil)

    pipe(compact, m.sync)([
      fetchPlans(),
      subscription() ? null : fetchCurrentSubscription()
    ])
    .then(responses => {
      const [ plansResponse, maybeSubscription ] = responses
      plans(plansResponse)
      if( maybeSubscription ) subscription({ type: maybeSubscription.projectPlan.type })
    })
    .then(m.redraw)
  })()

  return { showSpinner, plans, changePlan, subscription }
}


function view({ showSpinner, plans, changePlan, subscription }){
  return m('div',[
    when(showSpinner(), () => m(overlay)),
    m('h1', 'Plans'),
    m('a.link.', { onclick: () => m.route('/') },'Back to the dashboard'),
    plans() ? showListOfPlans(plans(), subscription() || {}, changePlan) : m(spinner.inline)
  ])
}

module.exports = { view, controller }