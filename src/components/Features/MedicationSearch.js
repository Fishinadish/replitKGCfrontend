import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Layout from '../Layout/Layout';

const LoadingShimmer = () => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 animate-pulse">
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-64 mb-4"></div>
        <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
      <div className="h-12 w-24 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

const MedicationSearch = () => {
  const [location, setLocation] = useState('');
  const [medication, setMedication] = useState('');
  const [searchResults, setSearchResults] = useState({ pharmacies: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location || !medication) {
      setError('Please enter both location and medication');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchResults({ pharmacies: [] });

    try {
      const response = await fetch(
        `https://app.keepgoingcare.com/api/medications/search?medication=${encodeURIComponent(medication)}&location=${encodeURIComponent(location)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-2">
        Find the Best Medication Prices
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Compare medication prices at pharmacies near you
      </p>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter medication name"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            <Search size={20} className={isLoading ? 'animate-spin' : ''} />
            {isLoading ? 'Searching...' : 'Search Prices'}
          </button>
        </form>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {isLoading ? (
          <>
            <LoadingShimmer />
            <LoadingShimmer />
            <LoadingShimmer />
          </>
        ) : (
          searchResults.pharmacies.map((result, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-green-600 hover:text-green-700 transition-colors">
                    {result.pharmacy.name}
                  </h3>
                  <div className="space-y-1 mt-1">
                    <p className="text-gray-600 text-sm bg-gray-50 px-3 py-1 rounded-full inline-block">
                      {result.pharmacy.address}
                    </p>
                    <p className="text-gray-600 text-sm px-3">
                      📞 {result.pharmacy.phone} • ⏰ {result.pharmacy.hours}
                    </p>
                  </div>
                  <div className="space-y-2 bg-gray-50 p-4 rounded-lg mt-4">
                    <p className="text-gray-700 flex items-center">
                      <span className="font-semibold min-w-24 inline-block">Medication:</span>
                      <span className="text-gray-900">{result.name}</span>
                    </p>
                    <p className="text-gray-700 flex items-center">
                      <span className="font-semibold min-w-24 inline-block">Pack Size:</span>
                      <span className="text-gray-900">{result.packSize}</span>
                    </p>
                    <p className="text-gray-700 flex items-center">
                      <span className="font-semibold min-w-24 inline-block">SKU:</span>
                      <span className="text-gray-900">{result.sku}</span>
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 bg-green-50 px-6 py-3 rounded-lg">
                  ${result.price.toFixed(2)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </Layout>
  );
};

export default MedicationSearch;