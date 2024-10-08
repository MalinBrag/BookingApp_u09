import { Router } from 'express';
import { userController } from '../controllers/user-controller';
import { verifyUserToken } from '../middlewares/verify-user-token';

const userRouter = Router();

userRouter.post('/register', userController.registerUser);
userRouter.post('/sign-in', userController.signInUser);
userRouter.post('/logout', userController.logoutUser);

userRouter.get('/profile', verifyUserToken, userController.getProfile);

export default userRouter;



