const express=require("express");
const socketio=require("socket.io");
const http=require("http");

const app=express();
const PORT=process.env.PORT || 5000;

const router=require('./router');


const server= http.createServer(app)
const io= socketio(server);

//socket here asa parameter is just an instance of client
io.on('connection', (socket)=>{

    console.log("We have a connection!!");
    
    socket.on("join",({name,room},callback) =>{
        console.log(name,room);

        const error=true;

        

    } )
    socket.on('disconnect',()=>{
        console.log('User has left!!')
    })
})

app.use(router);

server.listen(PORT,()=>console.log(`Server has started on port ${PORT}`))

