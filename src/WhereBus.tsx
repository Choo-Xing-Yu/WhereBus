import { useAtom } from "jotai";
import React, { useState } from "react";
import { useGetBusStopsMetadataMapping, useGetFavoriteBusStops } from "./api";
import { currentLocationAtom } from "./atoms";
import { ErrorPage } from "./components/ErrorPage";
import { FavoriteBusStops } from "./components/FavoriteBusStops";
import { LoadingPage } from "./components/LoadingPage";
import { NearestBusStops } from "./components/NearestBusStops";
import { Tabs, Text } from "@mantine/core";
import { TabName } from "./constants";
import { IconHeart, IconMapPin } from "@tabler/icons-react";

export const WhereBus: React.FC<object> = () => {
  const { isLoading: isGetBusStopsMetadataLoading, isError } =
    useGetBusStopsMetadataMapping();
  const [{ latitude: curLat, longitude: curLong }, setCurrentLocation] =
    useAtom(currentLocationAtom);
  const { isLoading: isGetFavoriteBusStopsLoading } = useGetFavoriteBusStops();
  const [activeTab, setActiveTab] = useState<string | null>(TabName.Favorites);

  const isLoading =
    isGetFavoriteBusStopsLoading || isGetBusStopsMetadataLoading;
  // ===== updates user current location =====
  window.navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => {
      if (curLat === latitude && curLong === longitude) return;
      setCurrentLocation({ latitude, longitude });
    }
  );
  // ========================================

  if (isLoading) return <LoadingPage />;

  if (isError) return <ErrorPage />;

  return (
    <div className="pb-16">
      <Tabs color="yellow" value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab
            value={TabName.Favorites}
            leftSection={<IconHeart size="1rem" />}
          >
            <Text size="lg">Favorites</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value={TabName.Nearest}
            leftSection={<IconMapPin size="1rem" />}
          >
            <Text size="lg">Nearest</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={TabName.Favorites}>
          <FavoriteBusStops />
        </Tabs.Panel>
        <Tabs.Panel value={TabName.Nearest}>
          <NearestBusStops />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
