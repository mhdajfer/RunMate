import HomePage from "../pages/User/HomePage";
import LoginPage from "../pages/User/LoginPage";
import { Route, Routes } from "react-router-dom";
import BestSellingItems from "../pages/User/BestSellingItems";
import { PrivateRoutes } from "../Utils/PrivateRoutes";
import MenItems from "../pages/User/MenItems";
<<<<<<< HEAD
import UserLayout from "../Components/UserLayout";
=======
>>>>>>> aa5a3c2c5080afa21fd62d83662d794e988c2f3b

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
<<<<<<< HEAD
      <Route element={<UserLayout />}>
        <Route element={<PrivateRoutes />}>
          <Route path="bestSelling" element={<BestSellingItems />} />
        </Route>
        <Route path="/men" element={<MenItems />} />

        <Route path="/home" element={<HomePage />} />
      </Route>
=======
      <Route element={<PrivateRoutes />}>
        <Route path="bestSelling" element={<BestSellingItems />} />
      </Route>
      <Route path="/men" element={<MenItems />} />

      <Route path="/home" element={<HomePage />} />
>>>>>>> aa5a3c2c5080afa21fd62d83662d794e988c2f3b
    </Routes>
  );
}
