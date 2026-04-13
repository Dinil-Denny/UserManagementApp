import { RegisterUserDTO, LoginUserDTO } from "../../dtos/UserDTO";
import { UserEntity } from "../../entities/UserEntity";
import { IUserRepository } from "../../interfaces/repository-interfaces/IUserRepository";
import { IUserService } from "../../interfaces/service-interfaces/IUserService";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";
export class UserService implements IUserService{
    constructor(private userRepository: IUserRepository){};

    async registerUser(data: RegisterUserDTO): Promise<UserEntity | null | void> {
        const {username, email, password} = data;
        const userExist = await this.userRepository.findByEmail(email);
        if(userExist) throw new AppError('User already registered',409);
        const hashedPassword = await bcrypt.hash(password,10); 
        await this.userRepository.createUser({username:username,email:email,password:hashedPassword});
    }

    async userLogin(data: LoginUserDTO): Promise<any> {
        
    }
}