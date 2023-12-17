import { Container, Text } from "@mantine/core";
import React from "react";

export const ErrorPage: React.FC<object> = () => {
  return (
    <Container
      className="flex flex-1 items-center justify-center"
      style={{ height: "100vh" }}
    >
      <Text>Error!</Text>
    </Container>
  );
};
