import { RegisterUserDTO, LoginUserDTO, OtpDTO } from "../../dtos/UserDTO";
import { UserEntity } from "../../entities/UserEntity";
import { IUserRepository } from "../../interfaces/repository-interfaces/IUserRepository";
import { IUserService } from "../../interfaces/service-interfaces/IUserService";
import { AppError } from "../../utils/AppError";
import { generateOTP } from "../../utils/generateOTP";
import bcrypt from "bcrypt";
import sendOtpEmail from "../../utils/sendEmail";

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

  async verifyOtp(data: OtpDTO): Promise<any> {}
}
