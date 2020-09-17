const express=require("express");
const socketio=require("socket.io");
const http=require("http");

const {addUser,removeUser,getUser,getUsersInRoom} =require('./users.js');

const app=express();
const PORT=process.env.PORT || 5000;

const router=require('./router');


const server= http.createServer(app)
const io= socketio(server);

//socket here asa parameter is just an instance of client
io.on('connection', (socket)=>{

    console.log("We have a connection!!");
    
    socket.on("join",({name,room},callback) =>{
        const {error,user}=addUser({id : socket.id,name,room});

        if(error)  return callback(error);

        //in this line we emit the message from backend to front end
        socket.emit('message',{user:'admin', text:` ${user.name} , welcome to the room ${user.room}`});
        //this is for letting everybody else the user who gave message know that this particular user has joined
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name},has joined`})

        socket.join(user.room); 
        
        //to check errors
        callback();
    } );
    //admin generated message is written as message
    //whereas user generated message is written as sendMessage
    //we wait function to actually emit
    socket.on('sendMessage',(message,callback)=>{
        const user = getUser(socket.id);

        //from frontend to backend
        io.to(user.room).emit('message',{user:user.name, text:message});

        callback();
    })
    socket.on('disconnect',()=>{
        console.log('User has left!!')
    })
})

app.use(router);

server.listen(PORT,()=>console.log(`Server has started on port ${PORT}`))

