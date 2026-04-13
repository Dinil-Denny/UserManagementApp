import { LoginUserDTO, RegisterUserDTO } from "../../dtos/UserDTO";
import { UserEntity } from "../../entities/UserEntity";

export interface IUserService{
    userLogin(data:LoginUserDTO) : Promise<any>;
    registerUser(data:RegisterUserDTO) : Promise<UserEntity | null | void>;
}