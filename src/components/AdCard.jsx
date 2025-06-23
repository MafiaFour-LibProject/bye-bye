import axios from "axios";
const API_URL = "http://localhost:5000/ads";

export const getAds = () => axios.get(API_URL);
export const postAd = (ad) => axios.post(API_URL, ad);
export const deleteAd = (id) => axios.delete(`${API_URL}/${id}`);
export const updateAd = (id, updatedAd) =>
  axios.put(`${API_URL}/${id}`, updatedAd);

const AdCard = ({ ad, isVendor, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-xl">
      <img
        src={ad.image}
        alt={ad.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2">{ad.title}</h2>
      <p className="text-sm text-gray-600">{ad.description}</p>
      <p className="text-sm">Category: {ad.category}</p>
      <p className="text-sm">Condition: {ad.condition}</p>
      <p className="text-lg font-semibold mt-1">${ad.price}</p>
      {isVendor && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onEdit(ad)}
            className="px-3 py-1 bg-yellow-400 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(ad.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AdCard;
