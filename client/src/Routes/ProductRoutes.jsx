import { Routes, Route } from "react-router-dom";
import SingleProduct from "../pages/Product/SingleProduct";
<<<<<<< HEAD
import UserLayout from "../Components/UserLayout";
=======
>>>>>>> aa5a3c2c5080afa21fd62d83662d794e988c2f3b

function ProductRoutes() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route element={<UserLayout />}>
        <Route path="/:id" element={<SingleProduct />} />
      </Route>
=======
      <Route path="/:id" element={<SingleProduct />} />
>>>>>>> aa5a3c2c5080afa21fd62d83662d794e988c2f3b
    </Routes>
  );
}

export default ProductRoutes;
