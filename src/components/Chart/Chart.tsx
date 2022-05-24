import React from "react";

import { Card } from "@mantine/core";

import ReactApexChart from "react-apexcharts";

import { MessageResponse } from "../../api/types";
import { options } from "./options";

type ChartCardProps = {
  messages: MessageResponse[];
  filteredRoom?: string;
};

type ChartData = {
  x: Date;
  y: number;
  meta: {
    room: string;
  };
};

export default function Chart({ messages, filteredRoom }: ChartCardProps) {
  const data: ChartData[] = messages
    .map((message: MessageResponse) => ({
      y: Number(message.payload),
      x: new Date(message.timestamp),
      meta: {
        //@ts-ignore
        room: message.topic.match(/(\d+)/)[0],
        topic: message.topic,
      },
    }))
    .filter((value) =>
      filteredRoom ? value.meta.topic === filteredRoom : true
    );

  const series: ApexAxisChartSeries = [{ name: "Humidity", data }];

  return <ReactApexChart options={options} series={series} height={450} />;
}
