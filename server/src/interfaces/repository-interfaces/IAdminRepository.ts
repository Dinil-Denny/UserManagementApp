import { UserEntity } from "../../entities/UserEntity";
import { IUsersResponseDTO } from "../../dtos/adminDTO";

export interface IAdminRepository{
    fetchAllUsers():Promise<IUsersResponseDTO[]>;
    fetchUsersCount():Promise<number>;
    fetchActiveUsersCount():Promise<number>;
    fetchBlockedUsersCount():Promise<number>;
};