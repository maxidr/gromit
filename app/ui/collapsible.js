const m = require('mithril')

function config(isOpen){
  return function(el, isInit){
    if( ! isInit ){
      el.style.maxHeight = el.scrollHeight + 'px';
    }

    if( isOpen ){
      el.style.maxHeight = el.scrollHeight + 'px'
      el.classList.remove('collapser-closed')
    } else {
      el.style.maxHeight = null
      el.classList.add('collapser-closed')
    }
  }
}

function view(_, attrs, content){
  return m('.collapser-outer', { config: config(attrs.isOpen) },
    m('.collapser-content', content)
  )
}

module.exports = { view }