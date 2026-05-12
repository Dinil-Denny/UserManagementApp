import { Router } from "express";
import { inputValidator } from "../../middlewares/zodValidationMiddleware";
import {
  registerUserSchema,
  loginUserSchema,
  resetPasswordSchema,
  editProfileSchema,
} from "../../validations/userValidations";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { roleMiddleware } from "../../middlewares/roleMiddleware";
import { adminController } from "../../di/adminContainer";

const router = Router();
//temporary middleware to check if requests are getting till here from frontend
router.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
  next();
});

router.get("/users", authMiddleware, roleMiddleware("admin"), adminController.fetchAllUsers);
router.patch("/users/:id/status", authMiddleware, roleMiddleware("admin"), adminController.toggleUserStatus);
router.delete("/user/:id/delete",authMiddleware, roleMiddleware("admin"), adminController.deleteUser);

export default router;
