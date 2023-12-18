import serverURL from "../../serverURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Subnavbar from "./Subnavbar";
import { useContext } from "react";
import { AuthContext } from "../Utils/Auth";

export default function Navbar(user) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    auth.logout();
    axios
      .get(`${serverURL}/logout`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <nav>
        <div className="h-[80px] bg-[#1B262C] text-white flex items-center justify-between px-12">
          <div>
            <h1 className="text-3xl font-bold">RunMate</h1>
          </div>
          <div>
            <input
              type="search"
              className="rounded-full bg-[#0F4C75] px-4 py-1"
              placeholder="Search"
            />
          </div>
          <div className="space-x-6">
            <button className="bg-[#0F4C75] px-4 py-2 rounded-lg font-medium">
              Seller
            </button>
            <button
              className="bg-[#0F4C75] px-4 py-2 rounded-lg font-medium"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      {user.user === "user" ? <Subnavbar /> : ""}
    </>
  );
}
