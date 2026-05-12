import { UserModel } from "../../models/user/userSchema";
import { IAdminRepository } from "../../interfaces/repository-interfaces/IAdminRepository";
import { IAdminService } from "../../interfaces/service-interfaces/IAdminService";
import {
  IFetchAllUsersResponseDTO,
  IToggleStautsDTO,
} from "../../dtos/adminDTO";

export class AdminService implements IAdminService {
  constructor(private adminRepository: IAdminRepository) {}
  //to get all users data
  async getAllUsers(): Promise<IFetchAllUsersResponseDTO> {
    console.log("reached getAllUsers - adminSevice");
    const users = await this.adminRepository.fetchAllUsers();
    console.log("returned all users:", users);
    const totalUsers = await this.adminRepository.fetchUsersCount();
    const activeUsers = await this.adminRepository.fetchActiveUsersCount();
    const blockedUsers = await this.adminRepository.fetchBlockedUsersCount();
    console.log(
      `totalUsers:${totalUsers},activeUsers:${activeUsers},blockedUsers:${blockedUsers}`,
    );
    const returnData = {
      users: users,
      summary: {
        total: totalUsers,
        active: activeUsers,
        blocked: blockedUsers,
      },
    };
    return returnData;
  }

  //to toggle user status
  async toggleUserStatus(data: IToggleStautsDTO): Promise<void> {
    await this.adminRepository.updateUserStauts(data);
  }

  //delete user
  async deleteUser(id: string): Promise<void> {
    await this.adminRepository.deleteUser(id);
  }
}
