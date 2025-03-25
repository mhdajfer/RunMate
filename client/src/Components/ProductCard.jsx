import Icons from "../assets/Icons";
const { heart, cart, star, star_filled } = Icons;
import { useNavigate } from "react-router-dom";
import axios from "axios";
import serverURL from "../../serverURL";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function ProductCard(item) {
  const product = item.product;
  const navigate = useNavigate();

  function handleCart(product) {
    if (!Cookies.get("token")) {
      toast.error("Not Authenticated");
      return;
    }

    if (product.isDeleted) return toast.warning("item is removed");
    try {
      axios
        .post(
          `${serverURL}/cart/add`,
          { ...product, quantity: 1 },
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

  function handleClick(product) {
    navigate(`/product/${product._id}`, { state: product });
  }

  return (
    <div className="flex space-x-6 m-4 h-[480px]">
      <div className="bg-white mt-8  min-w-[300px] w-[350px]  rounded-lg">
        <div className="h-[220px]">
          <img
            onClick={() => {
              handleClick(product);
            }}
            src={product.images[0]}
            alt=""
            className="w-full h-[30vh] object-contain rounded-lg"
          />
        </div>
        <div className="p-4">
          <div className="h-20">
            <h2 className="font-bold text-xl">{product?.brand}</h2>
            <p className="text-[13px]">{product?.subDesc}</p>
          </div>
          <div className="flex space-x-1 my-2">
            {star_filled}
            {star_filled}
            {star_filled}
            {star_filled}
            {star}
          </div>
          {product?.discountPrice > 0 ? (
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-medium  line-through">
                ₹ {product?.price}
              </h1>
              <h1 className="text-3xl font-medium text-[#003355]">
                ₹ {product?.discountPrice}
              </h1>
            </div>
          ) : (
            <h1 className="text-3xl font-medium text-[#003355]">
              ₹ {product?.price}
            </h1>
          )}

          <div className="flex justify-evenly my-4">
            <button
              className="bg-[#003355] hover:bg-[#003377] hover:mt-[-1px] flex items-center justify-center  w-[18vw] py-2 rounded-full text-white"
              onClick={() => {
                handleCart(product);
              }}
            >
              <span className="me-4">{cart}</span>Add to Cart
            </button>
            <button className="bg-[#003355] flex items-center hover:bg-[#003377] justify-center  w-10 h-12 py-2 rounded-full text-white">
              <span className="mx-4">{heart}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
