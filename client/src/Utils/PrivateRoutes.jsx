import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Utils/Auth";

export default function PrivateRoutes() {
  const auth = useContext(AuthContext);
  auth.logout();

  return auth.token ? <Outlet /> : <Navigate to={"/user/login"} />;
}
