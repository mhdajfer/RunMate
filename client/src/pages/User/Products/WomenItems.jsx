import { useState, useEffect } from "react";
import ProductCard from "../../../Components/ProductCard";
import axios from "axios";
import serverUrl from "../../../server";

export default function WomenItems() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //removing text from search box
    localStorage.removeItem("search");
    try {
      axios
        .post(`${serverUrl}/product/get`, {}, { withCredentials: true })
        .then((res) => {
          console.log(res);
          setProducts(res.data.data);
        });
    } catch (error) {
      console.log("error while fetching product details: ", error);
    }
  }, []);
  return (
    <div className="flex w-screen flex-wrap">
      {products.map((product, i) => {
        console.log(product);
        return (
          <div key={i}>
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
}
