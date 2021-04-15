import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Tweet from '../components/Tweet';

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attach, setAttach] = useState();

  useEffect(() => {
    dbService.collection('tweets').onSnapshot(snapshot => {
      const tweetArr = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTweets(tweetArr);
    })
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
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
    <div>
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
        <img src={attach} width="50px" height="50px"/>
        <button onClick={onClear}>Clear</button>
        </div>
        )}
      </form>
      <div>
        {tweets.map((tweet) => (
        <Tweet 
            key={tweet.id} 
            tweetObj={tweet}
            isOwner= {tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;