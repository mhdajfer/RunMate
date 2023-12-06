import AdminLayout from "./AdminLayout";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  function AddProduct() {
    navigate("/admin/add-product");
  }
  return (
    <>
      <Navbar />
      <div className="flex">
        <AdminLayout />
        <div>
          <button onClick={AddProduct}>new product</button>
        </div>
      </div>
    </>
  );
}
