import { Schema, model, Document } from "mongoose";

const DOCUMENT_NAME = "Station";
const COLLECTION_NAME = "stations";

interface Geometry {
  coordinates: number[];
  type: string;
}

interface Bike {
  dockNumber: number;
  isElectric: boolean;
  isAvailable: boolean;
  battery?: any;
}

interface Properties {
  id: number;
  name: string;
  coordinates: number[];
  totalDocks: number;
  docksAvailable: number;
  bikesAvailable: number;
  classicBikesAvailable: number;
  smartBikesAvailable: number;
  electricBikesAvailable: number;
  rewardBikesAvailable: number;
  rewardDocksAvailable: number;
  kioskStatus: string;
  kioskPublicStatus: string;
  kioskConnectionStatus: string;
  kioskType: number;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZipCode: string;
  bikes: Bike[];
  closeTime?: any;
  eventEnd?: any;
  eventStart?: any;
  isEventBased: boolean;
  isVirtual: boolean;
  kioskId: number;
  notes?: any;
  openTime?: any;
  publicText: string;
  timeZone?: any;
  trikesAvailable: number;
  latitude: number;
  longitude: number;
}

export default interface Station extends Document {
  geometry: Geometry;
  properties: Properties;
  type: string;
  at: Date;
}

const schema = new Schema(
  {
    geometry: {
      coordinates: {
        type: ["Number"],
      },
      type: {
        type: "String",
      },
    },
    properties: {
      id: {
        type: "Number",
      },
      name: {
        type: "String",
      },
      coordinates: {
        type: ["Number"],
      },
      totalDocks: {
        type: "Number",
      },
      docksAvailable: {
        type: "Number",
      },
      bikesAvailable: {
        type: "Number",
      },
      classicBikesAvailable: {
        type: "Number",
      },
      smartBikesAvailable: {
        type: "Number",
      },
      electricBikesAvailable: {
        type: "Number",
      },
      rewardBikesAvailable: {
        type: "Number",
      },
      rewardDocksAvailable: {
        type: "Number",
      },
      kioskStatus: {
        type: "String",
      },
      kioskPublicStatus: {
        type: "String",
      },
      kioskConnectionStatus: {
        type: "String",
      },
      kioskType: {
        type: "Number",
      },
      addressStreet: {
        type: "String",
      },
      addressCity: {
        type: "String",
      },
      addressState: {
        type: "String",
      },
      addressZipCode: {
        type: "Date",
      },
      bikes: {
        type: ["Mixed"],
      },
      closeTime: {
        type: "Mixed",
      },
      eventEnd: {
        type: "Mixed",
      },
      eventStart: {
        type: "Mixed",
      },
      isEventBased: {
        type: "Boolean",
      },
      isVirtual: {
        type: "Boolean",
      },
      kioskId: {
        type: "Number",
      },
      notes: {
        type: "Mixed",
      },
      openTime: {
        type: "Mixed",
      },
      publicText: {
        type: "String",
      },
      timeZone: {
        type: "Mixed",
      },
      trikesAvailable: {
        type: "Number",
      },
      latitude: {
        type: "Number",
      },
      longitude: {
        type: "Number",
      },
    },
    type: {
      type: "String",
    },
    at: { type: Date },
  },
  {
    versionKey: false,
  }
);
schema.index({ at: 1 });
schema.index({ "properties.kioskId": 1, at: 1 });
export const StationModel = model<Station>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
