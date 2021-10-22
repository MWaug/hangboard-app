import { FunctionComponent } from "react";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { HangEvent } from "../features/hangboard/hangInterfaces";

const getDefaultChartData = (): ChartData => {
  const newChartData = {
    labels: [],
    datasets: [
      {
        label: "Hang Force (lbs)",
        lineTension: 0,
        data: [],
      },
    ],
  };
  return newChartData;
};

type StaticWaveProps = {
  hangEvent: HangEvent;
};

export const HangboardStaticWave: FunctionComponent<StaticWaveProps> = ({
  hangEvent,
}: StaticWaveProps) => {
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Seconds",
        },
      },
      y: {
        title: {
          display: true,
          text: "Weight (lbs)",
        },
      },
    },
  };

  const generateChartData = (he: HangEvent): ChartData => {
    const d = getDefaultChartData();
    // Add new values to the chart data fields
    d.datasets[0].data = he.weight;
    d.labels = he.times.map((t) => {
      return t - he.times[0];
    });
    return d;
  };

  return <>{hangEvent && <Line data={generateChartData(hangEvent)} options={options} />}</>;
};
