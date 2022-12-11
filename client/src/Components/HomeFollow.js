import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { TweetVal } from "../Context/FetchContext";
import Connectcompo from "./Connect/Connectcompo";
import "./HomeFollow.css";

const HomeFollow = () => {
  const location = useLocation();

  const {
    Emojitate: { Emoji, Night },
    Emojidispatch,
  } = TweetVal();

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
        <Connectcompo />
      </div>
      <div className={Night ? "seemore_day" : "seemore"}>
        <Link to="/connect" className={Night ? "for_link_day" : "for_link"}>
          <p>See More</p>
        </Link>
      </div>
    </div>
  );
};

export default memo(HomeFollow);
