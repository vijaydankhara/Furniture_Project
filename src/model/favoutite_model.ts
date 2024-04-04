import { timeStamp } from "console";
import { version } from "os";

const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    cartItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
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

const favouriteModel =  mongoose.model('favourites', favouriteSchema);
export default favouriteModel