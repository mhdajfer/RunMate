import { Link } from "react-router-dom";

export default function Subnavbar() {
  return (
    <div className="my-2 flex justify-center">
      <button className="bg-white border px-10 py-1 rounded-full mx-3">
        <Link to={"/category/bestSelling"}>Best Selling</Link>
      </button>
      <button className="bg-white border px-10 py-1 rounded-full mx-3">
        MEN
      </button>
      <button className="bg-white border px-10 py-1 rounded-full mx-3">
        WOMEN
      </button>
      <button className="bg-white border px-10 py-1 rounded-full mx-3">
        Sports
      </button>
    </div>
  );
}
