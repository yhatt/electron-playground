'use strict'

const MarkdownIt = require('markdown-it')
const DefaultRenderer = (new MarkdownIt()).renderer
const IncrementalDom = require('incremental-dom')
const IncrementalDomRenderer = require('./renderer')
require('./preview')

let md = new MarkdownIt({ html: true })

document.addEventListener('DOMContentLoaded', () => {
  let mdEditor = document.getElementById('markdown')
  let result   = document.getElementById('result')

  let renderers = {
    inner_html: {
      renderer: DefaultRenderer,
      redraw: (rendered) => { result.innerHTML = rendered }
    },
    incremental_dom: {
      renderer: new IncrementalDomRenderer(),
      redraw: (rendered) => IncrementalDom.patch(result, rendered)
    }
  }
  let redraw = () => {}
  let setRenderer = () => {
    let renderMethod = renderers[document.forms.options.renderer.value] || renderers.inner_html

    md.renderer = renderMethod.renderer
    redraw      = renderMethod.redraw
  }
  setRenderer()

  for (let radiobtn of document.getElementsByName('renderer')) {
    radiobtn.addEventListener('change', setRenderer)
  }

  mdEditor.addEventListener('input', () => redraw(md.render(mdEditor.value)))
})
