import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import serverUrl from "../../server";

function SingleOrderDetails() {
  const location = useLocation();
  const order = location.state.order;
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    axios
      .get(`${serverUrl}/order/details/${order._id}`)
      .then((res) => {
        if (res.data.success) {
          setOrderData(res.data.data);
        }
      })
      .catch((error) => {
        console.error("Error while fetching order details", error);
      });
  }, [order._id]);

  return (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Order #{orderData?._id}
          </h1>
          <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
            21st Mart 2021 at 10:34 PM
          </p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <div className="md:flex w-full text-center hidden">
                <h3 className="text-xl  w-3/6 dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                  Product
                </h3>
                <h3 className="text-xl  w-1/6 dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                  Price
                </h3>
                <h3 className="text-xl  w-1/6 dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                  Quantity
                </h3>
                <h3 className="text-xl  w-1/6 dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                  Category
                </h3>
              </div>

              {/* order details */}

              {orderData?.products &&
                orderData?.products.map((product, i) => (
                  <div
                    key={i}
                    className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                  >
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-full hidden md:block"
                        src={serverUrl + "/" + product?.productId?.images[0]}
                        alt="dress"
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-4/5  flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                          {product?.productId?.name}
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-gray-300">
                              Quantity:{" "}
                            </span>{" "}
                            {product?.productId?._id}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-8 text-center w-full ">
                        <p className="text-base dark:text-white xl:text-lg leading-6 w-2/6 ">
                          ${product?.productId?.price}
                        </p>
                        <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800 w-2/6">
                          {product?.quantity}
                        </p>
                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 w-2/6 text-gray-800">
                          {product?.productId?.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    ₹{orderData?.subTotal}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Discount{" "}
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      {orderData?.shipping + orderData?.subTotal ==
                      orderData?.total
                        ? " ₹00.00 (0%)"
                        : ` ₹${
                            orderData?.total -
                            (orderData?.shipping + orderData?.subTotal)
                          }`}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      ₹{orderData?.shipping}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    ₹{orderData?.total}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                        {orderData?.address1 +
                          "  " +
                          orderData?.state +
                          " " +
                          orderData?.zip}
                        <br />
                        <span className="font-normal">
                          Delivery with 2-4 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-[60rem] mx-auto bg-gray-50 dark:bg-gray-800 space-y-6">
              <div className="flex justify-between items-center w-full">
                <p className="text-md dark:text-white leading-5 text-gray-800">
                  Customer name
                </p>
                <p className="text-white">{orderData?.name}</p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-md dark:text-white leading-5 text-gray-800">
                  Contact no.
                </p>
                <p className="text-white">{orderData?.phone}</p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-md dark:text-white leading-5 text-gray-800">
                  Order status
                </p>
                <p className="text-white">{orderData?.status}</p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-md dark:text-white leading-5 text-gray-800">
                  payment status
                </p>
                <p className="text-white">
                  {orderData?.paymentStatus ? "Paid" : "Not Paid"}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-md dark:text-white leading-5 text-gray-800">
                  payment mode
                </p>
                <p className="text-white">{orderData?.mode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleOrderDetails;
