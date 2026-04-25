import { Router } from "express";
import { userController } from "../../di/container";
import { inputValidator } from "../../middlewares/zodValidationMiddleware";
import {
  registerUserSchema,
  loginUserSchema,
  resetPasswordSchema
} from "../../validations/userValidations";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/register", inputValidator(registerUserSchema), userController.register);
router.post("/login", inputValidator(loginUserSchema), userController.login);
router.post("/logout", authMiddleware, userController.logout);
router.post("/verify-otp", userController.verifyOtp);
router.post("/resend-otp", userController.resendOtp);
router.post("/auth-refresh", userController.refreshAccessToken);
router.post("/reset-password-otp", userController.resendOtp); //since the logic is same for getting otp for resetting password and resending otp we can use the same controller for both
router.post("/resetPassword-verify-otp", userController.resetPassVerifyOtp);
router.post('/reset-password', inputValidator(resetPasswordSchema), userController.resetPassword);
router.post('/google-auth', userController.googleAuth);

export default router;
