import { useEffect, useState } from "react";
import axios from "axios";
import serverUrl from "../../server";

function Orders() {
  const [orders, setOrders] = useState([]);

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
              <th>Order Amount</th>
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
                    <td className="p-2">{order.subTotal}</td>
                    <td className="p-2">
                      <button
                        className="bg-green-700 px-2 m-1 rounded-md text-md text-white"
                        onClick={() => {}}
                      >
                        Edit
                      </button>
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
