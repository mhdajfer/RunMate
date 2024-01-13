import axios from "axios";
import serverUrl from "../server";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
function OrderList({ order }) {
  const orderId = order._id;
  function hanldeReturnOrder() {
    try {
      axios
        .post(
          `${serverUrl}/order/status/change`,
          { orderStatus: "Returned", orderId },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            window.location.reload();
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      toast.error(" Can't Return");
      console.log(error);
    }
  }
  return (
    <>
      <div className="bg-gray-50 p-4 rounded-lg border-md mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-[64rem] text-center">
        <div className=" md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
          <div className="flex flex-col justify-start items-start space-y-8 w-2/5">
            <h3 className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">
              Order id: <span className="font-medium text-lg">{order._id}</span>
            </h3>
            <div className="flex justify-start items-start flex-col space-y-2">
              {order.productNames.map((name, i) => (
                <p
                  key={i}
                  className="text-sm dark:text-black leading-none text-gray-800"
                >
                  <span className="dark:text-gray-400 text-gray-300">
                    item {i + 1}&nbsp;&nbsp;:{" "}
                  </span>
                  &nbsp;{name}
                </p>
              ))}
            </div>
          </div>
          <div className="text-base text-orange-500 leading-6 w-1/5">
            {order.status === "Deliver"
              ? "Delivered"
              : order.status === "Cancel"
              ? "Canceled"
              : order.status}
          </div>
          <div className="text-base dark:text-black leading-6 text-gray-800 w-1/5">
            {order.subTotal}
          </div>
          <div className="text-base dark:text-black xl:text-lg w-1/5 font-semibold leading-6 text-gray-800 ">
            {order.total}
            <div>
              {!(order.status === "Deliver") ? null : (
                <button
                  className="mt-8 bg-transparent hover:bg-blue-500 text-blue-700  hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={hanldeReturnOrder}
                >
                  Return Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderList;
