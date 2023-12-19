import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserRoutes from "./Routes/UserRoutes";
import ProductRoutes from "./Routes/ProductRoutes";
import { AuthProvider } from "./Utils/Auth";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/product/*" element={<ProductRoutes />} />
          <Route path="/user/*" element={<UserRoutes />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </>
  );
}

export default App;
