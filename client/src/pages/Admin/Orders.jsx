import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import serverUrl from "../../server";
import OrderStatus from "../../Components/Order/OrderStatus";
import Pagination from "../../Components/Pagination";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [clickedOrder, setClickedOrder] = useState();
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  let dataPerPage = 5;

  const filteredOrders = orders.filter((order) => {
    const shortId = generateShortOrderId(order._id);
    return (
      shortId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const lastDataIndex = currentPage * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const orderList = filteredOrders.slice(firstDataIndex, lastDataIndex);

  useEffect(() => {
    try {
      axios
        .get(`${serverUrl}/admin/orders`, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            setOrders(res.data.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [isOrderStatusOpen]);

  function generateShortOrderId(mongoId) {
    return `ORD-${mongoId.slice(-8).toUpperCase()}`;
  }

  function handleSingleOrderDetails(order) {
    console.log(order);
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
        <div className="w-full max-w-2xl mb-4">
          <input
            type="text"
            placeholder="Search by Order ID, Customer Name or Phone"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
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
              <tr>
                <td>
                  <h1>No Orders yet!!</h1>
                </td>
              </tr>
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
                      {generateShortOrderId(order?._id)}
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
                          handleStatus();
                          setClickedOrder(order);
                        }}
                      >
                        Change Status
                      </button>
                      <div className="absolute right-[10%]">
                        {isOrderStatusOpen && (
                          <OrderStatus
                            order={clickedOrder}
                            cancelFn={cancelOrderStatus}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
            <tr>
              <td>
                <Pagination
                  totalItems={orders.length}
                  dataPerPage={dataPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Orders;
