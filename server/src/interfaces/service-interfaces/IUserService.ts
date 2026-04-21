import { LoginUserDTO, RegisterUserDTO, OtpDTO } from "../../dtos/UserDTO";
import { UserEntity } from "../../entities/UserEntity";

export interface IUserService {
  userLogin(data: LoginUserDTO): Promise<any>;
  registerUser(data: RegisterUserDTO): Promise<UserEntity | null | void>;
  verifyOtp(data: OtpDTO): Promise<void>;
  //sendOtp() : Promise<void>;
}
