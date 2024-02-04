import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import serverUrl from "../../../server";
import DialogBox from "../../../Components/DialogBox";
import Pagination from "../../../Components/Pagination";
import AddOfferForm from "../../../Components/AddOfferForm";

export default function Products() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [prodForDelete, setProdForDelete] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offerProduct, setOfferProduct] = useState();
  let dataPerPage = 3;

  const lastDataIndex = currentPage * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const productList = products.slice(firstDataIndex, lastDataIndex);
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
  }, [offerProduct]);

  function handleDelete(product) {
    setProdForDelete(product);

    setIsDialogOpen(true);
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

  function handleAddOffer(product) {
    setOfferProduct(product);
  }

  function canceloffer() {
    setOfferProduct(null);
  }

  function AddProduct() {
    navigate("/product/add");
  }

  function ApplyOfferForProduct(product, discount) {
    if (discount <= 0) return toast.error("Enter positive discount number");
    const productDiscount = (product?.price * discount) / 100;
    const discountedPrice = product?.price - productDiscount;
    try {
      axios
        .post(
          `${serverUrl}/product/applyOffer`,
          {
            productId: product?._id,
            discountedPrice: discountedPrice,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            setOfferProduct(null);
          } else {
            toast.error(res.data.message);
            setOfferProduct(null);
          }
        });
    } catch (error) {
      console.log("error while applying offer for product", error);
    }
  }

  function handleCancelOffer(product) {
    try {
      axios
        .post(
          `${serverUrl}/product/cancelOffer`,
          { productId: product?._id },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            setOfferProduct(null);
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (error) {
      console.log("error while cancelling offer for product", error);
    }
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
          {productList.length == 0 ? (
            <tbody>
              <tr>
                <td>
                  <h1>No Products Added!!</h1>
                </td>
              </tr>
            </tbody>
          ) : (
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
          )}
          <tbody>
            {productList.map((product, i) => {
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
                  <td className="p-2">{product.subDesc}</td>
                  <td className="p-2">{product.price}</td>
                  <td className="p-2">{product.stock}</td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 px-2 m-1 rounded-md text-md text-white"
                      onClick={() => handleDelete(product)}
                    >
                      {product.isDeleted ? "Restore" : "Delete"}
                    </button>
                    <button
                      className="bg-green-700 px-2 m-1 rounded-md text-md text-white"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    {!product?.productWiseOffer ? (
                      <button
                        className="bg-green-700 px-2 m-1 rounded-md text-md text-white relative"
                        onClick={() => handleAddOffer(product)}
                      >
                        Add offer
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 px-2 m-1 rounded-md text-md text-white relative"
                        onClick={() => handleCancelOffer(product)}
                      >
                        Cancel offer
                      </button>
                    )}
                    {offerProduct?._id === product._id && (
                      <AddOfferForm
                        ApplyOffer={ApplyOfferForProduct}
                        canceloffer={canceloffer}
                        product={offerProduct}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>
                {productList.length != 0 ? (
                  <Pagination
                    totalItems={products.length}
                    dataPerPage={dataPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                ) : null}
              </td>
            </tr>
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
