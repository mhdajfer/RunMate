import { useState } from "react";
import Icons from "../assets/Icons";
const { star_filled, star } = Icons;

function FilterBox() {
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [rating, setRating] = useState("");
  const categoriesConstants = ["men", "women"];
  return (
    <>
      <div className=" bg-white p-4 rounded-xl pe-20">
        <section className="flex flex-col mb-12 space-y-6">
          <label htmlFor="categorySelect">Select a Category:</label>
          <select
            className="border border-teal-600 rounded-lg bg-gray-200 px-3 py-1 "
            id="categorySelect"
          >
            <option value="">Select Category</option>
            {categoriesConstants.map((e) => (
              <option key={e} value={e}>
                {e}
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
              className="flex items-center"
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
              className="flex items-center"
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
              className="flex items-center"
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
              className="flex items-center"
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
              }}
            >
              Clear
            </button>
          </div>
          <div className="flex flex-col items-start space-y-4 py-3">
            <button
              className=" border border-teal-600 px-3 rounded-lg hover:bg-teal-100"
              onClick={() => {
                setMinPrice("");
                setMaxPrice(10000);
              }}
            >
              Under 10,000
            </button>
            <button
              className=" border border-teal-600 px-3 rounded-lg hover:bg-teal-100"
              onClick={() => {
                setMinPrice(10000);
                setMaxPrice(20000);
              }}
            >
              10,000 - 20,000
            </button>
            <button
              className=" border border-teal-600 px-3 rounded-lg hover:bg-teal-100"
              onClick={() => {
                setMinPrice(20000);
                setMaxPrice(50000);
              }}
            >
              20,000 - 50,000
            </button>
            <button
              className=" border border-teal-600 px-3 rounded-lg hover:bg-teal-100"
              onClick={() => {
                setMinPrice(50000);
                setMaxPrice("");
              }}
            >
              Above 50,000
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
