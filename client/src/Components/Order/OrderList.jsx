import axios from "axios";
import serverUrl from "../../server";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */
function OrderList({ order }) {
  const navigate = useNavigate();
  const orderId = order._id;

  function handleChangeStatus(orderStatus) {
    try {
      axios
        .post(
          `${serverUrl}/order/status/change`,
          { orderStatus, orderId },
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

  async function handleInvoice() {
    try {
      const response = await axios.get(`${serverUrl}/invoice/${orderId}`, {
        withCredentials: true,
        responseType: "blob",
      });

      // Create a Blob from the received data
      const pdtBlob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(pdtBlob);

      const tempElement = document.createElement("a");
      tempElement.href = url;

      tempElement.setAttribute("download", `invoice_${orderId}`);
      document.body.appendChild(tempElement);
      tempElement.click();

      document.body.removeChild(tempElement);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("error while processing invoice", error);
    }
  }

  return (
    <>
      <div className="bg-gray-50 p-4 rounded-lg border-md mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-[64rem] text-center">
        <div className=" md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
          <div className="flex flex-col justify-start items-start space-y-8 w-2/5">
            <h3 className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">
              Order id:{" "}
              <span
                className="font-medium text-lg hover:underline cursor-pointer hover:text-blue-700"
                onClick={() => {
                  navigate("/product/order/getOne", { state: { order } });
                }}
              >
                {order._id}
              </span>
            </h3>
            <div className="flex justify-start items-start flex-col space-y-2">
              {order?.productNames?.map((name, i) => (
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
            {order.status}
          </div>
          <div className="text-base dark:text-black leading-6 text-gray-800 w-1/5">
            {order.subTotal}
          </div>
          <div className="text-base dark:text-black xl:text-lg w-1/5 font-semibold leading-6 text-gray-800 ">
            {order.total}
            <div>
              {!(order.status === "Delivered") ? (
                order.status === "waiting for admin" ? (
                  <button
                    className="mt-8 bg-transparent hover:bg-blue-500 text-blue-700  hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => {
                      handleChangeStatus("cancelled");
                    }}
                  >
                    Cancel Order
                  </button>
                ) : null
              ) : (
                <button
                  className="mt-8 bg-transparent hover:bg-blue-500 text-blue-700  hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={() => {
                    handleChangeStatus("Returned");
                  }}
                >
                  Return Order
                </button>
              )}
            </div>
            {order?.status === "Delivered" ? (
              <div>
                <a
                  className="text-sm font-medium cursor-pointer"
                  onClick={() => handleInvoice()}
                >
                  {" "}
                  download invoice
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderList;
