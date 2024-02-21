import { Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/Admin/AdminLayout";
import AddProduct from "../pages/Admin/Products/AddProduct";
import EditProduct from "../pages/Admin/Products/EditProduct";
import PrivateRoutes from "../Utils/PrivateRoutes";
import UserLayout from "../Components/Layout/UserLayout";
import SingleProduct from "../pages/Product/SingleProduct";
import SingleOrderDetails from "../Components/Order/SingleOrderDetails";
import Search from "../pages/User/Search";

function ProductRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/:id" element={<SingleProduct />} />
        <Route path="/search" element={<Search />} />
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
