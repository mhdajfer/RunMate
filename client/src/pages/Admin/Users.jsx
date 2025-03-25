import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import serverUrl from "../../server";
import Pagination from "../../Components/Pagination";

export default function Products() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  let dataPerPage = 5;

  const lastDataIndex = currentPage * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;

  useEffect(() => {
    try {
      axios
        .get(`${serverUrl}/users`, { withCredentials: true })
        .then((res) => {
          setUsers(res.data.users);
        })
        .catch((err) => {
          toast.error("Can't fetch details");
          console.log(err);
        });
    } catch (error) {
      console.log("error while fetching products", error);
    }
  }, []);

  const generateShortUserId = (mongoId) => {
    return `USR-${mongoId.slice(-8).toUpperCase()}`;
  };
  const handleBlocks = async (user) => {
    try {
      const response = await axios.post(
        `${serverUrl}/admin/block-user`,
        { user },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Update the users array with the new blocked status
        setUsers(
          users.map((u) =>
            u._id === user._id ? { ...u, isBlocked: !u.isBlocked } : u
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("error while blocking user", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const userList = filteredUsers.slice(firstDataIndex, lastDataIndex);

  return (
    <>
      <div className="w-full flex flex-col items-center p-16">
        <div className="w-full max-w-md mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="">
          <table className="my-12">
            <thead>
              {users.length ? (
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Email Address</th>
                  <th>Phone no.</th>
                  <th>Action</th>
                </tr>
              ) : null}
            </thead>
            <tbody>
              {!userList.length ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No Users Found!!
                  </td>
                </tr>
              ) : (
                userList.map((user, i) => {
                  return (
                    <tr key={i} className="bg-[#BBE1FA] h-16 hover:bg-gray-100">
                      <td className="p-6">{generateShortUserId(user._id)}</td>
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.age}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.phone}</td>
                      <td className="p-2">
                        <button
                          className="bg-green-700 px-2 m-1 rounded-md text-md text-white"
                          onClick={() => {
                            handleBlocks(user);
                          }}
                        >
                          {user.isBlocked ? "UnBlock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
              <tr>
                <td>
                  <Pagination
                    totalItems={filteredUsers.length}
                    dataPerPage={dataPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed top-[20%] right-[25%]"></div>
    </>
  );
}
