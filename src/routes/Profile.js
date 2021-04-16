import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { authService } from 'fbase';


// export default () => <span>Profile</span>
const Profile =({userObj, refreshUser})=> {
 const history = useHistory();
 const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

 const onLogOutClick = () => {
     authService.signOut();
     history.push("/");
     refreshUser();
 }
 const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
 };

 const onChange =(e) => {
     const {
         target: {value},
     } = e;
    setNewDisplayName(value); 
    }

// const getMyTweets = async () => {
//     const tweets = await dbService
//     .collection("tweets")
//     .where("creatorId","==", userObj.uid)
//     .orderBy("createdAt")
//     .get();
//     console.log(tweets.docs.map(doc => doc.data()));
//  }
// useEffect(() => {
//     getMyTweets();
// }, [])

return (
<div className="container">
<form onSubmit = {onSubmit}>
<input
 className="formInput"
 onChange = {onChange}
 type ="text"
 placeholder="DisplayName"
 value={newDisplayName}
 />
<input type="submit" value="Update Profile" />
</form>
<span className="formBtn cancelBtn logOut"  onClick={onLogOutClick}>
  Log Out
</span>
</div>
);
}
export default Profile;