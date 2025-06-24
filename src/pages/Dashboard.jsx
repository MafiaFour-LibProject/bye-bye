import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import CreateAdModal from "../components/modal/CreateAdModal"; // Import the CreateAdModal

// Define common categories for dropdowns
const categories = [
  "Electronics",
  "Vehicles",
  "Home Appliances",
  "Fashion",
  "Sports",
  "Books",
  "Other",
];

function Dashboard() {
  // WORK ON THIS///////////////////

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      n;
    }
  }, []);

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAd, setEditingAd] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for CreateAdModal

  const currentVendorId = "vendor123"; // Simulating a logged-in vendor

  const fetchVendorAds = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/ads?vendorId=${currentVendorId}`
      );
      setAds(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorAds();
  }, []);

  // Effect to manage body scroll for the EDITING MODAL
  useEffect(() => {
    if (editingAd || isCreateModalOpen) {
      // Check both modals
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "unset"; // Re-enable scrolling
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [editingAd, isCreateModalOpen]); // Depend on both modal states

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this advert?")) {
      try {
        await axios.delete(`http://localhost:5000/ads/${id}`);
        alert("Advert deleted successfully!");
        fetchVendorAds(); // Refresh the list
      } catch (error) {
        console.error("Error deleting ad:", error);
        alert("An error occurred while deleting the advert.");
      }
    }
  };

  const handleEditClick = (ad) => {
    setEditingAd({ ...ad });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEditingAd((prev) => ({
      ...prev,
      // For price, ensure it's a number. For checkbox, use checked. Otherwise, use value.
      // Date is handled separately upon creation, not usually edited here via input.
      [name]:
        name === "price"
          ? parseFloat(value)
          : type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!editingAd || !editingAd.id) {
      alert("No ad selected for editing or ad ID is missing.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/ads/${editingAd.id}`, editingAd);
      alert("Advert updated successfully!");
      fetchVendorAds(); // Re-fetch ads
      setEditingAd(null); // Close the edit form
    } catch (error) {
      console.error("Error updating ad:", error);
      alert("An error occurred while updating the advert.");
    }
  };

  // Function to close modal when clicking on the overlay (background)
  const handleEditModalOverlayClick = (e) => {
    if (e.target.id === "edit-modal-overlay") {
      setEditingAd(null); // Close the edit modal
    }
  };

  if (loading)
    return (
      <div className="text-center text-lg text-gray-700">
        Loading your adverts...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-lg text-red-600">Error: {error}</div>
    );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Your Advertisements
      </h1>

      {/* Button to open CreateAdModal */}
      <div className="mb-6">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
        >
          Create New Ad
        </button>
      </div>

      {ads.length === 0 ? (
        <p className="text-gray-600 text-lg">
          You haven't posted any advertisements yet. Click "Create New Ad" to
          add one!
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ads.map((ad) => (
                <tr key={ad.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {ad.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{ad.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      ${ad.price !== undefined ? ad.price.toFixed(2) : "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 capitalize">
                      {ad.condition?.replace("-", " ") || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        ad.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {ad.available ? "Available" : "Sold"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(ad)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ad.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Ad Modal/Form */}
      {editingAd && (
        <div
          id="edit-modal-overlay"
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleEditModalOverlayClick}
        >
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Edit Advertisement
            </h2>
            <button
              onClick={() => setEditingAd(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close modal"
            >
              &times;
            </button>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="editTitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="editTitle"
                  name="title"
                  value={editingAd.title || ""}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="editDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="editDescription"
                  name="description"
                  value={editingAd.description || ""}
                  onChange={handleEditChange}
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="editPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  id="editPrice"
                  name="price"
                  value={editingAd.price || ""}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              {/* Category dropdown */}
              <div>
                <label
                  htmlFor="editCategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="editCategory"
                  name="category"
                  value={editingAd.category || ""}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                  htmlFor="editCondition"
                  className="block text-sm font-medium text-gray-700"
                >
                  Condition
                </label>
                <select
                  id="editCondition"
                  name="condition"
                  value={editingAd.condition || ""}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                  htmlFor="editImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image URL (for demo)
                </label>
                <input
                  type="url"
                  id="editImage"
                  name="image"
                  value={editingAd.image || ""}
                  onChange={handleEditChange}
                  placeholder="e.g., https://example.com/image.jpg"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="editAvailable"
                  name="available"
                  checked={editingAd.available || false}
                  onChange={handleEditChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="editAvailable"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Available for sale
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
      {/* CreateAdModal component */}
      <CreateAdModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAdCreated={fetchVendorAds} // Pass the refresh function
      />
    </div>
  );
}

export default Dashboard;
