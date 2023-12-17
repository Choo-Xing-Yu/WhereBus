import { PrimitiveAtom, atom } from "jotai";
import { GetBusArrivalRequest } from "../typings";

const JURONG_WEST_AVE_1_BLK_536_BUS_STOP_CODE = 28531;

export const getBusArrivalRequestAtom: PrimitiveAtom<GetBusArrivalRequest> =
  atom<GetBusArrivalRequest>({
    BusStopCode: JURONG_WEST_AVE_1_BLK_536_BUS_STOP_CODE,
  });
