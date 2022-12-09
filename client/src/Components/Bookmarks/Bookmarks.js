import React from "react";
import { useNavigate } from "react-router-dom";
import { TweetVal } from "../../Context/FetchContext";
import "./Bookmarks.css";
import TweetsCompo from "./TweetsCompo";
const Bookmarks = () => {
  const navigate = useNavigate();
  const {
    Emojitate: { Night },
  } = TweetVal();
  return (
    <div
      className={Night ? "bookmark_main_day" : "bookmark_main"}
      id="profile_main"
    >
      <div className="bookmark_header">
        <h1 style={{ cursor: "pointer" }}>
          <i onClick={() => navigate("/")} className="fas fa-arrow-left"></i>
          Bookmarks
        </h1>
      </div>
      <TweetsCompo />
    </div>
  );
};

export default Bookmarks;
