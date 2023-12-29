import axios from "axios";
import {
  GetBusArrivalRequest,
  GetBusArrivalResponse,
  GetBusStopsResponse,
} from "../typings";

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
    const res = await axios.get(URL, {
      headers: {
        Accept: "application/json",
        AccountKey,
      },
    });
    return res.data;
  }
}

const apiClient = new Client();

export default apiClient;
