import { ListGroup, ProgressBar, Card } from "react-bootstrap";
import { FunctionComponent, useEffect, useState } from "react";
import { hangEventFromFirestore, hangEventsCollection } from "../firebase";
import { onSnapshot } from "@firebase/firestore";
import {
  HangEvent,
  getHangDuration,
} from "../features/hangboard/hangInterfaces";

type HangListItemProps = {
  hangEvent: HangEvent;
};
const HangListItem: FunctionComponent<HangListItemProps> = ({
  hangEvent,
}: HangListItemProps) => {
  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item key={2}>
          Duration: <b>{getHangDuration(hangEvent)}s</b>
        </ListGroup.Item>
        <ListGroup.Item key={1}>
          Max: <b>{hangEvent.maxWeight}lbs</b> Ave:{" "}
          <b>{hangEvent.aveWeight}lbs</b>
        </ListGroup.Item>
        <ListGroup.Item key={3}>
          Time: {hangEvent.endTime.toLocaleString()}
        </ListGroup.Item>
        <ListGroup.Item key={4}>User: {hangEvent.user}</ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default function HangList() {
  const [hangListData, setHangListData] = useState<HangEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const getHangEvents = () => {
    setLoading(true);
    onSnapshot(hangEventsCollection, (querySnapshot) => {
      const items: HangEvent[] = [];
      querySnapshot.forEach((doc) => {
        items.push(hangEventFromFirestore(doc.data()));
      });
      setHangListData(items);
      setLoading(false);
    });
  };

  useEffect(() => {
    getHangEvents();
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
