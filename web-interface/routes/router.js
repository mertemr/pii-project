const express = require("express");
require("dotenv").config();

const router = express.Router();

API_URL = `http://${process.env.API_URL}`;

let last_moisture_level = "Ölçülüyor...";

router.get("/", (req, res) => {
  return res.render("index.ejs", { moisture_level: last_moisture_level });
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
      let ml = data.moisture_level;
      last_moisture_level = ml;
      return res.json({ moisture_level: ml });
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
  }).then((response) => {
    console.log(response);
    if (response.ok) {
      return res.redirect("/");
    } else {
      return res.render("index.ejs", { error: "Something go wrong." });
    }
  });
});

module.exports = router;
