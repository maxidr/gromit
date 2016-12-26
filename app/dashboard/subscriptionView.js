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
  const view = subscriptionTypeView[data.projectPlan.type]
  const vm = subscriptionTypeViewModelMap[data.projectPlan.type]
  return m(`div.${styles.planInfo}`, [ 
    m('div', data.projectPlan.name),
    view(vm(data)),
    m(`a.${styles.subscriptionBtn}`, { onclick: e => m.route('/change-plan') }, 'change plan')
    //new Date(data.subscription.createdTime)
    //toLocaleDateString
    //data.projectPlan.type === 'trial'
  ])
}


const subscriptionTypeViewModelMap = {
  trial: require('./subscription/trial').mapViewModel
}

const subscriptionTypeView = {
  trial: require('./subscription/trial').view
}


function view(_, subscription){ 
  return selector(subscription)
}

module.exports = { view }