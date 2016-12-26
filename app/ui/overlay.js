const m = require('mithril')
const spinner = require('./spinner')

module.exports = {
  view: () => m('.overlay-layer.fadeIn.bg-semitransparent', 
    m(spinner, { class: 'big-spinner txt-ac full-center' })
  )
}