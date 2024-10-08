import { Router } from 'express';
import { adminController } from '../controllers/admin-controller';
import { verifyAdminToken } from '../middlewares/verify-admin-token';

const adminRouter = Router();

adminRouter.get('/users/all', verifyAdminToken, adminController.getAllUsers);
adminRouter.get('/users/:userId', verifyAdminToken, adminController.getUser);
adminRouter.put('/edit/:userId', verifyAdminToken, adminController.updateUser);
adminRouter.delete('/delete/:userId', verifyAdminToken, adminController.deleteUser);

export default adminRouter;