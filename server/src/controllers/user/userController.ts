import { Request, Response, NextFunction } from "express";
import { IUserService } from "../../interfaces/service-interfaces/IUserService";
import { RegisterUserDTO } from "../../dtos/UserDTO";

export class UserController {
  constructor(private userService: IUserService) {}

  //we write arrow functions here so it don't lose this context of userService functions
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userDetails: RegisterUserDTO = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      console.log("userDetails - controller:", userDetails);
      await this.userService.registerUser(userDetails);
      console.log("reg done - controller");
      res.status(201).json({ message: "user registered successfully" });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {};

  verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { otp } = req.body;
      console.log(otp);
    } catch (error) {
      next(error);
    }
  };
}
