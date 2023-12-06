import { useEffect } from "react";
import serverUrl from "../../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import toast from "react-hot-toast";
import store from "../../assets/IconsPNG/store.png";

export default function AdminLayout() {
  // const [username, setUsername] = useState("");
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
        // setUsername(res.data.userName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  function handleClick(e) {
    const value = e.target.value;
    console.log(value);
    switch (value) {
      case "Products":
        navigate("/admin/products");
        break;
      case "Users":
        navigate("/admin/users");
        break;
    }
  }

  const sideBarItems = [
    "Dashboard",
    "Orders",
    "Users",
    "Products",
    "Coupons",
    "Banner",
    "Profile",
  ];
  return (
    <>
      <div className="h-screen w-[33vw] p-4 bg-[#BBE1FA]">
        {sideBarItems.map((item, i) => (
          <div key={i}>
            <button
              onClick={handleClick}
              value={item}
              className="focus:bg-[#0F4C75] focus:text-white bg-white w-full my-3 rounded-xl flex items-center px-8 py-3 text-lg"
            >
              <span className="text-white ">
                <img src={store} className="text-white" alt="" />
              </span>
              {item}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
