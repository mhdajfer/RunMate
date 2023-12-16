import { useNavigate, Outlet } from "react-router-dom";
import { UseAuth } from "./Auth";

export default function PrivateRoutes() {
  const navigate = useNavigate();
  const auth = UseAuth();

  return auth.token ? <Outlet /> : navigate("/login");
}
