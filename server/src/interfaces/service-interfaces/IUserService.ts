import { LoginUserDTO, RegisterUserDTO, OtpDTO, ResetPassDTO, updateProfileDTO } from "../../dtos/UserDTO";
import { OtpEntity } from "../../entities/OtpEntity";
import { UserEntity } from "../../entities/UserEntity";

export interface IUserService {
  userLogin(data: LoginUserDTO): Promise<any>;
  userLogout(token: string): Promise<void>;
  registerUser(data: RegisterUserDTO): Promise<UserEntity | null | void>;
  verifyOtp(data: OtpDTO): Promise<OtpEntity>;
  reSendOtp(email: string): Promise<void>;
  recreateAccessToken(token: string): Promise<string>;
  resetPasswordVerifyOtp(data: OtpDTO): Promise<void>;
  resetPassword(data:ResetPassDTO): Promise<void>;
  googleAuth(token:string):Promise<any>;
  editProfile(updatedData:updateProfileDTO):Promise<UserEntity>
}
