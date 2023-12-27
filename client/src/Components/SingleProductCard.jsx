import serverURL from "../../serverURL";
import Icons from "../assets/Icons";
const { star_filled, heart, star, cart } = Icons;

function SingleProductCard(item) {
  // eslint-disable-next-line react/prop-types
  const product = item.product;
  return (
    <>
      <div className=" w-screen p-12 px-[6rem] flex justify-evenly space-x-12">
        <div className="flex ">
          <div className="bg-yellow-500 space-y-1 flex flex-col">
            <div className="bg-blue-500 w-12 h-12"></div>
            <div className="bg-blue-500 w-12 h-12"></div>
            <div className="bg-blue-500 w-12 h-12"></div>
          </div>
          <div className="">
            <img
              src={serverURL + "/" + product.images[0]}
              alt=""
              className="h-[30rem]"
            />
          </div>
        </div>
        <div className=" p-12 w-[50rem] h-[20rem]">
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
              <div>
                <button className="bg-[#003355] flex items-center justify-center font-semibold text-xl  w-full h-14 py-2 rounded-sm text-white">
                  <span className="me-4">{cart}</span>Add to Cart
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
