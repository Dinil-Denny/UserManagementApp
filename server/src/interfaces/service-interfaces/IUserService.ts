import { LoginUserDTO, RegisterUserDTO, OtpDTO } from "../../dtos/UserDTO";
import { OtpEntity } from "../../entities/OtpEntity";
import { UserEntity } from "../../entities/UserEntity";

export interface IUserService {
  userLogin(data: LoginUserDTO): Promise<any>;
  registerUser(data: RegisterUserDTO): Promise<UserEntity | null | void>;
  verifyOtp(data: OtpDTO): Promise<OtpEntity>;
  reSendOtp(email:string) : Promise<void>;
}
