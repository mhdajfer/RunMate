/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Icons from "../assets/Icons";
import serverUrl from "../server";
const { star_filled, star } = Icons;
import axios from "axios";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
function FilterBox({ setFilteredProducts, products }) {
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  let setRating;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`${serverUrl}/category`, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            setCategories(res.data.data);
          }
        });
    } catch (error) {
      console.log("error while loading filter box", error);
    }
  }, []);

  function filterProductsByPrice(min, max) {
    // eslint-disable-next-line react/prop-types
    const filteredProducts = products.filter((product) => {
      if (product?.price < max && product?.price > min) return product;
    });
    console.log("min", min);
    console.log("max", max);
    if (filteredProducts.length === 0)
      return toast.error("no products at this range");
    setFilteredProducts(filteredProducts);
  }

  function filterProductsByCategory(category) {
    // if (category === "all") return setFilteredProducts(products);
    // eslint-disable-next-line react/prop-types
    const filteredProducts = products.filter((product) => {
      if (product.category === category) return product;
    });
    setFilteredProducts(filteredProducts);
  }

  return (
    <>
      <div className=" bg-white p-4 rounded-xl pe-20">
        <section className="flex flex-col mb-12 space-y-6">
          <label htmlFor="categorySelect">Select a Category:</label>
          <select
            className="border border-teal-600 rounded-lg bg-gray-200 px-3 py-1 "
            id="categorySelect"
            defaultValue=""
            onClick={(e) => filterProductsByCategory(e.target.value)}
          >
            <option value="" hidden>
              Categories
            </option>
            <option value="all">All</option>
            {categories.map((catgry, i) => (
              <option key={i} value={catgry?.name}>
                {catgry?.name}
              </option>
            ))}
          </select>
        </section>
        <hr className="text-light" />
        <section className="my-8">
          <div className="">
            <p className="text-primary fw-bold  text-small m-0">Rating:</p>
            <button
              className="bg-blue-600 px-4 rounded-md hover:bg-blue-800 my-3 text-white"
              onClick={() => {
                setRating("");
              }}
            >
              Clear
            </button>
          </div>
          <div className=" flex flex-col">
            <button
              className="flex items-center border border-transparent rounded-xl hover:border-teal-500 "
              onClick={() => {
                setRating(2);
              }}
            >
              <div className="flex space-x-1 my-2">
                {star_filled}
                {star_filled}
                {star}
                {star}
                {star}
              </div>
              <p className="ms-2 font-semibold">& Up</p>
            </button>
            <button
              className="flex items-center border border-transparent rounded-xl hover:border-teal-500 "
              onClick={() => {
                setRating(2);
              }}
            >
              <div className="flex space-x-1 my-2">
                {star_filled}
                {star_filled}
                {star_filled}
                {star}
                {star}
              </div>
              <p className="ms-2 font-semibold">& Up</p>
            </button>
            <button
              className="flex items-center border border-transparent rounded-xl hover:border-teal-500 "
              onClick={() => {
                setRating(2);
              }}
            >
              <div className="flex space-x-1 my-2">
                {star_filled}
                {star_filled}
                {star_filled}
                {star_filled}
                {star}
              </div>
              <p className="ms-2 font-semibold">& Up</p>
            </button>
            <button
              className="flex items-center border border-transparent rounded-xl hover:border-teal-500 "
              onClick={() => {
                setRating(2);
              }}
            >
              <div className="flex space-x-1 my-2">
                {star_filled}
                {star_filled}
                {star_filled}
                {star_filled}
                {star_filled}
              </div>
              <p className="ms-2 font-semibold">& Up</p>
            </button>
          </div>
        </section>
        <hr className="text-light" />
        <section>
          <div className="flex flex-col ">
            <p className="text-primary fw-bold  text-small m-0">Price</p>
            <button
              className="bg-blue-600 px-4 rounded-md hover:bg-blue-800 my-3 text-white"
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
                filterProductsByPrice(0, 10000);
              }}
            >
              Clear
            </button>
          </div>
          <div className="flex flex-col items-start space-y-4 py-3">
            <button
              className=" border border-teal-600 px-3 rounded-lg hover:bg-teal-100"
              onClick={() => {
                setMinPrice(0);
                setMaxPrice(1500);
                filterProductsByPrice(0, 1500);
              }}
            >
              Under 1500
            </button>
            <button
              className=" border border-teal-600 px-3 rounded-lg hover:bg-teal-100"
              onClick={() => {
                setMinPrice(1500);
                setMaxPrice(2500);
                filterProductsByPrice(1500, 2500);
              }}
            >
              1500 - 2500
            </button>
            <button
              className=" border border-teal-600 px-3 rounded-lg hover:bg-teal-100"
              onClick={() => {
                setMinPrice(2500);
                setMaxPrice(3500);
                filterProductsByPrice(2500, 3500);
              }}
            >
              2500 - 3500
            </button>
            <button
              className=" border border-teal-600 px-3 rounded-lg hover:bg-teal-100"
              onClick={() => {
                setMinPrice(3500);
                setMaxPrice("");
                filterProductsByPrice(3500, 10000);
              }}
            >
              Above 3500
            </button>
          </div>
          <section className="flex mt-3">
            <div className="">
              <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                Min Price
              </label>
              <input
                type="Number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border  w-[5rem] rounded-md bg-gray-200 border-gray-400 px-2 py-1 font-medium"
                id="exampleInputEmail1"
              />
            </div>
            <div className="col-6">
              <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                Max Price
              </label>
              <input
                type="Number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border w-[5rem] rounded-md bg-gray-200 border-gray-400 px-2 py-1 font-medium"
                id="exampleInputEmail1"
              />
            </div>
          </section>
        </section>
      </div>
    </>
  );
}

export default FilterBox;
