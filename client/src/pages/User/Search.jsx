import { useEffect, useState } from "react";
import serverUrl from "../../server";
import toast from "react-hot-toast";
import axios from "axios";
import ProductCard from "../../Components/ProductCard";
import FilterBox from "../../Components/FilterBox";
import { useLocation } from "react-router-dom";

function Search() {
  const locaion = useLocation();
  const search = locaion.state?.search;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  let searchedProducts = filteredProducts.length
    ? filteredProducts.filter((product) => {
        if (product?.brand.toLowerCase().includes(search.trim().toLowerCase()))
          return product;
      })
    : products.filter((product) => {
        if (product?.brand.toLowerCase().includes(search.trim().toLowerCase()))
          return product;
      });

  console.log("filtered", filteredProducts);
  console.log("searched", searchedProducts);

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

  return (
    <>
      <div className="flex">
        <div className="ms-20">
          <FilterBox
            setFilteredProducts={setFilteredProducts}
            products={searchedProducts}
          />
        </div>
        <div className="flex w-screen flex-wrap">
          {searchedProducts.map((product, i) => {
            return (
              <div key={i}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Search;

// products
//             .filter((product) => {
//               if (search.trim() === "") {
//                 return product;
//               } else if (
//                 product?.brand
//                   .toLowerCase()
//                   .includes(search.trim().toLowerCase())
//               ) {
//                 return product;
//               }
//             })
//             .map((product, i) => {
//               return (
//                 <div key={i}>
//                   <ProductCard product={product} />
//                 </div>
//               );
//             })
