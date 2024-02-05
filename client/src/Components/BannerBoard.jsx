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

  return (
    <div className="relative">
      <div className="overflow-hidden w-full rounded-lg h-[30rem] bg-slate-100 ">
        <div
          className="flex rounded-2xl ps-[20rem]  space-x-[46rem]  transition-transform duration-300 ease-in-out transform"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {bannerList.map((banner, index) => (
            <img
              key={index}
              src={serverUrl + "/" + banner.image}
              alt={`Slide ${index + 1}`}
              className="  h-[30rem]  object-cover   "
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={prevSlide}
        className="flex absolute top-1/2 left-4 z-30 transform -translate-y-1/2   justify-center items-center group px-4 h-full cursor-pointer  "
      >
        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
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

      <button
        onClick={nextSlide}
        type="button"
        className="flex absolute top-1/2 right-4 z-30 transform -translate-y-1/2  justify-center items-center px-4 h-full cursor-pointer group "
        data-carousel-next
      >
        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
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
  );
}
export default BannerBoard;
