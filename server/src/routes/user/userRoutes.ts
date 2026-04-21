import { Router } from "express";
import { userController } from "../../di/container";
import { inputValidator } from "../../middlewares/zodValidationMiddleware";
import {
  registerUserSchema,
  loginUserSchema,
} from "../../validations/userValidations";

const router = Router();

router.post("/register", inputValidator(registerUserSchema), userController.register);
router.post("/login", inputValidator(loginUserSchema), userController.login);
router.post("/verify-otp", userController.verifyOtp);
router.post('/resend-otp',userController.resendOtp);

export default router;
