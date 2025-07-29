import express from 'express'
import { loginUser, registerUser, verifyUser } from '../controllers/userController.js'
import userAuth from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/verify', userAuth, verifyUser)

export default userRouter