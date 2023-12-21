<<<<<<< HEAD
import { useLocation } from "react-router-dom";
import SingleProductCard from "../../Components/SingleProductCard";

function SingleProduct() {
  const { state } = useLocation();

  return (
    <>
      <SingleProductCard product={state} />
=======
function SingleProduct() {
  return (
    <>
      <div>
        <h1>hai </h1>
      </div>
>>>>>>> aa5a3c2c5080afa21fd62d83662d794e988c2f3b
    </>
  );
}

<<<<<<< HEAD
export default SingleProduct;
=======
export default SingleProduct;
>>>>>>> aa5a3c2c5080afa21fd62d83662d794e988c2f3b
