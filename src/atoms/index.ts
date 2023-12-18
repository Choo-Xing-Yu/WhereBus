import { PrimitiveAtom, atom } from "jotai";
import { BusStopCode, GeoLocation } from "../typings";
import {
  JURONG_WEST_AVE_1_BLK_454_BUS_STOP_CODE,
  JURONG_WEST_AVE_1_BLK_536_BUS_STOP_CODE,
  JURONG_WEST_AVE_1_BLK_551_BUS_STOP_CODE,
} from "../constants";

export const selectedBusStopsAtom: PrimitiveAtom<BusStopCode[]> = atom<
  BusStopCode[]
>([
  JURONG_WEST_AVE_1_BLK_536_BUS_STOP_CODE,
  JURONG_WEST_AVE_1_BLK_454_BUS_STOP_CODE,
  JURONG_WEST_AVE_1_BLK_551_BUS_STOP_CODE,
]);

export const currentLocationAtom: PrimitiveAtom<GeoLocation> =
  atom<GeoLocation>({
    latitude: 1.3509033645578996,
    longitude: 103.71629327152624,
  });
