/**
 * Apply arguments to a list of functions
 * @param  {Function[]} functions - A list of functions
 * @return {Function}    A function that returns the result list of apply each argument over each previous function
 *                       of results
 * @example
 *
 *  const hello = (first, last) => `hello Mr ${first} ${last}`
 *  const bye = (first, last) => `bye Mr. ${last}`
 *  const helloAndBye = applyOver([ hello, bye ])
 *  helloAndBye('John', 'Doe')
 *  // => ["hello Mr John Doe", "bye Mr. Doe"]
 * 
 */
module.exports = function applyOver(functions){
  return function applyWithArguments(){
    return functions.map(fn => fn.apply(null, arguments))
  }
}
