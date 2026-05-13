import { UserModel } from "../../models/user/userSchema";
import { IAdminRepository } from "../../interfaces/repository-interfaces/IAdminRepository";
import {
  IUsersResponseDTO,
  IToggleStautsDTO,
  IUpdateUserDTO,
} from "../../dtos/adminDTO";
import { UserEntity } from "../../entities/UserEntity";
import { RegisterUserDTO } from "../../dtos/UserDTO";

export class AdminRepository implements IAdminRepository {
  //fetch all user data
  async fetchAllUsers(): Promise<IUsersResponseDTO[]> {
    console.log("fetching All Users - admin repository");
    const users = await UserModel.find({ role: "user" })
      .select(
        "username email role isBlocked isVerified isGoogleAuth profileImgURL",
      )
      .lean();
    return users.map((user: any) => ({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
      isVerified: user.isVerified,
      isGoogleAuth: user.isGoogleAuth,
      profileImgURL: user.profileImgURL ?? "",
    }));
  }
  //fetch total users count
  async fetchUsersCount(): Promise<number> {
    console.log("fetching all users count");
    return await UserModel.countDocuments({ role: "user" });
  }
  //fetch active users count
  async fetchActiveUsersCount(): Promise<number> {
    console.log("fetching active users");
    return await UserModel.countDocuments({ role: "user", isBlocked: false });
  }
  //fetch blocked users count
  async fetchBlockedUsersCount(): Promise<number> {
    console.log("fetching blocked users");
    return await UserModel.countDocuments({ role: "user", isBlocked: true });
  }
  //update user status - blocked/active
  async updateUserStauts(data: IToggleStautsDTO): Promise<void> {
    console.log(`updating user status to - ${data.isBlocked}`);
    await UserModel.findByIdAndUpdate(
      { _id: data.id },
      { $set: { isBlocked: data.isBlocked } },
    );
  }
  //delete user
  async deleteUser(id: string): Promise<void> {
    console.log("deleting user id: ", id);
    await UserModel.findOneAndDelete({ _id: id });
  }
  //update user data - email and username
  async updateUser(data: IUpdateUserDTO): Promise<void> {
    console.log("data to update: ", data);
    await UserModel.findByIdAndUpdate(
      { _id: data.id },
      { $set: { username: data.username, email: data.email } },
    );
  }
  //find a document by email
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return null;
    }
    return user as UserEntity;
  }
    //creating user document
  async createUser(user: RegisterUserDTO): Promise<void> {
    console.log("user data to add:", user);
    await UserModel.create(user);
    console.log("new user added - repository");
  }
}
