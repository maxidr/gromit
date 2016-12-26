const m = require('mithril')

const spinner = require('../ui/spinner').inline
const styles = require('./subscriptionView.css')

const conditions = require('ramda/src/cond')


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

function withSubscriptionView(data){
  const { view, viewModel } = resolveDetailsView(data.projectPlan.type)

  return m(`div.${styles.planInfo}`, [ 
    m('div', data.projectPlan.name),
    view(viewModel(data)),
    m(`a.${styles.subscriptionBtn}`, { onclick: e => m.route('/change-plan') }, 'change plan')
  ])
}

const resolveDetailsView = planType => {
  return planType === 'trial' ? require('./subscription/trial') : require('./subscription/paydPlan')
}


function view(_, subscription){ 
  return selector(subscription)
}

module.exports = { view }