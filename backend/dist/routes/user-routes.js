"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', user_controller_1.userController.registerUser);
userRouter.post('/sign-in', user_controller_1.userController.signInUser);
exports.default = userRouter;
