import { useState, useEffect, FunctionComponent } from "react";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { onHangEvents } from "../firebase";
import { HangEvent } from "../features/hangboard/hangInterfaces";

const getDefaultChartData = (): ChartData => {
  const newChartData = {
    labels: [],
    datasets: [
      {
        label: "Hang Force (lbs)",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0,
        borderDash: [8, 4],
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
      x: {},
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
    d.labels = he.t.map((t) => {
      return t - he.t[0];
    });
    return d;
  };

  return (
    <>
      {hangEvent && (
        <Line data={generateChartData(hangEvent)} options={options} />
      )}
    </>
  );
};
