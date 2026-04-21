import { Schema, model } from "mongoose";

const otpSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

//using TTL index we can automatically delete expired otp after a time period
//otp will expire after 0 minutes of epriresAt time, ie delete immediatly after reaching expriy time
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); 

export const OtpModel = model('OTP',otpSchema);