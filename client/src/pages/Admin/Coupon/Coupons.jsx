import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import serverUrl from "../../../server";
import DialogBox from "../../../Components/DialogBox";

function Coupons() {
  const [couponList, setCouponList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [coupon, setCoupon] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    try {
      axios
        .get(`${serverUrl}/coupon/getCoupons-admin`, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            setCouponList(res.data.data);
          }
        });
    } catch (error) {
      toast.error("Error while loading category");
      console.log(error);
    }
  }

  function handleDelete(coupon) {
    setCoupon(coupon);
    setIsDialogOpen(true);
  }

  function CancelDelete() {
    setCoupon(null);
    setIsDialogOpen(false);
  }

  function confirmDelete(coupon) {
    couponList.filter((coupon) => {
      return coupon._id !== coupon._id;
    });
    try {
      axios
        .post(
          `${serverUrl}/coupon/delete`,
          { coupon },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/admin/coupons");
            setIsDialogOpen(false);
            fetchData();
          } else couponList.push(coupon);
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
            <Link to={"/admin/coupon/add"}>
              <button className="bg-[#342475] w-[10vw] h-12 rounded-lg">
                Add Category
              </button>
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Coupon name</th>
                <th>Description</th>
                <th>Coupon Code</th>
              </tr>
            </thead>
            <tbody>
              {couponList.map((coupon, i) => (
                <tr key={i}>
                  <td className="p-2">{coupon.name}</td>
                  <td className="p-2">{coupon.desc}</td>
                  <td className="p-2">{coupon.code}</td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 px-2 m-1 rounded-md text-md text-white"
                      onClick={() => {
                        handleDelete(coupon);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed top-[20%] right-[25%]">
        {/* Dialog box */}
        {isDialogOpen && (
          <DialogBox
            data={coupon}
            onConfirmDelete={confirmDelete}
            onCancel={CancelDelete}
          />
        )}
      </div>
    </>
  );
}

export default Coupons;
