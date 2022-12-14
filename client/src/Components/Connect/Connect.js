import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { TweetVal } from "../../Context/FetchContext";
import "./Connect.css";
import Connectcompo from "./Connectcompo";

const Connect = () => {
  const navigate = useNavigate();
  const {
    Emojitate: { Night },
  } = TweetVal();

  return (
    <div className={Night ? "connect_home_main_day" : "connect_home_main"}>
      <div className="connect_header">
        <h1 style={{ cursor: "pointer" }}>
          <i onClick={() => navigate("/")} className="fas fa-arrow-left"></i>
          Connect
        </h1>
      </div>
      <div className="connectcompo">
        <Connectcompo />
      </div>
    </div>
  );
};

export default memo(Connect);
