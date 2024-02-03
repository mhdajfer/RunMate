// eslint-disable-next-line react/prop-types
function Pagination({ totalItems, dataPerPage, setCurrentPage, currentPage }) {
  const totalPages = [];

  for (let i = 1; i <= Math.ceil(totalItems / dataPerPage); i++) {
    totalPages.push(i);
  }

  return (
    <>
      <div aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <a
              href="#"
              onClick={() =>
                setCurrentPage(
                  `${
                    currentPage <= 1 ? currentPage : parseInt(currentPage) - 1
                  }`
                )
              }
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100"
            >
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </a>
          </li>

          {totalPages.map((page, i) => (
            <li key={i}>
              <a
                href="#"
                onClick={() => {
                  setCurrentPage(page);
                }}
                className={`flex items-center justify-center ${
                  currentPage === page ? "bg-gray-500" : "bg-white-600"
                } px-3 h-8 leading-tight rounded-lg border border-gray-300 `}
              >
                {page}
              </a>
            </li>
          ))}

          <li>
            <a
              href="#"
              onClick={() => {
                setCurrentPage(
                  `${
                    currentPage >= totalPages.length
                      ? currentPage
                      : parseInt(currentPage) + 1
                  }`
                );
              }}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Pagination;
