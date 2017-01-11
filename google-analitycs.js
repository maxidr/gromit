const gaSnippet = function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
}


function loadSnippet(debug){
  let url
  if( debug ){
    window.ga_debug = { trace: true }
    url = 'https://www.google-analytics.com/analytics_debug.js'
  } else {
    url = 'https://www.google-analytics.com/analytics.js'
  }
  gaSnippet(window, document, 'script', url, 'ga')
}


module.exports = function(code, debug = false){
  loadSnippet(debug)
  ga('create', code, 'auto')
}
