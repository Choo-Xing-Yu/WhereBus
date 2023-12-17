import { useQuery } from "@tanstack/react-query";
import { GetBusArrivalRequest } from "../typings";
import mock from "./mock_data.json";
import { useAtom } from "jotai";
import { getBusArrivalRequestAtom } from "../atoms";

// so that we can dev loading page with mocked data
const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });

const QUERY_KEYS = {
  GET_BUS_ARRIVAL: (filter: GetBusArrivalRequest) => ["bus", filter],
};

export const useGetBusArrival = () => {
  const [filter] = useAtom(getBusArrivalRequestAtom);
  return useQuery({
    queryKey: QUERY_KEYS.GET_BUS_ARRIVAL(filter),
    queryFn: async () => {
      // mock for now
      await delay(1000);
      return mock;
    },
  });
};
