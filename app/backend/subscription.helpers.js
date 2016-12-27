const equals = require('ramda/src/equals')

const memoize = require('ramda/src/memoize')
const path = require('ramda/src/path')
const pipe = require('ramda/src/pipe')
const pathOr = require('ramda/src/pathOr')
const uncurryN = require('ramda/src/uncurryN')
const addDays = require('date-fns/add_days')
const differenceInDays = require('date-fns/difference_in_days')

const TRIAL_TERM_DAYS = 30

const remainingDays = endDate => differenceInDays(endDate, new Date())
const creationDate = memoize(pipe(path(['subscription', 'createdTime']), timestamp => new Date(timestamp)))

const status = pathOr(null, ['subscription', 'status'])
/**
 * Check if the status have a particular value
 * @param  {string} type - the status type 
 * @param  {Object} subscription object
 * @return {boolean}
 *
 * const partialResponse = { subscription: { status: 'pending' } }
 * isStatus('pending', partialResponse)
 * isStatus('pending')(partialRespnse) // Can use the curry version
 * 
 */
const isStatus = uncurryN(2, type => pipe(status, equals(type)))

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
  status,
  isStatus,
  approveUrl: pathOr(null, ['subscription', 'approveUrl']),
  remainingDays: pipe(creationDate, date => addDays(date, TRIAL_TERM_DAYS), remainingDays),
  planType: pathOr(null, ['projectPlan', 'type']),
  planName: pathOr(null, ['projectPlan', 'name'])
}