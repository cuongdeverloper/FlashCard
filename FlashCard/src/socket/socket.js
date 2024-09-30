const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const { decodeToken } = require('../middleware/JWTAction');
const app = express();

// Socket connection
const server = http.createServer(app);
const io = new Server(server,{
    cors :{
        origin :process.env.FRONTEND_URL
    }
})
const onlineUser = new Set();
io.on('connection',(socket)=>{
    console.log('connect User',socket.id);
    const token = socket.handshake.auth.token
    const user = decodeToken(token) ;
    // console.log('tk',user);

    //create a room:
    socket.join(user?.id);
    onlineUser.add(user?.id);
    io.emit('onlineUser',Array.from(onlineUser))
    //disconnect
    socket.on('disconnect',()=>{
        onlineUser.delete(user?.id)
        console.log('disconnect user', socket.id)
    })
})
module.exports = {
    app,
    server
}