import { Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/Admin/AdminLayout";
import AddProduct from "../pages/Admin/AddProduct";
import EditProduct from "../pages/Admin/EditProduct";
import PrivateRoutes from "../Utils/PrivateRoutes";

function ProductRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<AdminLayout />}>
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit" element={<EditProduct />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default ProductRoutes;
