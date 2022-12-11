import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { ToastContainer } from "react-toastify";
import "./App.css";
import UserProfile from "./Components/Profile/UserProfile";
import Bookmarks from "./Components/Bookmarks/Bookmarks";
import LoginRegi from "./Components/LoginRegiCompo/LoginRegi";
import ProfileUpdate from "./Components/ProfileUpdate/ProfileUpdate";
import Followers from "./Components/Followers/Followers";
import Following from "./Components/Followers/Following";
import Connect from "./Components/Connect/Connect";
import UserFollowing from "./Components/Followers/UserFollowing";
import UserFollowers from "./Components/Followers/UserFollowers";
import MobileTextCompo from "./Components/Home/MobileTextCompo";
import Logout from "./Components/Logout/Logout";
import Photo from "./Components/Profile/Photo";
import HomeFollow from "./Components/HomeFollow";

const Main = () => {
  return (
    <>
      <HashRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/loginRegi" element={<LoginRegi />} />
          <Route path="/profileupdate" element={<ProfileUpdate />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/following" element={<Following />} />
          <Route exact path="/userfollowing" element={<UserFollowing />} />
          <Route exact path="/userfollowers" element={<UserFollowers />} />
          <Route path="/post" element={<MobileTextCompo />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/photo" element={<Photo />} />
        </Routes>
        <HomeFollow />
      </HashRouter>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={0}
        theme="colored"
      />
    </>
  );
};

export default Main;
