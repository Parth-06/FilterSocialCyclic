import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Photo = () => {
  const location = useLocation();
  const { profileimg } = location.state;
  const navigate = useNavigate();
  return (
    <div className="profile_photo">
      <i
        className="fas fa-times"
        style={{ marginBottom: "30rem" }}
        onClick={() => navigate(-1)}
      ></i>
      <img
        src={profileimg}
        className="profile_image_large"
        style={{ objectFit: "cover" }}
        alt=""
      />
    </div>
  );
};

export default Photo;
