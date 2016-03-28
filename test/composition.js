const test = require('tape')
const pipe = require('../lib/pipeOps')

const logObj = (obj) => {
  var o = "{ "
  Object.keys(obj).forEach((key) => o += (key + ": " + obj[key]) )
  o += " }"
  return o
}

const resolve = (obj) => new Promise((resolve, reject) => resolve(obj) )
const reject = (response) => new Promise((resolve, reject) => reject(response))

function op1(obj){
  console.log('op1, argument: ' + logObj(obj))
  return resolve(obj)
}

function op2(obj){
  console.log('op2, argument: ' + logObj(obj))
  return reject("invalid user")
}

function op3(obj){
  console.log('op3, argument: ' + logObj(obj))
  return resolve(obj)
}

const error = (errorMsg) => { console.log(`error ocurred -> ${errorMsg}`) }


test('promise composition', { skip: false }, function(t){
  t.ok(true)
  x = pipe(op1, op2, op3).catch(error)
  x({ name: 'John' })
  t.end()
});
