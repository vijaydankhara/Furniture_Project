import { types } from "util";

const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    items: [
      {
        cartItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        qunitity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          default: 1,
        },
      },
    ],

    totalAmount: {
      type: Number,
    },
    isDelete:{
        type: Boolean,
        default: false
    }
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);

const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;
