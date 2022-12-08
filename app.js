const dotenv = require("dotenv");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

dotenv.config({ path: "./config.env" });
require("./DB/conn");

app.use("/uploads", express.static("/uploads"));
app.use(express.json());
app.use(cors());

app.use(require("./router/auth"));
app.use(require("./router/LoginRegiAuth"));
app.use(require("./router/PostfetchAuth"));
app.use(require("./router/ProfileAuth"));
app.use(require("./router/UserProfileAuth.js"));
app.use(require("./router/FollowUnFollowAuth.js"));

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listning At ${PORT}`);
});
