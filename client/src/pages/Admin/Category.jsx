import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import serverUrl from "../../server";

function Category() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${serverUrl}/admin/category`).then((res) => {
        if (res.data.success) {
          setCategoryList(res.data.data);
          console.log("yes");
        }
      });
    } catch (error) {
      toast.error("Error while loading category");
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="">
        <div className="flex flex-col items-center w-[50vw] mx-auto mt-[15%] border border-teal-600 rounded-lg bg-[#BBE1FA] p-6">
          <div className=" text-white self-end">
            <Link to={"add"}>
              <button className="bg-[#342475] w-[10vw] h-12 rounded-lg">
                Add Category
              </button>
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Category name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((category, i) => (
                <tr key={i}>
                  <td>{category.name}</td>
                  <td>{category.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Category;
