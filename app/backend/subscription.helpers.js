const equals = require('ramda/src/equals')

const memoize = require('ramda/src/memoize')
const path = require('ramda/src/path')
const pipe = require('ramda/src/pipe')
const pathOr = require('ramda/src/pathOr')
const addDays = require('date-fns/add_days')
const differenceInDays = require('date-fns/difference_in_days')

const TRIAL_TERM_DAYS = 30

const remainingDays = endDate => differenceInDays(endDate, new Date())
const creationDate = memoize(pipe(path(['subscription', 'createdTime']), timestamp => new Date(timestamp)))


/**
 * Subscription map helpers
 */
module.exports = {
  usageLimit: pathOr(0, ['projectPlan', 'usageLimit']),
  /**
   * [description]
   * @param  {Subscription} subscription 
   * @return {Date}
   */
  creationDate,
  amount: pathOr(0, ['projectPlan', 'amount']),
  currency: pathOr(null, ['projectPlan', 'currency']),
  period: pathOr('month', ['projectPlan', 'period']),
  isPending: pipe(pathOr(null, ['subscription', 'status']), equals('pending')),
  approveUrl: pathOr(null, ['subscription', 'approveUrl']),
  remainingDays: pipe(creationDate, date => addDays(date, TRIAL_TERM_DAYS), remainingDays),
  planType: pathOr(null, ['projectPlan', 'type']),
  planName: pathOr(null, ['projectPlan', 'name'])
}