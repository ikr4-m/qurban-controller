const express = require('express')
const FS = require('fs')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  handlePreflightRequest: (req, res) => {
    const header = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true
    }
    res.writeHead(200, header)
    res.end()
  }
})

FS.readdir('./core/Routes', (err, routes) => {
  if (err) throw err
  app.use(bodyparser.urlencoded({ extended: true }))
  app.use(bodyparser.json())
  app.use(cors())
  app.use((req, res, next) => {
    req.io = io
    next()
  })
  routes.forEach(route => {
    const ext = route.split('.').pop()
    if (ext !== 'js') return

    require(`./Routes/${route}`)(app)
  })

  io.on('connection', (socket) => {
    console.log(`[Socket#${socket.id}] New overlay connection!`)
  
    socket.on('overlay', (data) => {
      console.log(data)
    })
  })

  http.listen(
    process.env.CORE_PORT,
    () => console.log(`Core successfully running in http://localhost:${process.env.CORE_PORT}`)
  )
})
