import { useEffect, useRef } from "react";
import {
  hangboardConnectStream,
  parseHangboardMessage,
} from "../features/mqtt/hangboardMQTT";
import { ChartData, Chart } from "chart.js";
import "chartjs-adapter-luxon";
import ChartStreaming from "chartjs-plugin-streaming";

Chart.register(ChartStreaming);

export default function HangboardLiveWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const addPlotData = (
    t: number[],
    v: number[],
    chart: Chart<"line", { x: Date; y: number }[], any>
  ): void => {
    const times = t.map((n: number) => {
      return new Date(n);
    });

    const zip = times.map((tval, i): [Date, number] => [tval, v[i]]);
    const chartData: { x: Date; y: number }[] = zip.map((pair) => {
      return { x: pair[0], y: pair[1] };
    });
    chartData.forEach((entry) => {
      chart.data.datasets[0].data.push(entry);
    });
  };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D | null = canvasRef.current
      ? canvasRef.current.getContext("2d")
      : null;
    if (ctx) {
      const chart = new Chart(ctx, {
        type: "line", // 'line', 'bar', 'bubble' and 'scatter' types are supported
        data: {
          datasets: [
            {
              label: "Hang Force (lbs)",
              data: [], // empty at the beginning
            },
          ],
        },
        options: {
          scales: {
            y: {
              title: {
                display: true,
                text: "Weight(lbs)",
              },
            },
            x: {
              type: "realtime", // x axis will auto-scroll from right to left
              realtime: {
                // per-axis options
                duration: 20000, // data in the past 20000 ms will be displayed
                refresh: 200, // onRefresh callback will be called every 1000 ms
                delay: 600, // delay of 1000 ms, so upcoming values are known before plotting a line
                pause: false, // chart is not paused
                ttl: undefined, // data will be automatically deleted as it disappears off the chart
                frameRate: 20, // data points are drawn 30 times every second
              },
            },
          },
        },
      });
      hangboardConnectStream((topic: string, message: string, packet: any) => {
        const hdata = parseHangboardMessage(message);
        addPlotData(hdata.t, hdata.v, chart);
      });
    }
  }, []);

  return (
    <>
      <canvas id="myChart" width="400" height="400" ref={canvasRef}></canvas>
    </>
  );
}
