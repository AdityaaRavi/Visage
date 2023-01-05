import './component-styles.css';
import { useState, useEffect } from 'react';
import { MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import MessagesInputBox from './MessageInputBox';
import axios from 'axios';

function Messages(props){

    const [OtherPersonName, setOtherPersonName] = useState();
    const [messages, setMessages] = useState();

    useEffect(() => {
        axios
           .get(`/getMessages/`, { params: {userId: props.id, otherPersonId: props.otherPersonId} })
           .then((response) => {
                setMessages(response.data.messages);
                setOtherPersonName(response.data.OtherPersonName);
           })
           .catch((err) => {
              console.log(err);
           });
     }, []);

  return (
    <div>
        <h2 className='messagesHeader'>{OtherPersonName}</h2>
        <div className='messagesContainer'>
            {messages && (messages.map((message) => (Number(message.sender) === props.id) ? <p className='messages sentMessages'>{message.message}</p> : <p className='messages recievedMessages'>{message.message}</p>).reverse())}
        </div>
        
        <MessagesInputBox id={props.id} otherPersonId={props.otherPersonId} messages={messages} setMessages={setMessages}/>

        <div className='devOnly'>{props.otherPersonId}</div>
    </div> 
    );
}

export default Messages;