import { ListGroup, ProgressBar } from "react-bootstrap";
import { FunctionComponent, useEffect, useState } from "react";
import { HangEvent } from "../features/hangboard/hangInterfaces";
import { HangListItem } from "./HangListItem";

type HangListProps = {
  hangListData: HangEvent[];
  onListClick: (he: HangEvent) => () => void;
  loading: boolean;
};

export const HangList: FunctionComponent<HangListProps> = ({
  hangListData,
  onListClick,
  loading,
}: HangListProps) => {
  const [selectedHang, setSelectedHang] = useState<HangEvent>();

  useEffect(() => {}, []);
  return (
    <>
      {loading && <ProgressBar animated now={100} />}
      <div className="mt-5"></div>
      <ListGroup>
        {hangListData &&
          hangListData.map((hangEvent, index) => (
            <ListGroup.Item key={index} action onClick={onListClick(hangEvent)}>
              <HangListItem hangEvent={hangEvent}></HangListItem>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};
