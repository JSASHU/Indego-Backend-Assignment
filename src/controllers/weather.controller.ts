import Weather, { WeatherModel } from "../database/model/Weather";
import { openWeatherConfig } from "../config";
import axios from "axios";
/**
 *
 *
 * @export
 * @class WeatherController
 */
export default class WeatherController {
  /**
   *
   *
   * @static
   * @param {Weather} weather
   * @return {*}  {Promise<Weather>}
   * @memberof WeatherController
   */
  public static async create(weather: Weather): Promise<Weather> {
    const createdWeather = await WeatherModel.create(weather);
    return createdWeather;
  }

  /**
   *
   *
   * @static
   * @param {*} at
   * @return {*}  {Promise<Weather>}
   * @memberof WeatherController
   */
  public static findDataBYQuery(at: any): Promise<Weather> {
    return WeatherModel.findOne({
      at: {
        $gte: at,
      },
    })
      .sort({ at: -1 })
      .lean<Weather>()
      .exec();
  }

  /**
   *
   *
   * @static
   * @param {string} city
   * @return {*}
   * @memberof WeatherController
   */
  public static async getOpenWeatherDataFromAPI(city: string) {
    try {
      return axios.get(
        `${openWeatherConfig.openWeatherAPI}?appid=${openWeatherConfig.openWeatherAPIKey}&q=${city}` as string
      );
    } catch (exception) {
      process.stderr.write(
        `ERROR received from ${openWeatherConfig.openWeatherAPI}: ${exception}\n`
      );
    }
  }
}
