import { Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/Admin/AdminLayout";
import AddProduct from "../pages/Admin/AddProduct";
import EditProduct from "../pages/Admin/EditProduct";
import PrivateRoutes from "../Utils/PrivateRoutes";
import UserLayout from "../Components/UserLayout";
import SingleProduct from "../pages/Product/SingleProduct";
import SingleOrderDetails from "../Components/SingleOrderDetails";

function ProductRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/:id" element={<SingleProduct />} />
        <Route element={<PrivateRoutes role={"user"} />}>
          <Route path="/order/getOne" element={<SingleOrderDetails />} />
        </Route>
      </Route>
      <Route element={<PrivateRoutes role={"admin"} />}>
        <Route element={<AdminLayout />}>
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit" element={<EditProduct />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default ProductRoutes;
