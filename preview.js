const fs  = require('fs')
let css = fs.readFileSync(require.resolve('github-markdown-css')).toString()

let MarkdownPreview = Object.create(HTMLElement.prototype)
MarkdownPreview.createdCallback = function() {
  let shadow = this.createShadowRoot()
  shadow.innerHTML = `
    <style>
      #container {
        margin: 30px 20px;
      }
      #markdown-preview {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
      }
    </style>
    <style>${css.replace(/\.markdown-body/g, '::content').replace(/::content\s*{/, '#markdown-preview {')}</style>

    <div id="container">
      <div id="markdown-preview">
        <content></content>
      </div>
    </div>
  `
}

document.registerElement('markdown-preview', { prototype: MarkdownPreview })
