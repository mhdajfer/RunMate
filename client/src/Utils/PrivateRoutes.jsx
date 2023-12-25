import { useContext, useEffect } from "react";
import { AuthContext } from "./Auth";
import { Outlet, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PrivateRoutes() {
  const auth = useContext(AuthContext);
  const authState = auth.getIsAuthenticated();

  useEffect(() => {
    // Show a toast notification if authentication is false
    if (!authState) {
      toast.error("You are not authenticated.");
    }
  }, [authState]);

  return authState ? <Outlet /> : <Navigate to={"/user/home"} />;
}
