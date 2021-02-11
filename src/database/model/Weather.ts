import { model, Schema, Document } from "mongoose";

export const DOCUMENT_NAME = "Weather";
export const COLLECTION_NAME = "weather";

export default interface Weather extends Document {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  at: Date;
}

const schema = new Schema(
  {
    coord: {
      lon: {
        type: "Number",
      },
      lat: {
        type: "Number",
      },
    },
    weather: {
      type: ["Mixed"],
    },
    base: {
      type: "String",
    },
    main: {
      temp: {
        type: "Number",
      },
      feels_like: {
        type: "Number",
      },
      temp_min: {
        type: "Number",
      },
      temp_max: {
        type: "Number",
      },
      pressure: {
        type: "Number",
      },
      humidity: {
        type: "Number",
      },
    },
    visibility: {
      type: "Number",
    },
    wind: {
      speed: {
        type: "Number",
      },
      deg: {
        type: "Number",
      },
    },
    clouds: {
      all: {
        type: "Number",
      },
    },
    dt: {
      type: "Number",
    },
    sys: {
      type: {
        type: "Number",
      },
      id: {
        type: "Number",
      },
      country: {
        type: "String",
      },
      sunrise: {
        type: "Number",
      },
      sunset: {
        type: "Number",
      },
    },
    timezone: {
      type: "Number",
    },
    id: {
      type: "Number",
    },
    name: {
      type: "String",
    },
    cod: {
      type: "Number",
    },
    at: { type: "Date" },
  },
  {
    versionKey: false,
  }
);
schema.index({ at: 1 });
export const WeatherModel = model<Weather>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
