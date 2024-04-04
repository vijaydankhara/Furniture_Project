import { types } from "util";

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        enum: ['Male','Female']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    mobileNo: {
        type: Number
    },
    profileImage:{
        type: String,
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    }

},

{
    versionKey: false,
    timeStamps: true
    });
const userModel = mongoose.model('users',userSchema);

export default userModel