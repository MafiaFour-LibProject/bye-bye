import { useState, useEffect } from "react";
import axios from "axios";

const categories = [
  "Electronics",
  "Vehicles",
  "Home Appliances",
  "Fashion",
  "Sports",
  "Books",
  "Other",
];

function CreateAdModal({ isOpen, onClose, onAdCreated }) {
  // Added onAdCreated prop
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [image, setImage] = useState("");
  const [available, setAvailable] = useState(true);

  // Effect to manage body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAd = {
      title,
      description,
      price: parseFloat(price),
      category,
      condition,
      image,
      available,
      vendorId: "vendor123",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post("http://localhost:5000/ads", newAd);

      if (response.status === 201) {
        alert("Advert posted successfully!");
        onClose();
        setTitle("");
        setDescription("");
        setPrice("");
        setCategory("");
        setCondition("");
        setImage("");
        setAvailable(true);
        if (onAdCreated) {
          // Notify parent component that a new ad was created
          onAdCreated();
        }
      } else {
        alert("Failed to post advert.");
      }
    } catch (error) {
      console.error("Error posting ad:", error);
      alert("An error occurred while posting the advert.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Create New Advertisement
        </h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="condition"
              className="block text-sm font-medium text-gray-700"
            >
              Condition
            </label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Condition</option>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="slightly-used">Slightly Used</option>
              <option value="used">Used</option>
              <option value="for-parts">For Parts</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL (for demo)
            </label>
            <input
              type="url"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="e.g., https://example.com/image.jpg"
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="available"
              className="ml-2 block text-sm text-gray-900"
            >
              Available for sale
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Post Advert
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAdModal;
