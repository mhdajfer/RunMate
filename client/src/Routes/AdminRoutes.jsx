import LoginPage from "../pages/Admin/LoginPage";
import AdminLayout from "../pages/Admin/AdminLayout";
import Products from "../pages/Admin/Products";
import PrivateRoutes from "../Utils/PrivateRoutes";
import Users from "../pages/Admin/Users";
import { Routes, Route } from "react-router-dom";
import Category from "../pages/Admin/Category";
import AddCategory from "../pages/Admin/AddCategory";
import EditUser from "../pages/Admin/EditUser";
import Orders from "../pages/Admin/Orders";
import SingleOrderDetails from "../Components/SingleOrderDetails";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoutes role={"admin"} />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/edit" element={<EditUser />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/orders/" element={<Orders />} />
          <Route path="/order/getOne" element={<SingleOrderDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
