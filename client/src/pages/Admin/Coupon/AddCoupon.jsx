import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import serverUrl from "../../../server";
import { useNavigate } from "react-router-dom";

function AddCoupon() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [maxDisc, setMaxDisc] = useState("");
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();
    try {
      axios
        .post(
          `${serverUrl}/coupon/add`,
          { name, desc, code, discount, maxDisc },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/admin/coupons");
          }
        });
    } catch (error) {
      toast.error("Error while sending data");
      console.log(error);
    }
  }
  return (
    <div className="flex items-center justify-center h-full">
      <form
        className="border border-teal-600 p-6 shadow-md rounded-lg "
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col space-y-8 ">
          <div className="flex space-x-8">
            <div className="flex flex-col justify-center">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className=" min-w-[180px] w-[20vw] h-[2rem]  border border-teal-700 rounded-lg p-3 "
                required
              />
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                name="desc"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className=" min-w-[180px] w-[20vw] h-[2rem]  border border-teal-700 rounded-lg p-3 "
                required
              />
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="code">Coupon Code</label>
              <input
                type="text"
                name="code"
                onChange={(e) => setCode(e.target.value)}
                value={code}
                className=" min-w-[180px] w-[20vw] h-[2rem]  border border-teal-700 rounded-lg p-3 "
                required
              />
            </div>
          </div>
          <div className="flex space-x-8 justify-center">
            <div className="flex flex-col justify-center">
              <label htmlFor="discount">Discount in %</label>
              <input
                type="text"
                name="discount"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                className=" min-w-[180px] w-[20vw] h-[2rem]  border border-teal-700 rounded-lg p-3 "
                required
              />
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="max">max discount price</label>
              <input
                type="text"
                name="max"
                onChange={(e) => setMaxDisc(e.target.value)}
                value={maxDisc}
                className=" min-w-[180px] w-[20vw] h-[2rem]  border border-teal-700 rounded-lg p-3 "
                required
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center text-white mt-6">
            <button className="bg-[#342475] w-[20vw] h-12 rounded-lg">
              Add Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddCoupon;
