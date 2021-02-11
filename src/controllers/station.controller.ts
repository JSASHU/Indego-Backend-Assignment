import Station, { StationModel } from "../database/model/Station";
import { indegoAPIURL } from "../config";
import axios from "axios";
/**
 *
 *
 * @export
 * @class StationController
 */
export default class StationController {
  /**
   *
   *
   * @static
   * @param {Station[]} station
   * @return {*}  {Promise<Station[]>}
   * @memberof StationController
   */
  public static async create(station: Station[]): Promise<Station[]> {
    const createdStation = await StationModel.insertMany(station);
    return createdStation;
  }

  /**
   *
   *
   * @static
   * @param {*} at
   * @return {*}  {Promise<Station[]>}
   * @memberof StationController
   */
  public static findDataBYQuery(at: any): Promise<Station[]> {
    return StationModel.find({
      at: {
        $gte: at,
      },
    })
      .lean<Station[]>()
      .exec();
  }

  /**
   *
   *
   * @static
   * @param {*} at
   * @param {number} kioskId
   * @return {*}  {Promise<Station>}
   * @memberof StationController
   */
  public static findDataBYKioskId(at: any, kioskId: number): Promise<Station> {
    return StationModel.findOne({
      "properties.kioskId": kioskId,
      at: {
        $gte: at,
      },
    })
      .lean<Station>()
      .exec();
  }

  /**
   *
   *
   * @static
   * @return {*}
   * @memberof StationController
   */
  public static async getIndegoDataFromAPI() {
    try {
      return await axios.get(indegoAPIURL as string);
    } catch (exception) {
      process.stderr.write(
        `ERROR received from ${indegoAPIURL}: ${exception}\n`
      );
    }
  }
}
