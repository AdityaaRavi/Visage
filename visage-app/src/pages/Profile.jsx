import ProfileWhole from '../custom-components/ProfileWhole';
import { Button } from 'react-bootstrap';
import '../App.css'
import './page-styles.css';
import UserStats from '../custom-components/UserStats';

function Profile(props){
  let lineWidth = '95%';
  // if(props.inConnectionPage) lineWidth = '50%';
  let lineClass = '';
  if(props.inConnectionPage) lineClass = 'halfPageComponent';
  
  // const onChange = (e) => {
  //   props.setId(e.target.value);
  // }

  return (
    <div>
        {/* <textarea class="devOnly" rows="4" cols="50" value={props.id} readOnly></textarea> */}
        <ProfileWhole className='profileDisplay' inConnectionPage={props.inConnectionPage} id={props.id} session={props.session}/>
        <br />
        {/* If you are in the connection page or not logged in, don't show the edit profile button*/}
        {!props.inConnectionPage && localStorage.getItem("sessionId") !== null && <Button variant="dark" class="editButton" href='/editProfile'>Edit Profile</Button>}
        <hr size="1" width={lineWidth} className={lineClass} color="black"/> 
        <div className={lineClass}>
          <UserStats inConnectionPage={props.inConnectionPage} id={props.id} session={props.session}/>
        </div>
        {/* <textarea class="devOnly" value={props.id} onChange={onChange}/>
        <div class="devOnly">{props.setId}</div> */}
        
    </div>

   );
}

export default Profile;