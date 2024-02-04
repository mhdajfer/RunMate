import LoginPage from "../pages/Admin/LoginPage";
import AdminLayout from "../pages/Admin/AdminLayout";
import Products from "../pages/Admin/Products/Products";
import PrivateRoutes from "../Utils/PrivateRoutes";
import Users from "../pages/Admin/Users";
import { Routes, Route } from "react-router-dom";
import Category from "../pages/Admin/Category/Category";
import AddCategory from "../pages/Admin/Category/AddCategory";
import Orders from "../pages/Admin/Orders";
import SingleOrderDetails from "../Components/Order/SingleOrderDetails";
import Coupons from "../pages/Admin/Coupon/Coupons";
import AddCoupon from "../pages/Admin/Coupon/AddCoupon";
import Dashboard from "../pages/Admin/Dashboard";
import SalesReport from "../pages/Admin/SalesReport";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoutes role={"admin"} />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/orders/" element={<Orders />} />
          <Route path="/order/getOne" element={<SingleOrderDetails />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/coupon/add" element={<AddCoupon />} />
          <Route path="/salesReport" element={<SalesReport />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
