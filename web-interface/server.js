const express = require("express")
const app = express()

const path = require("path")
const routes = require("./routes/routes")

app.set("view engine","ejs")

app.use(express.static(path.join(__dirname,"public")))

app.use(routes)

app.listen(3000,()=>{
  console.log("3000 portunda çalışıyor")
})