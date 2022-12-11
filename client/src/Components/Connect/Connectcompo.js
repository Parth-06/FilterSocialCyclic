import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TweetVal } from "../../Context/FetchContext";
import useFetchConnect from "../CustomHooks/useFetchConnect";
import Spinner from "../Spinner";
import "./Connect.css";

const Connectcompo = () => {
  const { dispatch } = TweetVal();
  const [userDetails, setUserDetails] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [connectuserdata] = useFetchConnect();

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
  }, []);

  useEffect(() => {
    setUserdata(connectuserdata);
  }, [connectuserdata]);

  const {
    Emojitate: { Night },
  } = TweetVal();
  let alldata = userdata;
  if (userdata) {
    alldata = alldata.filter((items) => items.email !== userDetails.email);
  }
  let newtweetdata = alldata;

  const follow = (username) => {
    let follow = {
      ...userDetails,
      following: [...userDetails.following, username],
    };
    setUserDetails(follow);
    dispatch({
      type: "FOLLOW",
      payload: username,
    });
  };

  const unfollow = (username) => {
    let unfollow = {
      ...userDetails,
      following: [...userDetails.following.filter((item) => item !== username)],
    };
    setUserDetails(unfollow);
    dispatch({
      type: "UNFOLLOW",
      payload: username,
    });
  };

  return (
    <>
      {userDetails.following === undefined ? (
        <div className="spinnerstyle">
          <Spinner />
        </div>
      ) : (
        <div>
          {newtweetdata.map((item) => {
            return (
              <div className="connect_main" key={item.username}>
                <Link
                  to={
                    item.username !== userDetails.username
                      ? "/profile/" + item.username
                      : "/profile"
                  }
                >
                  <img
                    src={item.profilepicimage}
                    className="avatar"
                    alt=""
                    style={{ objectFit: "cover" }}
                  />
                </Link>

                <Link
                  to={
                    item.username !== userDetails.username
                      ? "/profile/" + item.username
                      : "/profile"
                  }
                  className={Night ? "for_link_day" : "for_link"}
                >
                  <div className="username">
                    <h3>{item.name}</h3>
                    <p>{item.username}</p>
                  </div>
                </Link>

                <div className="button_connect">
                  {userDetails.following.includes(item.username) ? (
                    <button
                      className="profile_button"
                      onClick={() => unfollow(item.username)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="profile_button"
                      onClick={() => follow(item.username)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default memo(Connectcompo);
