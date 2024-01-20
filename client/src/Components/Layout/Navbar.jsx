import serverURL from "../../../serverURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import Icons from "../../assets/Icons";
const { cart } = Icons;

// eslint-disable-next-line react/prop-types
export default function Navbar({ role }) {
  const navigate = useNavigate();

  function handleCart() {
    navigate("/user/cart");
  }

  function handleSeller() {
    navigate("/user/bestSelling");
  }

  const handleLogout = async () => {
    Cookie.remove("token");
    axios
      .get(`${serverURL}/${role === "admin" ? "admin/logout" : "logout"}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        navigate(`/${role === "admin" ? "admin" : "user"}/login`);
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
            <h1
              className="text-3xl font-bold cursor-pointer"
              onClick={() => {
                navigate("/user/home");
              }}
            >
              RunMate
            </h1>
          </div>
          <div>
            <input
              type="search"
              className="rounded-full bg-[#0F4C75] px-4 py-1"
              placeholder="Search"
            />
          </div>
          <div className="space-x-6 flex">
            <div onClick={handleCart}>{cart}</div>
            {/* <div onClick={handleCart}>{cart}</div> */}
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
              {Cookie.get("token") ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
