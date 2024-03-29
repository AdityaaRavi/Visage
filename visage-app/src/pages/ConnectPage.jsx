import './page-styles.css';
import PersonPicker from '../custom-components/PersonPicker';
import { useState, useEffect } from 'react';
import MessagesInputBox from '../custom-components/MessageInputBox';
import Profile from './Profile';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function ConnectPage(props){
  
  const [otherPersonId, setOtherPerson] = useState(-1);

  const onDeclineConnectionButtonClick = (e) => {
    /* AJAX call to remove connection */
    axios.post('/declineSuggestion', {myId: props.myId, userId: props.id, otherPersonId: otherPersonId, session: props.session})
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
            console.log(response.data);
            setOtherPerson(-1);
            // refesh the page
            window.location.reload();
          });         
  }

  return (
    <div id='ConnectionsPage'>
      <div class='personPicker'>
        <h1>Suggested Connections</h1>
        <PersonPicker className='personPickerComponent' myId={props.myId} id={props.id} picker={setOtherPerson} otherPersonId={otherPersonId} getNew={true} session={props.session}/>
      </div>
      <div class='VerticalDivider'></div>
      {otherPersonId !== -1 ?
        <div class='messageHolderLvl2'>
          <Profile myId={props.id} id={otherPersonId != -1 ? otherPersonId : props.id} inConnectionPage={true} session={props.session}/>
          {/* id is to identify the current user, person 
          is to identify the person at the other end of the conversation */}
          <div>Start a conversation:</div>
          <MessagesInputBox myId={props.myId} id={props.id} otherPersonId={otherPersonId} session={props.session} inConnectPage={true}/>
          <div>
            <Button variant='primary' 
            className='declineConnectionButton'
            onClick={onDeclineConnectionButtonClick} >
              Decline Connection Suggestion
            </Button>
          </div>
        </div> :
        <div>
          <h1 class='noConnectionMessage'>Select a suggestion from the list to get started!</h1>
        </div>}
    </div>
    );
}

export default ConnectPage;