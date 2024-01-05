import axios from "axios";
import {
  GetBusArrivalRequest,
  GetBusArrivalResponse,
  GetBusStopsRequest,
  GetBusStopsResponse,
} from "../typings";
import { GET_BUS_STOPS_PAGE_SIZE } from "../constants";

const AccountKey = import.meta.env.VITE_API_KEY ?? "";

class Client {
  async GetBusArrival(
    params: GetBusArrivalRequest
  ): Promise<GetBusArrivalResponse> {
    const URL = "/api/BusArrivalv2";
    const res = await axios.get(URL, {
      headers: {
        Accept: "application/json",
        AccountKey,
      },
      params,
    });
    return res.data;
  }

  async GetBusStops(): Promise<GetBusStopsResponse> {
    const URL = "/api/BusStops";

    // as of now, there's between 5000 to 5500 bus stops
    // and each response gives at most 500 records
    // but there's a QPS limit so we do 4 parallel requests first
    // then do the rest sequentially
    const skips: number[] = [500, 1000, 1500, 2000];

    // so we want to collect all bus stops in 1 go
    const responses = await Promise.all(
      skips.map(async ($skip) => {
        const params: GetBusStopsRequest = { $skip };
        const res = await axios.get(URL, {
          headers: {
            Accept: "application/json",
            AccountKey,
          },
          params,
        });
        return res.data as GetBusStopsResponse;
      })
    );

    let allBusStops = responses.flatMap(({ value }) => value);

    // if the total length of allBusStops is divisible by 500, that means there
    // could have more bus stops
    let hasMore: boolean = allBusStops.length % GET_BUS_STOPS_PAGE_SIZE === 0;
    let latestSkip: number = skips[skips.length - 1];

    // this won't run too many iterations as Singapore bus stops count won't change too drastically
    while (hasMore) {
      latestSkip += GET_BUS_STOPS_PAGE_SIZE;

      const params: GetBusStopsRequest = { $skip: latestSkip };
      const res = await axios.get(URL, {
        headers: {
          Accept: "application/json",
          AccountKey,
        },
        params,
      });
      const responseData: GetBusStopsResponse = res.data;
      allBusStops = [...allBusStops, ...(responseData?.value ?? [])];
      hasMore = allBusStops.length % GET_BUS_STOPS_PAGE_SIZE === 0;
    }
    
    return {
      value: allBusStops,
    };
  }
}

const apiClient = new Client();

export default apiClient;
