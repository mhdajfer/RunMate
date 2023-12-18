import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Utils/Auth";
import { UserRoutes } from "./Routes/UserRoutes";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/user/*" element={<UserRoutes />} />

          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />


          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/home" element={<AdminLayout />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/edit" element={<EditProduct />} />
          <Route path="/admin/users" element={<SellerUsers />} />
          <Route path="/admin/users/add" element={<SellerAddUser />} />
          <Route path="/admin/users/edit" element={<SellerEditUser />} /> */}
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </>
  );
}

export default App;
