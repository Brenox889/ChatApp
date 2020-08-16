const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')

const routes = require('./routes')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)


io.on('connection',(socket)=>{
    socket.on('join',({name, room}, callback)=>{
        const {error, user} = addUser({id: socket.id, name, room})

        if(error) return callback(error)

        socket.emit('message',{user:'admin',text:`${user.name}, welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name}, has joined`})

        socket.join(user.room)

        callback()
    })

    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id)

        io.to(user.room).emit('message', {user:'admin', text:`${user.name}, has joined`})

        callback()
    })

    socket.on('disconnect',()=>{
        console.log('User had left!!!')
    })
})

app.use(routes)

server.listen(PORT, ()=>console.log(`Server is running on ${PORT}`))