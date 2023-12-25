import { ActionIcon, Card, Group, Text } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
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
          variant="transparent"
          color="yellow"
          onClick={() => {
            const payload = { busStopCode: BusStopCode };
            if (isFavorite) {
              mutateRemove(payload);
              return;
            }
            mutateSet(payload);
          }}
        >
          {isFavorite ? <IconHeartFilled /> : <IconHeart />}
        </ActionIcon>
        <Text>{[BusStopCode, RoadName, Description].join(" | ")}</Text>
      </Group>
    </Card>
  );
};
