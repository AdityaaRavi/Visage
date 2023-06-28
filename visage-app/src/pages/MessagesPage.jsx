import './page-styles.css';
import PersonPicker from '../custom-components/PersonPicker';
import { useState, useEffect } from 'react';
import Messages from '../custom-components/Messages';
import { Button } from 'react-bootstrap';
import axios from 'axios';


function MessagesPage(props){

  const id = localStorage.getItem("userId");
  const session = localStorage.getItem("sessionId");
  const [otherPersonId, setOtherPerson] = useState(id);
  

  const onRemoveConnectionButtonClick = (e) => {

    /* AJAX call to remove connection */
    axios.post('/removeConnection', {myId: id, userId: id, otherPersonId: otherPersonId, session: session})
         .then((response) => {
            // if not logged in, redirect to login page
            if (response.data === 'no_session_found') {
              console.log('Not logged in');
              // clear user Id and session Id from local storage and redirect to login page
              localStorage.removeItem('userId');
              localStorage.removeItem('sessionId');
              window.location.href = '/';
              return;
            }
            //console.log(response.data);
            setOtherPerson(-1);
          });         
  }

  return (
    <div id='MessagesPage'>
      <div class='personPicker'>
        <h1>Current Connections</h1>
        <PersonPicker className='personPickerComponent' myId={id} id={id} picker={setOtherPerson} otherPersonId={otherPersonId} getNew={false} session={session}/>
      </div>
      <div class='VerticalDivider'></div>
      {otherPersonId !== id && otherPersonId !== -1 ?
        <div class='messageHolderLvl2'>
          {/* id is to identify the current user, person 
          is to identify the person at the other end of the conversation */}
          <Messages myId={id} id={id} otherPersonId={otherPersonId} session={session}/>
          <div>
            <Button variant='primary' 
            className='removeConnectionButton'
            onClick={onRemoveConnectionButtonClick} >
              Remove Connection
            </Button>
          </div>
        </div> :
        <div>
          <h1 class='noConnectionMessage'>Select or <a href='/connect'>create</a> a connection to start messaging</h1>
        </div>}
    </div>
    );
}

export default MessagesPage;