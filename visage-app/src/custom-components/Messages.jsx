import './component-styles.css';
import { Image } from 'react-bootstrap';
import { useState } from 'react';

function Messages(props){

    function getMessages(id, otherPersonId){
        /* AJAX request goes here*/
        return({
            messages:[
                {sender: id, name: 'Adityaa Ravi', message: 'Hey!'},
                {sender: otherPersonId, name: 'John Doe', message: 'Hi!, How are you?'},
                {sender: id, name: 'Adityaa Ravi', message: 'I am good!'},
                {sender: otherPersonId, name: 'John Doe', message: 'That is great!'},
                {sender: id, name: 'Adityaa Ravi', message: 'How about you?'},
                {sender: otherPersonId, name: 'John Doe', message: 'I am good too!'},
                {sender: id, name: 'Adityaa Ravi', message: 'That is great!'},
                {sender: otherPersonId, name: 'John Doe', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
                {sender: id, name: 'Adityaa Ravi', message: 'Hey!'},
                {sender: otherPersonId, name: 'John Doe', message: 'Hi!, How are you?'},
                {sender: id, name: 'Adityaa Ravi', message: 'I am good!'},
                {sender: otherPersonId, name: 'John Doe', message: 'That is great!'},
                {sender: id, name: 'Adityaa Ravi', message: 'How about you?'},
                {sender: otherPersonId, name: 'John Doe', message: 'I am good too!'},
                {sender: id, name: 'Adityaa Ravi', message: 'That is great!'},
                {sender: otherPersonId, name: 'John Doe', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
                {sender: id, name: 'Adityaa Ravi', message: 'Hey!'},
                {sender: otherPersonId, name: 'John Doe', message: 'Hi!, How are you?'},
                {sender: id, name: 'Adityaa Ravi', message: 'I am good!'},
                {sender: otherPersonId, name: 'John Doe', message: 'That is great!'},
                {sender: id, name: 'Adityaa Ravi', message: 'How about you?'},
                {sender: otherPersonId, name: 'John Doe', message: 'I am good too!'},
                {sender: id, name: 'Adityaa Ravi', message: 'That is great!'},
                {sender: otherPersonId, name: 'John Doe', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
            ]
        })
    }

  return (
    // <div>
    //     <h2 className='messagesHeader'>Messages</h2>
        <div className='messagesContainer'>
            {getMessages(6, 7).messages.map((message) => (message.sender === props.id) ? <p className='messages sentMessages'>{message.message}</p> : <p className='messages recievedMessages'>{message.message}</p>)}
        </div>
    // </div>
    );
}

export default Messages;