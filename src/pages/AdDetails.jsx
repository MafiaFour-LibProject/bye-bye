import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AdDetails = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/ads/${id}`);
        if (!response.ok) {
          const errorBody = await response.text(); // Get more specific error from body
          throw new Error(
            `HTTP error! Status: ${response.status} - ${errorBody}`
          );
        }
        const data = await response.json();
        setAd(data);
      } catch (err) {
        console.error("Fetch error:", err); // Log the full error object
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      // Only fetch if an ID is provided
      fetchAdDetails();
    }
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-lg text-gray-700 mt-10">
        Loading advert details...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-lg text-red-600 mt-10">
        Error: {error}
      </div>
    );
  if (!ad)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Advert not found.</p>
      </div>
    );

  // --- Start of rendering with defensive checks ---
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <img
          src={ad.image || "https://via.placeholder.com/800x600?text=No+Image"}
          alt={ad.title || "Ad Image"}
          className="w-full h-96 object-cover object-center"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {ad.title || "Untitled Ad"}
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            {ad.description || "No description provided."}
          </p>

          <div className="flex items-center justify-between mb-6">
            <span className="text-green-700 text-3xl font-extrabold">
              {/* Safely call toFixed, provide fallback if price is null/undefined */}
              ${ad.price?.toFixed(2) || "N/A"}
            </span>
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              Category: {ad.category || "N/A"}
            </span>
          </div>

          <p className="text-gray-700 text-md mb-2">
            Condition:{" "}
            <span className="font-semibold capitalize">
              {/* Safely call replace, provide fallback */}
              {ad.condition?.replace("-", " ") || "N/A"}
            </span>
          </p>

          <p className="text-gray-700 text-md">
            Status:{" "}
            <span
              className={`font-semibold ${
                // Use a check for undefined/null `ad.available` as well
                ad.available === true
                  ? "text-green-600"
                  : ad.available === false
                  ? "text-red-600"
                  : "text-gray-500" // Fallback for 'N/A' status style
              }`}
            >
              {/* Provide fallback text for available status */}
              {ad.available === true
                ? "Available"
                : ad.available === false
                ? "Sold"
                : "N/A"}
            </span>
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Contact Seller
            </h2>
            <p className="text-gray-700">Seller ID: {ad.vendorId || "N/A"}</p>{" "}
            <p className="text-gray-700">Email: vendor@example.com</p>{" "}
            {/* Placeholder, replace with dynamic data */}
            <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
              Message Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetails;
