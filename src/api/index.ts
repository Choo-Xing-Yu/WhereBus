import { useMutation, useQuery } from "@tanstack/react-query";
import { getDistance } from "geolib";
import { useAtom } from "jotai";
import { client } from "../App";
import { currentLocationAtom, searchedBusStopAtom } from "../atoms";
import {
  BusStop,
  BusStopCode,
  GetBusArrivalRequest,
  NextBus,
} from "../typings";
import {
  getLocalStorageFavoriteBusStops,
  persistLocalStorageFavoriteBusStops,
} from "../utils";
import apiClient from "./apiClient";

const QUERY_KEYS = {
  GET_BUS_ARRIVAL: (filter: GetBusArrivalRequest) => ["arrival", filter],
  GET_BUS_STOPS: ["stops"],
  FAVORITE_BUS_STOPS: ["favorite_stops"],
  SEARCHED_BUS_STOPS: (search: string) => ["favorite_stops", search],
};

export const useGetBusArrival = (params: GetBusArrivalRequest) => {
  const { data: metadata = new Map<BusStopCode, BusStop>(), isSuccess } =
    useGetBusStopsMetadataMapping();

  return useQuery({
    queryKey: QUERY_KEYS.GET_BUS_ARRIVAL(params),
    queryFn: async () => apiClient.GetBusArrival(params),
    enabled: isSuccess,
    refetchInterval: 30000, // refetch every 30s
    select: (data) => {
      const Services = data.Services.map((s) => {
        const nextBuses = [s.NextBus, s.NextBus2, s.NextBus3].filter(
          (nextBus) => Boolean(nextBus?.EstimatedArrival)
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
    queryFn: async () => apiClient.GetBusStops(),
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
    queryFn: async () => apiClient.GetBusStops(),
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

export const useGetSearchedNearestBusStops = () => {
  const { data = [], isSuccess } = useGetNearestBusStops();
  const [search] = useAtom(searchedBusStopAtom);
  return useQuery({
    queryKey: QUERY_KEYS.SEARCHED_BUS_STOPS(search),
    enabled: isSuccess,
    queryFn: () => {
      if (search.length === 0) return [];

      return data.filter(
        ({ BusStopCode, RoadName, Description }) =>
          [BusStopCode, RoadName, Description]
            .map((s) => String(s).toLowerCase())
            .filter((s) => s.includes(search.toLowerCase())).length > 0
      );
    },
  });
};

export const useGetFavoriteBusStops = () => {
  return useQuery({
    queryKey: QUERY_KEYS.FAVORITE_BUS_STOPS,
    queryFn: () => getLocalStorageFavoriteBusStops(),
  });
};

export const useSetFavoriteBusStops = () => {
  const { data: favoriteBusStops = [] } = useGetFavoriteBusStops();

  return useMutation({
    mutationFn: async ({
      busStopCode,
      merge = true,
    }: {
      busStopCode: BusStopCode;
      merge?: boolean;
    }) => {
      const newBusStops: BusStopCode[] = merge
        ? [...favoriteBusStops, busStopCode]
        : [busStopCode];

      return persistLocalStorageFavoriteBusStops(newBusStops);
    },
    onSuccess: (data) => {
      client.setQueryData(QUERY_KEYS.FAVORITE_BUS_STOPS, data);
    },
  });
};

export const useRemoveFromFavoriteBusStops = () => {
  const { data: favoriteBusStops = [] } = useGetFavoriteBusStops();

  return useMutation({
    mutationFn: async ({ busStopCode }: { busStopCode: BusStopCode }) => {
      const newBusStops: BusStopCode[] = [...favoriteBusStops].filter(
        (f) => f !== busStopCode
      );

      return persistLocalStorageFavoriteBusStops(newBusStops);
    },
    onSuccess: (data) => {
      client.setQueryData(QUERY_KEYS.FAVORITE_BUS_STOPS, data);
    },
  });
};
