import { UserEntity } from "../../entities/UserEntity";
import { IUsersResponseDTO, IToggleStautsDTO, IUpdateUserDTO } from "../../dtos/adminDTO";
import { RegisterUserDTO } from "../../dtos/UserDTO";

export interface IAdminRepository {
  fetchAllUsers(): Promise<IUsersResponseDTO[]>;
  fetchUsersCount(): Promise<number>;
  fetchActiveUsersCount(): Promise<number>;
  fetchBlockedUsersCount(): Promise<number>;
  updateUserStauts(data: IToggleStautsDTO): Promise<void>;
  deleteUser(id: string): Promise<void>;
  updateUser(data:IUpdateUserDTO):Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
  createUser(user: RegisterUserDTO): Promise<void>;
}
