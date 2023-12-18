import { useAtom } from "jotai";
import React from "react";
import { useGetBusStopsMetadataMapping } from "./api";
import { currentLocationAtom } from "./atoms";
import { ErrorPage } from "./components/ErrorPage";
import { FavoriteBusStops } from "./components/FavoriteBusStops";
import { LoadingPage } from "./components/LoadingPage";
import { NearestBusStops } from "./components/NearestBusStops";

export const WhereBus: React.FC<object> = () => {
  const { isLoading, isError } = useGetBusStopsMetadataMapping();
  const [{ latitude: curLat, longitude: curLong }, setCurrentLocation] =
    useAtom(currentLocationAtom);

  // ===== updates user current location =====
  window.navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => {
      if (curLat === latitude && curLong === longitude) return;
      setCurrentLocation({ latitude, longitude });
    }
  );
  // ========================================

  if (isLoading) return <LoadingPage />;

  if (isError) return <ErrorPage />;

  return (
    <>
      <FavoriteBusStops />
      <NearestBusStops />
    </>
  );
};
