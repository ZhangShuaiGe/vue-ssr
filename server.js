const express = require('express')
const server = express()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./src/index.template.html', 'utf-8')
})

const createApp = require('./dist/main.server.js').default
server.use('/dist', express.static("./dist"))


//核心逻辑
server.get('*', (req, res) => {
  const context = {
    title: 'hello',
    meta: `
    <meta ...>
    <meta ...>
  `
  };
  createApp(context).then(app => {
    //renderer.renderToString(vm[, context], callback)
    renderer.renderToString(app, context, (err, html) => {
      if (err) {
        res.status(500).end('Internal Server Error')
        return
      }
      res.end(html)
    })
  })

})
server.listen(8080)
