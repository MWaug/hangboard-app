import React, { useState, useEffect } from "react";
import { Card, Button, Alert, ListGroup } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  hangboardConnectStream,
  parseHangboardMessage,
} from "../features/mqtt/hangboardMQTT";
import { ChartData } from "chart.js";

export default function HangboardWave() {
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
  const [error, setError] = useState("");
  const [chartValues, setChartValues] = useState<number[]>([]);
  const [chartTimes, setChartTimes] = useState<number[]>([]);
  const { currentUser, logout } = useAuth()!;
  const history = useHistory();
  var times: number[] = [];
  var values: number[] = [];

  const MAX_VIEW_LENGTH = 100;

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

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

  const loadMore = () => {};

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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Hangboard Waveform</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Line
            data={generateChartData(chartTimes, chartValues)}
            options={options}
          />
          <div className="mt-5">
            <ListGroup>
              <ListGroup.Item>Hang 1</ListGroup.Item>
              <ListGroup.Item>Hang 2</ListGroup.Item>
            </ListGroup>
          </div>
          <Button variant="link" onClick={loadMore}>
            Load More
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
