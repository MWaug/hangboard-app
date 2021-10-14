import { ListGroup, ProgressBar } from "react-bootstrap";
import { useEffect, useState } from "react";
import { onHangEvents } from "../firebase";
import { HangEvent } from "../features/hangboard/hangInterfaces";
import { HangListItem } from "./HangListItem";

export default function HangList() {
  const [hangListData, setHangListData] = useState<HangEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const LIST_LIMIT = 50;

  const listenToHangEvents = () => {
    setLoading(true);
    const cancelSnapshotListen = onHangEvents((hangEvents: HangEvent[]) => {
      setHangListData(hangEvents);
    }, LIST_LIMIT);
    setLoading(false);
    return cancelSnapshotListen;
  };

  useEffect(() => {
    listenToHangEvents();
  }, []);
  return (
    <>
      {loading && <ProgressBar animated now={100} />}
      <ListGroup>
        {hangListData &&
          hangListData.map((hangEvent, index) => (
            <ListGroup.Item key={index}>
              <HangListItem hangEvent={hangEvent}></HangListItem>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
}
