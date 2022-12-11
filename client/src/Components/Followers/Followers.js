import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../CustomHooks/useFetch";
import useFetchConnect from "../CustomHooks/useFetchConnect";
import Spinner from "../Spinner";
import "./Followers.css";
import { TweetVal } from "../../Context/FetchContext";

const Followers = () => {
  const navigate = useNavigate();
  const { dispatch } = TweetVal();
  const [userdata] = useFetchConnect();
  const [userDetails] = useFetch();
  const {
    Emojitate: { Night },
  } = TweetVal();
  console.log("follwers", userdata);
  let alldata = userdata;
  if (userdata) {
    alldata = alldata.filter((items) =>
      userDetails.followers.includes(items.username)
    );
  }
  let newtweetdata = alldata;

  return (
    <>
      {userDetails.followers === undefined ||
      userDetails.following === undefined ? (
        <div className="home_main">
          <div className="home_header">
            <h1 style={{ cursor: "pointer" }}>
              <i
                onClick={() => navigate("/profile")}
                className="fas fa-arrow-left"
              ></i>
              {userDetails.name}
            </h1>
          </div>
          <div className="followerspinnerstyle">
            <Spinner />
          </div>
        </div>
      ) : (
        <div className={Night ? "Followers_main_day" : "Followers_main"}>
          <div className="Followers_header">
            <h1 style={{ cursor: "pointer" }}>
              <i
                onClick={() => navigate("/profile")}
                className="fas fa-arrow-left"
              ></i>
              {userDetails.name}
            </h1>
          </div>
          <div className={Night ? "follwers_header_day" : "follwers_header"}>
            <h3
              style={
                Night
                  ? {
                      color: "Black",
                      fontWeight: "700",
                      borderBottom: "2px solid",
                    }
                  : {
                      color: "white",
                      fontWeight: "700",
                      borderBottom: "2px solid",
                    }
              }
            >
              Followers
            </h3>
            <h3 onClick={() => navigate("/following")}>Following</h3>
          </div>
          <div>
            {newtweetdata === 0 ? (
              <>
                <div className="handleempty">
                  <i class="fas fa-heart-broken"></i>
                  <h3>No Tweets by {userDetails.name}</h3>
                </div>
              </>
            ) : (
              <>
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
                            onClick={() =>
                              dispatch({
                                type: "UNFOLLOW",
                                payload: item.username,
                              })
                            }
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            className="profile_button"
                            onClick={() =>
                              dispatch({
                                type: "FOLLOW",
                                payload: item.username,
                              })
                            }
                          >
                            Follow
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Followers);
