import { useState } from "react";
import axios from "axios";
import serverUrl from "../server";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
function OrderStatus({ order, cancelFn }) {
  // eslint-disable-next-line react/prop-types
  const [orderStatus, setOrderStatus] = useState(order.status);
  // eslint-disable-next-line react/prop-types
  const orderId = order._id;
  function updateOrder(e) {
    e.preventDefault();

    try {
      axios
        .post(
          `${serverUrl}/order/status/change`,
          { orderStatus, orderId },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            cancelFn(false);
          }
        });
    } catch (error) {
      toast.error("status error");
      console.log(error);
    }
  }
  return (
    <>
      <form
        className=" mx-auto flex flex-col bg-gray-200 p-20 rounded-xl shadow-lg"
        onSubmit={(e) => {
          updateOrder(e);
        }}
      >
        <div className="flex space-x-4">
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium ">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              // eslint-disable-next-line react/prop-types
              value={order.name}
              className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg   block w-full p-2.5  "
              placeholder="Name"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="total" className="block mb-2 text-sm font-medium ">
              Order Amount
            </label>
            <input
              type="text"
              id="total"
              name="total"
              // eslint-disable-next-line react/prop-types
              defaultValue={order.total}
              className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg   block w-full p-2.5  "
              placeholder="total"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mb-5">
            <label htmlFor="state" className="block mb-2 text-sm font-medium ">
              Status
            </label>
            <select
              type="text"
              name="status"
              id="status"
              onChange={(e) => {
                setOrderStatus(e.target.value);
              }}
              className="shadow-sm w-full bg-gray-50 rounded-md border border-gray-300 px-6 py-2 text-sm  outline-none focus:z-10  "
            >
              {/* // eslint-disable-next-line react/prop-types */}
              <option value=""> {orderStatus}</option>
              <option value="Cancelled">Cancel</option>
              <option value="Delivered">Deliver</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Update Address
        </button>
        <button
          onClick={() => {
            cancelFn(false);
          }}
          type="submit"
          className="hover:bg-gray-300 rounded-lg text-md shadow-md border-2 mt-2 border-gray-300 px-5 py-2.5 text-center "
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default OrderStatus;
