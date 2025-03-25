/* eslint-disable react/prop-types */
import serverURL from "../../serverURL";
import Icons from "../assets/Icons";
const { star_filled, heart, star, bag } = Icons;
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
// import ReactImageMagnify from "react-image-magnify";
import ImageMagnifier from "./ImageMagnifier";

function SingleProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState();

  useEffect(() => {
    function getProduct() {
      try {
        axios
          .post(
            `${serverURL}/product/getOneProduct`,
            { productId: product?._id },
            { withCredentials: true }
          )
          .then((res) => {
            if (res.data.success) {
              setProductData(res.data.data);
            } else {
              toast.error(res.data.message);
            }
          });
      } catch (error) {
        console.log("error while getting single product");
      }
    }
    getProduct();
  }, [product?._id]);

  function handleCart(product, quantity) {
    if (product.isDeleted) return toast.error("item is removed");
    try {
      axios
        .post(
          `${serverURL}/cart/add`,
          { ...product, quantity },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      toast.error("Can't send to cart");
      console.log(error);
    }
  }

  console.log(product);
  // eslint-disable-next-line react/prop-types
  return (
    <>
      <div className=" w-screen p-12 px-[6rem] flex h-fit justify-evenly space-x-12">
        <div className="flex ">
          <div className=" space-y-3 flex mx-6 flex-col">
            {productData?.images.map((image, i) => (
              <div key={i} className="bg-white rounded-lg">
                <img src={image} alt="" className="h-[3rem] object-contain" />
              </div>
            ))}
          </div>
          <div className="">
            <ImageMagnifier image={productData?.images[0]} />
          </div>
        </div>
        <div className=" p-12 w-[50rem]">
          <h1 className="font-bold text-3xl">{productData?.brand}</h1>
          <p className="my-6 ">{productData?.subDesc}</p>
          {productData?.discountPrice > 0 ? (
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-medium  line-through">
                ₹ {productData?.price}
              </h1>
              <h1 className="text-6xl font-semibold text-[#003355]">
                ₹ {productData?.discountPrice}
              </h1>
            </div>
          ) : (
            <h1 className="text-6xl font-semibold text-[#003355]">
              ₹ {productData?.price}
            </h1>
          )}
          {/*  */}
          <p className="text-slate-500">(10,786 Ratings & 1859 Reviews)</p>
          <div className="flex space-x-1 my-2">
            {star_filled}
            {star_filled}
            {star_filled}
            {star_filled}
            {star}
          </div>
          <div className="my-8">
            <h3>
              <u>Description</u>
            </h3>
            <p className="my-4 font-normal">{productData?.desc}</p>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <select
                  name="qty"
                  id="qty"
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <button
                  className="bg-[#003355] flex items-center justify-center font-semibold text-xl  w-full h-14 py-2 rounded-sm text-white"
                  onClick={() => handleCart(productData, quantity)}
                >
                  <span className="me-4">{bag}</span>Add to Cart
                </button>
              </div>
              <button className="bg-[#003355] flex items-center justify-center font-semibold text-xl  w-full h-14 py-2 rounded-sm text-white">
                <span className="me-4">{heart}</span>Add to wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProductCard;
