// eslint-disable-next-line react/prop-types
const ProgressBar = ({ progress }) => {
  return (
    <div className="flex w-full my-1 px-1">
      <div className={`w-full rounded-full`}>
        <div
          className={`${
            progress <= 25
              ? `bg-red-500`
              : progress <= 50
              ? `bg-orange-500`
              : progress <= 75
              ? `bg-teal-600`
              : `bg-green-600`
          } text-xs leading-none py-1 text-center rounded-full transition-all ease-in-out delay-100`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
