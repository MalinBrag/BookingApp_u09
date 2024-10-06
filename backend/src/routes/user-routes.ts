import { Router } from 'express';
import { userController } from '../controllers/user-controller';

const userRouter = Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/sign-in', userController.signInUser);

export default userRouter;



