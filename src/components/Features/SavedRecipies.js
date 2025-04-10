import React, { useState, useEffect } from 'react';
import { Heart, Home, ArrowLeft, Trash2, Search, Award, ChevronDown, Filter } from 'lucide-react';

// Loading card for recipe results
const LoadingCard = () => (
  <div className="bg-white rounded-xl shadow-sm p-0 border border-gray-100 overflow-hidden h-full animate-pulse">
    <div className="h-48 bg-gray-200 w-full"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="flex space-x-2 mb-3">
        <div className="h-5 bg-gray-200 rounded w-16"></div>
        <div className="h-5 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

const SavedRecipeCard = ({ recipe, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  
  const handleRemoveRecipe = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isRemoving) return;
    
    setIsRemoving(true);
    try {
      // Use the correct delete API endpoint with the recipe ID
      const response = await fetch(`https://app.keepgoingcare.com/api/recipes/delete/${recipe.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove recipe');
      }
      
      // Call the parent component's onRemove function to update UI
      onRemove(recipe.video_id);
    } catch (error) {
      console.error('Error removing recipe:', error);
      setIsRemoving(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={recipe.thumbnail || '/api/placeholder/500/300'}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <button 
            onClick={handleRemoveRecipe}
            className={`bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors ${isRemoving ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isRemoving}
            aria-label="Remove from saved recipes"
          >
            {isRemoving ? (
              <svg className="animate-spin h-5 w-5 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Trash2 className="text-gray-500 hover:text-rose-500" size={20} />
            )}
          </button>
        </div>
        {recipe.video_id && ( // Updated field name
          <div className="absolute bottom-3 right-3">
            <div className="bg-black bg-opacity-60 text-white text-xs font-medium py-1 px-2 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 mr-1">
                <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
              </svg>
              YouTube
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            SAVED
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">{recipe.title}</h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Award size={16} className="mr-1 text-gray-400" />
            <span>{recipe.difficulty}</span>
          </div>
          <div className="py-1 px-2 bg-gray-100 rounded-md text-sm">
            {recipe.calories} cal
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {recipe.description}
        </p>
        
        <a 
          href={`https://www.youtube.com/watch?v=${recipe.video_id}`} // Updated field name
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-medium py-2 px-4 rounded-lg transition-colors block text-center"
        >
          View Recipe
        </a>
      </div>
    </div>
  );
};

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    difficulty: '',
    caloriesRange: ''
  });

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          throw new Error('User not logged in');
        }
        
        // Updated API endpoint
        const response = await fetch(`https://app.keepgoingcare.com/api/recipes/get_by_user/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch saved recipes');
        }
        
        const data = await response.json();
        setSavedRecipes(data.recipes || []);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSavedRecipes();
  }, []);

  const handleRemoveRecipe = (videoId) => {
    setSavedRecipes(prev => prev.filter(recipe => recipe.video_id !== videoId)); // Updated field name
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setActiveFilters({
      difficulty: '',
      caloriesRange: ''
    });
    setSearchTerm('');
  };

  // Filter recipes based on search term and active filters
  const filteredRecipes = savedRecipes.filter(recipe => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Difficulty filter
    const matchesDifficulty = activeFilters.difficulty === '' || 
      recipe.difficulty === activeFilters.difficulty;
    
    // Calories filter
    let matchesCalories = true;
    if (activeFilters.caloriesRange === 'under300') {
      matchesCalories = recipe.calories < 300;
    } else if (activeFilters.caloriesRange === '300-500') {
      matchesCalories = recipe.calories >= 300 && recipe.calories <= 500;
    } else if (activeFilters.caloriesRange === 'over500') {
      matchesCalories = recipe.calories > 500;
    }
    
    return matchesSearch && matchesDifficulty && matchesCalories;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Recipe Explorer</h1>
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <Home size={20} className="mr-1" />
                <span>Home</span>
              </a>
              <div className="flex items-center text-emerald-600">
                <Heart size={20} className="mr-1 fill-emerald-600" />
                <span className="font-medium">Saved Recipes</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <a href="/search-recipies" className="mr-3 text-gray-500 hover:text-gray-700">
              <ArrowLeft size={20} />
            </a>
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <Heart size={28} className="mr-3 text-emerald-500 fill-emerald-500" />
              Your Saved Recipes
            </h2>
          </div>
          <p className="text-gray-600">
            Your personal collection of favorite recipes, ready when you are.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-xl">
              <input
                type="text"
                placeholder="Search your saved recipes..."
                className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            {/* Filters */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter size={18} />
                <span>Filter</span>
                <ChevronDown size={18} className={`transition-transform duration-200 ${filterOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {filterOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4">
                  {/* Difficulty Filter */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Easy', 'Medium', 'Hard'].map(level => (
                        <button
                          key={level}
                          className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                            activeFilters.difficulty === level 
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                              : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                          }`}
                          onClick={() => handleFilterChange('difficulty', activeFilters.difficulty === level ? '' : level)}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Calories Filter */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Calories</label>
                    <div className="space-y-2">
                      {[
                        { id: 'under300', label: 'Under 300 cal' },
                        { id: '300-500', label: '300-500 cal' },
                        { id: 'over500', label: 'Over 500 cal' }
                      ].map(option => (
                        <button
                          key={option.id}
                          className={`w-full text-left py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                            activeFilters.caloriesRange === option.id
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                              : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                          }`}
                          onClick={() => handleFilterChange('caloriesRange', activeFilters.caloriesRange === option.id ? '' : option.id)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Reset Button */}
                  <button
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors mt-2"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {(activeFilters.difficulty || activeFilters.caloriesRange || searchTerm) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              
              {searchTerm && (
                <span className="inline-flex items-center bg-emerald-50 text-emerald-700 rounded-full px-3 py-1">
                  <span className="text-sm font-medium mr-1">Search: {searchTerm}</span>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="text-emerald-500 hover:text-emerald-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              
              {activeFilters.difficulty && (
                <span className="inline-flex items-center bg-emerald-50 text-emerald-700 rounded-full px-3 py-1">
                  <span className="text-sm font-medium mr-1">Difficulty: {activeFilters.difficulty}</span>
                  <button 
                    onClick={() => handleFilterChange('difficulty', '')}
                    className="text-emerald-500 hover:text-emerald-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              
              {activeFilters.caloriesRange && (
                <span className="inline-flex items-center bg-emerald-50 text-emerald-700 rounded-full px-3 py-1">
                  <span className="text-sm font-medium mr-1">
                    Calories: {
                      activeFilters.caloriesRange === 'under300' ? 'Under 300' :
                      activeFilters.caloriesRange === '300-500' ? '300-500' :
                      'Over 500'
                    }
                  </span>
                  <button 
                    onClick={() => handleFilterChange('caloriesRange', '')}
                    className="text-emerald-500 hover:text-emerald-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              
              {(activeFilters.difficulty || activeFilters.caloriesRange || searchTerm) && (
                <button 
                  onClick={resetFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline ml-2"
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>

        {/* Recipe Count */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {isLoading ? 'Loading recipes...' : 
              filteredRecipes.length > 0 ? 
                `${filteredRecipes.length} ${filteredRecipes.length === 1 ? 'recipe' : 'recipes'}` : 
                'No saved recipes found'}
          </h3>
        </div>

        {/* Recipe Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-medium">Error loading saved recipes</p>
            <p className="text-sm mt-1">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 text-red-700 hover:text-red-900 font-medium text-sm underline"
            >
              Try again
            </button>
          </div>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map(recipe => (
              <SavedRecipeCard 
                key={recipe.video_id} // Updated field name
                recipe={recipe} 
                onRemove={handleRemoveRecipe}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            {searchTerm || activeFilters.difficulty || activeFilters.caloriesRange ? (
              <>
                <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Filter className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No matching recipes found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-4">
                  We couldn't find any saved recipes that match your current filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-medium hover:bg-emerald-200 transition-colors"
                >
                  Reset all filters
                </button>
              </>
            ) : (
              <>
                <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No saved recipes yet</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-4">
                  Start exploring recipes and save your favorites to build your personal collection.
                </p>
                <a
                  href="/"
                  className="mt-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors inline-flex items-center"
                >
                  <Search size={18} className="mr-2" />
                  Discover recipes
                </a>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedRecipes;