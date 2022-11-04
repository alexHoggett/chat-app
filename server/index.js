const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()
const http = require("http")
const { Server } = require("socket.io")

const cors = require("cors")
app.use(cors())

const server = http.createServer(app)

const users = []

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", socket => {
  // fired when a client connects
  console.log(`user connected with id ${socket.id}`)

  socket.on("send_message", data => {
    socket.broadcast.emit("receive_message", data)
  })

  socket.on("join_chat", data => {
    console.log(data.username)
  })
})

server.listen(3001, () => {
  console.log('server is running on port 3001')
})

