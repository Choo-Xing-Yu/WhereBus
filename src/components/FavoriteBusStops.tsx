import { Text } from "@mantine/core";
import React from "react";
import { useGetFavoriteBusStops } from "../api";
import { BusStopCard } from "./BusStopCard";

export const FavoriteBusStops: React.FC<object> = () => {
  const { data: busStops = [] } = useGetFavoriteBusStops();
  return (
    <>
      <div className="p-4">
        <Text size="xl" fw={700}>
          Favorite Bus Stops
        </Text>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {busStops.map((bs, i) => (
          <BusStopCard key={i} busStopCode={bs} />
        ))}
      </div>
    </>
  );
};
