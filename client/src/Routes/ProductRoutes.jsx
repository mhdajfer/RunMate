import { Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/Admin/AdminLayout";
import AddProduct from "../pages/Admin/AddProduct";
import EditProduct from "../pages/Admin/EditProduct";
import PrivateRoutes from "../Utils/PrivateRoutes";
import UserLayout from "../Components/UserLayout";
import SingleProduct from "../pages/Product/SingleProduct";

function ProductRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/:id" element={<SingleProduct />} />
      </Route>
      <Route element={<PrivateRoutes role={'user'}/>}>
        <Route element={<AdminLayout />}>
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit" element={<EditProduct />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default ProductRoutes;
