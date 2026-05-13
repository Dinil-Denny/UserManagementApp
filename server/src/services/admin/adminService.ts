import { UserModel } from "../../models/user/userSchema";
import { IAdminRepository } from "../../interfaces/repository-interfaces/IAdminRepository";
import { IAdminService } from "../../interfaces/service-interfaces/IAdminService";
import {
  IFetchAllUsersResponseDTO,
  IToggleStautsDTO,
  IUpdateUserDTO,
} from "../../dtos/adminDTO";
import { RegisterUserDTO } from "../../dtos/UserDTO";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";

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

  //update user
  async updateUser(data: IUpdateUserDTO): Promise<void> {
    await this.adminRepository.updateUser(data);
  }

  //add new user
  async addUser(data: RegisterUserDTO): Promise<void> {
    const { username, email, password } = data;
    const userExist = await this.adminRepository.findByEmail(email);
    if (userExist) throw new AppError("User already registered", 409);
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.adminRepository.createUser({
      username: username,
      email: email,
      password: hashedPassword,
    });
  }
}
