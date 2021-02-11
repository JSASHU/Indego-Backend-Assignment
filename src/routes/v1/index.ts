import express from "express";
import station from "./station/station";
import cron from "./cron/cron";

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected by access token
/*-------------------------------------------------------------------------*/

router.use("/stations", station);
router.use("/stations/:kioskId", station);
router.use("/indego-data-fetch-and-store-it-db", cron);

export default router;
