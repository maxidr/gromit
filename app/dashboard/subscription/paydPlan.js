const m = require('mithril')
const styles = require('../subscriptionView.css')

const pathOr = require('ramda/src/pathOr')
const path = require('ramda/src/path')
const pipe = require('ramda/src/pipe')
const memoize = require('ramda/src/memoize')
const equals = require('ramda/src/equals')

const usageLimit = pathOr(0, ['projectPlan', 'usageLimit'])
const amount = pathOr(0, ['projectPlan', 'amount'])
const currency = path(['projectPlan', 'currency'])
const period = pathOr('month', ['projectPlan', 'period'])

const creationDate = memoize(pipe(path(['subscription', 'createdTime']), timestamp => new Date(timestamp)))
const price = data => `${amount(data).toLocaleString()} ${currency(data)} by ${period(data)}`
const isPending = pipe(path(['subscription', 'status']), equals('pending'))
const approveUrl = path(['subscription', 'approveUrl'])

function viewModel(data){
  return {
    startedAt: creationDate(data).toLocaleDateString(),
    usageLimit: usageLimit(data).toLocaleString(),
    price: price(data),
    isPending: isPending(data),
    approveUrl: approveUrl(data)
  }
}

function view(vm){
  return [
    m('ol.plan-details', [
      m('li', `Started on ${vm.startedAt}`),
      m('li', vm.price),
      m('li', `Limited to ${vm.usageLimit} request by month`),
      vm.isPending 
        ? m('li', [
            'This plan is ',
            m('strong', 'awaiting your aprovation '),
            m('a', { class: styles.subscriptionBtn, 
              onclick: e => window.location = vm.approveUrl 
            }, 'Aprove the plan')
          ]) 
        : ''
    ])
  ]
}

module.exports = { view, viewModel }

