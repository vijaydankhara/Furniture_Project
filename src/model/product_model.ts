import { types } from "util";

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    category:[{
        type: String,
    }],
    isDelete: {
        type: Boolean,
        default: false
    }

})
const productModel = mongoose.model('products',productSchema);

export default productModel