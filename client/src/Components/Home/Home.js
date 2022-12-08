import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "react-toastify/dist/ReactToastify.css";
import TextComponent from "./TextComponent";
import TweetComponent from "./TweetComponent";
import MobileTweetCompo from "./MobileTweetCompo";
import MobileHeader from "../Header/MobileHeader";
import useFetchToken from "../CustomHooks/UseFetchToken";
import { TweetVal } from "../../Context/FetchContext";
const Home = () => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const [userDetails] = useFetchToken();
  const {
    Emojitate: { Night },
  } = TweetVal();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (width >= 1000) {
    return (
      <div className={Night ? "home_main_day" : "home_main"} id="home_main">
        <div className="home_header">
          <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Home
          </h1>
        </div>
        <TextComponent />
        <TweetComponent />
      </div>
    );
  } else {
    return (
      <div className={Night ? "home_main_day" : "home_main"} id="home_main">
        <div className="home_header">
          <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Home
          </h1>
        </div>
        <div className="mobile_header">
          <img
            src={userDetails.profilepicimage}
            className="mobile_avatar"
            alt=""
            onClick={() => {
              setSidebar(true);
            }}
            style={{ objectFit: "cover" }}
          />
          {sidebar && (
            <>
              <div
                className="close_sidebar"
                onClick={() => {
                  setSidebar(false);
                }}
              ></div>
              <div className="mainsidebar">
                <MobileHeader />
              </div>
            </>
          )}
          <div className="mobile_logo">
            <h3>Filter</h3>
            <h3 style={{ color: "orange" }}>Social</h3>
          </div>
          <div className="tweet_logo">
            <i className="fas fa-plus" onClick={() => navigate("/post")}></i>
          </div>
        </div>
        <MobileTweetCompo />
      </div>
    );
  }
};

export default Home;
