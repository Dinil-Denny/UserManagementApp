import { UserEntity } from "../../entities/UserEntity";
import {
  IFetchAllUsersResponseDTO,
  IToggleStautsDTO,
} from "../../dtos/adminDTO";

export interface IAdminService {
  getAllUsers(): Promise<IFetchAllUsersResponseDTO>;
  toggleUserStatus(data: IToggleStautsDTO): Promise<void>;
  deleteUser(id: string): Promise<void>;
}
