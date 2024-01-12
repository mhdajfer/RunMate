// eslint-disable-next-line react/prop-types
function DialogBox({ data, onConfirmDelete, onCancel }) {
  return (
    <div className="bg-white rounded-lg md:max-w-md border mx-auto p-4 z-50">
      <div className="md:flex items-center">
        <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="64"
            height="64"
            viewBox="0 0 64 64"
          >
            <radialGradient
              id="SrYuS0MYDGH9m0SRC6_noa_Pvblw74eluzR_gr1"
              cx="31.417"
              cy="-1098.083"
              r="28.77"
              gradientTransform="translate(0 1128)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#f4e09d"></stop>
              <stop offset=".226" stopColor="#f8e8b5"></stop>
              <stop offset=".513" stopColor="#fcf0cd"></stop>
              <stop offset=".778" stopColor="#fef4dc"></stop>
              <stop offset="1" stopColor="#fff6e1"></stop>
            </radialGradient>
            <path
              fill="url(#SrYuS0MYDGH9m0SRC6_noa_Pvblw74eluzR_gr1)"
              d="M7.5,64L7.5,64c1.933,0,3.5-1.567,3.5-3.5l0,0c0-1.933-1.567-3.5-3.5-3.5l0,0 C5.567,57,4,58.567,4,60.5l0,0C4,62.433,5.567,64,7.5,64z"
            ></path>
            <radialGradient
              id="SrYuS0MYDGH9m0SRC6_nob_Pvblw74eluzR_gr2"
              cx="31.5"
              cy="-1096"
              r="31.751"
              gradientTransform="translate(0 1128)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#f4e09d"></stop>
              <stop offset=".226" stopColor="#f8e8b5"></stop>
              <stop offset=".513" stopColor="#fcf0cd"></stop>
              <stop offset=".778" stopColor="#fef4dc"></stop>
              <stop offset="1" stopColor="#fff6e1"></stop>
            </radialGradient>
            <path
              fill="url(#SrYuS0MYDGH9m0SRC6_nob_Pvblw74eluzR_gr2)"
              d="M62,20.5L62,20.5c0-2.485-2.015-4.5-4.5-4.5H49c-2.209,0-4-1.791-4-4l0,0 c0-2.209,1.791-4,4-4h2c2.209,0,4-1.791,4-4l0,0c0-2.209-1.791-4-4-4H20c-2.209,0-4,1.791-4,4l0,0c0,2.209,1.791,4,4,4h2 c1.657,0,3,1.343,3,3l0,0c0,1.657-1.343,3-3,3H7.5C5.567,14,4,15.567,4,17.5l0,0C4,19.433,5.567,21,7.5,21H9c1.657,0,3,1.343,3,3 l0,0c0,1.657-1.343,3-3,3H5c-2.761,0-5,2.239-5,5l0,0c0,2.761,2.239,5,5,5h2.5c1.933,0,3.5,1.567,3.5,3.5l0,0 c0,1.933-1.567,3.5-3.5,3.5H6c-2.209,0-4,1.791-4,4l0,0c0,2.209,1.791,4,4,4h11.5c1.381,0,2.5,1.119,2.5,2.5l0,0 c0,1.381-1.119,2.5-2.5,2.5l0,0c-1.933,0-3.5,1.567-3.5,3.5l0,0c0,1.933,1.567,3.5,3.5,3.5h35c1.933,0,3.5-1.567,3.5-3.5l0,0 c0-1.933-1.567-3.5-3.5-3.5H52c-1.105,0-7-0.895-7-2l0,0c0-1.105,0.895-2,2-2h12c2.209,0,4-1.791,4-4l0,0c0-2.209-1.791-4-4-4h-2.5 c-1.381,0-2.5-1.119-2.5-2.5l0,0c0-1.381,1.119-2.5,2.5-2.5H57c2.209,0,4-1.791,4-4l0,0c0-2.209-1.791-4-4-4h-4.5 c-1.933,0-3.5-1.567-3.5-3.5l0,0c0-1.933,1.567-3.5,3.5-3.5h5C59.985,25,62,22.985,62,20.5z"
            ></path>
            <g>
              <linearGradient
                id="SrYuS0MYDGH9m0SRC6_noc_Pvblw74eluzR_gr3"
                x1="32"
                x2="32"
                y1="53"
                y2="8"
                gradientTransform="matrix(1 0 0 -1 0 64)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#f4e09d"></stop>
                <stop offset=".226" stopColor="#f8e8b5"></stop>
                <stop offset=".513" stopColor="#fcf0cd"></stop>
                <stop offset=".778" stopColor="#fef4dc"></stop>
                <stop offset="1" stopColor="#fff6e1"></stop>
              </linearGradient>
              <path
                fill="url(#SrYuS0MYDGH9m0SRC6_noc_Pvblw74eluzR_gr3)"
                d="M15.211,11h33.578c3.024,0,5.356,2.663,4.956,5.661l-4.667,35 C48.747,54.145,46.628,56,44.122,56H19.878c-2.506,0-4.625-1.855-4.956-4.339l-4.667-35C9.855,13.663,12.187,11,15.211,11z"
              ></path>
              <linearGradient
                id="SrYuS0MYDGH9m0SRC6_nod_Pvblw74eluzR_gr4"
                x1="32"
                x2="32"
                y1="46"
                y2="56"
                gradientTransform="matrix(1 0 0 -1 0 64)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#f4e09d"></stop>
                <stop offset=".226" stopColor="#f8e8b5"></stop>
                <stop offset=".513" stopColor="#fcf0cd"></stop>
                <stop offset=".778" stopColor="#fef4dc"></stop>
                <stop offset="1" stopColor="#fff6e1"></stop>
              </linearGradient>
              <path
                fill="url(#SrYuS0MYDGH9m0SRC6_nod_Pvblw74eluzR_gr4)"
                d="M53,18H11c-1.105,0-2-0.895-2-2v-6c0-1.105,0.895-2,2-2h42c1.105,0,2,0.895,2,2v6 C55,17.105,54.105,18,53,18z"
              ></path>
            </g>
            <g>
              <linearGradient
                id="SrYuS0MYDGH9m0SRC6_noe_Pvblw74eluzR_gr5"
                x1="52"
                x2="52"
                y1="-1064"
                y2="-1088"
                gradientTransform="translate(0 1128)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#f4e09d"></stop>
                <stop offset=".226" stopColor="#f8e8b5"></stop>
                <stop offset=".513" stopColor="#fcf0cd"></stop>
                <stop offset=".778" stopColor="#fef4dc"></stop>
                <stop offset="1" stopColor="#fff6e1"></stop>
              </linearGradient>
              <path
                fill="url(#SrYuS0MYDGH9m0SRC6_noe_Pvblw74eluzR_gr5)"
                d="M52,40c-6.627,0-12,5.373-12,12s5.373,12,12,12s12-5.373,12-12S58.627,40,52,40z"
              ></path>
              <path
                fill="#fff"
                d="M57.417,49.412l-8.005,8.005c-0.778,0.778-2.051,0.778-2.828,0l0,0 c-0.778-0.778-0.778-2.051,0-2.828l8.005-8.005c0.778-0.778,2.051-0.778,2.828,0l0,0C58.194,47.361,58.194,48.634,57.417,49.412z"
              ></path>
              <path
                fill="#fff"
                d="M46.583,49.412l8.005,8.005c0.778,0.778,2.051,0.778,2.828,0l0,0c0.778-0.778,0.778-2.051,0-2.828 l-8.005-8.005c-0.778-0.778-2.051-0.778-2.828,0l0,0C45.806,47.361,45.806,48.634,46.583,49.412z"
              ></path>
            </g>
          </svg>
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
          <p className="font-bold">Delete your account</p>
          <p className="text-sm text-gray-700 mt-1">
            You will lose all of your data by deleting. This action cannot be
            undone.
          </p>
        </div>
      </div>
      <div className="text-center md:text-right mt-4 md:flex md:justify-end">
        <button
          className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
          onClick={() => onConfirmDelete(data)}
        >
          Delete
        </button>
        <button
          className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DialogBox;
