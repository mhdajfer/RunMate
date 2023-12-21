import { useLocation } from "react-router-dom";
import SingleProductCard from "../../Components/SingleProductCard";

function SingleProduct() {
  const { state } = useLocation();

  return (
    <>
      <SingleProductCard product={state} />
    </>
  );
}
export default SingleProduct;
