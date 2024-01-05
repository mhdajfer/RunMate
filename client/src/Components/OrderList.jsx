/* eslint-disable react/prop-types */
function OrderList({ order }) {
  return (
    <>
      <div className="bg-gray-50 p-4 rounded-lg border-md mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
        <div className=" md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
          <div className="w-fit flex flex-col justify-start items-start space-y-8">
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
          <div className="flex justify-between me-8  w-[34rem] ">
            <p className="text-base text-orange-500 leading-6 ">Processing</p>
            <p className="text-base dark:text-black leading-6 text-gray-800">
              {order.subTotal}
            </p>
            <p className="text-base dark:text-black xl:text-lg font-semibold leading-6 text-gray-800">
              {order.total}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderList;
