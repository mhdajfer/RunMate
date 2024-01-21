import serverUrl from "../../server";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CouponField from "../../Components/couponField";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState();
  const [phone, setPhone] = useState();
  const [savedAddress, setSavedAddress] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  // for the coupon field
  const [couponList, setCouponList] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState();
  //
  let cartItems = [];
  cartItems = location.state?.cartItems;
  const productIds = cartItems.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));
  const productNames = cartItems.map((item) => item.productName);
  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const shipping = Math.floor((subTotal * 3) / 100);
  let total = Math.floor(shipping + subTotal);
  const discountedPrice = Math.floor((total * discount) / 100);
  total = total - discountedPrice;

  useEffect(() => {
    try {
      axios.get(`${serverUrl}/coupon/getCoupons`).then((res) => {
        if (res.data.success) {
          setCouponList(res.data.data);
        }
      });
      axios
        .post(`${serverUrl}/getAllAddress`, {}, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            setSavedAddress(res.data.data);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log("error while loading saved address", error);
    }
  }, []);

  function handleDiscount(coupon) {
    setDiscount(coupon?.discount);
    setSelectedCoupon(coupon);
  }

  function handleSavedAddress(e, address) {
    setAddress1(address.address1);
    setCity(address.city);
    setState(address.state);
    setZip(address.pincode);
    setDropdownVisible(false);
  }

  function handleCheckout() {
    if (!name || !address1 || !state || !zip || !phone)
      return toast.error("Please fill all fields");

    navigate("/user/payment", {
      state: {
        couponId: selectedCoupon?._id,
        productIds,
        productNames,
        subTotal,
        shipping,
        total,
        name,
        address1,
        state,
        zip,
        phone,
        quantity: cartItems?.quantity,
      },
    });
  }
  return (
    <>
      <div className="flex flex-col items-center py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary {cartItems.image}</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border border-teal-600 bg-white px-2 py-4 sm:px-6">
            {cartItems.map((item, i) => (
              <div
                key={i}
                className="flex flex-col rounded-lg bg-white sm:flex-row"
              >
                <img
                  className="m-2 h-24 w-28 rounded-md border object-contain"
                  src={serverUrl + "/" + item.image}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.productName}</span>
                  <span className="float-right text-gray-400">
                    Qty {item.quantity}
                  </span>
                  <p className="text-lg font-bold">
                    ₹ {item.quantity * item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-lg font-medium">Coupons</p>
          <div className="mt-8 rounded-lg border border-teal-600 bg-white px-2 py-4 sm:px-6">
            <div className="container mx-auto">
              {couponList.map((coupon, i) => (
                <CouponField
                  key={i}
                  coupon={coupon}
                  setDiscount={handleDiscount}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Shipping Details</p>
          <p className="text-gray-400">
            Place your order by providing your shipping details.
          </p>
          <div className="">
            <label
              htmlFor="name"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Full name
            </label>
            <div className="relative mb-4">
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your name here..."
                value={name}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"></div>
            </div>
            <label className="">Saved Address</label>
            <div>
              {/* Saved Addresses */}

              <button
                id="dropdownCheckboxButton"
                onClick={() => {
                  setDropdownVisible(!isDropdownVisible);
                }}
                className="text-white justify-center mt-3 w-[30rem] bg-blue-600  hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
                type="button"
              >
                Select from Saved Address{" "}
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

              {isDropdownVisible && (
                <div
                  id="dropdownDefaultCheckbox"
                  className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow  dark:divide-gray-600"
                >
                  <ul
                    className=" space-y-3 text-sm text-gray-700 dark:text-gray-200 cursor-pointer"
                    aria-labelledby="dropdownCheckboxButton"
                  >
                    {savedAddress.map((address, i) => (
                      <li
                        key={i}
                        className="hover:bg-gray-50 p-3"
                        onClick={(e) => {
                          handleSavedAddress(e, address);
                        }}
                      >
                        <span className="ms-2 text-sm font-medium text-black ">
                          {i + 1}
                          &nbsp;address:{address.address1}, state:{" "}
                          {address.state}, city: {address.city}, pincode:{" "}
                          {address.pincode}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative my-6 flex items-center">
              <span className="text-gray-400 me-2">or</span>
              <hr className="w-full" />
            </div>

            <label
              htmlFor="street-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Address 1
            </label>

            <div className="relative">
              <input
                type="text"
                id="street-address"
                name="street-address"
                onChange={(e) => {
                  setAddress1(e.target.value);
                }}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Street Address"
                value={address1}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <img
                  className="h-4 w-4 object-contain"
                  src="https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/india-flag-icon.png"
                  alt=""
                />
              </div>
            </div>
            <label
              htmlFor="street-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              State
            </label>
            <div className="relative">
              <select
                type="text"
                name="state"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">State</option>
                <option value="kerala"> Kerala</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
            <div className="flex space-x-12">
              <div>
                <label
                  htmlFor="city"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  City
                </label>
                <div>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    className="rounded-md  border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none  focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="City"
                    value={city}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Zip code
                </label>
                <div>
                  <input
                    type="number"
                    name="zip"
                    id="zip"
                    onChange={(e) => {
                      setZip(e.target.value);
                    }}
                    className="rounded-md  border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none  focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="ZIPCODE"
                    value={zip}
                  />
                </div>
              </div>
            </div>
            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Phone Number
            </label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <input
                  type="number"
                  id="card-no"
                  name="card-no"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xx"
                  value={phone}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">₹ {subTotal}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">₹ {shipping}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Coupon discount
                </p>
                <p className="font-semibold text-gray-900">
                  - ₹ {discountedPrice}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">₹ {total}</p>
            </div>
          </div>
          <button
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            onClick={handleCheckout}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkout;
