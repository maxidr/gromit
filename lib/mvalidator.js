//import m from 'mithril'
const x = {};
require('mithril-validator')(x)

//m.validator = (validations) => new x.validator(validations)
export default (validations) => new x.validator(validations)
