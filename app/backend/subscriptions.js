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
  /**
   *
   *  Response example:
   *  
   *   {
   *     "projectPlan": {
   *       "paymentGateway": "custom",
   *       "paymentGatewayId": "e97f69af-1b38-43ce-b529-cd84b26fcd39",
   *       "name": "Gromit Trial",
   *       "description": "Gromit Trial Subscription",
   *       "amount": "0.00",
   *       "currency": "USD",
   *       "period": "month",
   *       "usageLimit": 50000,
   *       "type": "trial"
   *     },
   *     "subscription": {
   *       "subscriptionId": "dqoapojgwv",
   *       "userId": "6ee5875fcf432cb07691c827b92bc4a6",
   *       "status": "active",
   *       "createdTime": 1482330650785,
   *       "updatedTime": 1482331039026,
   *       "usageLimit": 50000,
   *       "paymentGateway": "custom",
   *       "paymentGatewayId": "e97f69af-1b38-43ce-b529-cd84b26fcd39",
   *       "plan": "trial"
   *     }
   *   }
   *
   *  In some cases can be present the 'pendingSubscription' with:
   *  
   *    "pendingSubscription": {
   *       "projectPlan": {
   *         "paymentGateway": "paypal",
   *         "paymentGatewayId": "EC-4JX77144582851244",
   *         "name": "Gromit Bronze",
   *         "description": "Gromit Bronze monthly Subscription",
   *         "amount": "9.99",
   *         "currency": "USD",
   *         "period": "month",
   *         "usageLimit": 1000000,
   *         "type": "bronze"
   *       },
   *       "subscription": {
   *         "subscriptionId": "nzexgwmgqv",
   *         "userId": "6ee5875fcf432cb07691c827b92bc4a6",
   *         "status": "pending",
   *         "createdTime": 1482353910664,
   *         "updatedTime": 1482353910664,
   *         "agreement": "{\n  \"name\": \"Gromit Bronze Agreement\",\n  \"description\": \" Agreement for monthly subscription to plan Gromit Bronze for 9.99 USD\",\n  \"start_date\": \"2016-12-21T18:03:27.453-03:00\",\n  \"plan\": {\n    \"id\": \"P-90Y44435YT451405NALAEWPQ\",\n    \"name\": \"Gromit Bronze\",\n    \"description\": \"Gromit Bronze monthly Subscription\",\n    \"type\": \"INFINITE\",\n    \"state\": \"ACTIVE\",\n    \"payment_definitions\": [\n      {\n        \"id\": \"PD-1F155062TP915551XALAEWPQ\",\n        \"name\": \"Gromit Bronze\",\n        \"type\": \"REGULAR\",\n        \"frequency_interval\": \"1\",\n        \"frequency\": \"Month\",\n        \"cycles\": \"0\",\n        \"amount\": {\n          \"currency\": \"USD\",\n          \"value\": \"9.99\"\n        },\n        \"charge_models\": []\n      }\n    ],\n    \"merchant_preferences\": {\n      \"setup_fee\": {\n        \"currency\": \"USD\",\n        \"value\": \"9.99\"\n      },\n      \"cancel_url\": \"https://app.gromit.io/#/subscription\",\n      \"return_url\": \"https://app.gromit.io/#/subscription\",\n      \"max_fail_attempts\": \"5\",\n      \"auto_bill_amount\": \"YES\",\n      \"initial_fail_amount_action\": \"CANCEL\"\n    }\n  },\n  \"token\": \"EC-4JX77144582851244\",\n  \"links\": [\n    {\n      \"href\": \"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd\\u003d_express-checkout\\u0026token\\u003dEC-4JX77144582851244\",\n      \"rel\": \"approval_url\",\n      \"method\": \"REDIRECT\"\n    },\n    {\n      \"href\": \"https://api.sandbox.paypal.com/v1/payments/billing-agreements/EC-4JX77144582851244/agreement-execute\",\n      \"rel\": \"execute\",\n      \"method\": \"POST\"\n    }\n  ]\n}",
   *         "usageLimit": 1000000,
   *         "paymentGateway": "paypal",
   *         "paymentGatewayId": "EC-4JX77144582851244",
   *         "paymentGatewayPlanId": "P-90Y44435YT451405NALAEWPQ",
   *         "approveUrl": "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-4JX77144582851244",
   *         "plan": "bronze"
   *       }
   *     }
   *
   */
  current: () => request('GET', '/users/current/subscription'),
  /**
   * Fetch all the available plans
   * @return {Promise} A promise that returns a {@type Plan[]} if resolved
   */
  plans: () => request('GET', '/users/plans'),

  /**
   * 
   * POST /users/current/subscription
   * data: { planId: string, paymentGateway: 'paypal' | 'custom' }
   *   + status 409 when already had been suspended
   *
   *    Response example:
   *
   *    {
   *      "projectPlan": {
   *        "paymentGateway": "custom",
   *        "paymentGatewayId": "e97f69af-1b38-43ce-b529-cd84b26fcd39",
   *        "name": "Gromit Trial",
   *        "description": "Gromit Trial Subscription",
   *        "amount": "0.00",
   *        "currency": "USD",
   *        "period": "month",
   *        "usageLimit": 50000,
   *        "type": "trial"
   *      },
   *      "subscription": {
   *        "subscriptionId": "dqoapojgwv",
   *        "userId": "6ee5875fcf432cb07691c827b92bc4a6",
   *        "status": "active",
   *        "createdTime": 1482330650785,
   *        "updatedTime": 1482351033017,
   *        "usageLimit": 50000,
   *        "paymentGateway": "custom",
   *        "paymentGatewayId": "e97f69af-1b38-43ce-b529-cd84b26fcd39",
   *        "plan": "trial",
   *        "pendingSubscriptionId": "nzexgwmgqv"
   *      },
   *      "pendingSubscription": {
   *        "projectPlan": {
   *          "paymentGateway": "paypal",
   *          "paymentGatewayId": "EC-4JX77144582851244",
   *          "name": "Gromit Bronze",
   *          "description": "Gromit Bronze monthly Subscription",
   *          "amount": "9.99",
   *          "currency": "USD",
   *          "period": "month",
   *          "usageLimit": 1000000,
   *          "type": "bronze"
   *        },
   *        "subscription": {
   *          "subscriptionId": "nzexgwmgqv",
   *          "userId": "6ee5875fcf432cb07691c827b92bc4a6",
   *          "status": "pending",
   *          "createdTime": 1482353910664,
   *          "updatedTime": 1482353910664,
   *          "agreement": "{\n  \"name\": \"Gromit Bronze Agreement\",\n  \"description\": \" Agreement for monthly subscription to plan Gromit Bronze for 9.99 USD\",\n  \"start_date\": \"2016-12-21T18:03:27.453-03:00\",\n  \"plan\": {\n    \"id\": \"P-90Y44435YT451405NALAEWPQ\",\n    \"name\": \"Gromit Bronze\",\n    \"description\": \"Gromit Bronze monthly Subscription\",\n    \"type\": \"INFINITE\",\n    \"state\": \"ACTIVE\",\n    \"payment_definitions\": [\n      {\n        \"id\": \"PD-1F155062TP915551XALAEWPQ\",\n        \"name\": \"Gromit Bronze\",\n        \"type\": \"REGULAR\",\n        \"frequency_interval\": \"1\",\n        \"frequency\": \"Month\",\n        \"cycles\": \"0\",\n        \"amount\": {\n          \"currency\": \"USD\",\n          \"value\": \"9.99\"\n        },\n        \"charge_models\": []\n      }\n    ],\n    \"merchant_preferences\": {\n      \"setup_fee\": {\n        \"currency\": \"USD\",\n        \"value\": \"9.99\"\n      },\n      \"cancel_url\": \"https://app.gromit.io/#/subscription\",\n      \"return_url\": \"https://app.gromit.io/#/subscription\",\n      \"max_fail_attempts\": \"5\",\n      \"auto_bill_amount\": \"YES\",\n      \"initial_fail_amount_action\": \"CANCEL\"\n    }\n  },\n  \"token\": \"EC-4JX77144582851244\",\n  \"links\": [\n    {\n      \"href\": \"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd\\u003d_express-checkout\\u0026token\\u003dEC-4JX77144582851244\",\n      \"rel\": \"approval_url\",\n      \"method\": \"REDIRECT\"\n    },\n    {\n      \"href\": \"https://api.sandbox.paypal.com/v1/payments/billing-agreements/EC-4JX77144582851244/agreement-execute\",\n      \"rel\": \"execute\",\n      \"method\": \"POST\"\n    }\n  ]\n}",
   *          "usageLimit": 1000000,
   *          "paymentGateway": "paypal",
   *          "paymentGatewayId": "EC-4JX77144582851244",
   *          "paymentGatewayPlanId": "P-90Y44435YT451405NALAEWPQ",
   *          "approveUrl": "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-4JX77144582851244",
   *          "plan": "bronze"
   *        }
   *      }
   *    }
   *    
   */
  subscribe: (planId, paymentGateway = 'paypal') => request('POST', '/users/current/subscription', {
    data: { planId, paymentGateway } 
  })
}



