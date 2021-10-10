import React from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

// export default function PrivateRoute({ component: Component, ...rest }) {
//     const { currentUser } = useAuth()!

//     return (
//         <Route
//             {...rest}
//             render={props => {
//                 return currentUser ? <Component {...props} /> : <Redirect to="/login" />
//             }}
//         ></Route>
//     )
// }

export type ProtectedRouteProps = {
    authenticationPath: string;
} & RouteProps;

export default function ProtectedRoute({ authenticationPath, ...routeProps }: ProtectedRouteProps) {
    const authArgs = useAuth()
    if (authArgs != null && authArgs.currentUser != null) {
        return <Route {...routeProps} />;
    } else {
        return <Redirect to={{ pathname: authenticationPath }} />;
    }
};