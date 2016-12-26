const m = require('mithril')

const equals = require('ramda/src/equals')
const conditions = require('ramda/src/cond')
const memoize = require('ramda/src/memoize')
const path = require('ramda/src/path')
const pipe = require('ramda/src/pipe')
const pathOr = require('ramda/src/pathOr')

const differenceInDays = require('date-fns/difference_in_days')
const addDays = require('date-fns/add_days')

const TRIAL_TERM_DAYS = 30
const usageLimit = pathOr(0, ['projectPlan', 'usageLimit'])
const creationDate = memoize(pipe(path(['subscription', 'createdTime']), timestamp => new Date(timestamp)))

function remainingDays(endDate){
  return differenceInDays(endDate, new Date())
}

const lessThan = reference => amount => amount < reference
const moreThan = reference => amount => amount > reference

const remainingTimeMessage = conditions([
  [ lessThan(-1),  days => `finished ${days * -1} days ago` ],
  [ equals(-1),    () => 'finished yesterday' ],
  [ equals(0),     () => 'Will be finished today' ],
  [ equals(1),     () => 'Remaining 1 day' ],
  [ moreThan(1),   days => `Remaining ${days} days` ]
])

module.exports = { view, mapViewModel }

function mapViewModel(data){
  return {
    startedAt: creationDate(data).toLocaleDateString(),
    remainingDays: pipe(creationDate, date => addDays(date, TRIAL_TERM_DAYS), remainingDays)(data),
    usageLimit: usageLimit(data).toLocaleString()
  }
}

function view(vm){
  return [
    m('ol.plan-details', [
      m('li', `Started on ${vm.startedAt}`),
      m('li', remainingTimeMessage(vm.remainingDays)),
      m('li', `Usage limit: ${vm.usageLimit} request by month`)
    ])
  ]
}