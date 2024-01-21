import HomePage from "../pages/User/HomePage";
import LoginPage from "../pages/User/LoginPage";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../Utils/PrivateRoutes";
import MenItems from "../pages/User/Products/MenItems";
import SignupPage from "../pages/User/SignupPage";
import UserLayout from "../Components/Layout/UserLayout";
import Cart from "../pages/User/Cart";
import Checkout from "../pages/User/Checkout";
import Payment from "../pages/User/Payment";
import UserProfile from "../pages/User/Profile/UserProfile";
import Orders from "../pages/User/Orders";
import PasswordChange from "../pages/User/Profile/PasswordChange";
import BestSelling from "../pages/User/Products/BestSelling";
import Women from "../pages/User/Products/Women";
import Sports from "../pages/User/Products/Sports";
import WalletPage from "../pages/User/WalletPage";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<UserLayout />}>
        <Route element={<PrivateRoutes role={"user"} />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/password/change" element={<PasswordChange />} />
          <Route path="/wallet" element={<WalletPage />} />
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
