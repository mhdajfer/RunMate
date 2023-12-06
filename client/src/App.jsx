import LoginPage from "./pages/User/LoginPage";
import SignupPage from "./pages/User/SignupPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/User/HomePage";
import ProductCard from "./Components/ProductCard";
import AdminLogin from "./pages/Admin/LoginPage";
import AdminSignup from "./pages/Admin/SignupPage";
import AdminLayout from "./pages/Admin/AdminLayout";
import Products from "./pages/Admin/Products";
import AddProduct from "./pages/Admin/AddProduct";
import Image from "./pages/Admin/image";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product" element={<ProductCard />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/home" element={<AdminLayout />} />
        <Route path="/admin/prod" element={<Products />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/img" element={<Image />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
