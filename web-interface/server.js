const express = require("express");
const app = express();

const path = require("path");
const router = require("./routes/router");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.listen(3000, () => {
  console.log("Started at http://localhost:3000");
});
