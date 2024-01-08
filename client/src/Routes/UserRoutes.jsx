import HomePage from "../pages/User/HomePage";
import LoginPage from "../pages/User/LoginPage";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../Utils/PrivateRoutes";
import MenItems from "../pages/User/MenItems";
import SignupPage from "../pages/User/SignupPage";
import UserLayout from "../Components/UserLayout";
import Cart from "../pages/User/Cart";
import Checkout from "../pages/User/Checkout";
import Payment from "../pages/User/Payment";
import UserProfile from "../pages/User/UserProfile";
import Orders from "../pages/User/Orders";
import PasswordChange from "../pages/User/PasswordChange";
import BestSelling from "../pages/User/BestSelling";
import Women from "../pages/User/Women";
import Sports from "../pages/User/Sports";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<UserLayout />}>
        <Route element={<PrivateRoutes />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/password/change" element={<PasswordChange />} />
        </Route>

        <Route
          path="/bestSelling"
          element={<BestSelling category={"Best Selling"} />}
        />
        <Route path="/women" element={<Women category={"Women"} />} />
        <Route path="/sports" element={<Sports category={"Sports"} />} />
        <Route path="/men" element={<MenItems category={"Men"} />} />
        <Route path="/home" element={<HomePage category={"all"} />} />
      </Route>
    </Routes>
  );
}
