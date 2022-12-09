import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import "../Home/Home.css";
import "../EditProfile/EditProfile.css";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import useFetch from "../CustomHooks/useFetch";
import { TweetVal } from "../../Context/FetchContext";

const Profile = () => {
  const navigate = useNavigate();
  const { dispatch, apidata } = TweetVal();
  const {
    Emojitate: { Night },
  } = TweetVal();
  const [tweetdata, setTweetdata] = useState([]);
  const [userDetails] = useFetch();
  const [editPro, setEditPro] = useState(false);
  const [img, setimg] = useState();
  const [imgPre, setimgPre] = useState("");
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [locationn, setLocation] = useState();

  useEffect(() => {
    setTweetdata(apidata);
  }, [apidata]);

  console.log("profile", tweetdata);
  let alldata = tweetdata;
  if (tweetdata) {
    alldata = alldata.filter((items) => items.email === userDetails.email);
  }
  let newtweetdata = alldata;

  const like = (id) => {
    dispatch({
      type: "Like",
      payload: id,
    });
    setTweetdata(
      tweetdata.map((item) => {
        if (item.id === id) {
          return { ...item, hdata: [...item.hdata, userDetails.email] };
        }

        return item;
      })
    );
  };

  const unlike = (id) => {
    dispatch({
      type: "UnLike",
      payload: id,
    });
    setTweetdata(
      tweetdata.map((item) => {
        if (item.id === id) {
          const id = item.hdata.indexOf(userDetails.email);
          const remove = item.hdata.splice(id, 1);

          return { ...item, hdata: [...item.hdata] };
        }

        return item;
      })
    );
  };

  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setimgPre(reader.result);
      };
      reader.readAsDataURL(img);
    } else {
      setimgPre("");
    }
  }, [img]);

  const profilestateupload = async (event) => {
    if (event.target.files[0].size <= "5242880") {
      setimg(event.target.files[0]);
    } else {
      toast.error("Please Upload less than 10 MB Images");
    }
  };

  const proimage = async () => {
    if (imgPre === "") {
      setEditPro(false);

      const res = await fetch("/updateprofileDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          bio,
          location: locationn,
        }),
      });
    } else {
      setEditPro(false);
      const picdata = new FormData();
      picdata.append("file", img);
      picdata.append("upload_preset", "filtersocialimages");
      picdata.append("cloud_name", "filtersocialnew");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/filtersocialnew/image/upload",
        {
          method: "POST",
          body: picdata,
        }
      );
      const dataaa = await res.json();
      const ress = await fetch("/updateprofilepic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          bio,
          location: locationn,
          url: dataaa.secure_url,
        }),
      });
    }
  };

  const Delete = async (item_id) => {
    const res = await fetch("/deletedata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        item_id,
      }),
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("invalid");
    } else {
      toast.error("Deleted");
    }
  };

  return (
    <>
      {userDetails.bookmark === undefined &&
      newtweetdata === undefined &&
      userDetails.following ? (
        <div className="spinnerstyle">
          <Spinner />
        </div>
      ) : (
        <div
          className={Night ? "profile_main_day" : "profile_main"}
          id="profile_main"
        >
          <div className="profile_header">
            <h1>
              <i
                onClick={() => navigate("/")}
                className="fas fa-arrow-left"
              ></i>
              {userDetails.name}
            </h1>
          </div>
          <div className="profile_sec">
            <div className="cover_image"></div>
            <div>
              {userDetails.profilepicimage === "" || undefined || null ? (
                <div className="profile_image"></div>
              ) : (
                <img
                  src={userDetails.profilepicimage}
                  className="profile_image"
                  style={{ objectFit: "cover" }}
                  alt=""
                  onClick={() =>
                    navigate("/photo", {
                      state: { profileimg: userDetails.profilepicimage },
                    })
                  }
                />
              )}
            </div>
            <div className="bio_sec">
              <div className="name_sec">
                <h1>{userDetails.name}</h1>
                <p>@{userDetails.username}</p>
              </div>
              <button
                className="profile_button"
                onClick={() => {
                  setEditPro(!editPro);
                }}
              >
                Edit Profile
              </button>
            </div>
            {editPro && (
              <>
                <div
                  className="EditProfile"
                  onClick={() => {
                    setEditPro(false);
                  }}
                ></div>
                <div className="EditProfile_box">
                  <div className="edit_header">
                    <i
                      className="fas fa-times"
                      onClick={() => {
                        setEditPro(false);
                      }}
                    ></i>
                    <h2>Edit Profile</h2>
                    <button className="save_button" onClick={proimage}>
                      Save
                    </button>
                  </div>

                  <label htmlFor="pic_upload">
                    <div className="profile_pic_center">
                      {imgPre === "" && userDetails.profilepicimage === "" ? (
                        <div className="profile_pic"></div>
                      ) : imgPre === "" &&
                        userDetails.profilepicimage !== "" ? (
                        <img
                          src={userDetails.profilepicimage}
                          className="profile_pic"
                          alt=""
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <img
                          src={imgPre}
                          className="profile_pic"
                          style={{ objectFit: "cover" }}
                          alt=""
                        />
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="pic_upload"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={profilestateupload}
                  />
                  <div className="warning">
                    <p>*To Update Your Profile Click on Save Button</p>
                  </div>
                  <div className="profie_update">
                    <div>
                      <form className="regi_form" method="POST">
                        <div className="regi_in">
                          <input
                            type="text"
                            placeholder={userDetails.name}
                            className="regi_input_profile"
                            name="name"
                            autoComplete="off"
                            maxlength="27"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="regi_in">
                          <input
                            type="text"
                            placeholder={
                              userDetails.Bio === "" ? "Bio" : userDetails.Bio
                            }
                            className="regi_input_profile"
                            name="Bio"
                            autoComplete="off"
                            maxlength="28"
                            onChange={(e) => setBio(e.target.value)}
                          />
                        </div>
                        <div className="regi_in">
                          <input
                            type="text"
                            placeholder={
                              userDetails.Location === ""
                                ? "Location"
                                : userDetails.Location
                            }
                            className="regi_input_profile"
                            name="Location"
                            autoComplete="off"
                            maxlength="27"
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="profile_details">
              <div
                className={Night ? "all_profdetails_day" : "all_profdetails"}
              >
                {userDetails.Bio === "" ? (
                  <p className="bio_details" style={{ display: "none" }}>
                    {userDetails.Bio}
                  </p>
                ) : (
                  <p className={Night ? "bio_details_day" : "bio_details"}>
                    {userDetails.Bio}
                  </p>
                )}
                {userDetails.Location === "" ? (
                  <p style={{ display: "none" }}>
                    <i className="fas fa-map-marker-alt"></i>
                    {userDetails.Location}
                  </p>
                ) : (
                  <p style={{ marginBottom: "0.5rem" }}>
                    <i className="fas fa-map-marker-alt"></i>
                    {userDetails.Location}
                  </p>
                )}
              </div>
              <div className={Night ? "followers_day" : "followers"}>
                {userDetails.followers === undefined ? (
                  <>
                    0 <p>Followers</p>
                  </>
                ) : (
                  <>
                    {userDetails.followers.length}{" "}
                    <p onClick={() => navigate("/followers")}>Followers</p>
                  </>
                )}

                {userDetails.following === undefined ? (
                  <>
                    0 <p>Following</p>
                  </>
                ) : (
                  <>
                    {userDetails.following.length}{" "}
                    <p onClick={() => navigate("/following")}>Following</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="tweets">
            {newtweetdata
              .slice(0)
              .reverse()
              .map((item) => {
                return (
                  <div
                    className={Night ? "all_tweets_day" : "all_tweets"}
                    key={item.id}
                  >
                    <div className="text_tweets">
                      <img
                        src={userDetails.profilepicimage}
                        className="avatar"
                        alt=""
                        style={{ objectFit: "cover" }}
                      />
                      <div className="tweet_area">
                        <div className="user_name">
                          <h3 style={{ fontWeight: "600" }}>{item.name}</h3>
                          <div>
                            <p
                              style={{
                                color: "rgb(85, 83, 83)",
                                marginLeft: "3px",
                              }}
                            >
                              @{item.username} · {item.Date} · {item.time}
                            </p>
                          </div>
                        </div>
                        <div className="main_tweet">
                          {item.image === "" ? (
                            <p>{item.tweet}</p>
                          ) : item.tweet === "" ? (
                            <>
                              <div className="tweet_image">
                                <img src={item.image} alt="" />
                              </div>
                            </>
                          ) : (
                            <>
                              <p>{item.tweet}</p>
                              <div className="tweet_image">
                                <img src={item.image} alt="" />
                              </div>
                            </>
                          )}
                        </div>
                        <div className="tweet_icons">
                          {item.hdata.includes(userDetails.email) ? (
                            <>
                              <i
                                className="fas fa-heart"
                                style={{ color: "rgb(249, 24, 128)" }}
                                onClick={() => unlike(item.id)}
                              ></i>
                            </>
                          ) : (
                            <>
                              <i
                                className="far fa-heart"
                                onClick={() => like(item.id)}
                              ></i>
                            </>
                          )}
                          {item.hdata.length > 0 ? (
                            <p className="Like_number">{item.hdata.length}</p>
                          ) : (
                            <p
                              className="Like_number"
                              style={{ color: "black" }}
                            >
                              {item.hdata.length}
                            </p>
                          )}

                          {userDetails.bookmark.includes(item.id) ? (
                            <i
                              className="fas fa-bookmark"
                              onClick={() =>
                                dispatch({
                                  type: "UnBookmark",
                                  payload: item.id,
                                })
                              }
                            ></i>
                          ) : (
                            <i
                              className="far fa-bookmark"
                              onClick={() =>
                                dispatch({
                                  type: "Bookmark",
                                  payload: item.id,
                                })
                              }
                            ></i>
                          )}
                          <i
                            className="fas fa-trash"
                            onClick={() => Delete(item.id)}
                          ></i>
                        </div>
                      </div>
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

export default Profile;
