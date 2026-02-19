import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminEditProduct() {
    const { id: productId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
        },
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
                // Backend returns { product: { ... } } based on previous view_file
                const product = data.product || data;

                setName(product.name);
                setPrice(product.price);
                setDescription(product.description);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setImage(product.image);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        setUploading(true);

        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        ...config.headers,
                    },
                }
            );

            setImage(data.imagePath);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:5000/api/products/${productId}`,
                {
                    name,
                    price,
                    description,
                    brand,
                    category,
                    countInStock,
                    image,
                },
                config
            );

            alert("Product Updated!");
            navigate("/admin/product-list");
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    if (loading) return <div className="p-10 font-bold">Loading Product...</div>;

    return (
        <>
            <AdminNavbar />
            <div className="pt-20 pb-10">
                <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
                    <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

                    <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Brand</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                className="w-full border p-2 rounded"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded bg-gray-100"
                                value={image}
                                readOnly
                            />
                            <input type="file" className="mt-2 w-full" onChange={uploadFileHandler} />
                        </div>

                        {uploading && <p className="text-blue-500">Uploading image...</p>}

                        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition">
                            Update Product
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/admin/product-list")}
                            className="mt-2 text-gray-600 w-full text-center hover:underline"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
