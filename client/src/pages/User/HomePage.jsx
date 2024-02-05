import AllProducts from "./Products/AllProducts";
import BannerBoard from "../../Components/BannerBoard";

// eslint-disable-next-line react/prop-types
export default function HomePage({ category }) {
  localStorage.setItem("search", "");
  return (
    <div className="bg-[#BBE1FA]">
      <BannerBoard />

      <AllProducts category={category} />
    </div>
  );
}
