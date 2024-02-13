import { useState } from "react";
import axios from "axios";
import serverUrl from "../server";
import { useEffect } from "react";
import toast from "react-hot-toast";

function BannerBoard() {
  const [bannerList, setBannerList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(bannerList);

  useEffect(() => {
    try {
      axios
        .get(`${serverUrl}/admin/getBannerList`, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            setBannerList(res.data.data);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log("error while loading banner", error);
    }
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerList.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerList.length - 1 : prevIndex - 1
    );
  };

  const images = bannerList.map((banner) => banner.image);
  const urls = bannerList.map((banner) => banner.url);

  return (
    <div className="relative">
      <div className=" w-full px-4 relative group">
        <div className=" bg-white flex rounded-2xl bg-center bg-cover w-fit px-16 m-auto ">
          <a href={urls[currentIndex]}>
            <img
              src={serverUrl + "/" + images[currentIndex]}
              className=" h-[28rem] m-auto object-contain"
            />
          </a>
        </div>
        {/* Left Arrow */}
        <button
          type="button"
          onClick={prevSlide}
          className="hidden group-hover:flex absolute top-1/2 left-4 z-30 transform -translate-y-1/2   justify-center items-center group px-4 h-full cursor-pointer  "
        >
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30  group-hover:bg-white/50 4 group-focus:ring-white  group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span className="hidden">Previous</span>
          </span>
        </button>
        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          type="button"
          className="hidden group-hover:flex absolute top-1/2 right-4 z-30 transform -translate-y-1/2  justify-center items-center px-4 h-full cursor-pointer group "
        >
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30  group-hover:bg-white/50 4 group-focus:ring-white  group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span className="hidden">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
}
export default BannerBoard;
