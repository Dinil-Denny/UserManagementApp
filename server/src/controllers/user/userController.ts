import { Request, Response, NextFunction } from "express";
import { IUserService } from "../../interfaces/service-interfaces/IUserService";
import { RegisterUserDTO, OtpDTO } from "../../dtos/UserDTO";

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

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {email, password} = req.body;
      console.log('email&pass - login controller:',email,password);
      await this.userService.userLogin({email,password});
      //res.status(200).json({message:"Login successful"});
    } catch (error) {
      next(error);
    }
  };

  verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { otp, email } = req.body;
      console.log("verify otp - controller", otp, email);
      const otpData = await this.userService.verifyOtp({ otp, email });
      console.log("otpData - controller:", otpData);
      res.status(200).json({ message: "OTP verified" });
    } catch (error) {
      next(error);
    }
  };

  resendOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      await this.userService.reSendOtp(email);
      res.status(200).json({ message: "OTP resend successful" });
    } catch (error) {
      next(error);
    }
  };
}
