import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProfileSideBar({ user }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full md:w-3/12 md:mx-2">
        <div className="bg-white p-3 border-t-4 border-green-400">
          <div className="text-center my-2">
            <img
              className="h-16 w-16 rounded-full mx-auto"
              src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
              alt=""
            />
            <a href="#" className="text-main-color">
              {/* eslint-disable-next-line react/prop-types */}
              {user?.name}
            </a>
          </div>
          <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
            {/* eslint-disable-next-line react/prop-types */}
            {user?.name}
          </h1>
          <h3 className="text-gray-600 font-lg text-semibold leading-6">
            Owner at Her Company Inc.
          </h3>
          <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non
            deserunt
          </p>
          <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li className="flex items-center py-3">
              <span>Status</span>
              <span className="ml-auto">
                <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                  Active
                </span>
              </span>
            </li>
            <li className="flex items-center py-3">
              <span>Member since</span>
              <span className="ml-auto">Nov 07, 2016</span>
            </li>
          </ul>
        </div>
        <div className="my-4"></div>
        <div className="bg-white p-3 border-t-2 border-teal-500">
          <h1 className="mb-4 text-xl font-medium">Actions</h1>
          <div
            className="bg-gray-200 p-2 border-b border-gray-400 cursor-pointer hover:bg-white"
            onClick={() => {
              navigate("/orders", { state: { user } });
            }}
          >
            <span>Orders</span>
          </div>
          <div
            className="bg-gray-200 p-2 hover:bg-white border-b border-gray-400 cursor-pointer"
            onClick={() => {
              navigate("/password/change");
            }}
          >
            <span>Change password</span>
          </div>
          <div
            className="bg-gray-200 p-2 hover:bg-white cursor-pointer"
            onClick={() => {
              navigate("/wallet", { state: { user } });
            }}
          >
            <span>Wallet</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSideBar;
