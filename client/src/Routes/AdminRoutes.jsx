import LoginPage from "../pages/Admin/LoginPage";
import AdminLayout from "../pages/Admin/AdminLayout";
import Products from "../pages/Admin/Products";
import { Routes, Route } from "react-router-dom";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AdminLayout />}>
      <Route path="/dashboard" element={<Products />} />
        <Route path="/products" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
