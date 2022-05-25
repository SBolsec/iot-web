import React from "react";

import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Container,
  Group,
  NumberInput,
  Popover,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconCircleX,
  IconDeviceFloppy,
  IconDots,
  IconFilter,
  IconRefresh,
} from "@tabler/icons";

import { MessageFilter, TopicInfoResponse } from "../../api/types";
import * as topicInfoApi from "../../api/topicInfo";
import Chart from "../../components/Chart/Chart";
import Spinner from "../../components/Spinner";
import ErrorAlert from "../../components/ErrorAlert";
import * as messagesActions from "../../store/slices/messages.actions";
import * as messagesSelectors from "../../store/slices/messages.selectors";
import * as topicInfoActions from "../../store/slices/topicInfo.actions";
import * as topicInfoSelectors from "../../store/slices/topicInfo.selectors";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { showNotification } from "@mantine/notifications";

export default function Homepage() {
  const dispatch = useAppDispatch();

  const { time } = useAppSelector(messagesSelectors.filter);
  const messageStatus = useAppSelector(messagesSelectors.status);
  const topicInfoStatus = useAppSelector(topicInfoSelectors.status);

  React.useEffect(() => {
    dispatch(messagesActions.findAll({ minutes: time }));
  }, [dispatch, time]);

  if (messageStatus === "error" || topicInfoStatus === "error") {
    return <ErrorAlert />;
  }

  if (messageStatus !== "success") {
    return <Spinner />;
  }

  return (
    <Container>
      <Stack>
        <FilterCard />
        <ChartCard />
        <TopicInfoCard />
      </Stack>
    </Container>
  );
}

function FilterCard() {
  const dispatch = useAppDispatch();

  const filter = useAppSelector(messagesSelectors.filter);
  const topicInfo = useAppSelector(topicInfoSelectors.result) || [];

  const form = useForm<MessageFilter>({ initialValues: filter });

  const roomOptions = topicInfo.map((room: TopicInfoResponse) => ({
    label: `Room ${room.topic.match(/\d+/)![0]}`,
    value: room.topic,
  }));
  roomOptions.unshift({ label: "All rooms", value: "" });
  console.log(roomOptions);

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
              data={roomOptions}
              {...form.getInputProps("room")}
            />
            <NumberInput label="Minutes" {...form.getInputProps("time")} />
            <Button type="submit" leftIcon={<IconFilter />} mt={27}>
              Filter
            </Button>
          </Group>
          <ActionIcon
            color="blue"
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

function TopicInfoCard() {
  const dispatch = useAppDispatch();

  const topicInfo = useAppSelector(topicInfoSelectors.result) || [];

  React.useEffect(() => {
    const interval = setInterval(() => {
      dispatch(topicInfoActions.findAll());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <Title order={2}>Rooms</Title>
      <Group spacing={25}>
        {topicInfo.map((room: TopicInfoResponse) => (
          <RoomCard key={room.topic} room={room} />
        ))}
      </Group>
    </Card>
  );
}

type RoomCardProps = {
  room: TopicInfoResponse;
};

function RoomCard({ room }: RoomCardProps) {
  const [opened, setOpened] = React.useState(false);

  const form = useForm<{ threshold: number }>({
    initialValues: { threshold: room.threshold },
  });

  const onSubmit = async (values: { threshold: number }) => {
    try {
      await topicInfoApi.create({
        room: Number(room.topic.match(/\d+/)![0]),
        threshold: values.threshold,
      });

      showNotification({
        title: "Success",
        message: "Humidity threshold updated",
        color: "green",
      });
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    } finally {
      setOpened(false);
    }
  };

  return (
    <Card shadow="lg" p={10}>
      <Stack>
        <Group position="apart">
          <Text>Room {room.topic.match(/\d+/)![0]}</Text>
          <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            target={
              <ActionIcon onClick={() => setOpened(!opened)}>
                <IconDots />
              </ActionIcon>
            }
            withArrow={true}
            position="bottom"
          >
            <form onSubmit={form.onSubmit(onSubmit)}>
              <NumberInput
                label="Threshold"
                min={0}
                max={100}
                {...form.getInputProps("threshold")}
              />
              <Group position="right" spacing={5} mt={10}>
                <Button
                  type="button"
                  variant="subtle"
                  compact={true}
                  leftIcon={<IconCircleX />}
                  color="red"
                  onClick={() => setOpened(false)}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="subtle"
                  compact={true}
                  leftIcon={<IconDeviceFloppy />}
                >
                  Save
                </Button>
              </Group>
            </form>
          </Popover>
        </Group>
        <Group spacing={5}>
          <Text size="sm">Humidity:</Text>
          <Text weight="bold">{room.threshold}</Text>
        </Group>
        {room.turnedOn ? (
          <Badge color="green">Turned on</Badge>
        ) : (
          <Badge color="red">Turned off</Badge>
        )}
      </Stack>
    </Card>
  );
}
