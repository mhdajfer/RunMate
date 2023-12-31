import UserRoutes from "./Routes/UserRoutes";
import { Routes, Route } from "react-router-dom";
import AdminRoutes from "./Routes/AdminRoutes";
import { Toaster } from "react-hot-toast";
import ProductRoutes from "./Routes/ProductRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/product/*" element={<ProductRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
