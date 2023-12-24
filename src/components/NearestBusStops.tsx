import React from "react";
import { useGetFavoriteBusStops, useGetNearestBusStops } from "../api";
import { BusStopRow } from "./BusStopRow";
import { Text } from "@mantine/core";

export const NearestBusStops: React.FC<object> = () => {
  const { data: nearestBusStops = [] } = useGetNearestBusStops();
  const { data: favoriteBusStops = [] } = useGetFavoriteBusStops();

  return (
    <div className="w-full flex flex-col gap-y-4 p-4">
      <Text size="xl" fw={700}>
        Nearest Bus Stops
      </Text>
      {nearestBusStops.map((busStop, i) => (
        <BusStopRow
          key={i}
          busStop={busStop}
          isFavorite={favoriteBusStops.includes(busStop.BusStopCode)}
        />
      ))}
    </div>
  );
};
