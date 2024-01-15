import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import serverUrl from "../../server";
import OrderStatus from "../../Components/OrderStatus";
import Pagination from "../../Components/Pagination";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  let dataPerPage = 2;

  const lastDataIndex = currentPage * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const orderList = orders.slice(firstDataIndex, lastDataIndex);

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

  function handleSingleOrderDetails(order) {
    navigate("/admin/order/getOne", { state: { order } });
  }

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
              orderList.map((order, i) => {
                return (
                  <tr key={i} className="bg-[#BBE1FA] h-16 hover:bg-gray-100">
                    <td
                      className="p-6 hover:underline hover:text-blue-600 cursor-pointer"
                      onClick={() => {
                        handleSingleOrderDetails(order);
                      }}
                    >
                      {order._id}
                    </td>
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
            <Pagination
              totalItems={orders.length}
              dataPerPage={dataPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Orders;
