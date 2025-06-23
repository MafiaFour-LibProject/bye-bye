// src/pages/AdsPage.jsx
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const categories = [
  "Electronics",
  "Vehicles",
  "Home Appliances",
  "Fashion",
  "Sports",
  "Books",
  "Other",
];

function AdsPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const fetchAds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};

      if (searchTerm) {
        params.q = searchTerm;
      }
      if (selectedCategory) {
        params.category = selectedCategory;
      }
      if (minPrice) {
        params.price_gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        params.price_lte = parseFloat(maxPrice);
      }
      if (dateFilter) {
        const now = new Date();
        let dateCutoff = new Date();
        if (dateFilter === "24h") {
          dateCutoff.setHours(now.getHours() - 24);
        } else if (dateFilter === "7d") {
          dateCutoff.setDate(now.getDate() - 7);
        } else if (dateFilter === "30d") {
          dateCutoff.setDate(now.getDate() - 30);
        }
        params.createdAt_gte = dateCutoff.toISOString();
      }

      params._sort = "createdAt";
      params._order = "desc";

      const response = await axios.get("http://localhost:5000/ads", { params });
      setAds(response.data);
    } catch (err) {
      console.error("Error fetching ads:", err);
      setError("Failed to load advertisements. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory, minPrice, maxPrice, dateFilter]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setDateFilter("");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="text-xl text-gray-700">Loading advertisements...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );

  return (
    <div className=" container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">
        Bye-Bye Store: Fresh Finds
      </h1>
      <p className="text-s font-semibold text-center mb-8">
        Every heartbreak has a silver lining—and it's on sale!
      </p>

      <div className="bg-white p-6 rounded-lg shadow-xl mb-8 border border-gray-200">
        {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Filter Ads
        </h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div>
            <label
              htmlFor="searchTerm"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search Keywords
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="e.g., iPhone, Bike, Table"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-black w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out placeholder:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="categoryFilter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              id="categoryFilter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition duration-150 ease-in-out text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1 flex items-end gap-2">
            <div className="w-1/2">
              <label
                htmlFor="minPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out text-sm"
                min="0"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="maxPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 ease-in-out text-sm"
                min="0"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="dateFilter"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Date Posted
            </label>
            <select
              id="dateFilter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition duration-150 ease-in-out text-sm"
            >
              <option value="">All Time</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleResetFilters}
            className="bg-red-500 text-xs text-white hover:bg-gray-300 font-semibold py-1 px-3 rounded-md shadow-sm transition duration-300 ease-in-out"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {ads.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          No advertisements found matching your criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="relative text-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 p-4"
            >
              <Link to={`/ads/${ad.id}`}>
                <img
                  src={
                    ad.image ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={ad.title}
                  className="w-[full] h-[auto] object-cover rounded"
                />
              </Link>
              <div className="p-4 flex flex-col justify-between h-auto">
                <div>
                  <h3
                    className="text-xl font-semibold text-gray-800 mb-2 truncate"
                    title={ad.title}
                  >
                    <Link
                      to={`/ads/${ad.id}`}
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      {ad.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mb-1 capitalize">
                    Category: {ad.category}
                  </p>
                  <p className="text-sm text-gray-600 mb-2 capitalize">
                    Condition: {ad.condition?.replace("-", " ") || "N/A"}
                  </p>
                  <p className="text-sm font-bold text-green-800 mb-3">
                    ${ad.price?.toFixed(2) || "N/A"}
                  </p>
                </div>

                <Link
                  to={`/ads/${ad.id}`}
                  className="inline-block bg-green-500 hover:bg-green-800 text-white font-semibold py-1 px-2 rounded-md text-sm transition duration-300 ease-in-out"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdsPage;
