import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useReducer,
} from "react";
import Pusher from "pusher-js";
import { EmojiReducer, LikesReducer } from "../Reducers/Reducer";

const FetchContext = createContext();

const FetchContextProvider = ({ children }) => {
  const [apidata, setApidata] = useState([]);
  const [newData, setnewData] = useState([]);
  const [newuserData, setUserNewData] = useState([]);

  useEffect(() => {
    const Fetchtweet = async () => {
      const res = await fetch("/alltweets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setApidata(data);
    };
    Fetchtweet();
  }, [newData]);

  useEffect(() => {
    const pusher = new Pusher("bfad7d924b358ce37229", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("maintweets");
    channel.bind("inserted", (data) => {
      if (data) {
        setnewData(data);
      }
    });
    const channelupdate = pusher.subscribe("updatedata");
    channelupdate.bind("updated", (updatedata) => {
      if (updatedata) {
        setnewData(updatedata);
      }
    });

    const channeldelete = pusher.subscribe("deletedata");
    channeldelete.bind("deleted", (deletedata) => {
      if (deletedata) {
        setnewData(deletedata);
      }
    });
    const channelfollow = pusher.subscribe("updatingFollow");
    channelfollow.bind("updated", (followData) => {
      if (followData) {
        setUserNewData(followData);
      }
    });
  }, []);
  const [state, dispatch] = useReducer(LikesReducer, {
    Like: [],
    Unlike: [],
    Follow: [],
    UNFollow: [],
    Bookmark: [],
    UnBookmark: [],
  });
  const [Emojitate, Emojidispatch] = useReducer(EmojiReducer, {
    Emoji: false,
    Night: false,
    ImgTweets: "",
    LoggedIn: false,
  });
  return (
    <FetchContext.Provider
      value={{
        state,
        dispatch,
        apidata,
        newData,
        newuserData,
        Emojitate,
        Emojidispatch,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export default FetchContextProvider;
export const TweetVal = () => {
  return useContext(FetchContext);
};
