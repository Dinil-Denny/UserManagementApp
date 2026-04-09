import { Request, Response } from "express";
import { IUserService } from "@interfaces/service-interfaces/IUserService";
import {RegisterUserDTO} from "@dtos/UserDTO";

export class UserController{
    constructor(private userService : IUserService){};

    async register(req:Request,res:Response){
        try {
            const userDetails : RegisterUserDTO = {
                name : req.body.username,
                email : req.body.email,
                password : req.body.password
            };
        } catch (error) {
            
        }
    }

    async login(req:Request,res:Response){

    }
}
