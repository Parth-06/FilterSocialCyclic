import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TweetVal } from "../Context/FetchContext";
import Connectcompo from "./Connect/Connectcompo";
import useFetchConnect from "./CustomHooks/useFetchConnect";
import "./HomeFollow.css";

const HomeFollow = () => {
  const { newData } = TweetVal();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [userConnectData] = useFetchConnect();
  const {
    Emojitate: { Emoji, Night },
    Emojidispatch,
  } = TweetVal();

  useEffect(() => {
    const Callmainpage = async () => {
      try {
        const res = await fetch("/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });
        const user = await res.json();
        setUserDetails(user);
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
      }
    };
    Callmainpage();
  }, [newData]);

  useEffect(() => {
    setUserdata(userConnectData);
  }, [userConnectData]);

  if (location.pathname !== "/") return null;
  return (
    <div
      className="HomeFollow"
      onClick={() =>
        Emoji === true ? (
          Emojidispatch({
            type: "EMOJI",
          })
        ) : (
          <></>
        )
      }
    >
      <div className={Night ? "whofollow_day" : "whofollow"}>
        <h2>Who to follow</h2>
        <Connectcompo userDetails={userDetails} userdata={userdata} />
      </div>
      <div className={Night ? "seemore_day" : "seemore"}>
        <Link to="/connect" className={Night ? "for_link_day" : "for_link"}>
          <p>See More</p>
        </Link>
      </div>
    </div>
  );
};

export default HomeFollow;