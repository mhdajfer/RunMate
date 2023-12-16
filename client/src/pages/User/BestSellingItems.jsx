import { useState, useEffect } from "react";
import ProductCard from "../../Components/ProductCard";
import axios from "axios";
import serverUrl from "../../server";
// import { UseAuth } from "../../Utils/Auth";
// import { useNavigate } from "react-router-dom";

export default function BestSellingItems() {
  const [products, setProducts] = useState([]);
  // const navigate = useNavigate();
  // const auth = UseAuth();

  useEffect(() => {
    // !auth.token ? navigate("/login") : null;
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
