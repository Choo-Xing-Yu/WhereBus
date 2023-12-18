import React from "react";
import { useGetNearestBusStops } from "../api";
import { BusStopRow } from "./BusStopRow";
import { Text } from "@mantine/core";

export const NearestBusStops: React.FC<object> = () => {
  const { data = [] } = useGetNearestBusStops();

  return (
    <div className="w-full flex flex-col gap-y-4 p-4">
      <Text size="xl" fw={700}>
        Nearest Bus Stops
      </Text>
      {data.map((busStop, i) => (
        <BusStopRow key={i} busStop={busStop} />
      ))}
    </div>
  );
};
