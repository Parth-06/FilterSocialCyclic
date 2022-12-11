import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { TweetVal } from "../../Context/FetchContext";
import useFetch from "../CustomHooks/useFetch";
import useFetchConnect from "../CustomHooks/useFetchConnect";
import Spinner from "../Spinner";
import "./Followers.css";
const UserFollowing = () => {
  const navigate = useNavigate();
  const { dispatch, newuserData } = TweetVal();
  const [userdata] = useFetchConnect();
  const [userDetails] = useFetch();
  const location = useLocation();
  const { data } = location.state;
  const [dataa, setdataa] = useState(data);
  const [userProfileDetails, setUserProfileDetails] = useState([]);
  const {
    Emojitate: { Night },
  } = TweetVal();

  useEffect(() => {
    const FetchProfile = async () => {
      const res = await fetch(`/userProfile/${dataa}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUserProfileDetails(data.user);
    };
    FetchProfile();
  }, [newuserData]);

  let alldata = userdata;
  if (userdata && userProfileDetails.following !== undefined) {
    alldata = alldata.filter((items) =>
      userProfileDetails.following.includes(items.username)
    );
  } else {
    console.log("");
  }
  let newtweetdata = alldata;

  return (
    <>
      {userDetails.following === undefined ? (
        <div className="home_main">
          <div className="home_header">
            <h1 style={{ cursor: "pointer" }}>{userProfileDetails.name}</h1>
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
                onClick={() => navigate("/profile/" + dataa)}
                className="fas fa-arrow-left"
              ></i>
              {userProfileDetails.name}
            </h1>
          </div>
          <div className={Night ? "follwers_header_day" : "follwers_header"}>
            <h3
              onClick={() =>
                navigate("/userfollowers", { state: { data: dataa } })
              }
            >
              Followers
            </h3>
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
              Following
            </h3>
          </div>

          <div>
            {newtweetdata.map((item) => {
              return (
                <div className="connect_main">
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
                        disabled={item.username === userDetails.username}
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
                        disabled={item.username === userDetails.username}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default UserFollowing;
