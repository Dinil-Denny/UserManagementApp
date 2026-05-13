import { UserEntity } from "../../entities/UserEntity";
import {
  IFetchAllUsersResponseDTO,
  IToggleStautsDTO,
  IUpdateUserDTO,
} from "../../dtos/adminDTO";
import { RegisterUserDTO } from "../../dtos/UserDTO";

export interface IAdminService {
  getAllUsers(): Promise<IFetchAllUsersResponseDTO>;
  toggleUserStatus(data: IToggleStautsDTO): Promise<void>;
  deleteUser(id: string): Promise<void>;
  updateUser(data: IUpdateUserDTO): Promise<void>;
  addUser(data: RegisterUserDTO): Promise<void>;
}
