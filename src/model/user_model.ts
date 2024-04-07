import mongoose,{ Schema, Document} from "mongoose";

interface IProduct extends Document{
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    password: string;
    mobileNo: number,
    profileImage: string,
    isDelete: boolean;
    isAdmin: boolean;
}



const userSchema: Schema = new Schema<IProduct>({
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
    timestamps: true
});
const userModel = mongoose.model<IProduct>('users',userSchema);

export default userModel