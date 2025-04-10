import React, { useState } from 'react';
import { Search, ChefHat, Leaf, Store } from 'lucide-react';
import Layout from '../Layout/Layout';

const LoadingShimmer = () => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 animate-pulse">
    <div className="flex flex-col h-full">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  </div>
);

const Tag = ({ text }) => (
  <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium mr-2 mb-2">
    {text}
  </span>
);

const IngredientSection = ({ title, items = [], className = "" }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-gray-600 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const DietLogistics = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mealData, setMealData] = useState({ preparedMeals: [], ingredients: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter your dietary preferences or restrictions');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMealData({ preparedMeals: [], ingredients: {} });

    try {
      // Format the search query into a comma-separated string
      const formattedQuery = searchQuery
        .split(',')
        .map(item => item.trim())
        .join(', ');

      const response = await fetch('https://app.keepgoingcare.com/api/generate-meal-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: formattedQuery }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch meal plans');
      }

      const data = await response.json();
      setMealData(data);
    } catch (err) {
      setError('Failed to generate meal plan. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Diet Logistics
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Ingredients and Meal Home Delivery
        </p>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Enter your dietary preferences and restrictions to receive personalized meal plans and ingredient lists
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-12 border border-gray-100 max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter ingredients (e.g., chicken, vegetables, quinoa)"
              className="w-full p-4 pl-5 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ChefHat className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all text-lg ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            <Search size={24} className={isLoading ? 'animate-spin' : ''} />
            {isLoading ? 'Looking Diet Logistics...' : 'Diet Logistics'}
          </button>
        </form>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl max-w-3xl mx-auto">
          {error}
        </div>
      )}

      {!isLoading && mealData.preparedMeals.length > 0 && (
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Leaf className="text-green-600" />
              Prepared Meals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mealData.preparedMeals.map((meal, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100"
                >
                  <a 
                    href={meal.recipeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <h3 className="text-xl font-semibold text-green-600 mb-3 group-hover:text-green-700 flex items-center gap-2">
                      {meal.name}
                      <svg 
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                        />
                      </svg>
                    </h3>
                  </a>
                  <p className="text-gray-600 mb-4">
                    {meal.description}
                  </p>
                  <div className="flex flex-wrap mb-4">
                    {meal.tags.map((tag, i) => (
                      <Tag key={i} text={tag} />
                    ))}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Calories:</span>
                      <span className="font-semibold">{meal.calories}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Protein:</span>
                      <span className="font-semibold">{meal.protein}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Ingredients:</h4>
                      <div className="flex flex-wrap gap-1">
                        {meal.keyIngredients.map((ingredient, i) => (
                          <span key={i} className="text-sm text-gray-600">
                            {i > 0 ? ' • ' : ''}{ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Store className="text-green-600" />
              Ingredients List
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mealData.ingredients && (
                <>
                  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <IngredientSection 
                      title="Proteins" 
                      items={mealData.ingredients?.Proteins} 
                      className="mb-6"
                    />
                    <IngredientSection 
                      title="Vegetables" 
                      items={mealData.ingredients?.Vegetables} 
                      className="mb-6"
                    />
                    <IngredientSection 
                      title="Fruits" 
                      items={mealData.ingredients?.Fruits} 
                    />
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <IngredientSection 
                      title="Pantry Items" 
                      items={mealData.ingredients?.["Pantry Items"]} 
                    />
                  </div>
                  {mealData.ingredients?.Alternatives && (
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Alternatives</h3>
                      <IngredientSection 
                        title="Proteins" 
                        items={mealData.ingredients?.Alternatives?.Proteins} 
                        className="mb-6"
                      />
                      <IngredientSection 
                        title="Grains" 
                        items={mealData.ingredients?.Alternatives?.Grains} 
                        className="mb-6"
                      />
                      <IngredientSection 
                        title="Vegetables" 
                        items={mealData.ingredients?.Alternatives?.Vegetables} 
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoadingShimmer />
          <LoadingShimmer />
          <LoadingShimmer />
        </div>
      )}
    </div>
    </Layout>
  );
};

export default DietLogistics;