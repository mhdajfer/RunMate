import serverURL from "../../serverURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Subnavbar from "./Subnavbar";
import { AuthContext } from "../Utils/Auth";
import { useContext } from "react";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const authState = auth.getIsAuthenticated();
  const navigate = useNavigate();
  function handleSeller() {
    navigate("/user/bestSelling");
  }

  const handleLogout = async () => {
    auth.logout();
    axios
      .get(`${serverURL}/logout`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        navigate("/user/login");
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
            <button
              className="bg-[#0F4C75] px-4 py-2 rounded-lg font-medium"
              onClick={handleSeller}
            >
              Seller
            </button>
            <button
              className="bg-[#0F4C75] px-4 py-2 rounded-lg font-medium"
              onClick={handleLogout}
            >
              {authState ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </nav>
      <Subnavbar />
    </>
  );
}
