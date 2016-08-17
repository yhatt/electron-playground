const RendererClass = require('markdown-it/lib/renderer')
const {escapeHtml} = require('markdown-it/lib/common/utils')
const {elementOpen, elementClose, elementVoid, text} = require('incremental-dom')

module.exports = class IncrementalDomRenderer extends RendererClass {
  constructor() {
    super()
    let default_rules = this.rules

    this.rules.text = (tokens, idx) => { text(escapeHtml(tokens[idx].content)) }
  }

  renderAttrs(token) {
    if (!token.attrs) { return null }

    let result = []
    for (let i = 0, len = token.attrs.length; i < len; i++) {
      result.push(escapeHtml(token.attrs[i][0]), escapeHtml(token.attrs[i][1]))
    }
    return result
  }

  renderToken(tokens, idx, options) {
    let token = tokens[idx]
    if (token.hidden) { return }

    if (token.nesting === 0) {
      elementVoid(token.tag, '', this.renderAttrs(token))
    } else if (token.nesting === -1) {
      elementClose(token.tag)
    } else {
      elementOpen(token.tag, '', this.renderAttrs(token))
    }
  }

  render(tokens, options, env) {
    return () => super.render(tokens, options, env)
  }
}
