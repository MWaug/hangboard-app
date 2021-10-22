export interface HangEvent {
  aveWeight: number;
  device: string;
  endTimeMs: number;
  maxWeight: number;
  recvTime: Date;
  startTimeMs: number;
  user: string;
  times: number[];
  weight: number[];
}

export const getHangDurationSec = (hangEvent: HangEvent): number => {
  return (hangEvent.endTimeMs - hangEvent.startTimeMs) / 1000;
};
