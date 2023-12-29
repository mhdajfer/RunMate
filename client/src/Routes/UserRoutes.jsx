import HomePage from "../pages/User/HomePage";
import LoginPage from "../pages/User/LoginPage";
import { Route, Routes } from "react-router-dom";
import BestSellingItems from "../pages/User/BestSellingItems";
import PrivateRoutes from "../Utils/PrivateRoutes";
import MenItems from "../pages/User/MenItems";
import SignupPage from "../pages/User/SignupPage";
import UserLayout from "../Components/UserLayout";
import Cart from "../pages/User/Cart";
import Checkout from "../pages/User/Checkout";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<UserLayout />}>
        <Route element={<PrivateRoutes />}>
          <Route path="bestSelling" element={<BestSellingItems />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/men" element={<MenItems />} />

        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
