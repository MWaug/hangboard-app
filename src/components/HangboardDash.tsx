import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";
import HangboardLiveWave from "./HangboardLiveWave";

export default function HangboardDash() {
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4 mt-4">Live View</h2>
          <HangboardLiveWave />
        </Card.Body>
        <Link to="/hangboard-history" className="btn btn-primary w-100 mt-3">
          Hangboard History
        </Link>
        <Link to="/" className="btn btn-primary w-100 mt-3">
          Dashboard
        </Link>
        <LogoutButton />
      </Card>
    </>
  );
}
