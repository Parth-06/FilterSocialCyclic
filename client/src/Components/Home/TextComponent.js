import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Spinner from "../Spinner";
import useFetchToken from "../CustomHooks/UseFetchToken";
import { TweetVal } from "../../Context/FetchContext";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const TextComponent = () => {
  const navigate = useNavigate();
  const {
    Emojitate: { Emoji, Night },
    Emojidispatch,
  } = TweetVal();
  const [text, settext] = useState("");
  const [userDetails] = useFetchToken();
  const [img, setimg] = useState();
  const [imgPre, setimgPre] = useState("");

  const d = new Date();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const tdate = d.getDate();
  const year = d.getFullYear().toString().slice(-2);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const m = new Date();
  let month = months[m.getMonth()];
  const fulldate = tdate + " " + month + " " + year;
  const time = hours + ":" + minutes;

  const addItem = async () => {
    if (imgPre !== "") {
      const newText = {
        id: new Date().getTime().toString(),
        tweet: text,
        email: userDetails.email,
        username: userDetails.username,
        image: imgPre,
        name: userDetails.name,
        hdata: [],
        profilepicimage: userDetails.profilepicimage,
        Date: fulldate,
        time,
      };

      Emojidispatch({
        type: "TWEETS",
        payload: newText,
      });
      settext("");
      setimgPre("");
      toast.success("Tweeted Successfully");
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "filtersocialimages");
      data.append("cloud_name", "filtersocialnew");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/filtersocialnew/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const dataaa = await res.json();
      const ress = await fetch("/alltweetsimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          t_id: newText.id,
          mtweet: newText.tweet,
          url: dataaa.secure_url,
          Date: fulldate,
          time,
        }),
      });

      const imagedata = await ress.json();

      if (res.status === 422 || !imagedata) {
        console.log("invalid");
        toast.error("Cannot Upload Image");
      }
    } else {
      if (!text) {
        toast.error("Please write Somthing in the textbox");
      } else {
        const newText = {
          id: new Date().getTime().toString(),
          tweet: text,
          email: userDetails.email,
          username: userDetails.username,
          image: "",
          name: userDetails.name,
          hdata: [],
          profilepicimage: userDetails.profilepicimage,
          Date: fulldate,
          time,
        };
        Emojidispatch({
          type: "TWEETS",
          payload: newText,
        });
        settext("");
        toast.success("Tweeted Successfully");
        const t_id = newText.id;
        const mtweet = newText.tweet;

        const res = await fetch("/alltweets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            t_id,
            mtweet,
            Date: fulldate,
            time,
          }),
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
          console.log("invalid");
          toast.error("Cannot Upload Image");
        }
      }
    }
  };
  const imageupload = async (event) => {
    if (event.target.files[0].size <= "5242880") {
      setimg(event.target.files[0]);
    } else {
      toast.error("Please Upload less than 10 MB Images");
    }
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

  const emojiPicker = (emoji) => {
    settext(text + emoji.native);
  };
  return (
    <>
      {userDetails === undefined ||
      userDetails.profilepicimage === undefined ? (
        <div className="spinnerstyle">
          <Spinner />
        </div>
      ) : (
        <div className={Night ? "home_input_day" : "home_input"}>
          <img
            src={userDetails.profilepicimage}
            className="avatar"
            onClick={() => navigate("/profile")}
            alt=""
            style={{ objectFit: "cover" }}
          />

          <div
            className="input"
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
            <TextareaAutosize
              className={Night ? "input_text_day" : "input_text"}
              value={text}
              placeholder="What's happening?"
              maxLength="150"
              spellCheck="false"
              onChange={(e) => settext(e.target.value)}
              minRows={1.5}
              maxRows={6}
            />
            {imgPre === "" ? (
              <></>
            ) : (
              <>
                <div className="imgPreviev">
                  <div className="close" onClick={() => setimgPre("")}>
                    X
                  </div>
                  <img src={imgPre} alt="" />
                </div>
              </>
            )}

            <div className="all_icons">
              <div className="upload_icons">
                <label htmlFor="file-upload" className="custom-file-upload">
                  <i className="fas fa-image"></i>
                </label>
                <input
                  type="file"
                  id="file-upload"
                  accept="image/png, image/jpg, image/gif, image/jpeg"
                  onChange={imageupload}
                />
                <i
                  className="fas fa-smile"
                  onClick={() =>
                    Emojidispatch({
                      type: "EMOJI",
                    })
                  }
                ></i>
                {Emoji === true ? (
                  <div className="emojiPic">
                    <Picker
                      data={data}
                      onEmojiSelect={emojiPicker}
                      maxFrequentRows={2}
                      searchPosition="none"
                      previewPosition="none"
                      emojiSize="23"
                    />
                  </div>
                ) : (
                  ""
                )}
                <h4>Limit: 150 Characters</h4>
              </div>
              <button
                onClick={addItem}
                className="home_button"
                disabled={!text && imgPre === ""}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TextComponent;
