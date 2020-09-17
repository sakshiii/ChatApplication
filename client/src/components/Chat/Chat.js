import React,{useState,useEffect} from 'react'
import queryString from 'query-string';
import io from'socket.io-client';
import './chat.css';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

let socket;

 const Chat=({location})=>{
    const[name,setName]=useState('');
    const[room,setRoom]=useState('');
    const[message,setMessage]=useState('');
    const[messages,setMessages]=useState([]);
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

    //for handelling messages
    useEffect(()=>{
        //listen message
        socket.on('message',(message)=>{
            
            //we cant mutate states so we simply add messages
            setMessages([...messages,message])
        },[message])
    })
    //function for sending messages
    //check it on server side : socket.on('sendMessage'...callback) 
    const sendMessage=(event)=>{
        //button press se deafault behaviour prevent i.e of refresh
        event.preventDefault();
        if(message){
            //once the message is sent it clears out the message screen
            socket.emit('sendMessage', message , ()=> setMessage(''))
        }

    }
    console.log(message,messages);
    return(
        <div className="outerContainer">
            <div className="container">
               { // <input value={message} onChange={(event)=> setMessage(event.target.value)} 
                // onKeyPress={(event)=>event.key==='Enter'?sendMessage(event):null}
                // />
                }
               <InfoBar room={room}/> 
            </div>
        </div>
        )
 }

 export default Chat;