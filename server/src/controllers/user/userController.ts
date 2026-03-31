import { Request, Response } from "express";
import { IUserService } from "@interfaces/service-interfaces/IUserService";

export class UserController{
    constructor(private userService : IUserService){};

    async register(req:Request,res:Response){
        try {
            
        } catch (error) {
            
        }
    }

    async login(req:Request,res:Response){

    }
}
