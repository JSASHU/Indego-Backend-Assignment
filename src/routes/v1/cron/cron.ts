import express from "express";
import { SuccessResponse } from "../../../core/ApiResponse";
import StationController from "../../../controllers/station.controller";
import WeatherController from "../../../controllers/weather.controller";
import asyncHandler from "../../../helpers/asyncHandler";
import { verifyJwt } from "../../../helpers/authHandler";
import Weather from "../../../database/model/Weather";
import Station from "../../../database/model/Station";

const router = express.Router();
/**
 * Cron Router
 */

/**
 * @api {post} v1/indego-data-fetch-and-store-it-db CronPostReturnParam
 * @apiDefine CronPostReturnParam
 * @apiSuccess {String}     data.message            Suceess message.
 * @apiSuccess {String}     message                 Success.
 * @apiSuccess {String}     statusCode              Status Code
 */
router.post(
  "/",
  verifyJwt,
  asyncHandler(async (req, res) => {
    const at = new Date();

    const stationsData = await StationController.getIndegoDataFromAPI();
    if (stationsData) {
      stationsData.data.features.map((obj: any) => {
        obj.at = at;
      });
      await StationController.create(stationsData.data.features as Station[]);
    }

    const city = "Philadelphia";
    const weatherData = await WeatherController.getOpenWeatherDataFromAPI(
      city as string
    );
    if (weatherData) {
      await WeatherController.create({ ...weatherData.data, at } as Weather);
    }

    new SuccessResponse("success", {
      message: "Cron executed successfully.",
    }).send(res);
  })
);

export default router;
