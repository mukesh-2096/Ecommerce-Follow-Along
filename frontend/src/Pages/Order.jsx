import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // Import Navbar

const Order = () => {
    const [cart, setCart] = useState([]); // Store cart items
    const [addresses, setAddresses] = useState([]); // Store saved addresses
    const [selectedAddress, setSelectedAddress] = useState(""); // Selected address
    const [newAddress, setNewAddress] = useState({ street: "", city: "", state: "" });

    useEffect(() => {
        fetchCart();
        fetchAddresses();
    }, []);

    // Fetch Cart Items
    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8000/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCart(response.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    // Fetch User Addresses
    const fetchAddresses = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8000/user/addresses", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAddresses(response.data);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    // Add a new address
    const handleAddAddress = async () => {
        if (!newAddress.street || !newAddress.city || !newAddress.state) {
            alert("Please fill all address fields");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:8000/user/addresses",
                newAddress,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const addedAddress = response.data;
            
            setAddresses([...addresses, addedAddress]);  // Update address list
            setSelectedAddress(addedAddress._id);       // Auto-select the new address
            setNewAddress({ street: "", city: "", state: "" }); // Clear input fields
            
            alert("Address added successfully!");
        } catch (error) {
            console.error("Error adding address:", error);
            alert("Failed to add address.");
        }
    };

    // Increase Product Quantity
    const handleIncrease = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:8000/cart/increase/${productId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(response.data);
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };

    // Decrease Product Quantity
    const handleDecrease = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:8000/cart/decrease/${productId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(response.data);
        } catch (error) {
            console.error("Error decreasing quantity:", error);
        }
    };

    // Place Order
    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert("Please select an address");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:8000/order",
                { addressId: selectedAddress },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Order placed successfully!");
            setCart([]); // Clear cart after placing order
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Order Page Content */}
            <div className="flex-grow flex flex-col items-center p-6">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Order Summary</h2>

                {/* Order Details Container */}
                <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-3xl">
                    {/* Display Cart Items */}
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-700">Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            item?.productId && (
                                <div key={item._id} className="flex justify-between items-center border-b pb-4 mb-4">
                                    <div className="flex items-center gap-4">
                                        {item?.productId?.images?.[0] ? (
                                            <img
                                                src={`http://localhost:8000/uploads/${item.productId.images[0]}`}
                                                alt={item.productId.name}
                                                className="w-20 h-20 object-contain"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-600 flex items-center justify-center">
                                                No Image
                                            </div>
                                        )}
                                        <div>
                                            <h2 className="text-xl font-bold">{item.productId.name}</h2>
                                            <p className="text-green-500">${item.productId.price}</p>
                                        </div>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleDecrease(item.productId._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncrease(item.productId._id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )
                        ))
                    )}

                    {/* Address Selection */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Select Address</h3>
                        <select
                            className="w-full p-2 border rounded-md"
                            value={selectedAddress}
                            onChange={(e) => setSelectedAddress(e.target.value)}
                        >
                            <option value="">Select an address</option>
                            {addresses.map((address) => (
                                <option key={address._id} value={address._id}>
                                    {address.street}, {address.city}, {address.state}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Add New Address */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Add New Address</h3>
                        <input type="text" placeholder="Street" className="w-full p-2 border rounded-md mb-2"
                            value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        />
                        <input type="text" placeholder="City" className="w-full p-2 border rounded-md mb-2"
                            value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        />
                        <input type="text" placeholder="State" className="w-full p-2 border rounded-md"
                            value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        />
                        <button onClick={handleAddAddress} className="w-full bg-gray-800 text-white py-2 mt-3 rounded-md hover:bg-gray-900">
                            Add Address
                        </button>
                    </div>

                    {/* Place Order Button */}
                    <button onClick={handlePlaceOrder} className="w-full bg-green-500 text-white py-3 mt-6 rounded-md hover:bg-green-600">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Order;
