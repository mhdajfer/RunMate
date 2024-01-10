import OrderList from "../../Components/OrderList";
import { useLocation } from "react-router-dom";
import ProfileSideBar from "../../Components/ProfileSideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import serverURL from "../../../serverURL";

function Orders() {
  const location = useLocation();
  const user = location.state?.user;
  const [orders, setOrders] = useState([]);
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
          {/* <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Customer
              </h3>
              <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                <div className="flex flex-col justify-start items-start flex-shrink-0">
                  <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                    <img
                      src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                      alt="avatar"
                    />
                    <div className="flex justify-start items-start flex-col space-y-2">
                      <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                        David Kent
                      </p>
                      <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                        10 Previous Orders
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 7L12 13L21 7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="cursor-pointer text-sm leading-5 ">
                      david89@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                  <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                      <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                        Shipping Address
                      </p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        180 North King Street, Northhampton MA 1060
                      </p>
                    </div>
                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                      <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                        Billing Address
                      </p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        180 North King Street, Northhampton MA 1060
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                    <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
                      Edit Details
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
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
                    <span className="mx-auto">Order</span>
                  </div>
                  <div className="flex justify-center ">
                    <span className="mx-auto">Order</span>
                  </div>
                </div>
                <div>
                  {orders.map((order, i) => (
                    <OrderList key={i} order={order} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
