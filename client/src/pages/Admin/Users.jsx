import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import serverUrl from "../../server";
import DialogBox from "../../Components/DialogBox";

export default function Products() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isBlocked, setIsBlocked] = useState(Boolean);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [Oneuser, setOneUser] = useState("");

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
  }, [isBlocked, Oneuser]);

  function handleCancelDelete() {
    setIsDialogOpen(false);
    setOneUser(null);
  }

  function confirmDelete(user) {
    axios
      .get(`${serverUrl}/users/delete/${user._id}`)
      .then((res) => {
        if (res.data.success) {
          setIsDialogOpen(false);
          setOneUser(null);
          toast.success(res.data.message);
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleDelete(user) {
    setIsDialogOpen(true);
    setOneUser(user);
  }

  function handleEdit(user) {
    navigate("/admin/users/edit", { state: { user } });
  }

  const handleBlocks = async (user) => {
    setIsBlocked(!isBlocked);
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
      <div className="w-full flex flex-col items-center p-16">
        <div className="">
          <table className="my-12">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Age</th>
                <th>Email Address</th>
                <th>Phone no.</th>
                <th>Action</th>
              </tr>
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
                          handleBlocks(user);
                        }}
                      >
                        {user.isBlocked ? "UnBlock" : "Block"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed top-[20%] right-[25%]">
        {/* Dialog box */}
        {isDialogOpen && (
          <DialogBox
            data={Oneuser}
            onConfirmDelete={confirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </>
  );
}
