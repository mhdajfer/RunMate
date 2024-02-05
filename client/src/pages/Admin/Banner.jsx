import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import serverUrl from "../../server";
import DialogBox from "../../Components/DialogBox";

function Banner() {
  const [bannerList, setBannerList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [banner, setBanner] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
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
      toast.error("Error while loading category");
      console.log(error);
    }
  }

  function handleDelete(coupon) {
    setBanner(coupon);
    setIsDialogOpen(true);
  }

  function CancelDelete() {
    setBanner(null);
    setIsDialogOpen(false);
  }

  function confirmDelete(coupon) {
    bannerList.filter((coupon) => {
      return coupon._id !== coupon._id;
    });
    try {
      axios
        .post(
          `${serverUrl}/admin/delete-banner`,
          { banner },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/admin/banner");
            setIsDialogOpen(false);
            fetchData();
          } else bannerList.push(coupon);
        });
    } catch (error) {
      toast.error("Error while deleting category");
      console.log(error);
    }
  }

  return (
    <>
      <div className="">
        <div className="flex flex-col items-center w-[50vw] mx-auto mt-[15%] border border-teal-600 rounded-lg bg-[#BBE1FA] p-6">
          <div className=" text-white self-end">
            <Link to={"/admin/banner/add"}>
              <button className="bg-[#342475] w-[10vw] h-12 rounded-lg">
                Add Banner
              </button>
            </Link>
          </div>
          {bannerList.length ? (
            <table>
              <thead>
                <tr>
                  <th>Banner</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {bannerList.map((banner, i) => (
                  <tr key={i}>
                    <td className="p-2">
                      <img
                        src={serverUrl + "/" + banner.image}
                        alt=""
                        className="w-32"
                      />
                    </td>
                    <td className="p-2">{banner.caption}</td>
                    <td className="p-2">
                      <button
                        className="bg-red-500 px-2 m-1 rounded-md text-md text-white"
                        onClick={() => {
                          handleDelete(banner);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1>No Banners Added.</h1>
          )}
        </div>
      </div>
      <div className="fixed top-[20%] right-[25%]">
        {/* Dialog box */}
        {isDialogOpen && (
          <DialogBox
            data={banner}
            onConfirmDelete={confirmDelete}
            onCancel={CancelDelete}
          />
        )}
      </div>
    </>
  );
}

export default Banner;
