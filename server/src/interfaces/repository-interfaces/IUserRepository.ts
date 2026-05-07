import { UserEntity } from "../../entities/UserEntity";
// import { OtpEntity } from "../../entities/OtpEntity";
import {
  RegisterUserDTO,
  OtpDTO,
  SaveOtpDTO,
  RefreshTokenDTO,
  ResetPassDTO,
  updateProfileImgDTO,
  updateProfileDTO,
  OtpDocResponseDTO
} from "../../dtos/UserDTO";

export interface IUserRepository {
  createUser(user: RegisterUserDTO): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  saveOtp(data: SaveOtpDTO): Promise<void>;
  findOtp(email: string): Promise<OtpDocResponseDTO | null>;
  deleteOtp(email: string): Promise<void>;
  markAsVerified(email: string): Promise<void>;
  updateRefreshToken(data: RefreshTokenDTO): Promise<UserEntity | null>;
  removeRefreshToken(token: string): Promise<void>;
  tokenExist(id: string): Promise<string | null>;
  updatePassword(data: ResetPassDTO): Promise<void>;
  updateProfileImg(data:updateProfileImgDTO): Promise<void>;
  updateProfile(data:updateProfileDTO): Promise<UserEntity | null>;
}
