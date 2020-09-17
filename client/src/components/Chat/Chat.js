import React,{useState,useEffect} from 'react'
import queryString from 'query-string';
import io from'socket.io-client';

let socket;

 const Chat=({location})=>{
    const[name,setName]=useState('');
    const[room,setRoom]=useState('');
    const ENDPOINT='localhost:5000';

    //2nd parameter a callback is passed because the useEffect was showig changes multiple times 
    //to avoid that we can do by an array of those values which are changed then only it will be refclected in useEffect hook.
    useEffect(()=>{
        const { name,room }= queryString.parse(location.search);
        
        //when connected we need to pass it the end point
        socket=io(ENDPOINT);
        
        setName(name)
        setRoom(room)
        //console.log(socket);
        
        //here we could write{name:name , room: room} but acc ES6 we can write simply name,room
        //client is emitting data and we can recieve that data in the backend like we are emitting the details of who joined
        socket.emit('join',{name,room},()=>{

        //this is used for unmounting that is disconnect
        return() =>{
            //disconnect
            socket.emit('disconnect')
            //for actually turning off the one instance of one client 
            socket.off();
        }
        })
    },[ENDPOINT,location.search]);

    return(
        <h1>Chat</h1>
        )
 }

 export default Chat;