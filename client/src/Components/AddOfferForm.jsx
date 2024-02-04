import { useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
function AddOfferForm({ canceloffer, product, ApplyOffer }) {
  const [discount, setDiscount] = useState(undefined);

  function handleSubmit(e) {
    e.preventDefault();
    ApplyOffer(product, discount);
  }
  return (
    <>
      <form
        className="bg-white text-black absolute shadow-md p-2 rounded-md border z-10"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="offer">Discount in %</label>
          <input
            type="number"
            value={discount === undefined ? "" : discount}
            onChange={(e) => {
              if (parseInt(e.target.value) >= 100)
                return toast.error("Enter a discount below 100");
              setDiscount(parseInt(e.target.value));
            }}
            className="border m-1 border-teal-600 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-[#0F4C75] px-2 rounded-md text-white"
        >
          Apply
        </button>
        <a
          className="bg-red-500 px-2 m-1 rounded-md text-md text-white cursor-pointer"
          onClick={() => canceloffer()}
        >
          {" "}
          Cancel
        </a>
      </form>
    </>
  );
}

export default AddOfferForm;
