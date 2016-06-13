const m = require('mithril')
const matchers = []

function proxy(type, endpoint, handler){
  matchers.push({ type: type, endpoint: endpoint, handler: handler })
}

function proxy(){
  const original = m.request;
  
}

function login(returnInfo){
  const original = m.request;
  m.request = function(args){
    if( args.type === 'POST' && args.url.endsWith('/users/token') ){
      return response(returnInfo)
    }
    original.call(null, args)
  }
}

function response(responseBody){
  const deferred = m.deferred();
  setTimeout(function() {
    deferred.resolve(responseBody);
    m.redraw()
  }, 1500)
  return deferred
}
