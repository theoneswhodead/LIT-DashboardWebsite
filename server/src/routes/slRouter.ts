import express, { Router } from "express"
import { userSlOverview,walletSlOverview, classPersonnelSlOverview, classChaosSlOverview, classMtfSlOverview, classScpSlOverview} from "../Controllers/slController"
import requireAuth from "../middleware/requireAuth"

const router: Router = express.Router()

 router.use(requireAuth);

router.get('/user', userSlOverview)
router.get('/wallet', walletSlOverview)
router.get('/class/personnel', classPersonnelSlOverview)
router.get('/class/mtf', classMtfSlOverview)
router.get('/class/chaos', classChaosSlOverview)
router.get('/class/scp', classScpSlOverview)

export default router;