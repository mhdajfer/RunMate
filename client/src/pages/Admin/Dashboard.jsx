import { useEffect, useState } from "react";
import axios from "axios";
import serverUrl from "../../server";
import LineChart from "../../Components/LineChart";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        data: [],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  });
  const revenue = orders.reduce((acc, order) => acc + order?.total, 0);

  useEffect(() => {
    const loadData = async () => {
      try {
        await axios
          .get(`${serverUrl}/users`, { withCredentials: true })
          .then((res) => {
            if (res.data.success) {
              setUsers(res.data.users);
            }
          });
        await axios
          .get(`${serverUrl}/order/getAll`, { withCredentials: true })
          .then((res) => {
            if (res.data.success) {
              setOrders(res.data.data);
              RevenueChartData(res.data.data);
            }
          });
      } catch (error) {
        console.log("error while loading Dashboard", error);
      }
    };
    loadData();
  }, []);

  function MonthlyChartData(ordersData) {
    const MonthlySales = Array(12).fill(0);

    ordersData.forEach((order) => {
      const date = order?.createdAt;
      MonthlySales[new Date(date).getMonth()] = order?.total;
    });
    setChartData((prevData) => ({
      ...prevData,
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          ...prevData.datasets[0],
          data: MonthlySales,
          label: "Monthly Revenue",
        },
      ],
    }));
  }

  function RevenueChartData(ordersData) {
    const DailySales = Array(new Date().getDay() + 1).fill(0);

    ordersData.forEach((order) => {
      const orderDate = new Date(order?.createdAt);
      const dayOfWeek = orderDate.getDay();

      DailySales[dayOfWeek] += order?.total;
    });

    setChartData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: DailySales,
          label: "Revenue of current week",
        },
      ],
    }));
  }

  function OrderChartData(ordersData) {
    const DailyOrders = Array(new Date().getDay() + 1).fill(0);

    ordersData.forEach((order) => {
      const orderDate = new Date(order?.createdAt);
      const dayOfWeek = orderDate.getDay();

      DailyOrders[dayOfWeek] += 1;
    });

    setChartData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: DailyOrders,
          label: "Orders of current week",
        },
      ],
    }));
  }

  return (
    <>
      <div className="p-6">
        <div className="p-4 flex justify-evenly">
          <div className="bg-gray-100 h-44 w-64 rounded-lg p-4 flex flex-col justify-evenly text-white bg-gradient-to-r from-gray-700 via-purple-900 to-violet-600">
            <h3 className="text-2xl font-bold">Users :</h3>
            <h1 className="text-5xl font-semibold ms-auto me-8">
              {users.length}
            </h1>
          </div>
          <div className="bg-gray-100 h-44 w-64 rounded-lg p-4 flex flex-col justify-evenly text-white bg-gradient-to-r from-gray-700 via-purple-900 to-violet-600">
            <h3 className="text-2xl font-bold">Revenue :</h3>
            <h1 className="text-5xl font-semibold ms-auto me-8">{revenue}</h1>
          </div>
          <div className="bg-gray-100 h-44 w-64 rounded-lg p-4 flex flex-col justify-evenly text-white bg-gradient-to-r from-gray-700 via-purple-900 to-violet-600">
            <h3 className="text-2xl font-bold">Orders :</h3>
            <h1 className="text-5xl font-semibold ms-auto me-8">
              {orders.length}
            </h1>
          </div>
        </div>
        <div className=" mt-8">
          <div className="flex justify-between">
            <div className="">
              <button
                className="border px-2"
                onClick={() => {
                  MonthlyChartData(orders);
                }}
              >
                Monthly
              </button>
              <button
                className="border px-2"
                onClick={() => {
                  RevenueChartData(orders);
                }}
              >
                Current week
              </button>
            </div>
            <div className="relative">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                Filter By{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {dropdownVisible && (
                <div className="z-10 absolute top-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownHoverButton"
                  >
                    <li
                      className="cursor-pointer"
                      onClick={() => {
                        RevenueChartData(orders);
                        setDropdownVisible(false);
                      }}
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Revenue
                      </a>
                    </li>
                    <li
                      className="cursor-pointer"
                      onClick={() => {
                        OrderChartData(orders);
                        setDropdownVisible(false);
                      }}
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Order
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="">
            <LineChart data={chartData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
