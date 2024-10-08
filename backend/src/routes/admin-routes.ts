import { Router } from 'express';
import { adminController } from '../controllers/admin-controller';
import { verifyAdminToken } from '../middlewares/verify-admin-token';

const adminRouter = Router();

adminRouter.get('/users', verifyAdminToken, adminController.getAllUsers);
adminRouter.put('/users/:userId', verifyAdminToken, adminController.updateUser);
adminRouter.delete('/users/:userId', verifyAdminToken, adminController.deleteUser);

export default adminRouter;