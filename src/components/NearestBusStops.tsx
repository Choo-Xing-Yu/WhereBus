import { ActionIcon, Center, Loader, Text, TextInput } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React from "react";
import {
  useGetFavoriteBusStops,
  useGetNearestBusStops,
  useGetSearchedNearestBusStops,
} from "../api";
import { searchedBusStopAtom } from "../atoms";
import { BusStopRow } from "./BusStopRow";

const SearchBar = () => {
  const [search, setSearch] = useAtom(searchedBusStopAtom);
  return (
    <TextInput
      size="lg"
      placeholder="Search bus stops by code or description"
      leftSection={<IconSearch size="1.25rem" />}
      value={search}
      onChange={(event) => setSearch(event.currentTarget.value)}
      rightSection={
        <ActionIcon variant="transparent" onClick={() => setSearch("")}>
          <IconX size="1.25rem" color="gray" />
        </ActionIcon>
      }
    />
  );
};

export const NearestBusStops: React.FC<object> = () => {
  const { data: nearestBusStops = [], isLoading: isNearestBusStopLoading } =
    useGetNearestBusStops();
  const { data: favoriteBusStops = [] } = useGetFavoriteBusStops();
  const { data: searchedBusStops = [], isLoading: isSearchLoading } =
    useGetSearchedNearestBusStops();
  const [search] = useAtom(searchedBusStopAtom);

  const isLoading = isNearestBusStopLoading || isSearchLoading;

  const renderedList = search.length > 0 ? searchedBusStops : nearestBusStops;

  return (
    <div className="w-full flex flex-col gap-y-4 p-4">
      <Text size="xl" fw={700}>
        Nearest Bus Stops
      </Text>
      <SearchBar />
      {isLoading ? (
        <Center>
          <Loader color="gray" />
        </Center>
      ) : (
        renderedList.map((busStop, i) => (
          <BusStopRow
            key={i}
            busStop={busStop}
            isFavorite={favoriteBusStops.includes(busStop.BusStopCode)}
          />
        ))
      )}
    </div>
  );
};
