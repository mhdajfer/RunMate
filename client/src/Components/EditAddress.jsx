// eslint-disable-next-line react/prop-types
function EditAddress({ address, cancelFn, updateAddress, setAddress }) {
  function handleOnchange(e) {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  return (
    <>
      <form
        className=" mx-auto flex flex-col bg-gray-200 p-20 rounded-xl shadow-lg"
        onSubmit={(e) => {
          updateAddress(e);
        }}
      >
        <div className="flex space-x-4">
          <div className="mb-5">
            <label
              htmlFor="address1"
              className="block mb-2 text-sm font-medium "
            >
              Your Address
            </label>
            <input
              type="text"
              id="address1"
              name="address1"
              // eslint-disable-next-line react/prop-types
              defaultValue={address.address1}
              onChange={(e) => {
                handleOnchange(e);
              }}
              className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg   block w-full p-2.5  "
              placeholder="Address"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="city" className="block mb-2 text-sm font-medium ">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              // eslint-disable-next-line react/prop-types
              defaultValue={address.city}
              onChange={(e) => {
                handleOnchange(e);
              }}
              className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg   block w-full p-2.5  "
              placeholder="City"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mb-5">
            <label htmlFor="state" className="block mb-2 text-sm font-medium ">
              State
            </label>
            <select
              type="text"
              name="state"
              id="state"
              // eslint-disable-next-line react/prop-types
              defaultValue={address.state}
              onChange={(e) => {
                handleOnchange(e);
              }}
              className="shadow-sm w-full bg-gray-50 rounded-md border border-gray-300 px-6 py-2 text-sm  outline-none focus:z-10  "
            >
              <option value="">State</option>
              <option value="kerala"> Kerala</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="pincode"
              className="block mb-2 text-sm font-medium "
            >
              ZIP Code
            </label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              // eslint-disable-next-line react/prop-types
              defaultValue={address.pincode}
              onChange={(e) => {
                handleOnchange(e);
              }}
              className="shadow-sm bg-gray-50 border border-gray-300  text-sm rounded-lg   block w-full p-2.5  "
              placeholder="ZIPCODE"
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Update Address
        </button>
        <button
          onClick={() => {
            cancelFn(false);
          }}
          type="submit"
          className="hover:bg-gray-300 rounded-lg text-md shadow-md border-2 mt-2 border-gray-300 px-5 py-2.5 text-center "
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default EditAddress;
