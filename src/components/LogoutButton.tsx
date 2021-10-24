import { FunctionComponent } from "react";
import { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export const LogoutButton: FunctionComponent = () => {
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
      <div className="w-100 text-center mt-1">
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};
