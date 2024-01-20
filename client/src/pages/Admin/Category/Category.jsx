import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import serverUrl from "../../../server";
import DialogBox from "../../../Components/DialogBox";

function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [category, setCategory] = useState();
  const navigate = useNavigate();

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
  }, [categoryList]);

  function handleDelete(category) {
    setCategory(category);
    setIsDialogOpen(true);
  }

  function CancelDelete() {
    setCategory(null);
    setIsDialogOpen(false);
  }

  function confirmDelete(category) {
    try {
      axios
        .post(
          `${serverUrl}/admin/category/delete`,
          { category },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/admin/category");
            setIsDialogOpen(false);
          }
        });
    } catch (error) {
      toast.error("Error while deleting category");
      console.log(error);
    }
  }

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
                  <td className="p-2">{category.name}</td>
                  <td className="p-2">{category.desc}</td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 px-2 m-1 rounded-md text-md text-white"
                      onClick={() => {
                        handleDelete(category);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed top-[20%] right-[25%]">
        {/* Dialog box */}
        {isDialogOpen && (
          <DialogBox
            data={category}
            onConfirmDelete={confirmDelete}
            onCancel={CancelDelete}
          />
        )}
      </div>
    </>
  );
}

export default Category;
