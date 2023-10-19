import express, { Router } from "express"
import { dashboard, discordLogin, discordCallback, userDiscordOverview, serverDiscordOverview, textChannelOverview, voiceChannelOverview } from "../Controllers/dashboardController"
import requireAuth from "../middleware/requireAuth"
import { Request, Response } from 'express'


const router: Router = express.Router()


router.get('/auth/discord/login', discordLogin)
router.get('/auth/discord/callback', discordCallback)

router.use(requireAuth);

router.get('/', dashboard)
router.get('/user-discord-overview', userDiscordOverview)
router.get('/server-discord-overview', serverDiscordOverview)
router.get('/text-channel-overview', textChannelOverview)
router.get('/voice-channel-overview', voiceChannelOverview)

export default router;