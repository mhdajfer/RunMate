import UserRoutes from "./Routes/UserRoutes";
import { Routes, Route } from "react-router-dom";
import ProductRoutes from "./Routes/ProductRoutes";
import AdminRoutes from './Routes/AdminRoutes'
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Utils/Auth";
import AdminLayout from "./pages/Admin/AdminLayout";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/layout" element= { <AdminLayout/>}/>
          <Route path="/product/*" element={<ProductRoutes />} />
          <Route path="/user/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </>
  );
}

export default App;
