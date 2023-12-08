import Navbar from "../../Components/Navbar";
import AdminLayout from "./AdminLayout";
import { useState } from "react";
import axios from "axios";
import serverURL from "../../../serverURL";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import serverUrl from "../../server";

export default function EditProduct() {
  const location = useLocation();
  const receivedProd = location.state?.product;
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    brand: receivedProd.brand,
    desc: receivedProd.desc,
    stock: receivedProd.stock,
    category: receivedProd.category,
    price: receivedProd.price,
    image: receivedProd.image,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formProd = new FormData();
    formProd.append("brand", product.brand);
    formProd.append("desc", product.desc);
    formProd.append("stock", product.stock);
    formProd.append("category", product.category);
    formProd.append("price", product.price);
    formProd.append("id", receivedProd._id);

    if (receivedProd.image === product.image) {
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
      <Navbar user="admin" />
      <div className="flex">
        <AdminLayout />
        <div className="flex justify-center w-full">
          <form
            className="bg-[#BBE1FA] h-fit  p-8 rounded-lg m-8"
            onSubmit={handleFormSubmit}
          >
            <div className="flex space-x-4">
              <div className="flex flex-col justify-center items-center h-[380px]">
                <div className="flex flex-col my-4">
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    onChange={handleOnChange}
                    value={product.brand}
                    className=" min-w-[180px] w-[20vw] h-[2rem]  rounded-xl p-3 "
                  />
                </div>
                <div className="flex flex-col my-4">
                  <label htmlFor="brand">Description</label>
                  <textarea
                    name="desc"
                    id="desc"
                    cols="30"
                    rows="10"
                    onChange={handleOnChange}
                    value={product.desc}
                    className=" min-w-[180px] w-[20vw] rounded-xl p-3 "
                  ></textarea>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center h-[380px]">
                <div className="flex flex-col my-4">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="text"
                    name="stock"
                    onChange={handleOnChange}
                    value={product.stock}
                    className=" min-w-[180px] w-[20vw] h-[2rem]  rounded-xl p-3 "
                  />
                </div>
                <div className="flex flex-col my-4">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    name="price"
                    onChange={handleOnChange}
                    value={product.price}
                    className="  min-w-[180px] w-[20vw] h-[2rem] rounded-xl p-3"
                  />
                </div>
                <div className="flex flex-col my-4">
                  <label htmlFor="category">Category</label>
                  <select
                    name="category"
                    id="category"
                    onChange={handleOnChange}
                    value={product.category}
                    className="  min-w-[180px] w-[20vw] rounded-xl p-3"
                  >
                    <option selected>Choose options</option>
                    <option value="bestSelling">Best Selling</option>
                    <option value="sports">Sports</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                  </select>
                </div>
                <div className="flex flex-col my-4">
                  <label htmlFor="image">Change Image</label>
                  <div className="w-[65px] h-[]] m-1">
                    <img src={serverUrl + "/" + product.image} alt="" />
                  </div>
                  <input
                    type="file"
                    name="price"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="  min-w-[180px] w-[20vw] bg-white text-[10px] rounded-xl p-3"
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
      </div>
    </>
  );
}
