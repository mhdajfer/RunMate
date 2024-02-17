import { useEffect, useState } from "react";
import serverUrl from "../../server";
import toast from "react-hot-toast";
import axios from "axios";
import ProductCard from "../../Components/ProductCard";
import FilterBox from "../../Components/FilterBox";
import { useLocation } from "react-router-dom";
import Pagination from "../../Components/Pagination";

function Search() {
  const locaion = useLocation();
  const search = locaion.state?.search || "";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSortOptionVisible, setIsSortOptionVisible] = useState(false);
  let searchedProducts = filteredProducts.length
    ? filteredProducts.length === products.length
      ? products
      : filteredProducts.filter((product) => {
          if (
            product?.brand.toLowerCase().includes(search.trim().toLowerCase())
          )
            return product;
        })
    : products.filter((product) => {
        if (product?.brand.toLowerCase().includes(search.trim().toLowerCase()))
          return product;
      });

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const lastDataIndex = currentPage * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const productList = searchedProducts.slice(firstDataIndex, lastDataIndex);

  useEffect(() => {
    try {
      axios
        .get(`${serverUrl}/product`, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            setProducts(res.data.products);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log("error while searching", error);
    }
  }, []);

  console.log(currentPage);
  return (
    <>
      <div className="flex">
        <div className="ms-20">
          <FilterBox
            setFilteredProducts={setFilteredProducts}
            products={products}
          />
        </div>
        <div className="flex w-screen flex-wrap">
          <div className="w-full flex ">
            <div className="relative ms-auto me-48">
              <button
                className=" bg-gray-200 px-2 rounded-lg border border-teal-600"
                onClick={() => setIsSortOptionVisible(!isSortOptionVisible)}
              >
                Sort Price :
              </button>
              {isSortOptionVisible && (
                <div className="absolute top-4  left-12 border border-bg-teal-600 bg-white rounded-md">
                  <ul>
                    <li
                      className="cursor-pointer hover:bg-gray-200 px-2 whitespace-nowrap border-b border-bg-teal-600"
                      onClick={() => {
                        const sortedProducts = [...products].sort(
                          (a, b) => a.price - b.price
                        );

                        // Update the state variable 'products' with the sorted array
                        setProducts(sortedProducts);
                      }}
                    >
                      High to Low
                    </li>
                    <li
                      className="cursor-pointer hover:bg-gray-200 px-2 whitespace-nowrap"
                      onClick={() => {
                        const sortedProducts = [...products].sort(
                          (a, b) => b.price - a.price
                        );

                        // Update the state variable 'products' with the sorted array
                        setProducts(sortedProducts);
                      }}
                    >
                      Low - High
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="">
            <div className="flex flex-wrap  px-4 justify-center">
              {productList.length ? (
                productList.map((product, i) => {
                  return (
                    <div key={i}>
                      <ProductCard product={product} />
                    </div>
                  );
                })
              ) : (
                <div className="flex justify-center w-full mt-24">
                  {" "}
                  <h1>No Products!!!</h1>
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <Pagination
                totalItems={searchedProducts.length}
                dataPerPage={dataPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
