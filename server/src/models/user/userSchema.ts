import {Schema,model} from "mongoose";

const userSchema = new Schema({
    name : {type : String,required : true},
    email : {type : String,required : true,unique : true},
    password : {type : String,required : true},
    profileImgURL : {type : String},
    role : {type : String,enum : ['user','admin'],default : 'user'},
    isBlocked : {type : Boolean,default : false},
},{timestamps: true}
);

export const Users = model('Users',userSchema);