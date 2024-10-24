"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin-controller");
const verify_admin_token_1 = require("../middlewares/verify-admin-token");
const adminRouter = (0, express_1.Router)();
/**
 * Routes for admin, passes through verifyAdminToken middleware
 */
adminRouter.get('/users/all', verify_admin_token_1.verifyAdminToken, admin_controller_1.adminController.getAllUsers);
adminRouter.get('/users/:userId', verify_admin_token_1.verifyAdminToken, admin_controller_1.adminController.getUser);
adminRouter.put('/edit/:userId', verify_admin_token_1.verifyAdminToken, admin_controller_1.adminController.updateUser);
adminRouter.delete('/delete/:userId', verify_admin_token_1.verifyAdminToken, admin_controller_1.adminController.deleteUser);
exports.default = adminRouter;
