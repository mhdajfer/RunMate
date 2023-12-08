import AdminLayout from "./AdminLayout";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import serverUrl from "../../server";

export default function Products() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${serverUrl}/users`)
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

  function handleDelete(user) {
    axios
      .get(`${serverUrl}/users/delete/${user._id}`)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleEdit(user) {
    navigate("/admin/users/edit", { state: { user } });
  }

  function AddUser() {
    navigate("/admin/users/add");
  }

  const handleBlock = async (user) => {
    try {
      await axios
        .post(
          `${serverUrl}/admin/block-user`,
          { user },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
          } else toast.error(res.data.message);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      console.log("error while blocking user", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex ">
        <AdminLayout />
        <div className="w-full flex flex-col items-center p-16">
          <div className="">
            <table className="my-12">
              <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Age</th>
                <th>Email Address</th>
                <th>Phone no.</th>
                <th>Action</th>
              </thead>
              <tbody>
                {users.map((user, i) => {
                  return (
                    <tr key={i} className="bg-[#BBE1FA] h-16 hover:bg-gray-100">
                      <td className="p-6">{user._id}</td>
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.age}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.phone}</td>
                      <td className="p-2">
                        <button
                          className="bg-red-500 px-2 m-1 rounded-md text-md text-white"
                          onClick={() => handleDelete(user)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-green-700 px-2 m-1 rounded-md text-md text-white"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-green-700 px-2 m-1 rounded-md text-md text-white"
                          onClick={() => {
                            handleBlock(user);
                          }}
                        >
                          Block
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              onClick={AddUser}
              className="bg-[#0F4C75] text-white px-4 py-1 rounded-lg self-end me-64"
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
