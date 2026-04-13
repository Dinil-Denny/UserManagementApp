import { UserEntity } from "../../entities/UserEntity";
import { RegisterUserDTO } from "../../dtos/UserDTO";

export interface IUserRepository{
    createUser(user : RegisterUserDTO) : Promise<void>;
    findByEmail(email : string) : Promise<UserEntity | null>;
    // findById(id:string) : Promise<UserEntity | null>;
    // deleteUser(id:string) : Promise<boolean>;
    // editDetails(id:string) : Promise<UserEntity>;
}