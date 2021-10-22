import { ListGroup } from "react-bootstrap";
import { FunctionComponent } from "react";
import { HangEvent, getHangDurationSec } from "../features/hangboard/hangInterfaces";

type HangListItemProps = {
  hangEvent: HangEvent;
};

export const HangListItem: FunctionComponent<HangListItemProps> = ({
  hangEvent,
}: HangListItemProps) => {
  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item key={2} className="bg-transparent">
          Duration: <b>{getHangDurationSec(hangEvent).toFixed(2)}s</b>
        </ListGroup.Item>
        <ListGroup.Item key={1} className="bg-transparent">
          Max: <b>{hangEvent.maxWeight.toFixed(0)}lbs</b> Ave:{" "}
          <b>{hangEvent.aveWeight.toFixed(0)}lbs</b>
        </ListGroup.Item>
        <ListGroup.Item key={3} className="bg-transparent">
          Time: {hangEvent.recvTime.toLocaleString()}
        </ListGroup.Item>
        <ListGroup.Item key={4} className="bg-transparent">
          User: {hangEvent.user}
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};
