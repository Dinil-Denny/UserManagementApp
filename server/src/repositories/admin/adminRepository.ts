import { UserModel } from "../../models/user/userSchema";
import { IAdminRepository } from "../../interfaces/repository-interfaces/IAdminRepository";
import { IUsersResponseDTO, IToggleStautsDTO, IUpdateUserDTO } from "../../dtos/adminDTO";
import id from "zod/v4/locales/id.js";

export class AdminRepository implements IAdminRepository {
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
  async fetchUsersCount(): Promise<number> {
    console.log("fetching all users count");
    return await UserModel.countDocuments({ role: "user" });
  }
  async fetchActiveUsersCount(): Promise<number> {
    console.log("fetching active users");
    return await UserModel.countDocuments({ role: "user", isBlocked: false });
  }
  async fetchBlockedUsersCount(): Promise<number> {
    console.log("fetching blocked users");
    return await UserModel.countDocuments({ role: "user", isBlocked: true });
  }
  async updateUserStauts(data:IToggleStautsDTO):Promise<void>{
    console.log(`updating user status to - ${data.isBlocked}`);
    await UserModel.findByIdAndUpdate({_id:data.id},{$set:{isBlocked:data.isBlocked}});
  }
  async deleteUser(id:string):Promise<void>{
    console.log('deleting user id: ',id);
    await UserModel.findOneAndDelete({_id:id});
  }
  async updateUser(data:IUpdateUserDTO):Promise<void>{
    console.log('data to update: ',data);
    await UserModel.findByIdAndUpdate({_id:data.id},{$set:{username:data.username,email:data.email}});
  }
}
