import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";

import Header from "./components/Header";
import store from "./store/store";
import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    <Provider store={store}>
      <UiProvider />
    </Provider>
  );
}

function UiProvider() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
        <NotificationsProvider>
          <AppLayout />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

function AppLayout() {
  return (
    <BrowserRouter>
      <AppShell
        header={<Header />}
        padding="md"
        fixed={true}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <AppRoutes />
      </AppShell>
    </BrowserRouter>
  );
}
