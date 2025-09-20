import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrlApi } from "../../store/authStore";

export default function AddProduct({ onClose, onProductAdded }) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddProduct = async () => {
        if (!title || !price) {
            toast.error("⚠️ Please fill all fields.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${backendUrlApi}api/v1/products`, {
                title,
                price: parseFloat(price),
            });

            toast.success("✅ Product added successfully!");
            onProductAdded(res.data.data); // نحدث القائمة في الصفحة الرئيسية
            onClose(); // نغلق المودال أو الصفحة
        } catch (err) {
            console.error(err);
            toast.error("❌ Failed to add product. Please check the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-40" onClick={onClose}>
            <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Add Product</h2>

                <input className="border p-2 rounded w-full mb-3" placeholder="Product Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input className="border p-2 rounded w-full mb-3" type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                    <button onClick={handleAddProduct} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
