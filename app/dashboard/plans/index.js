const m = require('mithril')
const { plans: fetchPlans, subscribe } = require('../../backend/subscriptions')
const spinner = require('../../ui/spinner')
const overlay = require('../../ui/overlay')
require('./styles.css')


function showListOfPlans(plans, changePlan){
  return m('.columns', 
    plans.map(plan => m('.column',
      m('ul.plan-block',[
        m('li.header', plan.name),
        m('li.price', `${plan.amount} ${plan.currency}`),
        m('li', plan.usageLimit.toLocaleString() + ' of hits by month'),
        m('li.grey', 
          m('.btn', { 
            onclick: () => changePlan(plan)
          }, 'Sign Up')
        )
      ])
    ))
  )
}

function controller(){
  const plans = m.prop()
  const showSpinner = m.prop(false)

  const changePlan = plan => {
    showSpinner(true)
    subscribe(plan.paymentGatewayId)
      .then(response => {
        window.open(response.subscription.approveUrl,'_blank');
        /*
        response.subscription.status // 'pending'
        response.subscription.approveUrl // 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-4JX77144582851244'
        */
        // TODO: Show a modal window with a message explaining the aprovation cicle of paypal. 
        // when close the modal back to the dashboard
      })
  }

  fetchPlans().then(plans)

  return { showSpinner, plans, changePlan }
}

const when = (mustShow, whenTrueFn) => { if( mustShow ) return whenTrueFn() }

function view({ showSpinner, plans, changePlan }){
  return m('div',[
    when(showSpinner(), () => m(overlay)),
    m('h1', 'Plans'),
    m('a.link.', { onclick: () => m.route('/') },'Back to the dashboard'),
    plans() ? showListOfPlans(plans(), changePlan) : m(spinner.inline)
  ])
}


module.exports = { view, controller }