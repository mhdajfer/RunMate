import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useEffect } from "react";
import serverUrl from "../../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import store from "../../assets/IconsPNG/store.png";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const user = "admin";
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(`${serverUrl}/admin/verify-admin`, {}, { withCredentials: true })
      .then((res) => {
        if (res.data.expired) {
          toast.error("User expired, login again");
          navigate("/admin/login");
        }
        if (!res.data.success) {
          console.log(res);
          navigate("/admin/login");
        } else {
          console.log(res);
        }
        console.log(res);
        setUsername(res.data.userName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  const sideBarItems = [
    "Dashboard",
    "Orders",
    "Products",
    "Coupons",
    "Banner",
    "Profile",
  ];
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="h-screen w-[33vw] p-4 bg-[#BBE1FA]">
          {sideBarItems.map((item, i) => (
            <div key={i}>
              <button className="focus:bg-[#0F4C75] focus:text-white bg-white w-full my-3 rounded-xl flex items-center px-8 py-3 text-lg">
                <span className="text-white ">
                  <img src={store} className="text-white" alt="" />
                </span>
                {item}
              </button>
            </div>
          ))}
        </div>
        <div className="bg-red-600 w-full">
          <h1>Hi there, {username}</h1>
        </div>
      </div>
      {user === "admin" ? "" : <Footer />}
    </>
  );
}
