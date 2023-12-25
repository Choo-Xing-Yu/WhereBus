import { PrimitiveAtom, atom } from "jotai";
import { GeoLocation } from "../typings";

export const currentLocationAtom: PrimitiveAtom<GeoLocation> =
  atom<GeoLocation>({
    latitude: 1.3509033645578996,
    longitude: 103.71629327152624,
  });

export const searchedBusStopAtom: PrimitiveAtom<string> = atom<string>("");
