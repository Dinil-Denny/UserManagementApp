import { Request, Response,NextFunction } from "express";
import { IUserService } from "../../interfaces/service-interfaces/IUserService";
import {RegisterUserDTO} from "../../dtos/UserDTO";

export class UserController{
    constructor(private userService : IUserService){};

    async register(req:Request, res:Response, next:NextFunction){
        try {
            const userDetails : RegisterUserDTO = {
                username : req.body.username,
                email : req.body.email,
                password : req.body.password
            };
            const user = await this.userService.registerUser(userDetails);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async login(req:Request,res:Response){

    }
}
