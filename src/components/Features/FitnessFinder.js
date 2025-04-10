import React, { useState } from 'react';
import { Search, MapPin, Phone, Building2, Dumbbell } from 'lucide-react';
import Layout from '../Layout/Layout';

const LoadingCard = () => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
);

const GymCard = ({ gym }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100 flex flex-col h-full">
    <div className="flex items-start justify-between mb-3">
      <div>
        <h3 className="text-xl font-semibold text-green-600 mb-1">
          {gym.name}
        </h3>
        <span className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          {gym.type}
        </span>
      </div>
      <Dumbbell className="text-green-500" size={24} />
    </div>
    
    <div className="space-y-3 mt-4 flex-grow">
      <div className="flex items-start gap-2">
        <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={18} />
        <p className="text-gray-600 text-sm">
          {gym.address}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="text-gray-400 flex-shrink-0" size={18} />
        <p className="text-gray-600 text-sm">
          {gym.phone}
        </p>
      </div>
    </div>
    
    <button className="mt-6 w-full bg-green-50 hover:bg-green-100 text-green-600 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
      <Building2 size={18} />
      View Details
    </button>
  </div>
);

const ExerciseWellnessSupport = () => {
  const [location, setLocation] = useState('');
  const [gyms, setGyms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGyms([]);

    try {
      const response = await fetch(
        `https://app.keepgoingcare.com/api/enhance-search-results?location=${encodeURIComponent(location)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch gym results');
      }

      const data = await response.json();
      setGyms(data);
    } catch (err) {
      setError('Failed to fetch gym results. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Dumbbell className="text-green-600" size={32} />
          <h1 className="text-4xl font-bold text-green-600">
            E&W Support
          </h1>
        </div>
        <p className="text-xl text-gray-600 mb-2">
          Exercise and Wellness Routine Support
        </p>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Find the perfect gym or fitness center near you. Get personalized recommendations based on your location.
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-md p-8 mb-12 max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your location"
              className="w-full p-4 pl-12 pr-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-lg"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all text-lg ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            <Search size={24} className={isLoading ? 'animate-spin' : ''} />
            {isLoading ? 'Searching...' : 'Locate Healthy Experiences'}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl max-w-3xl mx-auto">
          {error}
        </div>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        ) : (
          gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))
        )}
      </div>

      {/* Empty State */}
      {!isLoading && gyms.length === 0 && !error && (
        <div className="text-center text-gray-500 py-12">
          <Dumbbell className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-lg">Enter a location to find gyms near you</p>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default ExerciseWellnessSupport;