import './page-styles.css';
import EditProfile from '../custom-components/EditProfile';
import EditLoginInfo from '../custom-components/EditLoginInfo';
import UpdateImage from '../custom-components/UploadImage';

function Settings(props){

  return (
    <div className='settingsPage'>
        <UpdateImage myId={props.myId} id={props.id} session={props.session}/>
        <br />
        <EditProfile myId={props.myId} id={props.id} session={props.session}/>
        <br />
        <br />
        <EditLoginInfo myId={props.myId} id={props.id} session={props.session}/>        
    </div>
   );
}

export default Settings;