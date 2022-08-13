import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const ProtectedRoute = () => {
  const [beUser] = useAuth().beUser;
  const [userRole] = useAuth().userRole;

  return !beUser ? (
    <Navigate to="/" />
  ) : userRole !== "admin" ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export const ProtectedRouteAdmin = () => {
  const [beUser] = useAuth().beUser;
  const [userRole] = useAuth().userRole;

  return beUser && userRole === "admin" ? (
    <Navigate to="/admin/products" />
  ) : (
    <Outlet />
  );
};
