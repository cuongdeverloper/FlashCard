const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const { decodeToken } = require('../middleware/JWTAction');
const app = express();

// Socket connection
const server = http.createServer(app);
const io = new Server(server,{
    cors :{
        origin :process.env.FRONTEND_URL,
        credentials: true,
    }
})
const onlineUser = new Set();
io.on('connection',(socket)=>{
    console.log('connect User',socket.id);
    const token = socket.handshake.auth.token
    const user = decodeToken(token) ;
    if(user){
    onlineUser.add(user?.id);
    socket.join(user?.id);
    io.emit('onlineUser',Array.from(onlineUser))
    }
console.log('as',process.env.FRONTEND_URL)
    //create a room:
    
    //disconnect
    socket.on('disconnect',()=>{
        onlineUser.delete(user?.id)
        console.log('disconnect user', socket.id)
        io.emit('onlineUser',Array.from(onlineUser))

    })
})
module.exports = {
    app,
    server
}