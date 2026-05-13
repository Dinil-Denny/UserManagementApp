import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { IAdminService } from "../../interfaces/service-interfaces/IAdminService";

export class AdminController {
  constructor(private adminService: IAdminService) {}
  //fetch all users data
  fetchAllUsers = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      console.log("fetch user controller initiated");
      const users = await this.adminService.getAllUsers();
      //console.log('all users fetched: ',users);
      return res.status(200).json({ success: true, users: users });
    } catch (error: any) {
      next(error);
    }
  };

  //toggle user status - active or blocked
  toggleUserStatus = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      console.log(
        "req.params at toggleUserStatus controller:",
        req.params,
        req.body,
      );
      const id = req.params.id as string;
      const isBlocked = req.body.isBlocked;
      await this.adminService.toggleUserStatus({ id, isBlocked });
      res.status(200).json({ message: "Status updated" });
    } catch (error: any) {
      next(error);
    }
  };

  //delete user
  deleteUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      console.log("id to delete:", req.params.id);
      const id = req.params.id as string;
      await this.adminService.deleteUser(id);
      console.log("user deleted");
      res.status(200).json({ message: "User deleted" });
    } catch (error: any) {
      next(error);
    }
  };

  //update user
  updateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      console.log(req.params, req.body);
      const id = req.params.id as string;
      const { username, email } = req.body;
      await this.adminService.updateUser({ id, username, email });
      res.status(200).json({ message: "User data updated" });
    } catch (error: any) {
      next(error);
    }
  };

  //add new user
  addNewUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      console.log("req.body in adding new user controller:", req.body);
      const { username, email, password } = req.body;
      await this.adminService.addUser({ username, email, password });
      res.status(200).json({message:"User added"});
    } catch (error: any) {
      next(error);
    }
  };
}
