import { UserEntity } from "../../entities/UserEntity";

export interface IUserRepository{
    createUser(user : UserEntity) : Promise<UserEntity>;
    findByEmail(email : string) : Promise<UserEntity | null>;
    // findById(id:string) : Promise<UserEntity | null>;
    // deleteUser(id:string) : Promise<boolean>;
    // editDetails(id:string) : Promise<UserEntity>;
}