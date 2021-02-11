import supertest from "supertest";
import app from "../../src/app";

import WeatherController from "../../src/controllers/weather.controller";
import * as createWeatherData from "./createWeather.mock.json";
import Weather from "../../src/database/model/Weather";

describe("weather controller tests", () => {
  supertest(app);

  it("Should create mock waether data in db", async () => {
    try {
      const at = new Date();
      await WeatherController.create({
        ...createWeatherData.data,
        at,
      } as Weather);
    } catch (e) {
      console.log(e);
    }
  });

  it("Should get null data for current at", async () => {
    const at = new Date();
    const res = await WeatherController.findDataBYQuery(at);
    expect(res).toBe(null);
  });

  it("Should get data for given at", async () => {
    const at = "2021-02-10T11:09:11";
    const res = await WeatherController.findDataBYQuery(at);
    expect(res).toHaveProperty("coord");
    expect(res).toHaveProperty("weather");
  });
});
