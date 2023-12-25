import { FAVORITE_BUS_STOP_LOCAL_STORAGE_KEY } from "../constants";
import { BusStopCode } from "../typings";

export const hexToRgba = (hex: string, alpha: number = 1) => {
  hex = hex.replace(/^#/, ""); // Remove the hash if it exists
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${Math.min(1, Math.max(0, alpha))})`;
};

export const getLocalStorageFavoriteBusStops = (): BusStopCode[] => {
  return JSON.parse(
    localStorage.getItem(FAVORITE_BUS_STOP_LOCAL_STORAGE_KEY) ?? "[]"
  );
};

export const persistLocalStorageFavoriteBusStops = (
  busStops: BusStopCode[]
): BusStopCode[] => {
  const dedupBusStops = [...new Set(busStops)];
  localStorage.setItem(
    FAVORITE_BUS_STOP_LOCAL_STORAGE_KEY,
    JSON.stringify(dedupBusStops)
  );

  return dedupBusStops;
};
