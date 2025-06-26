import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { apiCreatedAd } from "../../services/advert";
import { toast } from "react-toastify";

const categories = ["Jewellery", "Perfume", "Beauty", "Fashion", "Other"];

const CreateAdModal = ({ isOpen, onClose, onAdCreated }) => {
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onSubmit = async (data) => {
    const payload = new FormData();
    payload.append("title", data.title);
    payload.append("description", data.description);
    payload.append("price", data.price);
    payload.append("category", data.category);
    payload.append("condition", data.condition);
    payload.append("available", data.available === true ? "true" : "false");

    if (file && file.name) {
      payload.append("image", file);
    }

    console.log(data);

    try {
      setUploading(true);
      const response = await apiCreatedAd(payload);
      console.log(response);

      if (response.status === 201) {
        toast.success("Advert posted successfully!");
        onClose();
        reset();
        onAdCreated?.();
      } else {
        toast.error("Failed to post advert.");
      }
    } catch (error) {
      // console.error("Error posting ad:", error);
      toast.error("An error occurred while posting the advert.");
    } finally {
      setUploading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md relative border border-pink-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-pink-600">New Advertisement</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-pink-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            className="w-full px-3 py-1.5 text-black border border-pink-300 rounded-md focus:ring-pink-400 focus:outline-none focus:ring-1"
          />
          <textarea
            placeholder="Short Description"
            {...register("description", { required: true })}
            rows="3"
            className="w-full px-3 py-1.5 text-black border border-pink-300 rounded-md focus:ring-pink-400 focus:outline-none focus:ring-1"
          />
          <input
            type="number"
            placeholder="Price ($)"
            {...register("price", { required: true, min: 0 })}
            className="w-full px-3 py-1.5 text-black border border-pink-300 rounded-md focus:ring-pink-400 focus:outline-none focus:ring-1"
            step="0.01"
          />

          <div className="flex space-x-2">
            <select
              {...register("category", { required: true })}
              className="w-1/2 px-2 py-1.5 text-black border border-pink-300 rounded-md focus:ring-pink-400 focus:outline-none focus:ring-1"
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
              className="w-1/2 px-2 py-1.5 text-black border border-pink-300 rounded-md focus:ring-pink-400 focus:outline-none focus:ring-1"
            >
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <input
            type="file"
            {...register("image")}
            onChange={handleChange}
            accept="image/*"
            className="w-full px-3 py-1.5 text-black border border-pink-300 rounded-md focus:ring-pink-400 focus:outline-none focus:ring-1"
          />

          <label className="flex items-center space-x-2 text-gray-600 text-sm">
            <input
              type="checkbox"
              {...register("available")}
              defaultChecked
              className="h-4 w-4 text-pink-500 border-gray-300 rounded focus:ring-pink-400"
            />
            <span>Available for sale</span>
          </label>

          <button
            type="submit"
            disabled={uploading}
            className={`w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-200 ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Post Advert"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdModal;
