import express, { Router, Request, Response } from "express"
import { userLogin, userSignup, userForgot, userResetPassword } from '../Controllers/userController'
import { dashboard, discordLogin, discordCallback } from "../Controllers/dashboardController"

import requireAuth from "../middleware/requireAuth"

const router: Router = express.Router()

//router.use(requireAuth);  /dashboard profile

router.post("/login", userLogin)
router.post("/signup", userSignup)
router.post("/forgot", userForgot)
router.post('/reset-password/:id/:token', userResetPassword)

router.get('/dashboard', dashboard)
router.get('/dashboard/auth/discord/login', discordLogin)

router.get('/dashboard/auth/discord/callback', discordCallback)

export default router;