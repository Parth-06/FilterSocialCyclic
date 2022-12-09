import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextComponent from "../Home/TextComponent";
import { TweetVal } from "../../Context/FetchContext";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    Emojitate: { Emoji, Night },
    Emojidispatch,
  } = TweetVal();

  const [tweetPopup, setTweetPopup] = useState(false);
  const [nighttrigger, setnight] = useState("");

  useEffect(() => {
    let ndata = localStorage.getItem("NightData");
    let newNdata = ndata === "true" ? true : false;

    Emojidispatch({
      type: "NIGHT",
      payload: newNdata,
    });
  }, [nighttrigger]);

  const nightdata = (value) => {
    localStorage.setItem("NightData", JSON.stringify(value));
    setnight(value);
  };
  if (location.pathname === "/login") return null;
  if (location.pathname === "/register") return null;
  if (location.pathname === "/loginRegi") return null;
  if (location.pathname === "/profileupdate") return null;
  if (location.pathname === "/signin") return null;
  if (location.pathname === "/photo") return null;
  return (
    <>
      <nav
        className={Night ? "Header_day" : "Header"}
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
        <div className="sec_header">
          <div
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <h1>FilterSocial</h1>
          </div>
          <ul className={Night ? "navigation_day" : "navigation"}>
            <li onClick={() => navigate("/")}>
              <i className="fas fa-home"></i>Home
            </li>

            <li onClick={() => navigate("/profile")}>
              <i className="far fa-user"></i>Profile
            </li>

            <li onClick={() => navigate("/bookmarks")}>
              <i
                className="far fa-bookmark"
                style={
                  Night
                    ? {
                        color: "black",
                        fontSize: "25px",
                        marginLeft: "0rem",
                      }
                    : {
                        color: "rgb(236, 231, 231)",
                        fontSize: "25px",
                        marginLeft: "0rem",
                      }
                }
              ></i>
              Bookmarks
            </li>

            <li onClick={() => navigate("/followers")}>
              <i className="fas fa-user-plus"></i>Followers
            </li>

            <li onClick={() => navigate("/following")}>
              <i className="fas fa-users"></i>Following
            </li>

            {location.pathname === "/" ? (
              <div className="logou_button" onClick={() => navigate("/logout")}>
                Logout
              </div>
            ) : (
              <li onClick={() => navigate("/logout")}>
                <i className="far fa-times-circle"></i>Logout
              </li>
            )}
          </ul>
          {location.pathname === "/" ? (
            <></>
          ) : (
            <button
              className="tweeet_button"
              onClick={() => {
                setTweetPopup(!tweetPopup);
              }}
            >
              Tweet
            </button>
          )}
          <div className="night_mode">
            <i className="fas fa-moon"></i>
            {Night ? (
              <i
                className="fas fa-toggle-on"
                onClick={() => nightdata(false)}
              ></i>
            ) : (
              <i
                className="fas fa-toggle-off"
                onClick={() => nightdata(true)}
              ></i>
            )}

            <i className="fas fa-sun"></i>
          </div>
          {tweetPopup && (
            <>
              <div
                className="EditProfile"
                onClick={() => {
                  setTweetPopup(false);
                }}
              ></div>
              <div className="mainpopup">
                <div className={Night ? "popup_box_day" : "popup_box"}>
                  <i
                    className="fas fa-times"
                    style={{
                      fontSize: "23px",
                      marginLeft: "1rem",
                      marginBottom: "1rem",
                    }}
                    onClick={() => {
                      setTweetPopup(false);
                    }}
                  ></i>
                  <TextComponent />
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
