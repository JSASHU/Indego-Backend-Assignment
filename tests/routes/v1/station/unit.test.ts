import supertest from "supertest";
import app from "../../../../src/app";
import mongoose from 'mongoose'

describe("/v1/stations?at={} GET API", () => {

  const request = supertest(app);
  const endpoint = "/v1/stations";

  it("Should send error when endpoint invalid acccess token is passed", async () => {
    const ACCESS_TOKEN = "xyz";
    const res = await request
      .get(endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", ACCESS_TOKEN);
    expect(res.status).toBe(401);
  });

  it("Should send error when at query not passed", async () => {
    const ACCESS_TOKEN =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTI5NDI3MjksImV4cCI6MTY0Njg5NzkyOSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.MoBdWzoWi-5d6ZTzHws2ZF-2SHY1KAyXq9p7BSa2P7E";
    const res = await request
      .get(endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", ACCESS_TOKEN);
    expect(res.status).toBe(400);
    expect(res.body.statusCode).toBe("10001");
    expect(res.body.message).toBe("at is required");
  });

  it("Should send error when at query is empty", async () => {
    const ACCESS_TOKEN =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTI5NDI3MjksImV4cCI6MTY0Njg5NzkyOSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.MoBdWzoWi-5d6ZTzHws2ZF-2SHY1KAyXq9p7BSa2P7E";
    const at = "";
    const res = await request
      .get(`${endpoint}?at=${at}`)
      .set("Content-Type", "application/json")
      .set("authorization", ACCESS_TOKEN);
    expect(res.type).toEqual("application/json");
    expect(res.status).toBe(400);
    expect(res.body.statusCode).toBe("10001");
    expect(res.body.message).toBe("at must be a valid date");
  });

  it("Should send 200 with data", async () => {
    const ACCESS_TOKEN =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTI5NDI3MjksImV4cCI6MTY0Njg5NzkyOSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.MoBdWzoWi-5d6ZTzHws2ZF-2SHY1KAyXq9p7BSa2P7E";
    const at = "2021-02-10T06:48:03";
    const res = await request
      .get(`${endpoint}?at=${at}`)
      .set("Content-Type", "application/json")
      .set("authorization", ACCESS_TOKEN)
    expect(res.type).toEqual("application/json");
    expect(res.status).toBe(200);
    expect(res.body.statusCode).toBe("10000");
    expect(res.body.message).toBe("success");
  });
});
