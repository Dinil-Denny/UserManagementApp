import {
  RegisterUserDTO,
  LoginUserDTO,
  OtpDTO,
  SaveOtpDTO,
} from "../../dtos/UserDTO";
import { UserEntity } from "../../entities/UserEntity";
import { IUserRepository } from "../../interfaces/repository-interfaces/IUserRepository";
import { IUserService } from "../../interfaces/service-interfaces/IUserService";
import { AppError } from "../../utils/AppError";
import { generateOTP } from "../../utils/generateOTP";
import bcrypt from "bcrypt";
import sendOtpEmail from "../../utils/sendEmail";
import { OtpEntity } from "../../entities/OtpEntity";

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

  async userLogin(data: LoginUserDTO): Promise<any> {}

  async verifyOtp(data: OtpDTO): Promise<OtpEntity> {
    const { otp, email } = data;
    console.log('otp,email-verify otp service',otp,email)
    const otpExists = await this.userRepository.findOtp(email);
    if (!otpExists) {
      throw new AppError("OTP Expired", 404);
    }
    if (otp !== otpExists.otp) {
      throw new AppError("Invalid OTP", 401);
    } else {
      //if otp exist and it is verified then update isVerified field in user document to true
      await this.userRepository.markAsVerified(email);
      console.log('marked as verified - service') 
      await this.userRepository.deleteOtp(email);
      return otpExists;
    }
  }

  async reSendOtp(email : string): Promise<void> {
    //first check if already an otp exist for this user
    const otpExist = await this.userRepository.findOtp(email);
    //if already otp exists for user delete it to store new created one
    if(otpExist){
        await this.userRepository.deleteOtp(email);
    };
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
}
