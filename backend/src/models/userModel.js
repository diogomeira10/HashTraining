// userModel.js
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        passwordConfirmation: {
            type: String,
            required: true
        },
        profileImage: {
            type: String,
            required: true
        }

    },
    {
        timestamps:true,
    }
)

module.exports = mongoose.model("Users", userSchema)
