import { UserEntity } from "../../entities/UserEntity";
import { OtpEntity } from "../../entities/OtpEntity";
import { IUserRepository } from "../../interfaces/repository-interfaces/IUserRepository";
import { UserModel } from "../../models/user/userSchema";
import { OtpModel } from "../../models/user/otpSchema";
import {
  RegisterUserDTO,
  LoginUserDTO,
  OtpDTO,
  SaveOtpDTO,
} from "../../dtos/UserDTO";

export class UserRepository implements IUserRepository {
  //creating user document
  async createUser(user: RegisterUserDTO): Promise<void> {
    console.log("user:", user);
    await UserModel.create(user);
    console.log("user created - repository");
    //return new UserEntity(createdUser.id, createdUser.email, createdUser.password, createdUser.role, createdUser.isBlocked, createdUser.createdAt);
  }
  //find a document by email
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return null;
    }
    return user as UserEntity;
  }
  //saving otp document
  async saveOtp(otpData: SaveOtpDTO): Promise<void> {
    await OtpModel.create(otpData);
    console.log("otp doc created - repository");
  }
  //finding otp document
  async findOtp(email: string): Promise<OtpEntity | null> {
    const otp = await OtpModel.findOne({ email: email });
    if (!otp) return null;
    return otp as OtpEntity;
  }
  //deleting the otp document
  async deleteOtp(email: string): Promise<void> {
    await OtpModel.findOneAndDelete({ email: email });
  }
  //updating user document as verified
  async markAsVerified(email: string): Promise<void> {
    await UserModel.findOneAndUpdate(
      { email },
      { $set: { isVerified: true } },
      { new: true },
    );
    console.log("marked as verified");
  }
}
