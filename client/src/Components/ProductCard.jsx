import Icons from "../assets/Icons";
import serverUrl from "../server";
const { heart, cart } = Icons;

export default function ProductCard(item) {
  const product = item.product;

  return (
    <div className="flex space-x-6 m-4">
      <div className="bg-white mt-8  min-w-[300px] w-[350px]  rounded-lg">
        <div className=" ">
          <img
            src={serverUrl + "/" + product.image}
            alt=""
            className="w-full h-[30vh] object-fit rounded-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="font-bold text-xl">{product.brand}</h2>
          <p className="text-[13px]">{product.desc}</p>
          <div className="flex space-x-1 my-2">
            {heart}
            {heart}
            {heart}
            {heart}
            {heart}
          </div>
          <h1 className="text-3xl font-medium text-[#003355]">
            ${product.price}
          </h1>
          <div className="flex justify-evenly my-4">
            <button className="bg-[#003355] flex items-center justify-center  w-[18vw] py-2 rounded-full text-white">
              <span className="me-4">{cart}</span>Add to Cart
            </button>
            <button className="bg-[#003355] flex items-center justify-center  w-10 py-2 rounded-full text-white">
              <span className="mx-4">{heart}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
