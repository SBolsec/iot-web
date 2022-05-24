import React from "react";

import {
  Center,
  Header as ManticoreHeader,
  Paper,
  Title,
} from "@mantine/core";

export default function Header() {
  return (
    <ManticoreHeader height={75} p="md">
      <Center>
        <Paper>
          <Title>Humorem</Title>
        </Paper>
      </Center>
    </ManticoreHeader>
  );
}
