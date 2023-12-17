export type BusStopCode = number | string;

export interface GetBusArrivalRequest {
  BusStopCode: BusStopCode;
  ServiceNo?: number;
}

export enum BusType {
  SINGLE_DECK = "SD",
  DOUBLE_DECK = "DD",
  BENDY = "BD",
}

export enum BusFeature {
  WHEEL_CHAIR_ACCESSIBLE = "WAB",
}

export enum BusLoad {
  SEATS_AVAILABLE = "SEA",
  STANDING_AVAILABLE = "SDA",
  LIMITED_STANDING = "LSD",
}

export interface NextBus {
  OriginCode: BusStopCode;
  DestinationCode: BusStopCode;
  EstimatedArrival: string; // in GMT+8 UTC standard, EG: 2017-04-29T07:20:24+08:00
  Latitude: string;
  Longitude: string;
  VisitNumber: string;
  Load: BusLoad;
  Feature?: BusFeature;
  Type: BusType;
}

export enum Operator {
  SBS = "SBST",
  SMRT = "SMRT",
  TOWER_TRANSIT = "TTS",
  GO_AHEAD = "GAS",
}

export interface Service {
  ServiceNo: string;
  Operator: Operator;
  NextBus?: NextBus;
  NextBus2?: NextBus;
  NextBus3?: NextBus;
}

export interface GetBusArrivalResponse {
  BusStopCode: number;
  Services: Service[];
}
