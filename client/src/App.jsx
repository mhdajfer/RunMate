import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
