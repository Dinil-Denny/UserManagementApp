import { UserModel } from "../../models/user/userSchema";
import { IAdminRepository } from "../../interfaces/repository-interfaces/IAdminRepository";
import { IUsersResponseDTO } from "../../dtos/adminDTO";

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
}
