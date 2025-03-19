import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import serverUrl from "../../../serverURL";
import axios from "axios";

function Payment() {
  const [card, setCard] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const total = location.state?.total;
  const shipping = location.state?.shipping;
  const productIds = location.state?.productIds;
  const address1 = location.state?.address1;
  const name = location.state?.name;
  const state = location.state?.state;
  const zip = location.state?.zip;
  const phone = location.state?.phone;
  const subTotal = location.state?.subTotal;
  const quantity = location.state?.quantity;
  const couponId = location.state?.couponId;
  const token = Cookies.get("token");

  function handleCOD() {
    try {
      axios
        .post(
          `${serverUrl}/order/add`,
          {
            couponId,
            productIds,
            subTotal,
            shipping,
            total,
            name,
            address1,
            state,
            zip,
            phone,
            quantity,
            token,
            mode: "COD",
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success("You Order Placed.");
            setTimeout(() => {
              navigate("/home");
            }, 700);
          } else {
            toast.error(res.data.message);
            navigate("/cart");
          }
        });
    } catch (error) {
      toast.error("Error while checkout");
      console.log(error);
    }
  }

  async function handleOnlinePayment(amount) {
    try {
      //getting key
      const { data } = await axios.get(`${serverUrl}/order/getKey`, {
        withCredentials: true,
      });

      //create order
      const {
        data: {
          data: { id: orderId },
        },
      } = await axios.post(
        `${serverUrl}/order/create`,
        {
          amount,
          productIds,
          couponId,
          subTotal,
          shipping,
          total,
          name,
          address1,
          state,
          zip,
          phone,
          quantity,
          token,
          mode: "Online payment",
        },
        {
          withCredentials: true,
        }
      );
      var options = {
        key: data.key,
        amount: amount * 100,
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",

        order_id: orderId,
        handler: async function (response) {
          axios
            .post(
              `${serverUrl}/order/validatePayment`,
              { ...response },
              { withCredentials: true }
            )
            .then((res) => {
              if (res.data.success) {
                navigate("/home");
                toast.success("Your order is on move");
              }
            });
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        toast.error("payment failed");
        navigate("/cart");
      });
      rzp1.open();
    } catch (error) {
      console.log("error while processing payment", error);
    }
  }

  async function handleWalletPayment(amount) {
    try {
      axios
        .post(
          `${serverUrl}/wallet/deduct`,
          { amount, token },
          { withCredentials: true }
        )
        .then((res) => {
          if (!res.data.success) {
            return toast.error(res.data.message);
          } else if (res.data.success) {
            axios
              .post(
                `${serverUrl}/order/add-wallet`,
                {
                  couponId,
                  productIds,
                  subTotal,
                  shipping,
                  total,
                  name,
                  address1,
                  state,
                  zip,
                  phone,
                  quantity,
                  token,
                  mode: "Wallet",
                },
                { withCredentials: true }
              )
              .then((res) => {
                if (res.data.success) {
                  toast.success(res.data.message);
                  navigate("/home");
                } else {
                  toast.error(res.data.message);
                }
              });
          }
        });
    } catch (error) {
      console.log("error while processing payment via wallet", error);
    }
  }
  return (
    <>
      <section className="antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
        <div className="h-full">
          <div>
            <div className="relative px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
              <img
                className="rounded-t shadow-lg"
                src="https://apploye.com/blog/content/images/2022/07/payment-methods-for-freelancers.png"
                width="460"
                height="180"
                alt="Pay background"
              />
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto">
              <div className="bg-white px-8 pb-6 rounded-b shadow-lg">
                <div className="text-center mb-6 pt-4">
                  <h1 className="text-xl leading-snug text-gray-800 font-semibold mb-2">
                    Select Payment Method
                  </h1>
                </div>
                <div className="flex justify-center mb-6">
                  <div className="relative flex w-full p-1 bg-gray-50 rounded">
                    <span
                      className="absolute inset-0 m-1 pointer-events-none"
                      aria-hidden="true"
                    >
                      <span
                        className={`absolute inset-0 w-1/2 bg-white rounded border border-gray-200 shadow-sm transform transition duration-150 ease-in-out ${
                          card ? "translate-x-0" : "translate-x-full"
                        }`}
                      ></span>
                    </span>
                    <button
                      className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2"
                      onClick={() => setCard(true)}
                    >
                      Online Payment
                    </button>
                    <button
                      className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2"
                      onClick={() => setCard(false)}
                    >
                      Cash on Delivery
                    </button>
                  </div>
                </div>
                <div style={{ display: card ? "block" : "none" }}>
                  <div className="space-y-4">
                    <div>
                      <button
                        className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                        onClick={() => {
                          handleWalletPayment(total);
                        }}
                      >
                        Pay ₹ {total} via wallet
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="mb-4">
                      <button
                        className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                        onClick={() => {
                          handleOnlinePayment(total);
                        }}
                      >
                        Pay ₹ {total} via Razorpay
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 italic text-center">
                      Youl be charged $253, including $48 for VAT in Italy
                    </div>
                  </div>
                </div>
                <div style={{ display: !card ? "block" : "none" }}>
                  <div>
                    <div className="mb-4">
                      <button
                        className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full hover:bg-indigo-500 bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                        onClick={handleCOD}
                      >
                        Pay - ₹ {total}
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 italic text-center">
                      Youll be charged $253, including $48 for VAT if you are
                      outside India
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Payment;
