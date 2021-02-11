// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;

export const db = {
  name: process.env.DB_NAME || "",
  host: process.env.DB_HOST || "",
  port: process.env.DB_PORT || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_USER_PWD || "",
};

export const corsUrl = process.env.CORS_URL;

export const tokenInfo = {
  accessTokenValidity: process.env.ACCESS_TOKEN_VALIDITY || "",
  accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY || "",
};

export const logDirectory = process.env.LOG_DIR;

export const indegoAPIURL = process.env.INDEGO_API;

export const openWeatherConfig = {
  openWeatherAPI: process.env.OPEN_WEATHER_API || "",
  openWeatherAPIKey: process.env.OPEN_WEATHER_API_KEY || "",
};
