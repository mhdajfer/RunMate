import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import serverUrl from "../../server";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  // const [quantity, setQuantity] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("useEffect is runing");
    try {
      axios
        .post(`${serverUrl}/cart/get`, {}, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            setCartItems(res.data.data);
          }
        });
    } catch (error) {
      toast.error("Error while loading Cart");
      console.log(error);
    }
  }, []);

  function handleRemove(item) {
    try {
      // updating state locally to relect in i
      const updatedCart = cartItems.filter(
        (cartItem) => cartItem._id !== item._id
      );
      setCartItems(updatedCart);
      axios
        .post(
          `${serverUrl}/cart/remove`,
          { item: item },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
          } else if (!res.data.success) {
            // If the server request fails, revert the local update
            setCartItems(cartItems);
          }
        });
    } catch (error) {
      toast.error("error while removing");
      console.log(error);
    }
  }

  function handleQuantityChange(e, item) {
    const newQuantity = parseInt(e.target.value);

    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem._id === item._id) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });

    setCartItems(updatedCart);
  }

  function handleSubmit(cartItems) {
    cartItems.length
      ? navigate("/user/checkout", { state: { cartItems } })
      : toast.error("Add items to cart");
  }

  return (
    <>
      <div className="w-3/4  mx-auto bg-white px-10 py-10">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          <h2 className="font-semibold text-2xl">{cartItems.length}</h2>
        </div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
            Product Details
          </h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
            Quantity
          </h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
            Price
          </h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
            Total
          </h3>
        </div>
        {!cartItems.length ? (
          <div>Your Cart is Empty</div>
        ) : (
          cartItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
            >
              <div className="flex w-2/5">
                <div className="w-20">
                  <img
                    className="h-24 object-contain"
                    src={serverUrl + "/" + item.image}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.productName}</span>
                  <span className="text-red-500 text-xs">{item._id}</span>
                  <a
                    href="#"
                    className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                    onClick={() => {
                      handleRemove(item);
                    }}
                  >
                    Remove
                  </a>
                </div>
              </div>
              {/* <div className="flex justify-center w-1/5">
                <form className="max-w-xs mx-auto">
                  <div className="relative flex items-center">
                    <button
                      type="button"
                      id="decrement-button"
                      data-input-counter-decrement="counter-input"
                      className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100"
                    >
                      <svg
                        className="w-2.5 h-2.5 text-gray-900 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>

                    <input
                      type="text"
                      id="counter-input"
                      data-input-counter
                      className="flex-shrink-0 text-gray-900  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                      placeholder=""
                      value={item.quantity}
                      required
                    />
                    <button
                      type="button"
                      id="increment-button"
                      data-input-counter-increment="counter-input"
                      className="flex-shrink-0 bg-gray-100    hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100"
                    >
                      <svg
                        className="w-2.5 h-2.5 text-gray-900 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div> */}
              <div className="w-1/5 text-center">
                <select
                  className="border rounded-md"
                  name="qty"
                  id="qty"
                  defaultValue={item.quantity}
                  onChange={(e) => {
                    handleQuantityChange(e, item);
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">
                ₹ {item.price}
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                ₹ {item.price * item.quantity}
              </span>
            </div>
          ))
        )}

        <div className="flex justify-between items-center mt-10">
          <a
            className="flex font-semibold text-indigo-600 text-sm cursor-pointer"
            onClick={() => {
              navigate("/user/home");
            }}
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </a>
          <button
            type="button"
            className="focus:outline-none text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
            onClick={() => {
              handleSubmit(cartItems);
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
