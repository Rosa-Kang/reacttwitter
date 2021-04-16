import React, { useState }from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storageService, dbService } from 'fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


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
    <form className="factoryForm" onSubmit={onSubmit}>
      <div 
      className="factoryInput__container"
      >
      <input
          className="factoryInput__input"
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input className="factoryInput__arrow" type="submit" value="Tweet" />  
        </div>
        <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        /> 
        {attach && (
        <div className="factoryForm__attachment">
        <img 
        src={attach} 
        style={{
          background: attach,
        }}/>
        <div className="factoryForm__clear" onClick={onClear}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        )}
      </form>
    )
}

export default TweetFactory;