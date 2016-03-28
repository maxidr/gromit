/*

# How to use:

const operationsChain = pipe(validate, saveInServer, routeToAnotherPage)
  .catch(showErrors);

operationsChain(user)

Similar to: [pipeP](http://ramdajs.com/0.19.1/docs/#pipeP)

*/

function pipe(){
  "use strict";

  const firstOp = arguments[0]
  const operations = Array.prototype.slice.call(arguments, 1);
  let catchFn;

  const pipe = function(){
    const chain = operations.reduce(
      (previousOp, nextOp) => previousOp.then(nextOp),
      firstOp.apply(null, arguments)
    )
    chain.catch(catchFn)
  }

  pipe.catch = function(){
    catchFn = arguments[0];
    return pipe;
  }

  return pipe;
}

module.exports = pipe
