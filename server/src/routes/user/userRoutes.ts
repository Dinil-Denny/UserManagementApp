import { Router } from "express";
import { userController } from "../../di/container";
import { inputValidator } from "../../middlewares/zodValidationMiddleware";
import {
  registerUserSchema,
  loginUserSchema,
} from "../../validations/userValidations";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post(
  "/register",
  inputValidator(registerUserSchema),
  userController.register,
);
router.post("/login", inputValidator(loginUserSchema), userController.login);
router.post("/logout", authMiddleware, userController.logout);
router.post("/verify-otp", userController.verifyOtp);
router.post("/resend-otp", userController.resendOtp);
router.post("/auth-refresh", userController.refreshAccessToken);

export default router;
