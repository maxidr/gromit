const sinon = require('sinon/pkg/sinon.js');
const server = sinon.fakeServer.create();
server.autoRespond = true;
//server.autoRespondAfter = 3000;

let backendUrl = 'http://localhost';

function logObj(obj, defaultResponse){
  if( ! obj ) return defaultResponse || ''
  return '{ ' + Object.keys(obj).map((key) => key + ": " + obj[key]).join(', ') + ' }'
}

function proxy(type, endpoint, handler){
  server.respondWith(type, backendUrl + endpoint, (req) => {
    console.info('FAKE backend -> ' + type + ' ' + endpoint)
    const body = JSON.parse(req.requestBody);
    handler(body, jsonResponse(req))
  })
}

function jsonResponse(req){
  const response = function(status, json){
    console.log('<- [' + status + '] ' + logObj(json, '- EMPTY -'))
    req.respond(status, { 'Content-Type': 'application/json' }, json ? JSON.stringify(json) : null)
  }
  response.error = function(status, error, msg){
    response(status, { 'timestamp': 1430245398014, 'status': status, 'error': error, 'message': msg })
  }
  return response
}

/*
POST /user/token
body: { email: 'john.doe@gmail.com', password: '12345' }

response:
  200 OK
  { token: 'xx213yhqUxOQ9nU001' }

  403 Forbidden
 */
proxy('POST', '/users/token', (user, response) => {
  if( user.email === 'maxidr@gmail.com' && user.password === '1234' ){
    console.log("email: " + user.email + " password: " + user.password)
    response(200, { token: 'xx213yhqUxOQ9nU001' })
  } else {
    response(403)
  }
})

proxy('POST', '/users/signUp', (user, response) => {
  if( user.email === 'maxidr@gmail.com' ){
    response.error(409, 'Conflict', 'email already registered.')
    return;
  }
  if( user.password.length < 4 ){
    response.error(400, '', 'password is not valid')
  }
  response(204)
})

proxy('POST', '/users/reset', (user, response) => {
  if( user.email === 'maxidr@gmail.com' ){
    response(201)
  } else {
    // Not found
    response.error(404, 'Not found', 'email was not found')
  }
})


/*
GET /account
Headers: { Authorization: Bearer xxxxxx }
response:

OK:
	Code: 200 OK
	Body: { email: 'john.doe@gmail.com', firstName: '...', lastName: '...', ... }
FAIL
	Code: 403 Forbidden

Without authorization token
	Code: 401 Unauthorized

*/
server.respondWith('GET', backendUrl + '/account', (req) => {
  if( ! withAuthToken(req) ){ req.respond(401); return; }
  respondWithJSON(req, { email: 'john.doe@gmail.com', firstName: 'John', lastName: 'Doe' })
})

/*
GET /subscriptions
Headers: { Authorization: Bearer xxxxxx }
response:

OK
  Code: 200 OK
  Body: [ { plan: 'Developer', key: 'e9b4004a-19d9-4842-9389-4c09ad6da630', usage: 120, limit: 3000, period: 'monthly' } ]

Without authorization token:
  Code: 401 Unauthorized
*/
server.respondWith('GET', backendUrl + '/subscriptions', (req) =>{
  if( ! withAuthToken(req) ){ req.respond(401); return; }
  respondWithJSON(req, [
    { planName: 'Developer', planCode: 'free', key: 'e9b4004a-19d9-4842-9389-4c09ad6da630', usage: 120, limit: 3000, period: 'monthly' }
  ])
})

function respondWithJSON(req, obj, code){
  return req.respond(
    code || 200,
    { 'Content-Type': 'application/json' },
    JSON.stringify(obj)
  )
}

function withAuthToken(req) {
  let auth = req.requestHeaders['Authorization'];
  return /^Bearer\s/.test(auth)
}
