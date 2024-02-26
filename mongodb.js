const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:21017/login")
.then (() => {
    console.log("connected")
})
.catch(() => {
    console.log("failure")
})


const logInSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true 
    }

})
const collection = new mongoose.model("collection1",logInSchema)

module.exports = collection