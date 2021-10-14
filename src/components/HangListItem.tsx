import { ListGroup } from "react-bootstrap";
import { FunctionComponent } from "react";
import {
  HangEvent,
  getHangDuration,
} from "../features/hangboard/hangInterfaces";

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
          Duration: <b>{getHangDuration(hangEvent)}s</b>
        </ListGroup.Item>
        <ListGroup.Item key={1} className="bg-transparent">
          Max: <b>{hangEvent.maxWeight}lbs</b> Ave:{" "}
          <b>{hangEvent.aveWeight}lbs</b>
        </ListGroup.Item>
        <ListGroup.Item key={3} className="bg-transparent">
          Time: {hangEvent.endTime.toLocaleString()}
        </ListGroup.Item>
        <ListGroup.Item key={4} className="bg-transparent">
          User: {hangEvent.user}
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};
