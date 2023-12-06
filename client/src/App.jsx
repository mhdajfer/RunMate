import LoginPage from "./pages/User/LoginPage";
import SignupPage from "./pages/User/SignupPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/User/HomePage";
import AdminLogin from "./pages/Admin/LoginPage";
import AdminSignup from "./pages/Admin/SignupPage";
import AdminLayout from "./pages/Admin/AdminLayout";
import Products from "./pages/Admin/Products";
import AddProduct from "./pages/Admin/AddProduct";
import BestSellingItems from "./pages/User/BestSellingItems";
import SellerUsers from "./pages/Admin/Users";
import SellerAddUser from "./pages/Admin/AddUser";
import SellerEditUser from "./pages/Admin/EditUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/category/bestSelling" element={<BestSellingItems />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/home" element={<AdminLayout />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/admin/users" element={<SellerUsers />} />
        <Route path="/admin/users/add" element={<SellerAddUser />} />
        <Route path="/admin/users/edit" element={<SellerEditUser />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
