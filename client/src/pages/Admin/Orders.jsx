import { useEffect, useState } from "react";
import axios from "axios";
import serverUrl from "../../server";
import OrderStatus from "../../Components/OrderStatus";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false);

  useEffect(() => {
    try {
      axios.get(`${serverUrl}/admin/orders`).then((res) => {
        if (res.data.success) {
          setOrders(res.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  function handleStatus() {
    setIsOrderStatusOpen(!isOrderStatusOpen);
  }
  function cancelOrderStatus() {
    setIsOrderStatusOpen(false);
  }
  return (
    <>
      <div className="w-full flex flex-col items-center p-16">
        <table className="my-12">
          <thead>
            <tr>
              <th>Id</th>
              <th>Customer</th>
              <th>Contact no.</th>
              <th>Address</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!orders.length ? (
              <h1>No Orders yet!!</h1>
            ) : (
              orders.map((order, i) => {
                return (
                  <tr key={i} className="bg-[#BBE1FA] h-16 hover:bg-gray-100">
                    <td className="p-6">{order._id}</td>
                    <td className="p-2">{order.name}</td>
                    <td className="p-2">{order.phone}</td>
                    <td className="p-2">{order.address1}</td>
                    <td className="p-2">{order.total}</td>
                    <td className="p-2">
                      {order.status === "Deliver"
                        ? "Delivered"
                        : order.status === "Cancel"
                        ? "Canceled"
                        : order.status}
                    </td>
                    <td className="p-2">
                      <button
                        className="bg-green-700 px-2 m-1 rounded-md text-md text-white"
                        onClick={() => {
                          handleStatus(order);
                        }}
                      >
                        Change Status
                      </button>
                      <div className="absolute right-[10%]">
                        {isOrderStatusOpen && (
                          <OrderStatus
                            order={order}
                            cancelFn={cancelOrderStatus}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Orders;
