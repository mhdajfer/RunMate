import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import serverUrl from "../../../server";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();
    try {
      axios
        .post(
          `${serverUrl}/admin/category/add`,
          { name, desc },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/admin/category");
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      toast.error("Error while sending data");
      console.log(error);
    }
  }
  return (
    <form
      className="bg-[#ffffff] h-fit  p-8 rounded-lg m-8 w-fit"
      onSubmit={handleFormSubmit}
    >
      <div className="flex space-x-12">
        <div className="flex flex-col items-center">
          <div className="flex flex-col mt-4 mb-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className=" min-w-[180px] w-[20vw] h-[2rem]  border border-teal-700 rounded-lg p-3 "
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col my-4">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              name="desc"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              className=" min-w-[180px] w-[20vw] h-[2rem]  border border-teal-700 rounded-lg p-3 "
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center text-white mt-6">
        <button className="bg-[#342475] w-[20vw] h-12 rounded-lg">
          Add Category
        </button>
      </div>
    </form>
  );
}

export default AddCategory;
