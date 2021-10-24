import mqtt, { MqttClient } from "mqtt";

const mqttHostname = process.env.REACT_APP_HANGBOARD_MQTT_HOST;
const client = mqtt.connect(`ws://${mqttHostname}/ws`, {
  // clientId: "index",
  username: process.env.REACT_APP_HANGBOARD_MQTT_USER,
  password: process.env.REACT_APP_HANGBOARD_MQTT_PASSWD,
});

export interface HangboardMessage {
  t: [number];
  v: [number];
}

export const parseHangboardMessage = (message: string): HangboardMessage => {
  let obj: HangboardMessage = JSON.parse(message);
  return obj;
};

export const hangboardConnectStream = (
  onMessage: (topic: string, message: string, packet: any) => void
): MqttClient => {
  console.log("Connecting to hangboard");
  client.on("error", (error: string) => {
    console.log("Can't connect" + error);
  });
  client.on("connect", () => {
    console.log("connected to MQTT port");
  });
  client.on("message", (topic: string, message: string, packet: any) => {
    onMessage(topic, message, packet);
  });
  client.subscribe("testtopic", { qos: 1 });
  return client;
};
