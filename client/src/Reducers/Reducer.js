export const initialstate = null;

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  return state;
};

export const EmojiReducer = (state, action) => {
  if (action.type === "EMOJI") {
    return { ...state, Emoji: !state.Emoji };
  }
  if (action.type === "NIGHT") {
    return { ...state, Night: action.payload };
  }
  if (action.type === "TWEETS") {
    return { ...state, ImgTweets: action.payload };
  }
  if (action.type === "LOGGED") {
    return { ...state, ImgTweets: action.payload };
  }
  return state;
};

export const LikesReducer = async (state, action) => {
  switch (action.type) {
    case "Like":
      await fetch("/likevalue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          item_id: action.payload,
        }),
      });
      return action.payload;

    case "UnLike":
      await fetch("/unlikevalue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          item_id: action.payload,
        }),
      });
      return action.payload;

    case "FOLLOW":
      await fetch("/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fusername: action.payload,
        }),
      });

      return action.payload;

    case "UNFOLLOW":
      await fetch("/unfollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          unfusername: action.payload,
        }),
      });

      return action.payload;

    case "Bookmark":
      await fetch("/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          item_id: action.payload,
        }),
      });

      return action.payload;
    case "UnBookmark":
      await fetch("/removebookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          item_id: action.payload,
        }),
      });
      return action.payload;

    default:
      return state;
  }
};
