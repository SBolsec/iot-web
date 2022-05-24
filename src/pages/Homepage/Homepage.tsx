import React from "react";

import {
  ActionIcon,
  Button,
  Card,
  Container,
  Group,
  NumberInput,
  Select,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconFilter, IconRefresh } from "@tabler/icons";

import { MessageFilter } from "../../api/types";
import Chart from "../../components/Chart/Chart";
import Spinner from "../../components/Spinner";
import ErrorAlert from "../../components/ErrorAlert";
import * as messagesActions from "../../store/slices/messages.actions";
import * as messagesSelectors from "../../store/slices/messages.selectors";
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function Homepage() {
  const dispatch = useAppDispatch();

  const { time } = useAppSelector(messagesSelectors.filter);
  const status = useAppSelector(messagesSelectors.status);

  React.useEffect(() => {
    dispatch(messagesActions.findAll({ minutes: time }));
  }, [dispatch, time]);

  if (status === "error") {
    return <ErrorAlert />;
  }

  if (status !== "success") {
    return <Spinner />;
  }

  return (
    <Container>
      <Stack>
        <FilterCard />
        <ChartCard />
      </Stack>
    </Container>
  );
}

function FilterCard() {
  const dispatch = useAppDispatch();

  const filter = useAppSelector(messagesSelectors.filter);

  const form = useForm<MessageFilter>({ initialValues: filter });

  const onSubmit = (values: MessageFilter) => {
    dispatch(messagesActions.filter(values));
  };

  return (
    <Card>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Group position="apart">
          <Group position="left">
            <Select
              label="Filter room"
              data={[
                { value: "", label: "No filter" },
                { value: "room/1/hum", label: "Room 1" },
                { value: "room/2/hum", label: "Room 2" },
                { value: "room/3/hum", label: "Room 3" },
                { value: "room/4/hum", label: "Room 4" },
              ]}
              {...form.getInputProps("room")}
            />
            <NumberInput label="Minutes" {...form.getInputProps("time")} />
            <Button type="submit" leftIcon={<IconFilter />} mt={27}>
              Filter
            </Button>
          </Group>
          <ActionIcon
            color="blue"
            variant="filled"
            mt={27}
            onClick={() =>
              dispatch(messagesActions.findAll({ minutes: filter.time }))
            }
          >
            <IconRefresh />
          </ActionIcon>
        </Group>
      </form>
    </Card>
  );
}

function ChartCard() {
  const result = useAppSelector(messagesSelectors.result);
  const { room } = useAppSelector(messagesSelectors.filter);

  return (
    <Card>
      <Stack>
        <Chart messages={result} filteredRoom={room} />
      </Stack>
    </Card>
  );
}
