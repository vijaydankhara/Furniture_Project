const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profileImage:[{
        type: String,
    }],

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