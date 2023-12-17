import { useAtom } from "jotai";
import React from "react";
import { useGetBusStopsMetadataMapping } from "./api";
import { selectedBusStopsAtom } from "./atoms";
import { BusStopCard } from "./components/BusStopCard";
import { ErrorPage } from "./components/ErrorPage";
import { LoadingPage } from "./components/LoadingPage";
import { BusStopCode } from "./typings";

export const WhereBus: React.FC<object> = () => {
  const { isLoading, isError } = useGetBusStopsMetadataMapping();
  const [busStops] = useAtom<BusStopCode[]>(selectedBusStopsAtom);

  if (isLoading) return <LoadingPage />;

  if (isError) return <ErrorPage />;

  return (
    <div className="grid grid-cols-3 gap-4 py-4">
      {busStops.map((bs,i) => (
        <BusStopCard key={i} busStopCode={bs} />
      ))}
    </div>
  );
};
