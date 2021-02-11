import supertest from "supertest";
import app from "../../../../src/app";

describe("/v1/indego-data-fetch-and-store-it-db POST API", () => {
  const request = supertest(app);
  const endpoint = "/v1/indego-data-fetch-and-store-it-db";

  it("Should send error when endpoint invalid acccess token is passed", async () => {
    const ACCESS_TOKEN = "xyz";
    const res = await request
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", ACCESS_TOKEN);
    expect(res.status).toBe(401);
  });

  it("Should send status 200 with message", async () => {
    const ACCESS_TOKEN =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTI5NDI3MjksImV4cCI6MTY0Njg5NzkyOSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.MoBdWzoWi-5d6ZTzHws2ZF-2SHY1KAyXq9p7BSa2P7E";
    const res = await request
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", ACCESS_TOKEN);
    expect(res.status).toBe(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.statusCode).toBe("10000");
    expect(res.body.message).toBe("success");
    expect(res.body.data.message).toBe("Cron executed successfully.");
  });
});
