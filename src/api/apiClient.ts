import axios from "axios";
import {
  GetBusArrivalRequest,
  GetBusArrivalResponse,
  GetBusStopsResponse,
} from "../typings";

const AccountKey = import.meta.env.VITE_API_KEY ?? "";

class Client {
  async GetBusArrival(params: GetBusArrivalRequest) {
    const URL = "https://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2";
    return await axios.get<GetBusArrivalRequest, GetBusArrivalResponse>(URL, {
      headers: {
        Accept: "application/json",
        AccountKey,
      },
      params,
    });
  }

  async GetBusStops() {
    const URL = "https://datamall2.mytransport.sg/ltaodataservice/BusStops";
    return await axios.get<void, GetBusStopsResponse>(URL, {
      headers: {
        Accept: "application/json",
        AccountKey,
      },
    });
  }
}

const apiClient = new Client();

export default apiClient;
