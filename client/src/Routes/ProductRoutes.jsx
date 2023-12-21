import { Routes, Route } from "react-router-dom";
import SingleProduct from "../pages/Product/SingleProduct";
import UserLayout from "../Components/UserLayout";

function ProductRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/:id" element={<SingleProduct />} />
      </Route>
    </Routes>
  );
}

export default ProductRoutes;
