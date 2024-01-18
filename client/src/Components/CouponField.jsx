/* eslint-disable react/prop-types */
function CouponField({ coupon, setDiscount }) {
  return (
    <>
      <div className="mb-4 bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-center py-4 px-8 rounded-lg shadow-md relative">
        <h3 className=" mb-4">{coupon?.desc}</h3>
        <div className="flex items-center space-x-2 mb-6">
          <span
            id="cpnCode"
            className="border-dashed border text-white px-1 py-1 "
          >
            {coupon?.code}
          </span>
          <span
            id="cpnBtn"
            onClick={() => {
              setDiscount(coupon);
            }}
            className="border border-white hover:text-black bg-white text-purple-600 px-1 py-1 rounded-lg cursor-pointer"
          >
            Tap to Apply
          </span>
        </div>
        <p className="text-sm">Valid Till: 20Dec, 2024</p>

        <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
        <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
      </div>
    </>
  );
}

export default CouponField;
