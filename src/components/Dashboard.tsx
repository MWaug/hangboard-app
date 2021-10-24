import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

export default function Dashboard() {
  const { currentUser } = useAuth()!;

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <strong>Email:</strong> {currentUser!.email}
          <Link to="/hangboard-wave" className="btn btn-primary w-100 mt-3">
            Hangboard Live View
          </Link>
          <Link to="/hangboard-history" className="btn btn-primary w-100 mt-3">
            Hangboard History
          </Link>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <LogoutButton />
    </>
  );
}
