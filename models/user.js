const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    number: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    password:{
        type:String
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)