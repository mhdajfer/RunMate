import Navbar from "./Navbar";
import Subnavbar from "./Subnavbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div className="bg-[#BBE1FA]">
      <Navbar role="user" />
      <Subnavbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
