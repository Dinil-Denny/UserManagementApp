import { UserEntity } from "../../entities/UserEntity";
import {IUserRepository} from "../../interfaces/repository-interfaces/IUserRepository";
import {UserModel} from "../../models/user/userSchema";
import { RegisterUserDTO, LoginUserDTO } from "../../dtos/UserDTO";

export class UserRepository implements IUserRepository{

    async createUser(user: RegisterUserDTO): Promise<void>{
        await UserModel.create(user);
        //return new UserEntity(createdUser.id, createdUser.email, createdUser.password, createdUser.role, createdUser.isBlocked, createdUser.createdAt);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await UserModel.findOne({email:email});
        if (!user) {
            return null;
        }
        return user as UserEntity;
    }

}