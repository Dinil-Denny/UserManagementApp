import { UserEntity } from "../../entities/UserEntity";
import {
  IFetchAllUsersResponseDTO,
  IToggleStautsDTO,
  IUpdateUserDTO
} from "../../dtos/adminDTO";

export interface IAdminService {
  getAllUsers(): Promise<IFetchAllUsersResponseDTO>;
  toggleUserStatus(data: IToggleStautsDTO): Promise<void>;
  deleteUser(id: string): Promise<void>;
  updateUser(data:IUpdateUserDTO): Promise<void>;
}
