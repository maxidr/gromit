const m = require('mithril')
require('./modal.animation.css')
require('./modal.css')

function closeWhenPressEsc(close){
  return function(_, isInitialized, context){
    if( !isInitialized ){
      const handleKey = e => if( e.keyCode === 27 ){ close() }
      document.body.addEventListener('keyup', handleKey)
      context.onunload = () => { document.body.removeEventListener('keyup', handleKey) }
    }
  }
}

function noop(){}

/**

Simple example:

const m = require('mithril')
const modal = require('../ui/modal')()

const content = {
  view: function(){
    return m('div', [
      m('p', 'my content!'),
      m('a.close', { onclick: modal.close }, '[close from inside]')
    ])
  }
}

modal.content(content)
m.mount(document.querySelector('#modal-holder'), modal)

*/
module.exports = function({ content, closeOnPressEsc = true } = {}){
  const modal = {}

  const closeCallbacks = []
  const opened = m.prop(false)

  modal.open  = () => { opened(true);  m.redraw() }
  modal.onClose = cb => closeCallbacks.push(cb)
  modal.close = () => { 
    opened(false)
    closeCallbacks.forEach(cb => cb())
    m.redraw()
  }

  modal.content = m.prop(content);

  modal.view = function() {
    return m('.modal', 
      { class: opened() ? '' : 'modal--closed', 
        config: closeOnPressEsc ? closeWhenPressEsc(modal.close) : noop() 
      },[
        m('.modal__overlay'),
        m('.modal__panel', [
          m('a.icon-close.modal__close', { onclick: modal.close }),
          m('.modal__content', modal.content() ? m(modal.content()) : '')
        ])
      ]
    )
  }

  return modal
}
