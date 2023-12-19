import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Products from "../User/BestSellingItems";

export default function HomePage() {
  return (
    <div className="bg-[#BBE1FA]">
      <Navbar />
      <Products />
      <Footer />
    </div>
  );
}
