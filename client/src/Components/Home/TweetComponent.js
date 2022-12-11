import React, { memo, useEffect, useState } from "react";
import { TweetVal } from "../../Context/FetchContext";
import UserTweetsCompo from "./UserTweetsCompo";
import useFetchToken from "../CustomHooks/UseFetchToken";
import useFetchTweet from "../CustomHooks/UseFetchTweet";

const TweetComponent = () => {
  const [userTokenData] = useFetchToken();
  const [tweetData] = useFetchTweet();
  const [fetchedtweetdata, setFetchedtweetdata] = useState([]);
  const [tokenData, settokenData] = useState([]);
  const {
    Emojitate: { ImgTweets },
  } = TweetVal();
  let newtweetData = fetchedtweetdata;

  useEffect(() => {
    settokenData(userTokenData);
  }, [userTokenData]);

  useEffect(() => {
    setFetchedtweetdata(tweetData);
  }, [tweetData]);

  useEffect(() => {
    if (ImgTweets !== "" || ImgTweets.length !== 0) {
      const one = newtweetData.push(ImgTweets);
      let newarray = [...newtweetData];
      setFetchedtweetdata(newarray);
    }
  }, [ImgTweets]);

  return (
    <>
      <UserTweetsCompo
        fetchedtweetdata={fetchedtweetdata}
        tokenData={tokenData}
      />
    </>
  );
};

export default memo(TweetComponent);
