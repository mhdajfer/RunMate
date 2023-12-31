import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import serverUrl from "../../server";
import DialogBox from "../../Components/DialogBox";

export default function Products() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [prodForDelete, setProdForDelete] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${serverUrl}/product`)
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((err) => {
          toast.error("Can't fetch details");
          console.log(err);
        });
    } catch (error) {
      console.log("error while fetching products", error);
    }
  }, [products]);

  function handleDelete(product) {
    setIsDialogOpen(true);
    setProdForDelete(product);
  }
  function CancelDelete() {
    setProdForDelete(null);
    setIsDialogOpen(false);
  }

  function confirmDelete(product) {
    axios
      .get(`${serverUrl}/product/delete/${product._id}`)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setIsDialogOpen(false);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleEdit(product) {
    navigate("/product/edit", {
      state: { productId: product._id, images: product.images },
    });
  }

  function AddProduct() {
    navigate("/product/add");
  }
  return (
    <>
      <div className="w-full flex flex-col items-center p-16">
        <button
          onClick={AddProduct}
          className="bg-[#0F4C75] hover:text-teal-600 text-white px-4 py-1 rounded-lg self-end me-6"
        >
          New product
        </button>
        <table className="my-12">
          <thead>
            <tr>
              <th>Product</th>
              <th>Id</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => {
              return (
                <tr key={i} className="bg-[#BBE1FA] h-16 hover:bg-gray-100">
                  <td>
                    <img
                      className="w-[60px]"
                      src={serverUrl + "/" + product.images[0]}
                      alt=""
                    />
                  </td>
                  <td className="p-6">{product._id}</td>
                  <td className="p-2">{product.desc}</td>
                  <td className="p-2">{product.price}</td>
                  <td className="p-2">{product.stock}</td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 px-2 m-1 rounded-md text-md text-white"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-green-700 px-2 m-1 rounded-md text-md text-white"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="fixed top-[20%] right-[25%]">
        {/* Dialog box */}
        {isDialogOpen && (
          <DialogBox
            data={prodForDelete}
            onConfirmDelete={confirmDelete}
            onCancel={CancelDelete}
          />
        )}
      </div>
    </>
  );
}
