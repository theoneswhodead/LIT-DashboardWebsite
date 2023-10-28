import express, { Router } from "express"
import { userLogin, userSignup, userForgot, userResetPassword, userUpdateCredentials } from '../Controllers/userController'
import requireAuth from "../middleware/requireAuth"

const router: Router = express.Router()

router.post("/login", userLogin)
router.post("/signup", userSignup)
router.post("/forgot", userForgot)


//router.use(requireAuth);
router.post('/reset-password/:id/:token', userResetPassword)

router.post('/dashboard/profile', userUpdateCredentials)




export default router;