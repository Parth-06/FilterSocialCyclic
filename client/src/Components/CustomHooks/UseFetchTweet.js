import { useEffect, useState } from "react";

const useFetchTweet = () => {
  const [tweetdata, setTweetdata] = useState([]);

  useEffect(() => {
    const Fetchtweet = async () => {
      const res = await fetch("/alltweets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setTweetdata(data);
    };
    Fetchtweet();
  }, []);

  return [tweetdata];
};

export default useFetchTweet;
