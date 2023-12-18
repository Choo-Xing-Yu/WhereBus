import { Text } from "@mantine/core";
import { useAtom } from "jotai";
import React from "react";
import { selectedBusStopsAtom } from "../atoms";
import { BusStopCard } from "./BusStopCard";
import { BusStopCode } from "../typings";

export const FavoriteBusStops: React.FC<object> = () => {
  const [busStops] = useAtom<BusStopCode[]>(selectedBusStopsAtom);
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
