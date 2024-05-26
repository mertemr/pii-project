const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    res.render("index.ejs")
})

router.post("/",(req,res)=>{
    console.log("post işlemi")
    res.end()
})


module.exports = router;