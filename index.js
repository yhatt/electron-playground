'use strict'

const MarkdownIt = require('markdown-it')
const PrettyJSON = require('prettyjson')

let md = new MarkdownIt()

document.addEventListener('DOMContentLoaded', () => {
  let mdEditor = document.getElementById('markdown')
  let result   = document.getElementById('result')

  let editorOnChange = () => {
    let parsed = md.parse(mdEditor.value)
    result.innerText = PrettyJSON.render(parsed, { noColor: true })
  }
  mdEditor.addEventListener('keyup', editorOnChange)
})
