import { useEffect, useState } from "react";
import axios from "axios";
import serverUrl from "../../server";
import LineChart from "../../Components/LineChart";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
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
            }
          });
      } catch (error) {
        console.log("error while loading Dashboard", error);
      }
    };
    loadData();
  }, []);

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };
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
        <div className="">
          <LineChart data={chartData} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
