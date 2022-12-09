import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TweetVal } from "../../Context/FetchContext";
import useFetch from "../CustomHooks/useFetch";
import "./Connect.css";
import Connectcompo from "./Connectcompo";

const Connect = () => {
  const navigate = useNavigate();
  const {
    Emojitate: { Night },
  } = TweetVal();
  const [userDetails, setUserDetails] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [userTokenData] = useFetch();
  const { newData } = TweetVal();
  useEffect(() => {
    setUserDetails(userTokenData);
  }, [userTokenData]);

  useEffect(() => {
    const Fetchtweet = async () => {
      const res = await fetch("/connect", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUserdata(data);
    };
    Fetchtweet();
  }, [newData]);

  return (
    <div className={Night ? "connect_home_main_day" : "connect_home_main"}>
      <div className="connect_header">
        <h1 style={{ cursor: "pointer" }}>
          <i onClick={() => navigate("/")} className="fas fa-arrow-left"></i>
          Connect
        </h1>
      </div>
      <div className="connectcompo">
        <Connectcompo userDetails={userDetails} userdata={userdata} />
      </div>
    </div>
  );
};

export default Connect;
