const request = require('./request')

/**
 * @typedef {Object} Plan
 * @property {string} paymentGateway
 * @property {string} paymentGatewayId
 * @property {string} name
 * @property {string} description
 * @property {string} amount
 * @property {string} currency
 * @property {string} period
 * @property {number} usageLimit
 * @property {string} type
 */

module.exports = {
  current: () => request('GET', '/users/current/subcription'),
  /**
   * Fetch all the available plans
   * @return {Promise} A promise that returns a {@type Plan[]} if resolved
   */
  plans: () => request('GET', '/users/plans')
}



