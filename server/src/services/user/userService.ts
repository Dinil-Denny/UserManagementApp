import { RegisterUserDTO, LoginUserDTO } from "../../dtos/UserDTO";
import { UserEntity } from "entities/UserEntity";
import { IUserRepository } from "../../interfaces/repository-interfaces/IUserRepository";
import { IUserService } from "../../interfaces/service-interfaces/IUserService";


export class UserService implements IUserService{
    constructor(private userRepository: IUserRepository){};

    async registerUser(data: RegisterUserDTO): Promise<UserEntity | null> {
        
    }

    async userLogin(data: LoginUserDTO): Promise<any> {
        
    }
}