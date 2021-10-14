import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  hangboardConnectStream,
  parseHangboardMessage,
} from "../features/mqtt/hangboardMQTT";
import { ChartData } from "chart.js";

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

export default function HangboardLiveWave() {
  const [chartValues, setChartValues] = useState<number[]>([]);
  const [chartTimes, setChartTimes] = useState<number[]>([]);
  var times: number[] = [];
  var values: number[] = [];

  const MAX_VIEW_LENGTH = 100;
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

  const generateChartData = (t: number[], v: number[]): ChartData => {
    const d = getDefaultChartData();
    // Add new values to the chart data fields
    d.datasets[0].data = v;
    d.labels = t;
    return d;
  };

  const addPlotData = (t: number[], v: number[]): void => {
    times = times.concat(t);
    values = values.concat(v);
    // Limit the maximum length of the chartData
    if (times.length > MAX_VIEW_LENGTH) {
      times = times.slice(times.length - MAX_VIEW_LENGTH - 1);
    }
    if (values.length > MAX_VIEW_LENGTH) {
      values = values.slice(values.length - MAX_VIEW_LENGTH - 1);
    }
    console.log("old chart data " + values);
    console.log("times " + times);
    console.log("values " + values);
    setChartTimes(times);
    setChartValues(values);
    console.log("after set - old chart data " + values);
  };

  useEffect(() => {
    hangboardConnectStream((topic: string, message: string, packet: any) => {
      const hdata = parseHangboardMessage(message);
      addPlotData(hdata.t, hdata.v);
    });
  }, []);

  return (
    <>
      <Line
        data={generateChartData(chartTimes, chartValues)}
        options={options}
      />
    </>
  );
}
