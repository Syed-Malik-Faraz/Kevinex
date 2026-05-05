import { useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import { API_URL } from "../apiConfig";

export default function AdminAddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [images, setImages] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const API = API_URL;

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
        `${API}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...config.headers,
          },
        }
      );

      setImages((prev) => [...prev, data.imagePath]);
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
        `${API}/api/products`,
        {
          name,
          price,
          description,
          brand,
          category,
          countInStock,
          image: images[0],
          images,
          isFeatured,
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
      <div className="pt-28 pb-10 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white p-8 md:p-12 shadow-xl rounded-[2.5rem] border border-gray-100">
            <h2 className="text-3xl font-black text-gray-900 mb-8 underline decoration-indigo-600 decoration-8 underline-offset-8">
              Add New Product
            </h2>

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
            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700">Product Images (Gallery)</label>
              <input type="file" className="w-full" onChange={uploadFileHandler} disabled={uploading} />
              
              {uploading && <p className="text-blue-500 animate-pulse">Uploading image...</p>}
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((img, index) => (
                  <div key={index} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 border">
                    <img 
                      src={img.startsWith("http") ? img : `${API}${img}`} 
                      alt="preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 text-[8px] text-white text-center py-0.5 font-bold uppercase">
                        Main Image
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="isFeatured"
                className="w-5 h-5 accent-indigo-600"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              <label htmlFor="isFeatured" className="text-sm font-bold text-gray-700 cursor-pointer">
                Feature this product on Home Page
              </label>
            </div>

            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
);
}