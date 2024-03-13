require("dotenv").config()
const app = require("./app")

const db = require("./db/connection.js")
db();
app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})