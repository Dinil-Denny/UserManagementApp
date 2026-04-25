import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    profileImgURL: { type: String , default:''},
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    refreshToken: {type: String},
    isGoogleAuth: {type: Boolean, default:false},
  },
  { timestamps: true },
);

export const UserModel = model("Users", userSchema);
