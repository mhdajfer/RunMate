import { Routes, Route } from "react-router-dom";
import SingleProduct from "../pages/Product/SingleProduct";

function ProductRoutes() {
  return (
    <Routes>
      <Route path="/:id" element={<SingleProduct />} />
    </Routes>
  );
}

export default ProductRoutes;
