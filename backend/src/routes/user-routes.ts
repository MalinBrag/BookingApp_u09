import { Router } from 'express';
import { userController } from '../controllers/user-controller';
import { verifyToken } from '../middlewares/verify-token';

const userRouter = Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/sign-in', userController.signInUser);
userRouter.post('/logout', userController.logoutUser);

userRouter.get('/profile', verifyToken, userController.getProfile);

export default userRouter;



