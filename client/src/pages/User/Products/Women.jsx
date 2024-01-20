import { useState, useEffect } from "react";
import ProductCard from "../../../Components/ProductCard";
import axios from "axios";
import serverUrl from "../../../server";

// eslint-disable-next-line react/prop-types
export default function Women({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      axios
        .post(
          `${serverUrl}/product/get`,
          { category },
          { withCredentials: true }
        )
        .then((res) => {
          setProducts(res.data.data);
        });
    } catch (error) {
      console.log("error while fetching product details: ", error);
    }
  }, [category]);
  return (
    <div className="flex w-screen flex-wrap">
      {products.map((product, i) => {
        return (
          <div key={i}>
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
}
