import { useState, useEffect } from "react";
import ProductCard from "../../Components/ProductCard";
import axios from "axios";
import serverUrl from "../../server";

export default function BestSellingItems() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      axios
        .post(`${serverUrl}/product/get`, {}, { withCredentials: true })
        .then((res) => {
          setProducts(res.data.data);
        });
    } catch (error) {
      console.log("error while fetching product details: ", error);
    }
  }, []);
  return (
    <div className="flex w-screen flex-wrap">
      {products.map((product, i) => {
        return (
          <div key={i}>
            {console.log(product)}
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
}
