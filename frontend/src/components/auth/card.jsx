import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Ensure axios is installed for API calls

const Card = ({ id, name, price, image, onAddToCart, onBuyNow, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8000/products/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          onDelete(id);
          console.log("✅ Product deleted successfully!");
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete product");
        }
      } catch (error) {
        console.error("❌ Error deleting product:", error);
      }
    }
  };

  const handleAddToCart = async () => {
    if (quantity > 0) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "http://localhost:8000/cart",
          { productId: id, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("✅ Product added to cart!");
        navigate("/cart");
      } catch (error) {
        console.error("❌ Error adding to cart:", error);
      }
    } else {
      console.log("❗ Quantity must be greater than 0.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 border border-gray-200 w-full max-w-sm">
      {/* Product Image */}
      <div className="relative w-full h-64 flex justify-center items-center bg-white">
        <img
          src={image}
          alt={name}
          onClick={() => navigate(`/product/${id}`)}
          className="cursor-pointer object-contain h-full w-full p-4 rounded-t-3xl"
        />

        {/* Edit Button with Same Icon */}
        <button
          onClick={onEdit}
          className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full hover:invert cursor-pointer transition-all"
        >
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-outlined/24/edit--v1.png"
            alt="edit-icon"
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="text-center p-6 text-white">
        <h3 className="font-bold text-2xl">{name}</h3>
        <p className="text-xl text-green-400 font-semibold my-2">₹{price}</p>

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-4 mt-4 pb-4">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="flex items-center cursor-pointer justify-center bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
          >
            🛒 
          </button>

          {/* Buy Now & Delete Button Container */}
          <div className="flex gap-3">
            {/* Buy Now */}
            <button
              onClick={onBuyNow}
              className="bg-green-500 cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-all"
            >
              Buy Now
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="bg-red-500 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
