import { useState } from "react";
import { useLocation } from "react-router-dom";

function Payment() {
  const [card, setCard] = useState(true);
  const location = useLocation();
  const total = location.state?.total;
  console.log(total);
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
                      Pay With Card
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
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="card-nr"
                      >
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="card-nr"
                        className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="text"
                        placeholder="1234 1234 1234 1234"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="mb-4">
                      <button className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">
                        Pay $253.00
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
                      <button className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full hover:bg-indigo-500 bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">
                        Pay - $253.00
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
