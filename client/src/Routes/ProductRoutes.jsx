import { Routes, Route } from "react-router-dom";
import SingleProduct from "../pages/Product/SingleProduct";
import UserLayout from "../Components/UserLayout";
import AddProduct from "../pages/Admin/AddProduct";
import EditProduct from "../pages/Admin/EditProduct";

function ProductRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/:id" element={<SingleProduct />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit" element={<EditProduct />} />
      </Route>
    </Routes>
  );
}

export default ProductRoutes;
