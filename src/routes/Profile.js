import React from 'react';
import { useHistory } from "react-router-dom";
import { authService } from 'fbase';


// export default () => <span>Profile</span>
const Profile =()=> {
 const history = useHistory();
 const onLogOutClick = () => {
     authService.signOut();
     history.push("/");
 }
return (
<>
<button onClick={onLogOutClick}>Log Out</button>
</>
);
}
export default Profile;