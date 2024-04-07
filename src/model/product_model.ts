
import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    category: string[];
    isDelete: boolean;
     
}

const productSchema: Schema = new Schema<IProduct>({
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
    category: [{
        type: String,
    }],
    isDelete: {
        type: Boolean,
        default: false
    }
},
{
    versionKey: false,
    timestamps: true 
});

const productModel = mongoose.model<IProduct>('products', productSchema);

export default productModel;
