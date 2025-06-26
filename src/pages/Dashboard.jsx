import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import PagesLayout from "../components/PagesLayout";
import CreateAdModal from "../components/modal/CreateAdModal";
import { toast } from "react-toastify";
import {
  apiDeleteAdvert,
  apiFetchVendorAdverts,
  apiUpdateAdvert,
} from "../services/advert";

const categories = ["Jewellery", "Perfume", "Beauty", "Fashion", "Other"];

const Dashboard = () => {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAd, setEditingAd] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) navigate("/login");
  }, [navigate]);

  const fetchVendorAds = async () => {
    try {
      setLoading(true);
      const res = await apiFetchVendorAdverts();
      setAds(res.data.adverts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorAds();
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      editingAd || isCreateModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [editingAd, isCreateModalOpen]);

  const handleDelete = async (id) => {
    // if (!window.confirm("Are you sure you want to delete this advert?")) return;
    try {
      await apiDeleteAdvert(id);
      toast.success("Ad deleted successfully!");
      fetchVendorAds();
    } catch {
      toast.error("Error deleting ad.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-lg text-red-600">Error: {error}</div>
    );

  return (
    <PagesLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Ads</h1>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="mb-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition"
        >
          Create New Ad
        </button>

        {ads.length === 0 ? (
          <p className="text-gray-600 text-lg text-center">
            You haven't posted any ads yet.
          </p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Title",
                    "Category",
                    "Price",
                    "Condition",
                    "Status",
                    "Actions",
                  ].map((col) => (
                    <th
                      key={col}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ads.map((ad) => (
                  <tr key={ad._id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {ad.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {ad.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      ${ad.price !== undefined ? ad.price.toFixed(2) : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                      {ad.condition?.replace("-", " ") || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                          ad.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {ad.available ? "Available" : "Sold"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => setEditingAd(ad)}
                        className="text-indigo-600 cursor-pointer hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ad._id)}
                        className="text-red-600 cursor-pointer hover:text-red-900"
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

        {editingAd && (
          <div
            id="edit-modal-overlay"
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) =>
              e.target.id === "edit-modal-overlay" && setEditingAd(null)
            }
          >
            <div className="bg-white p-5 rounded-xl shadow-2xl w-full max-w-md relative border border-pink-200">
              <h2 className="mb-3 text-lg font-bold text-pink-600">
                Edit Advertisement
              </h2>
              <EditAdForm
                ad={editingAd}
                onClose={() => {
                  setEditingAd(null);
                  fetchVendorAds();
                }}
              />
            </div>
          </div>
        )}

        <CreateAdModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onAdCreated={fetchVendorAds}
        />
      </div>
    </PagesLayout>
  );
};

export default Dashboard;

const EditAdForm = ({ ad, onClose }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: ad.title,
      description: ad.description,
      price: ad.price,
      category: ad.category,
      condition: ad.condition,
      available: ad.available,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await apiUpdateAdvert(ad._id, data);

      toast.success("Ad updated successfully!");
      onClose();
    } catch {
      toast.error("Error updating ad.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
      <input
        type="text"
        {...register("title", { required: true })}
        placeholder="Title"
        className="w-full px-3 py-1.5 border border-pink-300 rounded-md focus:ring-1 focus:ring-pink-400"
      />
      <textarea
        {...register("description", { required: true })}
        placeholder="Short Description"
        rows="2"
        className="w-full px-3 py-1.5 border border-pink-300 rounded-md focus:ring-1 focus:ring-pink-400"
      />
      <input
        type="number"
        {...register("price", { required: true, min: 0 })}
        placeholder="Price ($)"
        step="0.01"
        className="w-full px-3 py-1.5 border border-pink-300 rounded-md focus:ring-1 focus:ring-pink-400"
      />
      <div className="flex space-x-2">
        <select
          {...register("category", { required: true })}
          className="w-1/2 px-2 py-1.5 border border-pink-300 rounded-md focus:ring-1 focus:ring-pink-400"
        >
          <option value="">Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          {...register("condition", { required: true })}
          className="w-1/2 px-2 py-1.5 border border-pink-300 rounded-md focus:ring-1 focus:ring-pink-400"
        >
          <option value="new">New</option>
          <option value="like-new">Like-New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
        </select>
      </div>
      <label className="flex items-center space-x-2 text-gray-600 text-sm">
        <input
          type="checkbox"
          {...register("available")}
          className="h-4 w-4 text-pink-500 border-gray-300 rounded focus:ring-pink-400"
        />
        <span>Available for sale</span>
      </label>
      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1.5 rounded-md shadow transition"
      >
        Save Changes
      </button>
    </form>
  );
};
