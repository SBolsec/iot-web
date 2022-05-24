import React from "react";

import {
  Center,
  Grid,
  Header as ManticoreHeader,
  Paper,
  Title,
} from "@mantine/core";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <ManticoreHeader height={75} p="md">
      <Grid>
        <Grid.Col span={1}></Grid.Col>
        <Grid.Col span={10}>
          <Center>
            <Paper>
              <Title>Humorem</Title>
            </Paper>
          </Center>
        </Grid.Col>
        <Grid.Col span={1}>
          <Center>
            <ThemeToggle />
          </Center>
        </Grid.Col>
      </Grid>
    </ManticoreHeader>
  );
}
