import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { IAdminService } from "../../interfaces/service-interfaces/IAdminService";

export class AdminController {
  constructor(private adminService: IAdminService) {}

  fetchAllUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        console.log('fetch user controller initiated')
        const users = await this.adminService.getAllUsers();
        console.log('all users fetched: ',users);
        return res.status(200).json({success:true,users:users});
    } catch (error) {
        next(error);
    }
  }
}
