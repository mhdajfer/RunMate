import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import serverUrl from "../../server";
import { useNavigate } from "react-router-dom";

function AddBanner() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();

    const bannerForm = new FormData();
    bannerForm.append("caption", caption);
    bannerForm.append("image", image);
    bannerForm.append("url", url);
    try {
      axios
        .post(`${serverUrl}/admin/banner/add`, bannerForm, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/admin/banner");
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      toast.error("Error while sending data");
      console.log(error);
    }
  }
  return (
    <form
      className="bg-[#ffffff] h-fit  p-8 rounded-lg m-8 w-fit"
      onSubmit={handleFormSubmit}
    >
      <div className="flex space-x-12">
        <div className="flex flex-col items-center">
          <div className="flex flex-col mt-4 mb-1">
            <label htmlFor="caption">Name</label>
            <input
              type="text"
              name="caption"
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
              className=" min-w-[180px] w-[20vw] h-[2rem]  border border-teal-700 rounded-lg p-3 "
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col my-4">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              required
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="  min-w-[180px] w-[20vw] bg-white text-[10px]  border border-teal-700 rounded-lg py-1 px-3"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col my-4">
          <label htmlFor="url">Url</label>
          <input
            type="text"
            name="url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            className=" min-w-[180px] w-[20vw] h-[2rem]  border border-teal-700 rounded-lg p-3 "
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center text-white mt-6">
        <button className="bg-[#342475] w-[20vw] h-12 rounded-lg">
          Add Category
        </button>
      </div>
    </form>
  );
}

export default AddBanner;
