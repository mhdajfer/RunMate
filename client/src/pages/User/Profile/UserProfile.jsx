import { useEffect, useState } from "react";
import axios from "axios";
import serverURL from "../../../../serverURL";
import toast from "react-hot-toast";
import ProfileSideBar from "../../../Components/Layout/ProfileSideBar";
import DialogBox from "../../../Components/DialogBox";
import EditAddress from "../../../Components/EditAddress";
function UserProfile() {
  const [user, setUser] = useState({});
  const userId = user._id;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addressUpdateBoxOpen, setAddressUpdateBoxOpen] = useState(false);
  const [addressForDeleteOrUpdate, setAddressForDeleteOrUpdate] = useState({
    address1: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [address, setAddress] = useState({
    address1: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [savedAddress, setSavedAddress] = useState([]);
  const [newUser, setNewUser] = useState({
    id: userId,
    name: "",
    lastname: "",
    phone: "",
    age: "",
    email: "",
  });

  useEffect(() => {
    try {
      axios
        .get(`${serverURL}/getOneUser`, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            const [user] = res.data.user;
            setUser(user);
            setSavedAddress(user.addresses);
          }
        });
    } catch (error) {
      console.log("error file fetching data", error);
    }
  }, [savedAddress.length]);

  function handleUpdateAddress(e, address) {
    e.preventDefault();
    try {
      axios
        .post(`${serverURL}/address/edit`, address, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            setAddressUpdateBoxOpen(false);
            const updatedAddresses = savedAddress.map((addr) => {
              if (addr._id === addressForDeleteOrUpdate._id)
                return (addr = address);
              else return addr;
            });
            setSavedAddress(updatedAddresses);
            setAddressForDeleteOrUpdate(null);
          } else {
            toast.success(res.data.message);
            setAddressUpdateBoxOpen(false);
          }
        });
    } catch (error) {
      console.log("error updating address", error);
      return toast.error(error.message);
    }
  }

  function handleDeleteAddress(address) {
    try {
      axios
        .post(
          `${serverURL}/user/address/delete`,
          { address, userId },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            setIsDialogOpen(false);
            setAddress(null);
            const savedAddresses = savedAddress.filter((addr) => {
              if (addr._id != address._id) return addr;
            });
            setSavedAddress(savedAddresses);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log("error deleting address", error);
    }
  }

  function CancelDelete() {
    setIsDialogOpen(false);
  }

  function handleAddAddress(address) {
    if (
      !address.address1.length ||
      !address.city.length ||
      !address.state.length ||
      !address.pincode.length
    )
      return toast.error("Fill all Address fields");
    try {
      address.id = userId;
      axios
        .post(`${serverURL}/user/address/add`, address, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            setAddress({
              address1: "",
              city: "",
              state: "",
              pincode: "",
            });
            setSavedAddress((prev) => ({
              ...prev,
              address,
            }));
          } else {
            toast.error(res.data.message);
            setTimeout(() => {
              window.location.reload();
            }, 800);
          }
        });
    } catch (error) {
      console.log("error while adding address", error);
    }
  }

  function handleUpdate(user) {
    !user.name ? delete user.name : null;
    !user.lastname ? delete user.lastname : null;
    !user.email ? delete user.email : null;
    !user.phone ? delete user.phone : null;
    !user.age ? delete user.age : null;
    user.id = userId;
    console.log(user);
    try {
      axios
        .post(`${serverURL}/user/edit`, user, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log("error while updating data", error);
    }
  }

  return (
    <>
      <div className="h-fit">
        <div className="container mx-auto my-5 p-5">
          <div className=" md:flex no-wrap md:-mx-2 ">
            {/* left side profile */}
            <ProfileSideBar user={user} />

            {/* main body */}
            <div className="h-full md:w-9/12 mx-2">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      <input
                        type="text"
                        name="name"
                        className="px-4 py-1 h-8 border  rounded-lg"
                        defaultValue={user.name}
                        onChange={(e) =>
                          setNewUser((prevUser) => ({
                            ...prevUser,
                            [e.target.name]: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Last Name</div>
                      <input
                        type="text"
                        name="lastname"
                        className="px-4 py-1 h-8 border  rounded-lg"
                        defaultValue={user.lastname}
                        onChange={(e) =>
                          setNewUser((prevUser) => ({
                            ...prevUser,
                            [e.target.name]: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <input
                        type="text"
                        name="phone"
                        className="px-4 py-1 h-8 border  rounded-lg"
                        defaultValue={user.phone}
                        onChange={(e) =>
                          setNewUser((prevUser) => ({
                            ...prevUser,
                            [e.target.name]: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Age</div>
                      <input
                        type="text"
                        name="age"
                        className="px-4 py-1 h-8 border  rounded-lg"
                        defaultValue={user.age}
                        onChange={(e) =>
                          setNewUser((prevUser) => ({
                            ...prevUser,
                            [e.target.name]: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <input
                        type="text"
                        name="email"
                        className="px-4 py-1 h-8 border  rounded-lg"
                        defaultValue={user.email}
                        onChange={(e) =>
                          setNewUser((prevUser) => ({
                            ...prevUser,
                            [e.target.name]: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Year of Born
                      </div>
                      <div className="px-4 py-2">{2023 - user.age}</div>
                    </div>
                  </div>
                </div>
                <button
                  className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                  onClick={() => {
                    handleUpdate(newUser);
                  }}
                >
                  Update Information
                </button>
              </div>

              <div className="my-4"></div>

              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Address</span>
                  </div>
                  <div>
                    <div>
                      <label
                        htmlFor="address1"
                        className="mt-4 mb-2 block text-sm font-medium"
                      >
                        Address
                      </label>
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative flex-shrink-0 sm:w-7/12">
                          <input
                            type="text"
                            id="address1"
                            name="address1"
                            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Street Address"
                            value={address?.address1}
                            onChange={(e) => {
                              setAddress((prevAddress) => ({
                                ...prevAddress,
                                [e.target.name]: e.target.value,
                              }));
                            }}
                          />
                          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <img
                              className="h-4 w-4 object-contain"
                              src="https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/india-flag-icon.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="city"
                          className="mt-4 mb-2 block text-sm font-medium"
                        >
                          City
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="city"
                            name="city"
                            className="rounded-md  border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none  focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Your City"
                            value={address?.city}
                            onChange={(e) => {
                              setAddress((prevAddress) => ({
                                ...prevAddress,
                                [e.target.name]: e.target.value,
                              }));
                            }}
                          />
                        </div>
                        <label
                          htmlFor="state"
                          className="mt-4 mb-2 block text-sm font-medium"
                        >
                          State
                        </label>
                        <div className="relative">
                          <select
                            type="text"
                            name="state"
                            id="state"
                            value={address?.state}
                            onChange={(e) => {
                              setAddress((prevAddress) => ({
                                ...prevAddress,
                                [e.target.name]: e.target.value,
                              }));
                            }}
                            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option value="">State</option>
                            <option value="kerala"> Kerala</option>
                            <option value="Delhi">Delhi</option>
                          </select>
                        </div>
                        <label
                          htmlFor="pincode"
                          className="mt-4 mb-2 block text-sm font-medium"
                        >
                          Zip code
                        </label>
                        <div>
                          <input
                            type="Number"
                            name="pincode"
                            id="pincode"
                            value={address?.pincode}
                            onChange={(e) => {
                              setAddress((prevAddress) => ({
                                ...prevAddress,
                                [e.target.name]: e.target.value,
                              }));
                            }}
                            className="rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none  focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="ZIPCODE"
                          />
                        </div>
                        <button
                          type="button"
                          className="my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          onClick={() => {
                            handleAddAddress(address);
                          }}
                        >
                          Add Address
                        </button>
                      </div>
                    </div>
                    {/* saved address display */}
                    <h3 className="mt-4 mb-2">Saved Addresses</h3>
                    {!savedAddress.length ? (
                      <h1 className="text-center mx-auto">
                        Not saved any addresses yet!!!
                      </h1>
                    ) : (
                      <div>
                        <div className="grid grid-cols-5 h-12 border-b border-teal-600 text-center items-center">
                          <div className="">
                            <span className="">Address</span>
                          </div>
                          <div className="">
                            <span className="">City</span>
                          </div>
                          <div className="">
                            <span className="">State</span>
                          </div>
                          <div className="">
                            <span className="">Zip Code</span>
                          </div>
                          <div className="">
                            <span className="">Actions</span>
                          </div>
                        </div>
                        <div>
                          {savedAddress.map((add, i) => (
                            <div
                              key={i}
                              className="grid grid-cols-5 h-12 text-center items-center"
                            >
                              <div className="relative">
                                <span className="">
                                  <span className="absolute left-0 me-1">
                                    {i + 1}
                                  </span>
                                  {"  "}
                                  {add?.address1}
                                </span>
                              </div>
                              <div className="">
                                <span className="">{add?.city}</span>
                              </div>
                              <div className="">
                                <span className="">{add?.state}</span>
                              </div>
                              <div className="">
                                <span className="">{add?.pincode}</span>
                              </div>
                              <div className="flex items-center justify-evenly">
                                <span
                                  onClick={() => {
                                    setAddressUpdateBoxOpen(true);
                                    setAddressForDeleteOrUpdate(add);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    className="hover:fill-red-600 cursor-pointer"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"></path>
                                  </svg>
                                </span>
                                <span
                                  className=" cursor-pointer "
                                  onClick={() => {
                                    setAddressForDeleteOrUpdate(add);
                                    setIsDialogOpen(true);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 hover:fill-red-600"
                                    viewBox="0 0 329.26933 329"
                                  >
                                    <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-[25%] right-[35%]  ">
        {/* Address Update Box */}
        {addressUpdateBoxOpen && (
          <EditAddress
            address={addressForDeleteOrUpdate}
            cancelFn={setAddressUpdateBoxOpen}
            updateAddress={handleUpdateAddress}
            setAddress={setAddressForDeleteOrUpdate}
          />
        )}
      </div>
      <div className="fixed top-[20%] right-[25%]">
        {/* Dialog box */}
        {isDialogOpen && (
          <DialogBox
            data={addressForDeleteOrUpdate}
            onConfirmDelete={handleDeleteAddress}
            onCancel={CancelDelete}
          />
        )}
      </div>
    </>
  );
}

export default UserProfile;
