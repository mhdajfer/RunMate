import { useState, useEffect } from "react";
import axios from "axios";
import serverURL from "../../../../serverURL";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ImageUploadModal from "../../../Components/ImageUploadModal";
export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    brand: "",
    desc: "",
    stock: 0,
    category: "",
    price: 0,
    images: [],
    subDesc: "",
    name: "",
  });
  const [categoryList, setCategoryList] = useState([]);
  const [isImageUploadModalVisible, setImageUploadModalVisible] =
    useState(false);

  useEffect(() => {
    try {
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
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (product.stock < 1 || product.price < 1)
      return toast.error("Please give valid numbers");

    const formProd = new FormData();
    formProd.append("brand", product.brand);
    formProd.append("desc", product.desc);
    formProd.append("stock", product.stock);
    formProd.append("category", product.category);
    formProd.append("price", product.price);
    product.images.forEach((file) => formProd.append("files", file));
    formProd.append("name", product.name);
    formProd.append("subDesc", product.subDesc);
    console.log(product?.images);

    try {
      await axios
        .post(`${serverURL}/product/add`, formProd, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("product added");
            console.log(res);
            navigate("/admin/products");
          } else {
            toast.error(res.data.message);
            console.log("here");
          }
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

  function handleImageChange(file, index) {
    console.log(file, index);
    setProduct((prevProduct) => {
      const updatedImages = [...prevProduct.images];
      updatedImages[index] = file;
      return {
        ...prevProduct,
        images: updatedImages,
      };
    });
  }

  return (
    <>
      <div className="flex justify-center">
        <form
          className="bg-[#ffffff] h-fit  p-8 rounded-lg m-8"
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
                  value={product.category}
                  className="  min-w-[180px] w-[20vw]  border border-teal-700 rounded-xl p-2 text-sm"
                >
                  <option value="">----Choose options----</option>

                  {categoryList.map((category, i) => (
                    <option key={i} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex mx-auto flex-col my-4">
                {/* {[...Array(4)].map((_, index) => (
                  <input
                    key={index}
                    type="file"
                    name="image"
                    required
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="min-w-[120px] w-[18vw] bg-white text-[10px] border border-teal-700 rounded-lg p-1"
                  />
                ))} */}
                <a
                  className="bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold py-2 px-4 rounded-full"
                  onClick={() => {
                    setImageUploadModalVisible(!isImageUploadModalVisible);
                  }}
                >
                  Add Images
                </a>
                {isImageUploadModalVisible && (
                  <div className="self-auto fixed top-[10%] w-[80vw] h-[80vh] left-[10%]">
                    {" "}
                    <ImageUploadModal
                      handleSubmit={setImageUploadModalVisible}
                      handleImageChange={handleImageChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center text-white mt-6">
            <button className="bg-[#342475] w-[20vw] h-12 rounded-lg">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
