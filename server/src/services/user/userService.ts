import {
  RegisterUserDTO,
  LoginUserDTO,
  OtpDTO,
  SaveOtpDTO,
  RefreshTokenDTO,
  ResetPassDTO,
  updateProfileDTO,
  OtpDocResponseDTO
} from "../../dtos/UserDTO";
import { UserEntity } from "../../entities/UserEntity";
import { IUserRepository } from "../../interfaces/repository-interfaces/IUserRepository";
import { IUserService } from "../../interfaces/service-interfaces/IUserService";
import { AppError } from "../../utils/AppError";
import { generateOTP } from "../../utils/generateOTP";
import bcrypt from "bcrypt";
import sendOtpEmail from "../../utils/sendEmail";
// import { OtpEntity } from "../../entities/OtpEntity";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { googleClient } from "../../config/googleClient";

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

  async googleAuth(token: string): Promise<any> {
    //Verify the token with Google's servers
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log("ticket:", ticket);

    //Extract user info from the verified Google payload
    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.name)
      throw new AppError("Invalid google token", 400);
    console.log("payload - googleAuth service:", payload);
    const { email, name, picture, sub: googleId } = payload;
    //checking if user exist
    const userExist = await this.userRepository.findByEmail(email);
    //if user exist, check if account is blocked or not
    if (userExist?.isBlocked) {
      //we put ! after the variable to explicitly mention that it will not be null. For sure there will be a value
      throw new AppError("Account is blocked", 403);
    }
    //if user exist and don't have a profile image
    if (!userExist?.profileImgURL && picture) {
      const data = { email: email, imgUrl: picture };
      await this.userRepository.updateProfileImg(data);
    }
    //if user not exist create account
    if (!userExist) {
      console.log("user dose not exist");
      //since here there is no password provided we are going to generate a random passowrd, hasht it and store it.
      //or we can modify schema and do accordingly. But here for easiness we generate a random password and store it.
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      await this.userRepository.createUser({
        username: name,
        email: email,
        password: hashedPassword,
        profileImgURL: picture,
        isGoogleAuth: true,
        isVerified: true,
      });
    }
    const user = await this.userRepository.findByEmail(email);
    console.log('user-googleAuth-service:',user);
    //generate access token and refresh token
    const accessToken = generateAccessToken({
      id: user!.id,
      role: user!.role,
    });
    console.log('created access token-googleAuth')
    const refreshToken = generateRefreshToken(user!.id);
    //update the refresh token in db
    const refreshTokenUpdateData: RefreshTokenDTO = {
      id: user!.id,
      token: refreshToken,
    };
    console.log('created refresh token - googleAuth')
    const updatedUser = await this.userRepository.updateRefreshToken(
      refreshTokenUpdateData,
    );
    console.log('updated user - googleAuth')
    return { updatedUser, accessToken, refreshToken };
  }

  async userLogin(data: LoginUserDTO): Promise<any> {
    console.log("login data - service", data);
    const { email, password } = data;
    const userExist = await this.userRepository.findByEmail(email);
    console.log("userExist :", userExist);
    //if not email registered
    if (!userExist) {
      throw new AppError("User not found!", 404);
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
      throw new AppError("Invalid credentials", 400);
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

  async userLogout(refreshToken: string): Promise<void> {
    await this.userRepository.removeRefreshToken(refreshToken);
    console.log("removed refreshToken in DB - service");
  }

  async verifyOtp(data: OtpDTO): Promise<OtpDocResponseDTO> {
    const { otp, email } = data;
    console.log("otp,email-verify otp service", otp, email);
    const otpExists = await this.userRepository.findOtp(email);
    if (!otpExists) {
      throw new AppError("OTP not found", 404);
    }
    if (otp !== otpExists.otp) {
      throw new AppError("Invalid OTP", 400);
    } else {
      //if otp exist and it is verified then update isVerified field in user document to true
      await this.userRepository.markAsVerified(email);
      console.log("marked as verified - service");
      await this.userRepository.deleteOtp(email);
      return otpExists;
    }
  }

  async resetPasswordVerifyOtp(data: OtpDTO): Promise<void> {
    //1.check if a user with this email exist
    const { otp, email } = data;
    console.log("otp & email in resetPasswordVerifyOtp - service:", otp, email);
    const userExist = await this.userRepository.findByEmail(email);
    console.log("userExists:", userExist);
    if (!userExist) throw new AppError("User does not exist!", 404);
    //2.check if otp exist in otp db
    const otpExist = await this.userRepository.findOtp(email);
    if (!otpExist) throw new AppError("OTP not found", 404);
    //3.validate otp
    if (otp !== otpExist.otp) {
      throw new AppError("Invalid OTP", 400);
    }
    console.log(
      `otp:${otp}, otp in db:${otpExist.otp} - resetPasswordVerifyOtp service`,
    );
  }

  async resetPassword(data: ResetPassDTO): Promise<void> {
    const { email, password } = data;
    const userExist = await this.userRepository.findByEmail(email);
    //console.log('userExist:',userExist);
    if (!userExist) throw new AppError("User not found", 404);
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepository.updatePassword({
      email: email,
      password: hashedPassword,
    });
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

  async editProfile(data:updateProfileDTO):Promise<UserEntity>{
    const updatedUserData = await this.userRepository.updateProfile(data)
    console.log('updated user profile data: ',updatedUserData);
    if(updatedUserData){
      return updatedUserData;
    }else{
      throw new AppError('User not found!',404);
    }
  }
}
