import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./UpdateProfile";
import ForgotPassword from "./ForgotPassword";
import HangboardDash from "./HangboardDash";
import Signup from "./Signup";

function App() {
  return (
    <Container
      className="d-flex alight-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute
                exact
                path="/"
                component={Dashboard}
                authenticationPath="/login"
              />
              <PrivateRoute
                path="/update-profile"
                component={UpdateProfile}
                authenticationPath="/login"
              />
              <PrivateRoute
                path="/hangboard-wave"
                component={HangboardDash}
                authenticationPath="/login"
              />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
