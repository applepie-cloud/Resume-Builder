import express from "express";
import { registerUser, loginUser, getUserById } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
import { getUserResumes } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserById);
userRouter.get('/resumes', protect, getUserResumes);

export default userRouter;