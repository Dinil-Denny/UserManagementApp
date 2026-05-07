import { Router } from "express";
import { inputValidator } from "../../middlewares/zodValidationMiddleware";
import {
  registerUserSchema,
  loginUserSchema,
  resetPasswordSchema,
  editProfileSchema
} from "../../validations/userValidations";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { roleMiddleware } from "../../middlewares/roleMiddleware";
import { adminController } from "../../di/adminContainer";

const router = Router();

router.get('/users',authMiddleware,roleMiddleware("admin"),adminController.fetchAllUsers);

export default router;