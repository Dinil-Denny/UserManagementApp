import { UserEntity } from "../../entities/UserEntity";
import { OtpEntity } from "../../entities/OtpEntity";
import { IUserRepository } from "../../interfaces/repository-interfaces/IUserRepository";
import { UserModel } from "../../models/user/userSchema";
import { OtpModel } from "../../models/user/otpSchema";
import { RegisterUserDTO, LoginUserDTO, OtpDTO } from "../../dtos/UserDTO";

export class UserRepository implements IUserRepository {
  async createUser(user: RegisterUserDTO): Promise<void> {
    console.log("user:", user);
    console.log("model:", UserModel);
    await UserModel.create(user);
    console.log("user created - repository");
    //return new UserEntity(createdUser.id, createdUser.email, createdUser.password, createdUser.role, createdUser.isBlocked, createdUser.createdAt);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return null;
    }
    return user as UserEntity;
  }

  async findOtp(email: string): Promise<OtpEntity | null> {
    const otp = await OtpModel.findOne({ email: email });
    if (!otp) return null;
    return otp as OtpEntity;
  }

  async saveOtp(otpData: OtpDTO): Promise<void> {
    await OtpModel.create(otpData);
    console.log("otp doc created - repository");
  }
}
