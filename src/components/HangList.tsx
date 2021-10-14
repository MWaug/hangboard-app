import { ListGroup, ProgressBar } from "react-bootstrap";
import { useEffect, useState } from "react";
import { onHangEvents } from "../firebase";
import { HangEvent } from "../features/hangboard/hangInterfaces";
import { HangListItem } from "./HangListItem";
import { HangboardStaticWave } from "./HangboardStaticWave";

export default function HangList() {
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

  const onListClick = (index: number): (() => void) => {
    return () => {
      console.log("List item " + index + " clicked");
      if (index < hangListData.length && index >= 0) {
        setSelectedHang(hangListData[index]);
      }
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
      <ListGroup>
        {hangListData &&
          hangListData.map((hangEvent, index) => (
            <ListGroup.Item key={index} action onClick={onListClick(index)}>
              <HangListItem hangEvent={hangEvent}></HangListItem>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
}
