import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetSingleAdvert } from "../services/advert";

const AdDetails = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleMessage = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchAdDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiGetSingleAdvert(id);
        setAd(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAdDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-lg text-red-600 mt-10">
        Error: {error}
      </div>
    );

  if (!ad)
    return <EmptyState title="No Ads Found" onReset={handleResetFilters} />;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="h-80 lg:h-full w-full">
          <img
            src={
              ad.image || "https://via.placeholder.com/800x600?text=No+Image"
            }
            alt={ad.title || "Ad Image"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {ad.title || "Untitled Ad"}
            </h1>
            <p className="text-gray-600 text-base mb-6">
              {ad.description || "No description provided."}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-pink-500 text-2xl font-extrabold">
                  ${ad.price?.toFixed(2) || "N/A"}
                </span>
                <span className="bg-blue-100 text-blue-900 text-sm font-semibold px-3 py-1 rounded-full">
                  {ad.category || "N/A"}
                </span>
              </div>

              <p className="text-gray-700">
                Condition:{" "}
                <span className="font-semibold capitalize text-gray-900">
                  {ad.condition?.replace("-", " ") || "N/A"}
                </span>
              </p>

              <p className="text-gray-700">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    ad.available === true
                      ? "text-green-600"
                      : ad.available === false
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {ad.available === true
                    ? "Available"
                    : ad.available === false
                    ? "Sold"
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Contact Seller
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {ad?.vendor?.email || "N/A"}
            </p>

            <button
              onClick={handleMessage}
              className="bg-pink-500 hover:bg-pink-600 cursor-pointer text-white font-semibold py-2 px-5 rounded-lg transition duration-300 shadow-md w-full sm:w-auto"
            >
              Message Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetails;
