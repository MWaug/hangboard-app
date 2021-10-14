import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import HangList from "./HangList";
import HangboardLiveWave from "./HangboardLiveWave";
// import HangboardLiveWave from "./HangboardLiveWave";

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
          <h2 className="text-center mb-4">Live View</h2>
          <HangboardLiveWave />
          <h2 className="text-center mb-4 mt-4">History</h2>
          <HangList />
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-1">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
