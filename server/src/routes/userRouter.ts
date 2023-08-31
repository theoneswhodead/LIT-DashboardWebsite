import express, { Router, Request, Response } from "express"
import { userLogin } from '../Controllers/userController'

const router: Router = express.Router()

router.post("/login", userLogin)

router.post("/signup", (req: Request, res: Response) => {
    res.send('signup')
})

export default router;