import {Router} from 'express';
import {userController} from "../../di/container";
import {inputValidator} from "../../middlewares/zodValidationMiddleware";
import { registerUserSchema, loginUserSchema } from '../../validations/userValidations';

const router = Router();

router.post('/register', inputValidator(registerUserSchema), userController.register);
router.post('/login', inputValidator(loginUserSchema), userController.login);

export default router;
