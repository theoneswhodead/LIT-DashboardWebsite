import express, { Router } from "express"
import {  discordCallback, steamLogin, steamCallback } from "../Controllers/dashboardController"
import passport from 'passport'

const router: Router = express.Router()

router.get('/auth/discord/callback', discordCallback)
router.get('/auth/steam', passport.authenticate('steam'), steamLogin)
router.get('/auth/steam/return', passport.authenticate('steam'), steamCallback)

export default router;