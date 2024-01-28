
import AllProducts from "./Products/AllProducts";

// eslint-disable-next-line react/prop-types
export default function HomePage({ category }) {
    localStorage.setItem("search", "");
  return (
    <div className="bg-[#BBE1FA]">
      <AllProducts category={category} />
    </div>
  );
}
