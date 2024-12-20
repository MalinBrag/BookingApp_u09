"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const verify_user_token_1 = require("../middlewares/verify-user-token");
const userRouter = (0, express_1.Router)();
/**
 * Routes for user, some of the routes are protected and can only be accessed by authenticated users.
 */
userRouter.post('/register', user_controller_1.userController.registerUser);
userRouter.post('/sign-in', user_controller_1.userController.signInUser);
userRouter.post('/logout', user_controller_1.userController.logoutUser);
userRouter.get('/profile', verify_user_token_1.verifyUserToken, user_controller_1.userController.getProfile);
exports.default = userRouter;
