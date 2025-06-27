// src/pages/AdsPage.jsx
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PagesLayout from "../components/PagesLayout";
import { apiFetchAdverts } from "../services/advert";
import EmptyState from "../components/EmptyState";

const categories = ["Jewellery", "Perfume", "Beauty", "Fashion", "Other"];

function AdsPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchAds = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};

      if (searchTerm) {
        params.search = searchTerm;
      }
      if (selectedCategory) {
        params.category = selectedCategory;
      }
      if (minPrice) {
        params.minPrice = parseFloat(minPrice);
      }
      if (maxPrice) {
        params.maxPrice = parseFloat(maxPrice);
      }

      const response = await apiFetchAdverts(params);
      console.log("fetched data:", response.data);
      setAds(response.data.adverts);
    } catch (err) {
      console.error("Error fetching ads:", err);
      setError("Failed to load advertisements. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleSearch = () => {
    fetchAds();
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    fetchAds();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );

  return (
    <PagesLayout>
      <div className=" w-full bg-gradient-to-b  min-h-screen flex justify-center">
        <div className="container w-full p-4 md:p-6 lg:p-8">
          <h1 className="text-5xl font-extrabold text-pink-700 drop-shadow-sm mb-2 text-center">
            Bye-Bye Store: Fresh Finds
          </h1>
          <p className="text-lg font-semibold text-pink-400 text-center mb-8 italic">
            Every heartbreak has a silver lining — and it's on sale!
          </p>

          <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl shadow-xl mb-8 border border-pink-200">
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
                  className="text-black w-full px-4 py-1 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-pink-500 focus:border-pink-500 outline-none transition duration-150 ease-in-out placeholder:text-sm"
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
                  className="w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 outline-none bg-white transition duration-150 ease-in-out text-sm"
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
                    className="w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 outline-none transition duration-150 ease-in-out text-sm bg-white"
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
                    className="w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 outline-none transition duration-150 ease-in-out text-sm bg-white"
                    min="0"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={handleSearch}
                className="bg-pink-500 text-white hover:bg-pink-700 font-semibold py-2 px-4 text-sm rounded-lg shadow-md transition duration-300 ease-in-out"
              >
                Search
              </button>

              <button
                onClick={handleResetFilters}
                className="bg-white border border-pink-500 text-pink-500 text-sm hover:bg-pink-700 hover:text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
              >
                Reset
              </button>
            </div>
          </div>

          {ads.length === 0 ? (
            <EmptyState
              title="No Ads Found"
              message="Try changing filters or keywords to see better results."
              onReset={handleResetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 items-center justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ads.map((ad) => (
                <Link
                  to={`/ads/${ad._id}`}
                  key={ad._id}
                  className="bg-gradient-to-br from-white via-pink-50 to-white relative rounded-xl shadow-lg transition transform duration-300 border border-pink-100 hover:border-pink-300 hover:-translate-y-1 hover:shadow-xl p-4 flex flex-col items-center justify-center text-center"
                >
                  {/* <div className="w-40 h-28 overflow-hidden rounded flex items-center justify-center bg-white"> */}
                  <img
                    src={
                      ad.image ||
                      "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt={ad.title}
                    className="w-[250px] h-[250px] object-cover rounded"
                  />
                  {/* </div> */}

                  <div className="p-4 flex flex-col justify-between items-center w-full">
                    <h3
                      className="text-xl font-semibold text-gray-800 mb-2 truncate hover:text-pink-600 transition-colors duration-200"
                      title={ad.title}
                    >
                      {ad.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1 capitalize">
                      Category: {ad.category}
                    </p>
                    <p className="text-sm text-gray-600 mb-2 capitalize">
                      Condition: {ad.condition?.replace("-", " ") || "N/A"}
                    </p>
                    <p className="text-sm font-bold text-pink-600 mb-3">
                      ${ad.price?.toFixed(2) || "N/A"}
                    </p>

                    <div className="inline-block bg-pink-500 text-white hover:bg-pink-700 border font-semibold py-1.5 px-4 rounded-full text-sm transition duration-300 ease-in-out">
                      View
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </PagesLayout>
  );
}

export default AdsPage;
