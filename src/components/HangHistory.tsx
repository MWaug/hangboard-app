import { ProgressBar } from "react-bootstrap";
import { FunctionComponent, useEffect, useState } from "react";
import { onHangEvents } from "../firebase";
import { HangEvent } from "../features/hangboard/hangInterfaces";
import { HangboardStaticWave } from "./HangboardStaticWave";
import { HangList } from "./HangList";

type HangHistoryProps = {};

export const HangHistory: FunctionComponent<HangHistoryProps> = ({}: HangHistoryProps) => {
  const [hangListData, setHangListData] = useState<HangEvent[]>([]);
  const [selectedHang, setSelectedHang] = useState<HangEvent>();
  const [loading, setLoading] = useState(false);

  const LIST_LIMIT = 50;

  const listenToHangEvents = () => {
    setLoading(true);
    const cancelSnapshotListen = onHangEvents((hangEvents: HangEvent[]) => {
      setHangListData(hangEvents);
      if (hangEvents.length > 0) {
        setSelectedHang(hangEvents[0]);
      }
    }, LIST_LIMIT);
    setLoading(false);
    return cancelSnapshotListen;
  };

  const onListClick = (he: HangEvent): (() => void) => {
    return () => {
      console.log("List item " + he + " clicked");
      setSelectedHang(he);
    };
  };

  useEffect(() => {
    listenToHangEvents();
  }, []);
  return (
    <>
      {selectedHang && <HangboardStaticWave hangEvent={selectedHang} />}
      {loading && <ProgressBar animated now={100} />}
      <div className="mt-5"></div>
      <HangList onListClick={onListClick} loading={loading} hangListData={hangListData}></HangList>
    </>
  );
};
