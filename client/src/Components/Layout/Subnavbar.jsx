import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import serverURL from "../../../serverURL";

export default function Subnavbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const token = Cookie.get("token");
  useEffect(() => {
    Cookie.get("token")
      ? axios
          .post(`${serverURL}/getOneUser`, { token }, { withCredentials: true })
          .then((res) => {
            if (res.data.success) {
              const [user] = res.data.user;
              setUser(user);
            } else {
              if (res.data.message == "token expired, login again")
                Cookie.remove("token");
              toast.error(res.data.message);
              navigate("/user/home");
            }
          })
      : null;
  }, [navigate, token]);
  return (
    <div className="relative">
      <div className="my-2 flex justify-center">
        <button className="bg-white border px-10 py-1 rounded-full mx-3">
          <Link to={"/user/bestSelling"}>Best Selling</Link>
        </button>
        <button className="bg-white border px-10 py-1 rounded-full mx-3">
          <Link to={"/user/men"}>Men</Link>
        </button>
        <button className="bg-white border px-10 py-1 rounded-full mx-3">
          <Link to={"/user/women"}>Women</Link>
        </button>
        <button className="bg-white border px-10 py-1 rounded-full mx-3">
          <Link to={"/user/sports"}>Sports</Link>
        </button>
      </div>
      <div>
        {Cookie.get("token") ? (
          <button
            type="button"
            onClick={() => {
              navigate("/user/profile", { state: { user } });
            }}
            className="absolute top-0 right-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {user?.name}
          </button>
        ) : null}
      </div>
    </div>
  );
}
