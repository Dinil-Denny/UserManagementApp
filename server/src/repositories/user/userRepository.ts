import { UserEntity } from "../../entities/UserEntity";
// import { OtpEntity } from "../../entities/OtpEntity";
import { IUserRepository } from "../../interfaces/repository-interfaces/IUserRepository";
import { UserModel } from "../../models/user/userSchema";
import { OtpModel } from "../../models/user/otpSchema";
import {
  RegisterUserDTO,
  LoginUserDTO,
  OtpDTO,
  SaveOtpDTO,
  RefreshTokenDTO,
  ResetPassDTO,
  updateProfileImgDTO,
  updateProfileDTO,
  OtpDocResponseDTO
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

  async findById(id: string): Promise<UserEntity | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;
    return user as UserEntity;
  }

  //saving otp document
  async saveOtp(otpData: SaveOtpDTO): Promise<void> {
    await OtpModel.create(otpData);
    console.log("otp doc created - repository");
  }

  //finding otp document
  async findOtp(email: string): Promise<OtpDocResponseDTO | null> {
    const otp = await OtpModel.findOne({ email: email });
    if (!otp) return null;
    return otp as OtpDocResponseDTO;
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
      { returnDocument: 'after' },
    );
    console.log("marked as verified");
  }

  //Storeing refresh token in the DB to track active sessions
  async updateRefreshToken(data: RefreshTokenDTO): Promise<UserEntity | null> {
    return await UserModel.findByIdAndUpdate(
      data.id,
      {$set:{ refreshToken: data.token} }, // added $set --------*****-----------
      { returnDocument: 'after' },
    );
  }

  //remove refresh token while logout
  async removeRefreshToken(token: string): Promise<void> {
    console.log("removing refreshToken in DB - repository");
    await UserModel.findOneAndUpdate(
      { refreshToken: token },
      { $set: { refreshToken: "" } },
      { returnDocument: 'after' },
    );
  }

  //checking for refresh token
  async tokenExist(id: string): Promise<string | null> {
    const user: UserEntity | null = await UserModel.findById(id);
    return user?.refreshToken?.toString() ?? null;
  }

  //reset password - updating password
  async updatePassword(data: ResetPassDTO): Promise<void> {
    const { email, password } = data;
    await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { password: password } },
      { returnDocument: 'after' },
    );
  }

  //update profile image
  async updateProfileImg(data:updateProfileImgDTO): Promise<void>{
    const {email,imgUrl} = data;
    await UserModel.findOneAndUpdate({emai:email},{$set:{profileImgURL:imgUrl}});
  }

  //update user profile
  async updateProfile(data:updateProfileDTO): Promise<UserEntity | null>{
    console.log('data in updateProfile - repository:',data);
    const {id,username,profileImgURL} = data;
    const dataToUpdate: {username: string; profileImgURL?: string} = {username};
    if(profileImgURL !== undefined){
      dataToUpdate.profileImgURL = profileImgURL;
    };
    return await UserModel.findByIdAndUpdate(id,{$set:dataToUpdate},{ returnDocument: 'after' });
  }
}
