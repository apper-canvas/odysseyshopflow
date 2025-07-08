import React from 'react';

const Loading = ({ type = "products" }) => {
  if (type === "products") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="shimmer h-48 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="shimmer h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="shimmer h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="shimmer h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="shimmer h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "product-detail") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="shimmer h-96 bg-gray-200 rounded-lg"></div>
        <div className="space-y-6">
          <div className="shimmer h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="shimmer h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="shimmer h-12 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-2">
            <div className="shimmer h-4 bg-gray-200 rounded"></div>
            <div className="shimmer h-4 bg-gray-200 rounded"></div>
            <div className="shimmer h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="shimmer h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
};

export default Loading;