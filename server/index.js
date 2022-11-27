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
  // console.log(`user connected with id ${socket.id}`)
  
  socket.on("join_room", ({username, room}) => {
    socket.join(room)

    // Add user to user list
    users.addUser(socket.id, username, room)
    console.log(`${username} joined`)

    // send out new user list to all users
    io.to(room).emit("update_users", users.getUsersInRoom(room))

    io.to(room).emit("receive_message", {
      message: `${username} has entered the chat.`,
      username: 'chatbot',
      room: room
    })
  })

  socket.on("disconnect", () => {
    const user = users.getUser(socket.id)
    users.removeUser(socket.id)
    if (user) {
      console.log(`${user.username} has just left 👋🏼`)
      io.to(user.room).emit("update_users", users.getUsersInRoom(user.room))
      io.to(user.room).emit("receive_message", {
        message: `${user.username} has just left the chat.`,
        username: 'chatbot',
        room: user.room
      })
    }
  })

  socket.on('leave_room', (room) => {
    socket.leave(room)
    users.removeUser(socket.id)

  })

  socket.on("send_message", data => {
    io.to(data.room).emit("receive_message", data);
  })

})

server.listen(PORT, () => {
  console.log('server is running on port 3001')
})

