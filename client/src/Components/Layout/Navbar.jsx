import serverURL from "../../../serverURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import Icons from "../../assets/Icons";
const { cart } = Icons;
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Navbar({ role }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(localStorage.getItem("search"));
  }, []);

  function handleCart() {
    navigate("/cart");
  }

  const handleLogout = async () => {
    Cookie.remove("token", { domain: ".runmate.online" });
    axios
      .get(`${serverURL}/${role === "admin" ? "admin/logout" : "logout"}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        navigate(`/${role === "admin" ? "admin/login" : "login"}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log("search");
    localStorage.setItem("search", search);
    navigate("/product/search", { state: { search } });
  }
  return (
    <>
      <nav>
        <div className="h-[80px] bg-[#1B262C] text-white flex items-center justify-between px-12">
          <div>
            <h1
              className="text-3xl font-bold cursor-pointer"
              onClick={() => {
                navigate("/home");
              }}
            >
              RunMate
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            {role === "admin" ? null : (
              <>
                <form
                  onSubmit={(e) => {
                    handleFormSubmit(e);
                  }}
                >
                  <input
                    type="search"
                    name="search"
                    className="rounded-full bg-[#0F4C75] px-4 py-1"
                    placeholder="Search"
                    defaultValue={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </form>
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    navigate("/product/search", { state: { search: "" } })
                  }
                >
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/ios/50/FFFFFF/filter--v1.png"
                    alt="filter--v1"
                  />
                </span>
              </>
            )}
          </div>
          <div className="space-x-6 flex">
            {role === "admin" ? null : <div onClick={handleCart}>{cart}</div>}

            <button
              className="bg-[#0F4C75] px-4 py-2 rounded-lg font-medium"
              onClick={handleLogout}
            >
              {Cookie.get("token") ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
