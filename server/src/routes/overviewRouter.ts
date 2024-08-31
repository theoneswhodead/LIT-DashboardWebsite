import express, { Router } from "express"
import {usersDiscordOverview, textChannelsOverview, walletsSlOverview, classesSlOverview, usersSlTimeOverview, usersSlKillsOverview, usersSlShotsOverview, usersSlJumpsOverview } from "../Controllers/overviewController"
import requireAuth from "../middleware/requireAuth"
const router: Router = express.Router()

router.use(requireAuth);

router.get('/users-discord', usersDiscordOverview)
router.get('/text', textChannelsOverview)
router.get('/users-sl/time', usersSlTimeOverview)
router.get('/users-sl/kills', usersSlKillsOverview)
router.get('/users-sl/shots', usersSlShotsOverview)
router.get('/users-sl/jumps', usersSlJumpsOverview)
router.get('/wallets-sl', walletsSlOverview)
router.get('/classes-sl', classesSlOverview)

export default router;