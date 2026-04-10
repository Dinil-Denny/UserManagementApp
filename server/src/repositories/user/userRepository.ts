import { UserEntity } from "../../entities/UserEntity";
import {IUserRepository} from "../../interfaces/repository-interfaces/IUserRepository";
import {UserModel} from "../../models/user/userSchema";

export class UserRepository implements IUserRepository{

    createUser(user: UserEntity): Promise<UserEntity> {
        
    }

    findByEmail(email: string): Promise<UserEntity | null> {
        
    }

}