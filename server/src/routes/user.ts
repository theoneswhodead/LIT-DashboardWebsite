import express, { Router, Request, Response } from "express"

const router: Router = express.Router()

router.post("/login", (req: Request, res: Response) => {
    res.send('login')
})

router.post("/signup", (req: Request, res: Response) => {
    res.send('signup')
})

export default router;