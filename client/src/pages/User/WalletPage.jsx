import ProfileSideBar from "../../Components/Layout/ProfileSideBar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ServerUrl from "../../server";
import axios from "axios";

function WalletPage() {
  const location = useLocation();
  const user = location?.state?.user;
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
  }, [user?._id]);


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
            
          </div>
        </div>
      </div>
    </>
  );
}

export default WalletPage;
