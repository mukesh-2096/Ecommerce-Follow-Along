import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from '../components/Navbar'; // ✅ Navbar Imported

const EditProduct = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        rating: 0,
        images: [],
    });

    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8000/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProduct(response.data);
                if (response.data.images?.length > 0) {
                    setPreviewImage(`http://localhost:8000/uploads/${response.data.images[0]}`);
                }
            } catch (error) {
                console.error("❌ Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRatingChange = (value) => {
        setProduct((prev) => ({
            ...prev,
            rating: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct((prev) => ({
                ...prev,
                images: [file],
            }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("name", product.name);
            formData.append("price", product.price);
            formData.append("description", product.description);
            formData.append("rating", product.rating);

            if (product.images.length > 0) {
                formData.append("images", product.images[0]);
            }

            await axios.put(`http://localhost:8000/products/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("✅ Product updated successfully!");
            navigate(`/product/${id}`);
        } catch (error) {
            console.error("❌ Error updating product:", error);
        }
    };

    return (
        <>
            {/* ✅ Navbar with hideButtons for No "Add Product" Option */}
            <Navbar hideButtons={true} />
            
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 pt-20 p-6 text-white">
                <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-2xl">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Edit Product</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* ✅ Improved Image Preview Box */}
                        <div className="w-full h-[200px] flex justify-center items-center bg-gray-200 rounded-lg border border-gray-400">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            ) : (
                                <p className="text-gray-500">No image available</p>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="p-2 border rounded bg-gray-300 text-gray-700"
                        />

                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            placeholder="Product Name"
                            className="p-2 border rounded bg-gray-300 text-gray-700"
                            required
                        />

                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="p-2 border rounded bg-gray-300 text-gray-700"
                            required
                        />

                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">Rating:</span>
                            {Array.from({ length: 5 }, (_, i) => (
                                <span
                                    key={i}
                                    onClick={() => handleRatingChange(i + 1)}
                                    className={
                                        i < product.rating
                                            ? "text-yellow-400 cursor-pointer"
                                            : "text-gray-400 cursor-pointer"
                                    }
                                >
                                    ★
                                </span>
                            ))}
                            <span className="text-gray-500 ml-2">({product.rating || 0})</span>
                        </div>

                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="p-2 border rounded bg-gray-300 text-gray-700"
                        />

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all"
                        >
                            Update Product
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(`/product/${id}`)}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-md transition-all"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProduct;
