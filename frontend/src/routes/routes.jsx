import { createBrowserRouter } from "react-router-dom";
import NotFound from "../Pages/Notfound/NotFound";
import Unauthorized from "../Pages/Unauthorized/Unauthorized.jsx";
import ProtectedRoute from "../Components/ProtectedRoutes/protectedroutes.jsx";
import Signup from "../Pages/Auth/Signup/Signup.jsx";
import Login from "../Pages/Auth/Login/Login.jsx";

export const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page</div>,
  },
  {
    path: "/auth/sign-up",
    element: <Signup />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export const privateRoutes = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page (Private)</div>,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute requiredRole="admin">
        <div>Dashboard (Admin Only)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute requiredRole="user">
        <div>Profile (User Only)</div>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
