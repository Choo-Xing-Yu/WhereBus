export type BusStopCode = number | string;

export type ServiceNumber = string | number;

export type Coordinate = string | number;

export interface GetBusArrivalRequest {
  BusStopCode: BusStopCode;
  ServiceNo?: ServiceNumber;
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
  Latitude: Coordinate;
  Longitude: Coordinate;
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
  ServiceNo: ServiceNumber;
  Operator: Operator;
  NextBus?: NextBus;
  NextBus2?: NextBus;
  NextBus3?: NextBus;
  destinationMetadata?: BusStop;
  NextBuses?: NextBus[]; // defined NextBus, NextBus2 and NextBus3 collected in an array
}

export interface GetBusArrivalResponse {
  BusStopCode: BusStopCode;
  Services: Service[];
}

export interface BusStop {
  BusStopCode: BusStopCode;
  RoadName: string;
  Description: string;
  Latitude: Coordinate;
  Longitude: Coordinate;
}
export interface GetBusStopsResponse {
  value: BusStop[];
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}
