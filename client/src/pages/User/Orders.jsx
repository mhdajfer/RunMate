import OrderList from "../../Components/OrderList";
import { useLocation } from "react-router-dom";
import ProfileSideBar from "../../Components/ProfileSideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../Components/Pagination";
import serverURL from "../../../serverURL";

function Orders() {
  const location = useLocation();
  const user = location.state?.user;
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 3;

  const lastDataIndex = currentPage * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const orderList = orders.slice(firstDataIndex, lastDataIndex);

  useEffect(() => {
    console.log("running orders");
    try {
      axios.get(`${serverURL}/order/get-AllOrders`).then((res) => {
        if (res.data.success) {
          setOrders(res.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <div className="container mx-auto my-5 p-5">
        <div className="flex space-x-4">
          {/* left body */}

          <ProfileSideBar user={user} />

          {/* main body */}

          <div className="h-fit flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 md:w-9/12">
            <p className="text-lg md:text-xl mb-8 mx-auto font-semibold leading-6 xl:leading-5 text-gray-800">
              Order Book
            </p>
            {!orders.length ? (
              <h1 className="text-center mx-auto ">No Orders</h1>
            ) : (
              <div>
                <div className="grid grid-cols-5 w-full border-b border-gray-100 pb-4">
                  <div className="flex col-span-2 ">
                    <span className="mx-auto">Order</span>
                  </div>
                  <div className="flex justify-center ">
                    <span className="mx-auto">Status</span>
                  </div>
                  <div className="flex justify-center ">
                    <span className="mx-auto">Sub-Total</span>
                  </div>
                  <div className="flex justify-center ">
                    <span className="mx-auto">Amount</span>
                  </div>
                </div>
                <div>
                  {orderList.map((order, i) => (
                    <OrderList key={i} order={order} />
                  ))}
                </div>
              </div>
            )}
            <Pagination
              totalItems={orders.length}
              dataPerPage={dataPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
