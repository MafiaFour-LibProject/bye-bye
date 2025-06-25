// src/components/EmptyState.jsx
import React from "react";

const EmptyState = ({
  title = "No Results Found",
  message = "Try adjusting your filters or search terms.",
  onReset,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-pink-500">
      <img
        src="/images/no-results.png"
        alt="Empty state illustration"
        className="w-20 h-23 mb-6 object-cover opacity-80"
      />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{message}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
