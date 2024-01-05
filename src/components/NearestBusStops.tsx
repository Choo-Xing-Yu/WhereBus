import { ActionIcon, Center, Loader, Text, TextInput } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React, { useState } from "react";
import {
  useGetFavoriteBusStops,
  useGetNearestBusStops,
  useGetSearchedNearestBusStops,
} from "../api";
import { searchedBusStopAtom } from "../atoms";
import { BusStopRow } from "./BusStopRow";
import { debounce } from "lodash";

const SearchBar = () => {
  const [, setSearch] = useAtom(searchedBusStopAtom);
  const [localSearch, setLocalSearch] = useState<string>("");
  const debouncedSetSearch = debounce(
    (value) => {
      setSearch(value);
    },
    1000,
    { trailing: true }
  );

  return (
    <TextInput
      size="lg"
      placeholder="Search bus stops by code or description"
      value={localSearch}
      leftSection={<IconSearch size="1.25rem" />}
      onChange={(event) => {
        setLocalSearch(event.currentTarget.value);
        debouncedSetSearch.cancel();
        debouncedSetSearch(event.currentTarget.value);
      }}
      rightSection={
        <ActionIcon
          variant="transparent"
          onClick={() => {
            setSearch("");
            setLocalSearch("");
          }}
        >
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

  const list = search.length > 0 ? searchedBusStops : nearestBusStops;
  const renderedList = list.slice(0, 10); // only render atmost 10
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
