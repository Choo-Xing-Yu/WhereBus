import { ActionIcon, Card, Group, Text } from "@mantine/core";
import { BusStop } from "../typings";
import { Heart } from "tabler-icons-react";
export interface BusStopRowProps {
  busStop: BusStop;
  onClick?: () => Promise<void> | void;
  isFavorite?: boolean;
}

export const BusStopRow: React.FC<BusStopRowProps> = ({
  busStop,
  isFavorite = false,
}) => {
  return (
    <Card>
      <Group gap={"sm"}>
        <ActionIcon variant="default" disabled={!isFavorite}>
          <Heart />
        </ActionIcon>
        <Text>{busStop.BusStopCode}</Text>
      </Group>
    </Card>
  );
};
