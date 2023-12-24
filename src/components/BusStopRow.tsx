import { ActionIcon, Card, Group, Text } from "@mantine/core";
import { Heart } from "tabler-icons-react";
import { useRemoveFromFavoriteBusStops, useSetFavoriteBusStops } from "../api";
import { BusStop } from "../typings";
export interface BusStopRowProps {
  busStop: BusStop;
  onClick?: () => Promise<void> | void;
  isFavorite?: boolean;
}

export const BusStopRow: React.FC<BusStopRowProps> = ({
  busStop,
  isFavorite = false,
}) => {
  const { mutate: mutateSet } = useSetFavoriteBusStops();
  const { mutate: mutateRemove } = useRemoveFromFavoriteBusStops();
  const { BusStopCode, RoadName, Description } = busStop;
  return (
    <Card>
      <Group gap={"sm"}>
        <ActionIcon
          variant="default"
          onClick={() => {
            const payload = { busStopCode: BusStopCode };
            if (isFavorite) {
              mutateRemove(payload);
              return;
            }
            mutateSet(payload);
          }}
        >
          <Heart color={isFavorite ? "yellow" : "gray"} />
        </ActionIcon>
        <Text>{[BusStopCode, RoadName, Description].join(" | ")}</Text>
      </Group>
    </Card>
  );
};
