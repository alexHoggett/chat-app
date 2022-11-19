const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()
const http = require("http")
const { Server } = require("socket.io")

const cors = require("cors")
app.use(cors())

const server = http.createServer(app)

const { Users } = require('./utils/users')
var users = new Users()

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", socket => {
  // fired when a client connects
  console.log(`user connected with id ${socket.id}`)
  
  socket.on("join_room", ({username, room}) => {
    socket.join(room)

    // Add user to user list
    users.addUser(socket.id, username, room)

    // send out new user list to all users
    console.log('this happening?')
    socket.to(room).emit("update_users", users.getUsersInRoom(room))
  })

  socket.on("leave_room", room => {
    console.log(`${users.getUser(socket.id).username} has left room ${room}`)
    users.removeUser(socket.id)
    // send out new user list to all users
    socket.to(room).emit("update_users", users.getUsersInRoom(room))
    socket.leave(room)
  })

  socket.on("send_message", data => {
    socket.to(data.room).emit("receive_message", data);
  })

})

server.listen(PORT, () => {
  console.log('server is running on port 3001')
})

