import { UserController } from "../controllers/user/userController";
import { UserService } from "../services/user/userService";
import { UserRepository } from "../repositories/user/userRepository";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
export const userController = new UserController(userService);


