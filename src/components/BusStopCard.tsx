import { Card, Skeleton, Text } from "@mantine/core";
import React from "react";
import { useGetBusArrival } from "../api";
import { BusStop, BusStopCode } from "../typings";
import { BusServiceCard } from "./BusServiceCard";

export interface BusStopCardProps {
  busStopCode: BusStopCode;
}

const BusStopName: React.FC<{ busStop?: BusStop }> = ({ busStop }) => {
  if (!busStop) return <></>;

  const { RoadName, Description, BusStopCode } = busStop;
  const busStopInfo = [BusStopCode, RoadName].filter(Boolean).join(" | ");
  const hasBusStopName =
    [RoadName, Description, BusStopCode].filter(Boolean).length > 0;

  if (!hasBusStopName) return <></>;

  return (
    <>
      <Text fw={600} size="lg">
        {Description}
      </Text>
      <Text mb="md" c="dimmed">
        {busStopInfo}
      </Text>
    </>
  );
};

export const BusStopCard: React.FC<BusStopCardProps> = ({ busStopCode }) => {
  const { data, isLoading } = useGetBusArrival({ BusStopCode: busStopCode });
  const { Services = [], SourceMetaData } = data ?? {};

  const mx = "xs";

  if (isLoading) return <Skeleton height={300} mx={mx} />;
  return (
    <Card mx={mx} withBorder>
      <BusStopName busStop={SourceMetaData} />
      <div className="flex flex-col gap-y-4">
        {Services.map((s, i) => (
          <BusServiceCard key={i} service={s} />
        ))}
      </div>
    </Card>
  );
};
