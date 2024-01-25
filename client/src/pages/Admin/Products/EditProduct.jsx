import { useState, useEffect } from "react";
import axios from "axios";
import serverURL from "../../../../serverURL";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import DialogBox from "../../../Components/DialogBox";

export default function EditProduct() {
  const location = useLocation();
  const productId = location.state?.productId;
  const productImages = location.state?.productImages;
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dataToDialogBox, setDataToDialogBox] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    subDesc: "",
    brand: "",
    desc: "",
    stock: "",
    price: "",
    category: "",
    images: [],
    image: "",
  });

  useEffect(() => {
    try {
      axios
        .post(
          `${serverURL}/product/getOneProduct`,
          { productId },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.data);
            setProduct(res.data.data);
          }
        });
      axios
        .get(`${serverURL}/admin/category`, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            setCategoryList(res.data.data);
          }
        });
    } catch (error) {
      toast.error("white while loading categories");
      console.log(error);
    }
  }, [productId]);

  function handleImageDelete(image) {
    const UpdatedImages = product.images.filter((img) => img != image);

    try {
      axios
        .post(
          `${serverURL}/product/image/delete`,
          { image, productId },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.success) {
            setProduct((prev) => ({
              ...prev,
              images: UpdatedImages,
            }));
            toast.success(res.data.message);
            setIsDialogOpen(false);
          } else {
            toast.error(res.data.message);
            setProduct((prev) => ({
              ...prev,
              images: [...UpdatedImages, image],
            }));
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  function cancelDelete() {
    setIsDialogOpen(false);
  }

  function handleDeleteDialogBox() {
    setIsDialogOpen(true);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (product.stock <= 0) return toast.error("Increase stock limit");
    if (product.price <= 0) return toast.error("Set Price limit correctly");

    const formProd = new FormData();
    formProd.append("brand", product.brand);
    formProd.append("desc", product.desc);
    formProd.append("stock", product.stock);
    formProd.append("category", product.category);
    formProd.append("price", product.price);
    formProd.append("id", productId);
    formProd.append("name", product.name);
    formProd.append("subDesc", product.subDesc);

    if (productImages === product.images) {
      console.log("no image", product.image);
      formProd.append("image", "");
    } else {
      console.log(" image", product.image);
      formProd.append("image", product.image);
    }

    try {
      await axios
        .post(`${serverURL}/product/edit`, formProd, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data.success) toast.success(res.data.message);
          console.log(res);
          navigate("/admin/products");
        });
    } catch (error) {
      console.log("error while passing the product data");
    }
  };

  function handleOnChange(e) {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }));
  }

  function handleImageChange(e) {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0],
    }));
  }
  return (
    <>
      <div className="flex justify-center w-full">
        <form
          className="bg-[#BBE1FA] h-fit  p-8 rounded-lg m-8"
          onSubmit={handleFormSubmit}
        >
          <div className="flex space-x-12">
            <div className="flex flex-col items-center">
              <div className="flex flex-col my-4">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  onChange={handleOnChange}
                  value={product.brand}
                  className=" min-w-[180px] w-[20vw] h-[2rem] border border-teal-700 rounded-lg p-3 "
                />
              </div>
              <div className="flex flex-col mt-4 mb-1">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleOnChange}
                  value={product.name}
                  className=" min-w-[180px] w-[20vw] h-[2rem]  border border-teal-700 rounded-lg p-3 "
                />
              </div>
              <div className="flex flex-col my-1">
                <label htmlFor="subDesc">Sub Heading</label>
                <textarea
                  name="subDesc"
                  id="subDesc"
                  onChange={handleOnChange}
                  value={product.subDesc}
                  className=" min-w-[180px] w-[20vw]  border border-teal-700 rounded-lg p-3 "
                ></textarea>
              </div>
              <div className="flex flex-col my-1">
                <label htmlFor="brand">Description</label>
                <textarea
                  name="desc"
                  id="desc"
                  onChange={handleOnChange}
                  value={product.desc}
                  className=" min-w-[180px] w-[20vw]  border border-teal-700 rounded-lg p-3 "
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col my-4">
                <label htmlFor="stock">Stock</label>
                <input
                  type="text"
                  name="stock"
                  onChange={handleOnChange}
                  value={product.stock}
                  className=" min-w-[180px] w-[20vw] h-[2rem]  border border-teal-700 rounded-lg p-3 "
                />
              </div>
              <div className="flex flex-col my-4">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  onChange={handleOnChange}
                  value={product.price}
                  className="  min-w-[180px] w-[20vw] h-[2rem]  border border-teal-700 rounded-lg p-3"
                />
              </div>
              <div className="flex flex-col my-4">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  onChange={handleOnChange}
                  className="  min-w-[180px] w-[20vw]  border border-teal-700 rounded-xl p-2 text-sm"
                >
                  {categoryList.map((category, i) => (
                    <option key={i} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col my-4">
                <label htmlFor="image">Image</label>
                <div className="flex space-x-2 mb-2 ">
                  {product.images.map((image, i) => (
                    <div key={i} className="w-fit relative">
                      <img
                        className="w-10 h-10 object-fit"
                        src={serverURL + "/" + image}
                        alt=""
                      />
                      <a
                        className="bg-gray-300 absolute top-0 right-0"
                        onClick={() => {
                          setDataToDialogBox(image);
                          handleDeleteDialogBox();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 hover:fill-red-600"
                          viewBox="0 0 329.26933 329"
                        >
                          <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="  min-w-[180px] w-[20vw] bg-white text-[10px]  border border-teal-700 rounded-lg p-3"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center text-white">
            <button className="bg-[#342475] w-[20vw] h-12 rounded-lg">
              Update Product
            </button>
          </div>
        </form>
      </div>
      <div className="fixed top-[20%] right-[25%]">
        {/* Dialog box */}
        {isDialogOpen && (
          <DialogBox
            data={dataToDialogBox}
            onConfirmDelete={handleImageDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
    </>
  );
}
