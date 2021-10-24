import { ProgressBar } from "react-bootstrap";
import { FunctionComponent, useEffect, useState } from "react";
import { onHangEvents } from "../firebase";
import { HangEvent } from "../features/hangboard/hangInterfaces";
import { HangboardStaticWave } from "./HangboardStaticWave";
import { LogoutButton } from "./LogoutButton";
import { HangList } from "./HangList";
import { Link } from "react-router-dom";

export const HangHistory: FunctionComponent = () => {
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
      setSelectedHang(he);
    };
  };

  useEffect(() => {
    listenToHangEvents();
  }, []);
  return (
    <>
      <h2 className="text-center mb-4 mt-4">History</h2>
      {selectedHang && <HangboardStaticWave hangEvent={selectedHang} />}
      {loading && <ProgressBar animated now={100} />}
      <div className="mt-5"></div>
      <HangList onListClick={onListClick} loading={loading} hangListData={hangListData}></HangList>
      <Link to="/" className="btn btn-primary w-100 mt-3">
        Dashboard
      </Link>
      <LogoutButton />
    </>
  );
};
