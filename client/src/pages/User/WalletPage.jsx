import ProfileSideBar from "../../Components/Layout/ProfileSideBar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ServerUrl from "../../server";
import axios from "axios";

function WalletPage() {
  const location = useLocation();
  const user = location?.state?.user;
  const [showAddMoneyBox, setShowAddMoneyBox] = useState(false);
  const [addWallet, setAddWallet] = useState();
  const [walletBalance, setWalletBalance] = useState(0);

  console.log(user);

  useEffect(() => {
    try {
      axios
        .post(
          `${ServerUrl}/wallet/balance`,
          { userId: user?._id },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            setWalletBalance(res.data.data);
          }
        });
    } catch (error) {
      console.log("error while loading wallet", error);
    }
  }, [user?._id, showAddMoneyBox]);

  function handleAddMoney() {
    if (addWallet <= 0) return toast.error("Give proper value");
    else if (addWallet > 10000)
      return toast.error("Cannot add more than 10000");

    try {
      axios
        .post(
          `${ServerUrl}/wallet/add`,
          { addWallet, userId: user?._id },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            setShowAddMoneyBox(false);
            setAddWallet(0);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log("error while adding money", error);
    }
  }
  return (
    <>
      <div className="container mx-auto my-5 p-5">
        <div className="flex space-x-4">
          {/* left body */}

          <ProfileSideBar user={user} />

          {/* main body */}
          <div className="relative bg-gray-50 p-6 flex justify-between rounded-lg h-fit border-md mt-4 md:mt-6 w-[64rem]">
            <h3 className="text-xl font-semibold leading-6 text-gray-800">
              {" "}
              Balance : <span className="font-medium">{walletBalance}</span>
            </h3>
            <button
              type="button"
              onClick={() => {
                setShowAddMoneyBox(!showAddMoneyBox);
              }}
              className=" text-white bg-blue-400 hover:bg-blue-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-1 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add money
            </button>
            {showAddMoneyBox && (
              <div className="w-64  absolute right-2 mt-8 bg-gray-50 rounded-lg border-teal-500 border p-4">
                <label htmlFor="wallet">Add money</label>
                <input
                  type="text"
                  name="lastname"
                  className="px-4 py-1 h-8 border rounded-lg"
                  defaultValue={addWallet}
                  onChange={(e) => {
                    setAddWallet(e.target.value);
                  }}
                ></input>
                <button
                  className="bg-blue-500 px-3 rounded-lg font-bold mx-auto flex mt-8"
                  onClick={handleAddMoney}
                >
                  ADD
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default WalletPage;
