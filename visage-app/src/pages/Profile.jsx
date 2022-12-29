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

  return (
    <div>
        <ProfileWhole className='profileDisplay' inConnectionPage={props.inConnectionPage} id={props.id}/>
        <br />
        {!props.inConnectionPage && <Button variant="dark" class="editButton" href='/editProfile'>Edit Profile</Button>}
        <hr size="1" width={lineWidth} className={lineClass} color="black"/> 
        <div className={lineClass}>
          <UserStats inConnectionPage={props.inConnectionPage} id={6}/>
        </div>
    </div>

   );
}

export default Profile;