import './component-styles.css';
import { useState, useEffect } from 'react';
import { MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import MessagesInputBox from './MessageInputBox';

function Messages(props){

    const [OtherPersonName, setOtherPersonName] = useState('John Doe');

    function getMessages(id, otherPersonId){
        /* AJAX request to get messages from the server goes here*/
        return({
            messages:[
                {sender: id, message: 'Hey!'},
                {sender: otherPersonId, message: 'Hi!, How are you?'},
                {sender: id, message: 'I am good!'},
                {sender: otherPersonId, message: 'That is great!'},
                {sender: id, message: 'How about you?'},
                {sender: otherPersonId, message: 'I am good too!'},
                {sender: id, message: 'That is great!'},
                {sender: otherPersonId, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
                {sender: id, message: '1'},
                {sender: otherPersonId, message: '2'},
                {sender: id, message: '3'},
                {sender: otherPersonId, message: '4'},
                {sender: id, message: '5'},
                {sender: otherPersonId, message: '6'},
                {sender: id, message: '7'},
                {sender: otherPersonId, message: '8'},
                {sender: id, message: '9'},
                {sender: otherPersonId, message: '10'},
            ],
            OtherPersonName: 'John Doe',
        })
    }

    const messageObj = getMessages(props.id, props.otherPersonId);
    useEffect(() => setOtherPersonName(messageObj.OtherPersonName), []);

    const [messages, setMessages] = useState([{sender: 1, message: 'Hey!'}]);
    useEffect(() => setMessages(messageObj.messages), []);

  return (
    <div>
        <h2 className='messagesHeader'>{OtherPersonName}</h2>
        <div className='messagesContainer'>
            {messages && messages.map((message) => (message.sender === props.id) ? <p className='messages sentMessages'>{message.message}</p> : <p className='messages recievedMessages'>{message.message}</p>).reverse()}
        </div>
        
        <MessagesInputBox id={props.id} otherPersonId={props.otherPersonId} getMessages={getMessages} setMessages={setMessages}/>

        <div className='devOnly'>{props.otherPersonId}</div>
    </div> 
    );
}

export default Messages;