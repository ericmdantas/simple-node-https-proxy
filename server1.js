const https = require('https')
const fs = require('fs')
const path = require('path')
const express = require('express')
const httpProxy = require('http-proxy')
const app = express()

const PORT = 9998
const PORT_PROXY = 9999

const SECURE_OPTIONS = {
  ca: [
    fs.readFileSync('crt/server.csr')
  ],
  cert: fs.readFileSync('crt/server.crt', 'utf-8'),
  key: fs.readFileSync('crt/server.key', 'utf-8')
}

let proxyServer = httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: 9999,
    https: true
  },
  agent: https.globalAgent,
  ssl: SECURE_OPTIONS,
  secure: false
})

proxyServer.on('proxyReq', (proxyReq, req) => {
  req._proxyReq = proxyReq;
})

proxyServer.on('error', (err, req, res) => {
  if (req.socket.destroyed && err.code === 'ECONNRESET') {
    req._proxyReq.abort();
  }
})

app.get('/api/server1', (req, res) => {
  res.json({
    msg: 'from server 1'
  })
})

app.get('/api/server2', (req, res) => {
  proxyServer.web(req, res)
})

https.createServer(SECURE_OPTIONS, app).listen(PORT, () => console.log(PORT))
