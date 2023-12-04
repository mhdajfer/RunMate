import shoe001 from "../assets/shoe001.jpg";
import Icons from "../assets/Icons";
const { heart, cart } = Icons;

export default function ProductCard() {
  return (
    <>
      <section className="h-[400px] border border-black w-[350px] bg-blue-400 rounded-lg">
        <div>
          <img src={shoe001} alt="" />
        </div>
        <div className="p-4">
          <h2 className="font-bold text-xl">NIKE</h2>
          <p className="text-[13px]">
            Air Max Tavas Running Shoes For Men (Grey)....
          </p>
          <div className="flex space-x-1 my-2">
            {heart}
            {heart}
            {heart}
            {heart}
            {heart}
          </div>
          <h1 className="text-3xl font-medium text-[#003355]">$1900</h1>
          <div className="flex justify-evenly my-4">
            <button className="bg-[#003355] flex items-center justify-center  w-[16vw] py-2 rounded-full text-white">
              <span className="mx-4">{cart}</span>Add to Cart
            </button>
            <button className="bg-[#003355] flex items-center justify-center  w-10 py-2 rounded-full text-white">
              <span className="mx-4">{heart}</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
