import './component-styles.css';
import { useState, useEffect } from 'react';
import { MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';

function MessagesInputBox(props){

    const [charCount, setCharCount] = useState(0);
    const [message, setMessage] = useState('');
    const [formError, setFormError] = useState(false);

    const maxMsgLength = 300;

    const onChange = (e) => {
        setCharCount(e.target.value.length)
        setMessage(e.target.value)
        setFormError(charCount > maxMsgLength || charCount === 0)
    }

    const sendMessage = () => {
        /* AJAX request to send message to server goes here*/

        console.log(`Message sent! from ${props.id} to ${props.otherPersonId}: ${message}`);
        const messageObj = props.getMessages(props.id, props.otherPersonId);
        props.setMessages(messageObj.messages);
        setMessage('');
        setCharCount(0);
        setFormError(true);
    }

  return (
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
    );
}

export default MessagesInputBox;