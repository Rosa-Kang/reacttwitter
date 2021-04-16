import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Tweet from '../components/Tweet';
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    dbService.collection('tweets').onSnapshot(snapshot => {
      const tweetArr = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTweets(tweetArr);
    })
  }, []);

  return (
    <div className="container">
        <div>
        <TweetFactory 
         userObj = { userObj }
         />
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