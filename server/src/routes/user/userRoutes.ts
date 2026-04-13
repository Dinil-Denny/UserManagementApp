import {Router} from 'express';
import {userController} from "../../di/container";
import {inputValidator} from "../../middlewares/zodValidationMiddleware";
import { registerUserSchema } from '../../validations/userValidations';

const router = Router();

router.post('/register', inputValidator(registerUserSchema), userController.register);
router.post('/login',userController.login);

export default router;
