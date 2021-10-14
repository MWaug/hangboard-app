export interface HangEvent {
  aveWeight: number;
  device: string;
  endTime: Date;
  maxWeight: number;
  recvTime: Date;
  startTime: Date;
  user: string;
  t: number[];
  weight: number[];
}

export const getHangDuration = (hangEvent: HangEvent): number => {
  return 5;
};
