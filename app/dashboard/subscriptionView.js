const m = require('mithril')
const conditions = require('ramda/src/cond')
const spinner = require('../ui/spinner').inline
const styles = require('./subscriptionView.css')

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
  [ withSubscription,    () => m(`div.${styles.planInfo}`, 'Show the subscription info')]
])

function view(_, subscription){ 
  return selector(subscription)
}

module.exports = { view }