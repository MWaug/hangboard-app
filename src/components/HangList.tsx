import { ListGroup, ProgressBar } from "react-bootstrap";
import { useEffect, useState } from "react";
import { hangEventFromFirestore, hangEventsCollection } from "../firebase";
import { onSnapshot } from "@firebase/firestore";
import { HangEvent } from "../features/hangboard/hangInterfaces";
import { HangListItem } from "./HangListItem";

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
