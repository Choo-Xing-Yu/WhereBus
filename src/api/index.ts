import { useQuery } from "@tanstack/react-query";
import {
  BusStop,
  BusStopCode,
  GetBusArrivalRequest,
  GetBusArrivalResponse,
  NextBus,
} from "../typings";
import BusArrivalMock from "./mocks/BusArrival.json";
import BusStopsMock from "./mocks/BusStops.json";
import { useAtom } from "jotai";
import { currentLocationAtom } from "../atoms";
import { getDistance } from "geolib";

// so that we can dev loading page with mocked data
const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });

const QUERY_KEYS = {
  GET_BUS_ARRIVAL: (filter: GetBusArrivalRequest) => ["arrival", filter],
  GET_BUS_STOPS: ["stops"],
};

export const useGetBusArrival = (params: GetBusArrivalRequest) => {
  const { data: metadata = new Map<BusStopCode, BusStop>(), isSuccess } =
    useGetBusStopsMetadataMapping();

  return useQuery({
    queryKey: QUERY_KEYS.GET_BUS_ARRIVAL(params),
    queryFn: async () => {
      // return client.GetBusArrival(params);
      await delay(1000);
      return BusArrivalMock as GetBusArrivalResponse;
    },
    enabled: isSuccess,
    refetchInterval: 30000, // refetch every 30s
    select: (data) => {
      const Services = data.Services.map((s) => {
        const nextBuses = [s.NextBus, s.NextBus2, s.NextBus3].filter(
          Boolean
        ) as NextBus[];
        s.NextBuses = nextBuses;

        if (nextBuses.length > 0) {
          // assuming all the same BusCodes goes to the same destination
          const destinationBusStop = nextBuses[0];
          s.destinationMetadata = metadata.get(
            destinationBusStop.DestinationCode
          );
        }
        return s;
      });
      Services.sort(({ ServiceNo: a }, { ServiceNo: b }) =>
        String(a).localeCompare(String(b), undefined, { numeric: true })
      );
      return {
        ...data,
        SourceMetaData: metadata.get(data.BusStopCode),
        NextBuses: data.Services.map(
          ({ NextBus, NextBus2, NextBus3 }) =>
            [NextBus, NextBus2, NextBus3].filter(Boolean) as NextBus[]
        ),
        Services,
      };
    },
  });
};

export const useGetBusStopsMetadataMapping = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_BUS_STOPS,
    queryFn: async () => {
      // return client.GetBusStops();
      await delay(1000);
      return BusStopsMock;
    },
    select: ({ value }) => {
      const map = new Map<BusStopCode, BusStop>();
      value.forEach((v) => {
        map.set(v.BusStopCode, v);
      });
      return map;
    },
  });
};

export const useGetNearestBusStops = () => {
  const [{ latitude, longitude }] = useAtom(currentLocationAtom);

  return useQuery({
    queryKey: QUERY_KEYS.GET_BUS_STOPS,
    queryFn: async () => {
      // return client.GetBusStops();
      await delay(1000);
      return BusStopsMock;
    },
    select: ({ value }) => {
      const busStopsWithDistanceAway = value.map((v) => ({
        ...v,
        distanceAway: getDistance(
          { latitude, longitude },
          { latitude: v.Latitude, longitude: v.Longitude }
        ),
      }));

      // sort distanceAway in descending order
      busStopsWithDistanceAway.sort((x, y) => x.distanceAway - y.distanceAway);

      return busStopsWithDistanceAway;
    },
  });
};
