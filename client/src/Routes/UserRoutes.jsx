import HomePage from "../pages/User/HomePage";
import LoginPage from "../pages/User/LoginPage";
import PrivateRoutes from "../Utils/PrivateRoutes";
import { Route, Routes } from "react-router-dom";
import BestSellingItems from "../pages/User/BestSellingItems";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/*"
        element={
          <PrivateRoutes>
            <Route path="/bestSelling" element={<BestSellingItems />} />
          </PrivateRoutes>
        }
      />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}
