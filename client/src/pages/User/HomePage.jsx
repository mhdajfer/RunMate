import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useEffect } from "react";
import serverUrl from "../../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Products from '../../Components/ProductCard'

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(`${serverUrl}/verify-user`, {}, { withCredentials: true })
      .then((res) => {
        if (res.data.expired) {
          toast.error("User expired, login again");
          navigate("/login");
        }
        if (!res.data.success) {
          console.log(res);
          navigate("/login");
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);
  return (
    <>
      <Navbar />
      <Products/>
      <Footer />
    </>
  );
}
