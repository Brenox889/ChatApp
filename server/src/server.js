import express from 'express'
import socketio from 'socket.io'
import http from 'http'

import routes from './routes'

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)


io.on('connection',(socket)=>{
    console.log('We have a new connection !!')

    socket.on('disconnect',()=>{
        console.log('User had left!!!')
    })
})

app.use(routes)

server.listen(PORT, ()=>console.log(`Server is running on ${PORT}`))