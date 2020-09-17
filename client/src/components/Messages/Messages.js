
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Messages.css';
import Message from '../Message/Message' 

const Messages = ({messages ,name}) => (
    
    //when ht of the messages  goes beyond the actual height of the bax we scroll it down
    <ScrollToBottom className="messages">
        {messages.map((message,i)=> <div key={i}> <Message message={message} name={name} /> </div>)}
    </ScrollToBottom>
);
export default Messages;