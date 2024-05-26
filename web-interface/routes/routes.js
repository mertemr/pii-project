const express = require("express");
require("dotenv").config();

const router = express.Router();

API_URL = `http://${process.env.API_URL}`;

router.get("/", (req, res) => {
  return res.render("index.ejs", { moisture_level: "0" });
});

router.get("/moisturelevel", (req, res) => {
  fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return res.json({ moisture_level: data.moisture_level });
  })
  .catch((error) => {
    return res.redirect("/");
  });
});
  
router.post("/", (req, res) => {
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ run_pump: true }),
  })
  .then((response) => {
    console.log(response);
    if (response.ok) {
      return res.redirect("/");
    } else {
      return res.render("index.ejs", { error: "Something go wrong." });
    }
  });
});

module.exports = router;
