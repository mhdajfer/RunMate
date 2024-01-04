import serverURL from "../../serverURL";
import Icons from "../assets/Icons";
const { star_filled, heart, star, bag } = Icons;
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
// import ReactImageMagnify from "react-image-magnify";

function SingleProductCard(item) {
  const [quantity, setQuantity] = useState(1);
  function handleCart(product, quantity) {
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
  // eslint-disable-next-line react/prop-types
  const product = item.product;
  return (
    <>
      <div className=" w-screen p-12 px-[6rem] flex h-fit justify-evenly space-x-12">
        <div className="flex ">
          <div className=" space-y-3 flex mx-6 flex-col">
            {product.images.map((image, i) => (
              <div key={i} className="bg-white rounded-lg">
                <img
                  src={serverURL + "/" + image}
                  alt=""
                  className="h-[3rem] object-contain"
                />
              </div>
            ))}
          </div>
          <div className="">
            <img
              src={serverURL + "/" + product.images[0]}
              alt=""
              className="h-[30rem]"
            />
            {/* <ReactImageMagnify
              className="w-full h-full"
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: serverURL + "/" + product.images[0],
                  height: 1500,
                },
                largeImage: {
                  src: serverURL + "/" + product.images[0],
                  width: 1200,
                  height: 1800,
                },
              }}
            /> */}
          </div>
        </div>
        <div className=" p-12 w-[50rem]">
          <h1 className="font-bold text-3xl">{product.brand}</h1>
          <p className="my-6 ">{product.subDesc}</p>
          <h1 className="text-6xl font-semibold text-[#003355]">
            ${product.price}
          </h1>
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
            <p className="my-4 font-normal">{product.desc}</p>
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
                  onClick={() => handleCart(product, quantity)}
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
