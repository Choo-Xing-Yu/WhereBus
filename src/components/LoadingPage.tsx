import { Container, Loader } from "@mantine/core";
import React from "react";

export const LoadingPage: React.FC<object> = () => {
  return (
    <Container
      className="flex flex-1 items-center justify-center"
      style={{ height: "100vh" }}
    >
      <Loader color="gray" />
    </Container>
  );
};
