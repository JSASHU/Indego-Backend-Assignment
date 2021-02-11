import express from "express";
import { SuccessResponse } from "../../../core/ApiResponse";
import { NoDataError } from "../../../core/ApiError";
import StationController from "../../../controllers/station.controller";
import WeatherController from "../../../controllers/weather.controller";
import validator, { ValidationSource } from "../../../helpers/validator";
import schema from "./schema";
import asyncHandler from "../../../helpers/asyncHandler";
import { verifyJwt } from "../../../helpers/authHandler";

const router = express.Router();

/**
 * Station Router
 */

/**
 * @api {get} /v1/stations?at={}                 Effeciently Get List of Stations, Weather based on given date
 * @apiName GetAvailableStationsWeather
 *
 * @apiSuccess {Object[]}   data.stations           Array of all Stations
 * @apiSuccess {Obhect}     data.weather            Weather Data
 * @apiSuccess {String}     data.at                 at param
 */
router.get(
  "/",
  verifyJwt,
  validator(schema.at, ValidationSource.QUERY),
  asyncHandler(async (req, res) => {
    const stations = await StationController.findDataBYQuery(req.query.at);
    const weather = await WeatherController.findDataBYQuery(req.query.at);
    if (stations.length < 1 && !weather) throw new NoDataError();

    return new SuccessResponse("success", {
      stations: stations,
      weather: weather,
      at: req.query.at,
    }).send(res);
  })
);

/**
 * @api {get} /v1/stations/{kioskId}?at={}          Effeciently Get List of Stations, Weather based on given date and kioskId
 * @apiName GetAvailableStationsWeatherBasedOnKioskId
 *
 * @apiSuccess {Object}     data.station            Station data
 * @apiSuccess {Obhect}     data.weather            Weather Data
 * @apiSuccess {String}     data.at                 at param
 */
router.get(
  "/:kioskId",
  verifyJwt,
  validator(schema.kioskId, ValidationSource.PARAM),
  validator(schema.at, ValidationSource.QUERY),
  asyncHandler(async (req, res) => {
    const station = await StationController.findDataBYKioskId(
      req.query.at,
      parseInt(req.params.kioskId)
    );
    const weather = await WeatherController.findDataBYQuery(req.query.at);
    if (!station && !weather) throw new NoDataError();

    return new SuccessResponse("success", {
      station: station,
      weather: weather,
      at: req.query.at,
    }).send(res);
  })
);

export default router;
