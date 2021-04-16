import React, { useState }from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storageService, dbService } from 'fbase';


 const TweetFactory =({userObj}) => {
  const [tweet, setTweet] = useState("");  
  const [attach, setAttach] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let fileUrl = "";
    if (attach !== "") {
    const fileRef = storageService
    .ref()
    .child(`${userObj.uid}/${uuidv4()}`);
    const res = await fileRef.putString(attach, 'data_url');
    fileUrl= await res.ref.getDownloadURL();
    }
    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      fileUrl,
    }
    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setAttach("");
  };

  const onChange = (e) => {
        const {target:{value},
        } = e;
        setTweet(value);
    }

  const onFileChange =(e) => {
    const {target: {files},} = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finished) => {
      const {
        currentTarget:{result},
      } = finished;
      setAttach(result);
    };
    reader.readAsDataURL(theFile);
  }

  const onClear =() => setAttach(null);

    return (
    <form onSubmit={onSubmit}>
      <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        <input type="submit" value="Tweet" />
        {attach && (
        <div>
        <img 
        src={attach} 
        width="50px" 
        height="50px"/>
        <button onClick={onClear}>Clear</button>
        </div>
        )}
      </form>
    )
}

export default TweetFactory;