import './page-styles.css';
import PersonPicker from '../custom-components/PersonPicker';
import { useState, useEffect } from 'react';
import MessagesInputBox from '../custom-components/MessageInputBox';
import Profile from './Profile';

function ConnectPage(props){
  
  const [otherPersonId, setOtherPerson] = useState(2);

  return (
    <div id='ConnectionsPage'>
      <div class='personPicker'>
        <h1>Suggested Connections</h1>
        <PersonPicker className='personPickerComponent' id={props.id} picker={setOtherPerson} otherPersonId={otherPersonId} getNew={true}/>
      </div>
      <div class='VerticalDivider'></div>
        <div class='messageHolderLvl2'>
          <Profile id={props.id} inConnectionPage={true}/>
          {/* id is to identify the current user, person 
          is to identify the person at the other end of the conversation */}
          <MessagesInputBox id={props.id} otherPersonId={otherPersonId} />
        </div>
    </div>
    );
}

export default ConnectPage;