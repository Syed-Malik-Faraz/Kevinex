import { useState } from "react";
import axios from "axios";

export default function AdminAddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

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
          },
        }
      );

      setImage(data); // saves image path
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // 🔥 SUBMIT PRODUCT
  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/products", {
      name,
      price,
      description,
      countInStock,
      image, // image from upload
    });

    alert("Product Added!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <form onSubmit={submitHandler} className="space-y-4">

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          className="w-full border p-2 rounded"
          onChange={(e) => setCountInStock(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* 🔥 FILE INPUT */}
        <input
          type="file"
          className="w-full"
          onChange={uploadFileHandler}
        />

        {uploading && <p>Uploading...</p>}

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Add Product
        </button>

      </form>
    </div>
  );
}
