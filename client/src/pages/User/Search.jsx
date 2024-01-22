import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import serverUrl from "../../server";
import toast from "react-hot-toast";
import axios from "axios";
import ProductCard from "../../Components/ProductCard";
import FilterBox from "../../Components/FilterBox";

function Search() {
  const location = useLocation();
  const search = location?.state?.search;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${serverUrl}/product`).then((res) => {
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
          <FilterBox />
        </div>
        <div className="flex w-screen flex-wrap">
          {products
            .filter((product) => {
              if (search.trim() === "") return product;
              else if (
                product?.name
                  .toLowerCase()
                  .includes(search.trim().toLowerCase())
              )
                return product;
            })
            .map((product, i) => {
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
