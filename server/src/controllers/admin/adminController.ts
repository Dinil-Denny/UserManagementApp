import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { IAdminService } from "../../interfaces/service-interfaces/IAdminService";

export class AdminController {
  constructor(private adminService: IAdminService) {}
  //fetch all users data
  fetchAllUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        console.log('fetch user controller initiated')
        const users = await this.adminService.getAllUsers();
        //console.log('all users fetched: ',users);
        return res.status(200).json({success:true,users:users});
    } catch (error:any) {
        next(error);
    }
  };

  //toggle user status - active or blocked
  toggleUserStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      console.log('req.params at toggleUserStatus controller:',req.params,req.body);
      const id = req.params.id as string;
      const isBlocked = req.body.isBlocked;
      await this.adminService.toggleUserStatus({id,isBlocked});
      res.status(200).json({message:"Status updated"});
    } catch (error:any) {
      next(error);
    }
  }
}
