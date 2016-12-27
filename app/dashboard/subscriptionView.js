const m = require('mithril')

const spinner = require('../ui/spinner').inline
const styles = require('./subscriptionView.css')

const conditions = require('ramda/src/cond')
const collapser = require('../ui/collapsible')
const when = require('../ui/when')
const applyOver = require('../../lib/applyOver')

const { planType, planName, status, isStatus } = require('../backend/subscription.helpers')

const waiting             = subscription => subscription === undefined
const withoutSubscription = subscription => subscription === null
const withSubscription    = subscription => subscription ? true : false

const selector = conditions([
  [ waiting,             () => m(spinner) ],
  [ withoutSubscription, () => {
      return m(`div.${styles.planInfo}`, [
        'without subscription',
        m(`a.${styles.subscriptionBtn}`, { onclick: e => m.route('/change-plan') }, 'change plan')
      ])
  }],
  [ withSubscription, withSubscriptionView ]
])


const either = require('ramda/src/either')
const eq = require('ramda/src/equals')
const pipe = require('ramda/src/pipe')

const isTrial = data => planType(data) === 'trial'
const isNotTrial = data => !isTrial(data)
const isPendingOrActive = either(isStatus('pending'), isStatus('active'))

const cancelBtn  = (data, actions) => m('a.link-small.sm-margin-left', { onclick: actions.cancelCurrentPlan },  'Cancel')
const suspendBtn = (data, actions) => m('a.link-small.sm-margin-left', { onclick: actions.suspendCurrentPlan }, 'Suspend')
const resumeBtn  = (data, actions) => m('a.link-small.sm-margin-left', { onclick: actions.resumeCurrentPlan },  'Resume')

const moreActions = conditions([
  [ isTrial,                () => [] ],
  [ isPendingOrActive,      applyOver([ suspendBtn, cancelBtn ]) ],
  [ isStatus('suspended'),  applyOver([ resumeBtn, cancelBtn ]) ]
])

function withSubscriptionView(data, actions){
  const planDetails = resolveDetailsView(isTrial(data))

  return m(`div.${styles.planInfo}`, [ 
    m('div', [ 
      planName(data), 
      when(isStatus('suspended', data), () => m('span.red.sm-margin-left.sm-font-size ', 'SUSPENDED')),
      when(isStatus('cancelled', data),  () => m('span.red.sm-margin-left.sm-font-size ', 'CANCELED'))
    ]),
    m(planDetails, planDetails.vm(data)),
    m(`a.${styles.subscriptionBtn}`, { onclick: e => m.route('/change-plan') }, 'change plan'),
    moreActions(data, actions)
  ])
}

const resolveDetailsView = isTrial => {
  return isTrial ? require('./subscription/trial') : require('./subscription/paydPlan')
}


function view(_, { actions, currentSubscription }){ 
  return selector(currentSubscription, actions)
}

module.exports = { view }