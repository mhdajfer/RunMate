/* eslint-disable react/prop-types */

import { useState } from "react";
const QtyButton = ({ Qty, qtyChange, item }) => {
  const [quantity, setQuantity] = useState(Qty);
  return (
    <div className="flex items-center space-x-4">
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded"
        onClick={() => {
          setQuantity((prev) => {
            const newQuantity = prev - 1;
            qtyChange(newQuantity, item);
            return newQuantity;
          });
        }}
        disabled={quantity <= 1}
      >
        -
      </button>

      <span className="text-lg font-semibold">{quantity}</span>

      <button
        className="px-3 py-1 bg-green-500 text-white rounded"
        onClick={() => {
          setQuantity((prev) => {
            const newQuantity = prev + 1;
            qtyChange(newQuantity, item);
            return newQuantity;
          });
        }}
      >
        +
      </button>
    </div>
  );
};

export default QtyButton;
