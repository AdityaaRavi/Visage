import './component-styles.css';
import { useState, useEffect } from 'react';
import { MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';

function Messages(props){

    const [charCount, setCharCount] = useState(0);
    const [message, setMessage] = useState('');
    const [formError, setFormError] = useState(false);
    const [OtherPersonName, setOtherPersonName] = useState('John Doe');

    const maxMsgLength = 300;

    function getMessages(id, otherPersonId){
        /* AJAX request goes here*/
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

    const [messages, setMessages] = useState(messageObj.messages);

    const onChange = (e) => {
        setCharCount(e.target.value.length)
        setMessage(e.target.value)
        setFormError(charCount > maxMsgLength || charCount === 0)
    }

    const sendMessage = () => {
        /* AJAX request goes here*/
        console.log(`Message sent! from ${props.id} to ${props.otherPersonId}: ${message}`);
        const messageObj = getMessages(props.id, props.otherPersonId);
        setMessages(messageObj.messages);
    }

  return (
    <div>
        <h2 className='messagesHeader'>{OtherPersonName}</h2>
        <div className='messagesContainer'>
            {messages.map((message) => (message.sender === props.id) ? <p className='messages sentMessages'>{message.message}</p> : <p className='messages recievedMessages'>{message.message}</p>).reverse()}
        </div>
        <div>
            <MDBRow className='g-3 align-items-center'>
              <textarea
                onChange={onChange}
                onFocus={onChange}
                onBlur={onChange}
                label='Type your message here'
                id='messageInput'
                value={message}
                
              />
              <MDBCol>
                <span id='textExample2' className='form-text'>
                  {(charCount > maxMsgLength || charCount == 0) ? <span style={{color: 'red'}}>{charCount}/{maxMsgLength}</span> : <span>{charCount}/{maxMsgLength}</span>}
                  {/* {(charCount > maxMsgLength) ? <span style={{color: 'red'}}><br/>Too many characters</span> : ''} */}
                </span>
              </MDBCol>
              <MDBCol size='auto'>
              <Button variant='dark' type='submit' disabled={formError} onClick={sendMessage}>
                Send {'  '}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                </svg>
              </Button>
              </MDBCol>
            </MDBRow>
        </div>
    </div>
    );
}

export default Messages;