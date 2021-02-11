import supertest from "supertest";
import app from "../../src/app";

import StationController from "../../src/controllers/station.controller";
import * as createData from "./create.mock.json";
import Station from "../../src/database/model/Station";

describe("station controller tests", () => {
  supertest(app);

  it("Should create mock stations data in db", async () => {
    try {
      const at = new Date();
      createData.data.map((obj: any) => {
        obj.at = at;
      });
      await StationController.create(createData.data as Station[]);
    } catch (e) {
      console.log(e);
    }
  });

  it("Should get [] data for current at", async () => {
    const at = new Date();
    const res = await StationController.findDataBYQuery(at);
    expect(res.length).toBe(0);
  });

  it("Should get data for given at", async () => {
    const at = "2021-02-10T11:09:11";
    const res = await StationController.findDataBYQuery(at);
    expect(res[0]).toHaveProperty("geometry");
    expect(res[0]).toHaveProperty("properties");
  });

  it("Should get data for given at and kioskId", async () => {
    const at = "2021-02-10T11:09:11";
    const kioskId = 3005;
    const res = await StationController.findDataBYKioskId(at, kioskId);
    expect(res).toHaveProperty("geometry");
    expect(res).toHaveProperty("properties");
  });
});
