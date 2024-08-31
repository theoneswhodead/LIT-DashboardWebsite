import express, { Router } from "express"
import { userLogin, userSignup, userForgot, userResetPassword, userUpdateCredentials, enable2fa, ignoreDnt, updateIgnoreDnt} from '../Controllers/userController'
import requireAuth from "../middleware/requireAuth"

const router: Router = express.Router()

router.post("/login", userLogin)
router.post("/signup", userSignup)
router.post("/forgot", userForgot)


//router.use(requireAuth);
router.post('/reset-password/:id/:token', userResetPassword)

router.post('/dashboard/profile/settings', userUpdateCredentials)
router.get('/dashboard/profile/settings', enable2fa)

router.get('/dashboard/profile/ignorednt', ignoreDnt)
router.post('/dashboard/profile/ignorednt', updateIgnoreDnt)




export default router;