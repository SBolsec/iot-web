export const options: ApexCharts.ApexOptions = {
  chart: {
    id: "messages-chart",
    type: "area",
    stacked: false,
    height: 200,
    zoom: {
      type: "x",
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: "zoom",
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  title: {
    text: "Humidity Movement",
    align: "left",
  },
  fill: {
    type: "fill",
  },
  yaxis: {
    labels: {
      formatter: (value) => value.toFixed(0),
    },
    title: {
      text: "Humidity",
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      datetimeFormatter: {
        year: "yyyy",
        month: "MMM 'yy",
        day: "dd MMM",
        hour: "HH:mm",
      },
    },
  },
  tooltip: {
    shared: false,
    y: {
      title: {
        formatter: (_) => "",
      },
      formatter: (value: number, options: any) => {
        const room =
          options.w.config.series[options.seriesIndex].data[
            options.dataPointIndex
          ].meta.room;

        return `Room ${room}: ${value.toFixed(0)}`;
      },
    },
    x: {
      formatter: (value: number) => {
        const date = new Date(value);
        const dateString = date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        });

        return `${dateString} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      },
    },
  },
};
