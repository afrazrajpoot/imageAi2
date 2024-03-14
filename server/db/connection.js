const mongoose = require("mongoose")

const connect = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected")
    }catch(err){
        console.log("connection failed",err.message)
    }
}
module.exports = connect