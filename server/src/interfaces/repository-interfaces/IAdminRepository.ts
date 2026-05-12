import { UserEntity } from "../../entities/UserEntity";
import { IUsersResponseDTO, IToggleStautsDTO } from "../../dtos/adminDTO";

export interface IAdminRepository{
    fetchAllUsers():Promise<IUsersResponseDTO[]>;
    fetchUsersCount():Promise<number>;
    fetchActiveUsersCount():Promise<number>;
    fetchBlockedUsersCount():Promise<number>;
    updateUserStauts(data:IToggleStautsDTO):Promise<void>
};