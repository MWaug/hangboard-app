import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import HangboardLiveWave from "./HangboardLiveWave";

export default function HangboardDash() {
  const [error, setError] = useState("");
  const { logout } = useAuth()!;
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4 mt-4">History</h2>
          <HangboardLiveWave />
        </Card.Body>
        <Link to="/hangboard-history" className="btn btn-primary w-100 mt-3">
          Hangboard History
        </Link>
      </Card>
      <div className="w-100 text-center mt-1">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
