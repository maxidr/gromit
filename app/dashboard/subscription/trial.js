const m = require('mithril')

const { usageLimit, creationDate, remainingDays } = require('../../backend/subscription.helpers')

const equals = require('ramda/src/equals')
const conditions = require('ramda/src/cond')

const lessThan = reference => amount => amount < reference
const moreThan = reference => amount => amount > reference

const remainingTimeMessage = conditions([
  [ lessThan(-1),  days => `finished ${days * -1} days ago` ],
  [ equals(-1),    () => 'finished yesterday' ],
  [ equals(0),     () => 'Will be finished today' ],
  [ equals(1),     () => 'Remaining 1 day' ],
  [ moreThan(1),   days => `Remaining ${days} days` ]
])

module.exports = { view, vm }

function vm(data){
  return {
    startedAt: creationDate(data).toLocaleDateString(),
    remainingDays: remainingDays(data),
    usageLimit: usageLimit(data).toLocaleString()
  }
}

function view(_, vm){
  return m('ol.plan-details', [
    m('li', `Started on ${vm.startedAt}`),
    m('li', remainingTimeMessage(vm.remainingDays)),
    m('li', `Usage limit: ${vm.usageLimit} request by month`)
  ])
}