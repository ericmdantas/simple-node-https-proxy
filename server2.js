const https = require('https')
const fs = require('fs')
const path = require('path')
const express = require('express')
const httpProxy = require('http-proxy')
const app = express()

const PORT = 9999

const SECURE_OPTIONS = {
  ca: [
    fs.readFileSync(path.join(__dirname, 'crt/server.csr'))
  ],
  cert: fs.readFileSync(path.join(__dirname, 'crt/server.crt')),
  key: fs.readFileSync(path.join(__dirname, 'crt/server.key'))
}

app.get('/api/server2', (req, res) => {
  res.json({
    msg2: 'came from server2'
  })
})

https.createServer(SECURE_OPTIONS, app).listen(PORT, () => console.log(PORT))
