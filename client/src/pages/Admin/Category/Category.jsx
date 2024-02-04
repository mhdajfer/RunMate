import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import serverUrl from "../../../server";
import DialogBox from "../../../Components/DialogBox";
import AddOfferForm from "../../../Components/AddOfferForm";

function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState();
  const [offerCategory, setOfferCategory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(`${serverUrl}/admin/category`, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            setCategoryList(res.data.data);
          }
        });
    } catch (error) {
      toast.error("Error while loading category");
      console.log(error);
    }
  }, [categoryList.length, offerCategory]);

  function handleDelete(category) {
    setDeleteCategory(category);
    setIsDialogOpen(true);
  }

  function CancelDelete() {
    setDeleteCategory(null);
    setIsDialogOpen(false);
  }

  function confirmDelete(category) {
    setCategoryList((prevList) => {
      return prevList.filter((catry) => catry._id !== category._id);
    });
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
          } else {
            toast.error(res.data.message);
            categoryList.push(category);
          }
        });
    } catch (error) {
      toast.error("Error while deleting category");
      console.log(error);
    }
  }

  function handleAddOffer(category) {
    setOfferCategory(category);
  }

  function cancelOffer() {
    setOfferCategory(null);
  }

  function handleCancelOffer(category) {
    setOfferCategory({});
    try {
      axios
        .post(`${serverUrl}/admin/category/cancelOffer`, category, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            setOfferCategory(null);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log("error while cancelling offers", error);
    }
  }

  function ApplyOfferForCategory(category, discount) {
    if (discount <= 0) return toast.error("Enter positive discount number");
    try {
      axios
        .post(
          `${serverUrl}/admin/category/applyOffer`,
          { ...category, discount },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            setOfferCategory(null);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log("error while applying discount", error);
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
                    {category?.offerInPercentage === 0 ? (
                      <button
                        className="bg-green-700 px-2 m-1 rounded-md text-md text-white relative"
                        onClick={() => handleAddOffer(category)}
                      >
                        Add offer
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 px-2 m-1 rounded-md text-md text-white relative"
                        onClick={() => handleCancelOffer(category)}
                      >
                        Cancel offer
                      </button>
                    )}
                    {offerCategory?._id === category?._id && (
                      <AddOfferForm
                        ApplyOffer={ApplyOfferForCategory}
                        canceloffer={cancelOffer}
                        product={offerCategory}
                      />
                    )}
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
            data={deleteCategory}
            onConfirmDelete={confirmDelete}
            onCancel={CancelDelete}
          />
        )}
      </div>
    </>
  );
}

export default Category;
