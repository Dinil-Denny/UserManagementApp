import {
  RegisterUserDTO,
  LoginUserDTO,
  OtpDTO,
  SaveOtpDTO,
  RefreshTokenDTO,
} from "../../dtos/UserDTO";
import { UserEntity } from "../../entities/UserEntity";
import { IUserRepository } from "../../interfaces/repository-interfaces/IUserRepository";
import { IUserService } from "../../interfaces/service-interfaces/IUserService";
import { AppError } from "../../utils/AppError";
import { generateOTP } from "../../utils/generateOTP";
import bcrypt from "bcrypt";
import sendOtpEmail from "../../utils/sendEmail";
import { OtpEntity } from "../../entities/OtpEntity";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async registerUser(data: RegisterUserDTO): Promise<UserEntity | null | void> {
    const { username, email, password } = data;
    //console.log('user-register-service:',username,email,password)
    const userExist = await this.userRepository.findByEmail(email);
    //console.log('userExist:',userExist);
    if (userExist) throw new AppError("User already registered", 409);
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log('pass:',hashedPassword);
    //creating user at DB
    await this.userRepository.createUser({
      username: username,
      email: email,
      password: hashedPassword,
    });
    console.log("user created - service");
    const otp: string = generateOTP();
    const otpData = {
      email: email,
      otp: otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    };
    //saving otp document in DB
    await this.userRepository.saveOtp(otpData);
    console.log("otp done - service");
    await sendOtpEmail(otp, email); //sending mail with otp
    console.log("mail send - service");
  }

  async userLogin(data: LoginUserDTO): Promise<any> {
    console.log("login data - service", data);
    const { email, password } = data;
    const userExist = await this.userRepository.findByEmail(email);
    console.log("userExist :", userExist);
    //if not email registered
    if (!userExist) {
      throw new AppError("Invalid credentials", 401);
    }
    //if user's email is not verified
    if (!userExist.isVerified) {
      const otp: string = generateOTP(); //generate otp
      const otpData = {
        email: email,
        otp: otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      };
      //saving otp document in DB
      await this.userRepository.saveOtp(otpData);
      await sendOtpEmail(otp, email); //sending mail with otp
      throw new AppError(
        "Account not verified. A new OTP has been sent to your email.",
        403,
        "USER_NOT_VERIFIED",
      );
    }
    //throw error if user is blocked
    if (userExist.isBlocked) {
      throw new AppError("Account blocked", 403);
    }
    //comapring password
    const passMatch = await bcrypt.compare(password, userExist.password);
    //if passwords don't match
    if (!passMatch) {
      throw new AppError("Invalid credentials", 401);
    }
    //generate access token and refresh token
    const accessToken = generateAccessToken({
      id: userExist.id,
      role: userExist.role,
    });
    const refreshToken = generateRefreshToken(userExist.id);
    //update the refresh token in db
    const refreshTokenUpdateData: RefreshTokenDTO = {
      id: userExist.id,
      token: refreshToken,
    };
    const user = await this.userRepository.updateRefreshToken(
      refreshTokenUpdateData,
    );
    console.log(
      "user,accesstoken,refreshtoken - service:",
      user,
      accessToken,
      refreshToken,
    );
    return { user, accessToken, refreshToken };
  }

  async verifyOtp(data: OtpDTO): Promise<OtpEntity> {
    const { otp, email } = data;
    console.log("otp,email-verify otp service", otp, email);
    const otpExists = await this.userRepository.findOtp(email);
    if (!otpExists) {
      throw new AppError("OTP Expired", 404);
    }
    if (otp !== otpExists.otp) {
      throw new AppError("Invalid OTP", 401);
    } else {
      //if otp exist and it is verified then update isVerified field in user document to true
      await this.userRepository.markAsVerified(email);
      console.log("marked as verified - service");
      await this.userRepository.deleteOtp(email);
      return otpExists;
    }
  }

  async reSendOtp(email: string): Promise<void> {
    //first check if already an otp exist for this user
    const otpExist = await this.userRepository.findOtp(email);
    //if already otp exists for user delete it to store new created one
    if (otpExist) {
      await this.userRepository.deleteOtp(email);
    }
    //creating new otp
    const otp: string = generateOTP();
    const otpData = {
      email: email,
      otp: otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    };
    //saving otp document in DB
    await this.userRepository.saveOtp(otpData);
    console.log("otp done - service");
    await sendOtpEmail(otp, email); //sending mail with otp
    console.log("mail send - service");
  }

  async userLogout(refreshToken: string): Promise<void> {
    await this.userRepository.removeRefreshToken(refreshToken);
    console.log("removed refreshToken in DB - service");
  }

  async recreateAccessToken(refreshToken: string): Promise<string> {
    //decode the refresh token to get user id
    const decode: { id: string } = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as { id: string };
    const userExist = await this.userRepository.findById(decode.id);
    if (!userExist?.refreshToken) {
      throw new AppError("Refresh token revoked or invalid", 401);
    }
    //generate access token and refresh token
    const newAccessToken = generateAccessToken({
      id: userExist.id,
      role: userExist.role,
    });
    return newAccessToken;
  }
}
