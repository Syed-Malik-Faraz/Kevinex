import { useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminAddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`,
    },
  };

  // 🔥 IMAGE UPLOAD FUNCTION
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

      setImage(data.imagePath); // saves image path from the object response
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // 🔥 SUBMIT PRODUCT
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/products",
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

      alert("Product Added!");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="pt-20 pb-10">
        <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
          <h2 className="text-2xl font-bold mb-4">Add Product</h2>

          <form onSubmit={submitHandler} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Price"
              className="w-full border p-2 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Brand"
              className="w-full border p-2 rounded"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Category"
              className="w-full border p-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Stock"
              className="w-full border p-2 rounded"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />

            <textarea
              placeholder="Description"
              className="w-full border p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {/* 🔥 FILE INPUT */}
            <input type="file" className="w-full" onChange={uploadFileHandler} />

            {uploading && <p>Uploading...</p>}
            {image && <p className="text-green-500 text-sm">Image uploaded!</p>}

            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}