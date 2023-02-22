import './component-styles.css';
import { useState, useEffect } from 'react';
import { MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import MessagesInputBox from './MessageInputBox';
import axios from 'axios';

function Messages(props){

    const [OtherPersonName, setOtherPersonName] = useState();
    const [messages, setMessages] = useState();
    const [refresh, setRefresh] = useState(false);

    function refreshMessages(){
        axios
            .get(`/getMessages/`, { params: {userId: props.id, otherPersonId: props.otherPersonId, session: props.session} })
            .then((response) => {
                // if not logged in, redirect to login page
                if (response.data === 'Not logged in') {
                    console.log('Not logged in');
                    // clear user Id and session Id from local storage and redirect to login page
                    localStorage.removeItem('userId');
                    localStorage.removeItem('sessionId');
                    window.location.href = '/';
                    return;
                }
                if(response.data.messages !== messages || response.data.OtherPersonName !== OtherPersonName){
                    setMessages(response.data.messages);
                    setOtherPersonName(response.data.OtherPersonName);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        //console.log("Messages refreshed due to new otherPersonId")
        refreshMessages();
     }, [props.otherPersonId]);

    // This will initiate refresh every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setRefresh(true);
        }, 20000);
        return () => clearInterval(interval);
    },[]);
    // This will actually refresh the messages and reset the refresh timer.
    if(refresh){
        setRefresh(false);
        //console.log("Messages refreshed due to refresh timer")
        refreshMessages();
    }
  
    return (
    <div>
        <h2 className='messagesHeader'>{OtherPersonName}</h2>
        <div className='messagesContainer'>
            {/* Note that props.id is a string! so Use "==" to compare and not "===" */}
            {messages && (messages.map((message) => (Number(message.sender_userID) == props.id) ? <p className='messages sentMessages'>{message.message}</p> : <p className='messages recievedMessages'>{message.message}</p>).reverse())}
        </div>
        <MessagesInputBox id={props.id} otherPersonId={props.otherPersonId} messages={messages} setMessages={setMessages} session={props.session}/>

        <div className='devOnly'>{props.otherPersonId}</div>
    </div>
    );
}

export default Messages;