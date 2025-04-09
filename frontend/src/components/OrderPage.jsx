import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleOrder = () => {
    alert("Order placed successfully!"); // You can replace this with backend logic
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Order Confirmation</h2>

        <label className="block mb-2 text-gray-700">Enter Address:</label>
        <input
          type="text"
          placeholder="Enter your delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-3 border rounded-md mb-4"
          required
        />

        <button
          onClick={handleOrder}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
