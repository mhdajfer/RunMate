<<<<<<< Updated upstream
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
<<<<<<< HEAD
import { useEffect } from "react";
import serverUrl from "../../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
=======
>>>>>>> Stashed changes
=======
>>>>>>> aa5a3c2c5080afa21fd62d83662d794e988c2f3b
import Products from "../User/BestSellingItems";

export default function HomePage() {
  return (
<<<<<<< Updated upstream
    <div className="bg-[#BBE1FA]">
<<<<<<< HEAD
      <Navbar user="user" />
=======
    <div className="bg-[#BBE1FA] overflow-hidden">
>>>>>>> Stashed changes
=======
      <Navbar />
>>>>>>> aa5a3c2c5080afa21fd62d83662d794e988c2f3b
      <Products />
    </div>
  );
}
