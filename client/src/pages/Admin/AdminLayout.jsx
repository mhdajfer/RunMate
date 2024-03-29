import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Layout/Navbar";
import store from "../../assets/IconsPNG/store.png";

export default function AdminLayout() {
  const navigate = useNavigate();

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
      case "Category":
        navigate("/admin/category");
        break;
      case "Orders":
        navigate("/admin/orders");
        break;
      case "Coupons":
        navigate("/admin/coupons");
        break;
      case "Dashboard":
        navigate("/admin/dashboard");
        break;
      case "Sales Report":
        navigate("/admin/salesReport");
        break;
      case "Banner":
        navigate("/admin/banner");
        break;
    }
  }

  const sideBarItems = [
    "Dashboard",
    "Orders",
    "Users",
    "Sales Report",
    "Products",
    "Coupons",
    "Category",
    "Banner",
  ];
  return (
    <>
      <Navbar role="admin" />

      <div className="flex">
        <div className="h-screen w-[34vw] max-w-[380px] p-4 bg-[#BBE1FA] sticky top-0">
          {sideBarItems.map((item, i) => (
            <div key={i}>
              <button
                onClick={handleClick}
                value={item}
                className="focus:bg-[#354e5e] focus:text-white bg-white w-full my-3 rounded-xl flex items-center px-8 py-3 text-lg"
              >
                <span className="text-white ">
                  <img src={store} className="text-white" alt="" />
                </span>
                {item}
              </button>
            </div>
          ))}
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
