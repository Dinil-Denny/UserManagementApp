import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { IUserService } from "../../interfaces/service-interfaces/IUserService";
import { RegisterUserDTO, OtpDTO } from "../../dtos/UserDTO";
import dotenv from "dotenv";

dotenv.config();

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
      const { email, password } = req.body;
      console.log("email&pass - login controller:", email, password);
      const userData = await this.userService.userLogin({ email, password });
      console.log("userData:", userData);
      const { accessToken, refreshToken } = userData;
      //setting Refresh Token in an HttpOnly Cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      console.log(
        "useraname,email,role",
        userData.user.username,
        userData.user.email,
        userData.user.role,
      );
      res
        .status(200)
        .json({
          success: true,
          message: "Login successful",
          accessToken,
          user: {
            id: userData.user._id,
            username: userData.user.username,
            email: userData.user.email,
            role: userData.user.role,
            profileImgURL: userData.user.profileImgURL,
          },
        });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      console.log('req.cookies - logout controller: ',req.cookies);
      const refreshToken = req.cookies.refreshToken;
      console.log('refreshToken - logout controller:',refreshToken);
      if(refreshToken){
        await this.userService.userLogout(refreshToken);
      }
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax'
      });
      console.log('cleared refreshToken-controller');
      res.status(200).json({message:'Logged out successfully'});
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

  refreshAccessToken = async (req:Request,res:Response,next:NextFunction) => {
    try {
      console.log('refreshAccessToken automatically called - controller');
      const currentRefreshToken = req.cookies.refreshToken;
      if(!currentRefreshToken){
        return res.status(401).json({ message: 'No refresh token provided.' });
      };
      const newAccessToken:string = await this.userService.recreateAccessToken(currentRefreshToken);
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      next(error);
    }
  }
}
