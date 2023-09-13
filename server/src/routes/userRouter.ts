import express, { Router, Request, Response } from "express"
import { userLogin, userSignup, userForgot, userResetPassword } from '../Controllers/userController'

import requireAuth from "../middleware/requireAuth"

const router: Router = express.Router()

//router.use(requireAuth);  /dashboard profile

router.post("/login", userLogin)
router.post("/signup", userSignup)
router.post("/forgot", userForgot)
router.post('/reset-password/:id/:token', userResetPassword)

export default router;