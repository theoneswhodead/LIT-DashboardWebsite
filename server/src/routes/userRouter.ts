import express, { Router, Request, Response } from "express"
import { userLogin, userSignup } from '../Controllers/userController'

const router: Router = express.Router()

router.post("/login", userLogin)
router.post("/signup", userSignup)

export default router;