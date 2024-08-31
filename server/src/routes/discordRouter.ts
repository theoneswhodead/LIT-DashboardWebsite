import express, { Router } from "express"
import {   userDiscordOverview, serverDiscordOverview, textChannelOverview, voiceChannelOverview} from "../Controllers/discordController"
import requireAuth from "../middleware/requireAuth"

const router: Router = express.Router()

router.use(requireAuth);

router.get('/user', userDiscordOverview)
router.get('/server', serverDiscordOverview)
router.get('/text', textChannelOverview)
router.get('/voice', voiceChannelOverview)

export default router;