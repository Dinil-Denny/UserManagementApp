import mongoose from "mongoose";
import { IUser } from "entities/UserEntity";

const userSchema = new mongoose.Schema<IUser>({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    profileImgURL : {
        type : String
    },
    role : {
        type : String,
        enum : ['user','admin'],
        default : 'user'
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
},{timestamps: true}
);

export const Users = mongoose.model<IUser>('Users',userSchema);