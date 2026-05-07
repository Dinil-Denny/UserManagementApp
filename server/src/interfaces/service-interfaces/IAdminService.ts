import { UserEntity } from "../../entities/UserEntity";
import { IFetchAllUsersResponseDTO } from "../../dtos/adminDTO";

export interface IAdminService{
    getAllUsers():Promise<IFetchAllUsersResponseDTO>;
}