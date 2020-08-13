import express from 'express'
import socketio from 'socket.io'
import http from 'http'

import routes from './routes'

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(routes)

server.listen(PORT, ()=>console.log(`Server is running on ${PORT}`))