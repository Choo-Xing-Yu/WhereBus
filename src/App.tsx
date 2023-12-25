import { WhereBus } from "./WhereBus";
import React from "react";
import { MantineProvider, createTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
  /** Put your mantine theme override here */
  fontFamily: "Inter, sans-serif",
});

export const client = new QueryClient();

const App: React.FC<object> = () => {
  return (
    <QueryClientProvider client={client}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <WhereBus />
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
