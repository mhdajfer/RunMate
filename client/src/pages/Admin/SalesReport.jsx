import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import serverUrl from "../../server";
import Pagination from "../../Components/Pagination";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

function SalesReport() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());
  let dataPerPage = 5;

  const lastDataIndex = currentPage * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const orderList = orders.slice(firstDataIndex, lastDataIndex);

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
  }, [startDate]);

  function handleSingleOrderDetails(order) {
    navigate("/admin/order/getOne", { state: { order } });
  }

  function filterDataByDate() {
    try {
      axios
        .post(
          `${serverUrl}/order/filterDataByDate`,
          { startDate, endDate },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            setOrders(res.data.data);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log("error while filtering", error);
    }
  }

  const downloadPDF = () => {
    const pdf = new jsPDF();

    const deliveredOrders = orders.filter(
      (order) => order.status === "Delivered"
    );
    //calculating total value
    const totalValue = deliveredOrders.reduce(
      (acc, order) => acc + order.total,
      0
    );

    pdf.text("Sales Report", 14, 15);
    // Create a table
    pdf.autoTable({
      head: [["Name", "Phone", "Total", "Status"]],
      body: orders.map((row) => [row.name, row.phone, row.total, row.status]),
      startY: 25,
    });

    pdf.text(
      `Total Order Value of Delivered Orders : ${totalValue}`,
      14,
      pdf.autoTable.previous.finalY + 10
    );

    pdf.save("sales_report.pdf");
  };

  const downloadXL = () => {
    const WorkSheet = XLSX.utils.json_to_sheet(orders);
    const NewSheet = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(NewSheet, WorkSheet, "Sales Report");

    XLSX.writeFile(NewSheet, "Sales Report.xlsx");
  };

  return (
    <>
      <div className="w-full flex flex-col items-center p-16">
        <div className="flex justify-between items-center w-full px-5">
          <div>
            <input
              type="date"
              onChange={(e) => {
                setStartDate(e.target.value ? new Date(e.target.value) : null);
              }}
              value={startDate?.toISOString().slice(0, 10)}
              className="border border-black rounded-md px-1 mx-2"
            />
            <input
              type="date"
              onChange={(e) => {
                setEndDate(e.target.value ? new Date(e.target.value) : null);
              }}
              value={endDate.toISOString().slice(0, 10)}
              className="border border-black rounded-md px-1 mx-2"
            />
            <button
              className="border px-1 mx-2 rounded-md bg-[#BBE1FA] border-gray-400 hover:border-black"
              onClick={filterDataByDate}
            >
              Go
            </button>
            <button
              className="border border-gray-500 rounded-md px-2 "
              onClick={() => {
                setStartDate(null);
              }}
            >
              reset
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <button
              className="hover:bg-blue-500  shadow-lg px-2 mx-4 rounded-md bg-blue-400"
              onClick={downloadPDF}
            >
              Download Pdf
            </button>
            <button
              className="hover:bg-blue-500 shadow-lg px-2 mx-4 rounded-md bg-blue-400"
              onClick={downloadXL}
            >
              Download xl
            </button>
          </div>
        </div>
        <table className="my-12 w-[64rem]">
          <thead className="border-b border-gray-400">
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

export default SalesReport;
