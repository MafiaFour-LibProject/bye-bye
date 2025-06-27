import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetSingleAdvert } from "../services/advert";
import EmptyState from "../components/EmptyState";
import MessageModal from "../components/modal/MessageModal";

const AdDetails = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleMessage = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setShowLoginPrompt(true);
    } else {
      setShowMessageModal(true);
    }
  };

  useEffect(() => {
    const fetchAdDetails = async () => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-600 mt-10">
        Error: {error}
      </div>
    );
  }

  if (!ad) {
    return <EmptyState title="No Ads Found" message="Try again later." />;
  }

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <h2 className="text-3xl font-extrabold text-pink-700 drop-shadow-sm mb-10 text-center">
        AD DETAILS
      </h2>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="w-full h-72 sm:h-96 bg-gray-100">
          <img
            src={
              ad.image || "https://via.placeholder.com/800x600?text=No+Image"
            }
            alt={ad.title || "Ad Image"}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {ad.title || "Untitled Ad"}
            </h1>
            <p className="text-gray-600">
              {ad.description || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-xl font-bold text-pink-600">
                ${ad.price?.toFixed(2) || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold text-gray-800 capitalize">
                {ad.category || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Condition</p>
              <p className="font-medium capitalize">
                {ad.condition?.replace("-", " ") || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p
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
              </p>
            </div>
          </div>
          <hr className="border-gray-200" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Contact Seller
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {ad?.vendor?.email || "N/A"}
            </p>

            <button
              onClick={handleMessage}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
            >
              Send Message
            </button>
            {showLoginPrompt && (
              <div
                id="login-modal-overlay"
                className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={(e) => {
                  if (e.target.id === "login-modal-overlay")
                    setShowLoginPrompt(false);
                }}
              >
                <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm border border-pink-200 relative">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-pink-600">
                      Login Required
                    </h2>
                    <button
                      onClick={() => setShowLoginPrompt(false)}
                      className="text-gray-500 hover:text-pink-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="mb-4 text-gray-700 text-sm">
                    You need to be logged in to message the seller.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => navigate("/login")}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md font-medium"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setShowLoginPrompt(false)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <MessageModal
          isOpen={showMessageModal}
          onClose={() => setShowMessageModal(false)}
        />
      </div>
    </div>
  );
};

export default AdDetails;
