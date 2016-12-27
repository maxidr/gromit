const m = require('mithril')
const styles = require('../subscriptionView.css')

const { 
  usageLimit, creationDate, amount, currency, 
  period, isStatus, approveUrl 
} = require('../../backend/subscription.helpers')

const price = data => `${amount(data).toLocaleString()} ${currency(data)} by ${period(data)}`

function vm(data){
  return {
    startedAt: creationDate(data).toLocaleDateString(),
    usageLimit: usageLimit(data).toLocaleString(),
    price: price(data),
    isPending: isStatus('pending', data),
    approveUrl: approveUrl(data)
  }
}

function view(_, vm){
  return m('ol.plan-details', [
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
}

module.exports = { view, vm }

