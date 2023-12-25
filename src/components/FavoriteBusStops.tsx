import { Text } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";
import React from "react";
import { useGetFavoriteBusStops } from "../api";
import { BusStopCard } from "./BusStopCard";

const EmptyView = () => {
  return (
    <div
      className="flex flex-col w-full justify-center items-center gap-y-4"
      style={{ height: "80vh" }}
    >
      <IconMoodSad size="6rem" opacity={0.4} />
      <Text ta="center" c="dimmed">
        Looks like you don't have any favorite bus stops!
      </Text>
      <Text ta="center" c="dimmed">
        Head to Nearest tab to add them here!
      </Text>
    </div>
  );
};

export const FavoriteBusStops: React.FC<object> = () => {
  const { data: busStops = [] } = useGetFavoriteBusStops();
  return (
    <>
      <div className="p-4">
        <Text size="xl" fw={700}>
          Favorite Bus Stops
        </Text>
      </div>
      {busStops.length === 0 ? (
        <EmptyView />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {busStops.map((bs, i) => (
            <BusStopCard key={i} busStopCode={bs} />
          ))}
        </div>
      )}
    </>
  );
};
