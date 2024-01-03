import { Outlet, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookie from "js-cookie";

export default function PrivateRoutes() {
  if (!Cookie.get("token")) toast.error("Please login");
  return Cookie.get("token") ? <Outlet /> : <Navigate to={"/user/home"} />;
}
