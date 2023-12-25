import {
  Card,
  DefaultMantineColor,
  Group,
  SimpleGrid,
  StyleProp,
  Text,
  useMantineTheme,
} from "@mantine/core";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { BusLoad, BusStop, NextBus, Service } from "../typings";
import { hexToRgba } from "../utils";

export interface BusServiceCardProps {
  service: Service;
}

const MinutesAway: React.FC<{ nextBuses: NextBus[] }> = ({
  nextBuses = [],
}) => {
  const theme = useMantineTheme();

  const colMap: Record<BusLoad, StyleProp<DefaultMantineColor>> = {
    [BusLoad.SEATS_AVAILABLE]: theme.colors.green[9],
    [BusLoad.STANDING_AVAILABLE]: theme.colors.orange[9],
    [BusLoad.LIMITED_STANDING]: theme.colors.red[9],
  };

  return (
    <SimpleGrid cols={3}>
      {nextBuses.map(({ EstimatedArrival, Load }, i) => {
        const minute = dayjs(EstimatedArrival).diff(dayjs(), "minute");
        return (
          <Card
            key={i}
            padding="xs"
            withBorder
            miw={50}
            h="auto"
            style={{
              alignItems: "center",
              backgroundColor: hexToRgba(colMap[Load] as string, 0.7),
            }}
          >
            <Text truncate size="xs">
              {minute}
            </Text>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};

export const BusServiceCard: React.FC<BusServiceCardProps> = ({ service }) => {
  const {
    ServiceNo: serviceNumber,
    destinationMetadata: destination,
    NextBuses = [],
  } = service;

  const { Description: description = "" } = (destination as BusStop) ?? {};

  const RHS = useMemo(() => {
    if (NextBuses.length === 0) {
      return (
        <div className="flex flex-1 justify-center items-center">
          <Text c="dimmed">Not in service</Text>
        </div>
      );
    }
    return (
      <>
        <Text miw={80} size="sm">
          Arriving in:
        </Text>
        <MinutesAway nextBuses={NextBuses} />
      </>
    );
  }, [NextBuses]);

  return (
    <Card withBorder>
      <div className="flex flex-col gap-y-4">
        <Group justify="space-between" align="center">
          <Text size="xl" fw={700}>
            {serviceNumber}
          </Text>
          <Text size="sm">{description}</Text>
        </Group>
        <Group wrap="nowrap" justify="space-between" align="center">
          {RHS}
        </Group>
      </div>
    </Card>
  );
};
