import React, { useState, useEffect } from 'react';
import { Search, Heart, Home, BookOpen, ChevronDown, X, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';

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

// Filter pill component
const FilterPill = ({ label, onRemove }) => (
  <div className="inline-flex items-center bg-emerald-50 text-emerald-700 rounded-full px-3 py-1 mr-2 mb-2">
    <span className="text-sm font-medium">{label}</span>
    <button 
      onClick={onRemove} 
      className="ml-1 text-emerald-500 hover:text-emerald-700"
      aria-label={`Remove ${label} filter`}
    >
      <X size={16} />
    </button>
  </div>
);

// Recipe card component
const RecipeCard = ({ recipe }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSaveRecipe = async (e) => {
    e.preventDefault(); // Prevent navigating to recipe page when clicking save
    e.stopPropagation(); // Stop event propagation
    
    if (isSaving || isSaved) return;
    
    // Get userId from localStorage
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error('User ID not found in localStorage');
      // Optional: Show an error toast/notification about needing to log in
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('https://app.keepgoingcare.com/api/recipes/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId, // Using the userId from your example
          videoId: recipe.videoId,
          title: recipe.title,
          description: recipe.description,
          thumbnail: recipe.thumbnail,
          calories: recipe.calories,
          difficulty: recipe.difficulty
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save recipe');
      }
      
      setIsSaved(true);
      // Optional: Show a success toast/notification
    } catch (error) {
      console.error('Error saving recipe:', error);
      // Optional: Show an error toast/notification
    } finally {
      setIsSaving(false);
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
            onClick={handleSaveRecipe}
            className={`bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSaving || isSaved}
            aria-label={isSaved ? "Recipe saved" : "Save recipe"}
          >
            {isSaving ? (
              <svg className="animate-spin h-5 w-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Heart 
                className={`${isSaved ? 'text-rose-500 fill-rose-500' : 'text-gray-500 hover:text-rose-500'}`} 
                size={20} 
              />
            )}
          </button>
        </div>
        {recipe.videoId && (
          <div className="absolute bottom-3 right-3">
            <div className="bg-black bg-opacity-60 text-white text-xs font-medium py-1 px-2 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 mr-1">
                <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
              </svg>
              YouTube
            </div>
          </div>
        )}
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
          href={`https://www.youtube.com/watch?v=${recipe.videoId}`}
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

const RecipeExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    allergies: [],
    dietary: [],
    mealType: [],
    cuisine: []
  });
  
  // Track which dropdown is currently open
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  // API endpoint for recipe search
  const apiUrl = 'https://app.keepgoingcare.com/api/search-recipes';

  // Filter options
  const filterOptions = {
    allergies: ['Dairy', 'Eggs', 'Tree Nuts', 'Peanuts', 'Shellfish', 'Wheat', 'Soy', 'Fish'],
    dietary: ['Vegan', 'Gluten-Free', 'Kosher', 'Halal', 'Keto', 'Paleo', 'Low-Carb', 'Low-Fat', 'Pescatarian'],
    mealType: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    cuisine: ['Chinese', 'Italian', 'Japanese', 'Mexican', 'Thai', 'Greek', 'Indian', 'Spanish', 'Turkish', 'American', 'French', 'Ethiopian', 'Mediterranean', 'Brazilian']
  };

  const handleSearch = async () => {
    // Prevent search if already loading
    if (isLoading) return;
    
    setIsLoading(true);
    setRecipes([]);
    
    try {
      // Build request body in the expected format
      const requestBody = {
        ingredients: searchTerm,
        allergies: selectedFilters.allergies,
        dietaryRestrictions: selectedFilters.dietary,
        mealType: selectedFilters.mealType.length > 0 ? selectedFilters.mealType[0] : "",
        cuisineType: selectedFilters.cuisine.length > 0 ? selectedFilters.cuisine[0] : ""
      };
      
      // Make API request with POST
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      
      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Search error:', error);
      // Consider showing an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const addFilter = (category, value) => {
    setSelectedFilters(prev => {
      // Don't add if already exists
      if (prev[category].includes(value)) return prev;
      
      return {
        ...prev,
        [category]: [...prev[category], value]
      };
    });
    
    setActiveFilters(prev => [...prev, { category, value }]);
  };

  const removeFilter = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item !== value)
    }));
    
    setActiveFilters(prev => 
      prev.filter(filter => !(filter.category === category && filter.value === value))
    );
  };

  // Trigger search on initial load with demo data
  useEffect(() => {
    const loadInitialRecipes = async () => {
      setIsLoading(true);
      try {
        // Empty search to get initial results
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ingredients: "",
            allergies: [],
            dietaryRestrictions: [],
            mealType: "",
            cuisineType: ""
          })
        });
        
        if (!response.ok) throw new Error('Failed to fetch initial recipes');
        
        const data = await response.json();
        setRecipes(data.recipes || []);
      } catch (error) {
        console.error('Failed to load initial recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialRecipes();
  }, []);
  
  // We're no longer triggering search when filters change
  // Search will only happen when the search button is clicked

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Recipe Explorer</h1>
            <div  className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Home size={20} className="mr-1" />
                <span>Home</span>
              </button>
            {/* <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Heart size={20} className="mr-1" />
                <span>Saved Recipes</span>
            </button> */}
            <Link to="/saved-recipies" className="flex items-center text-gray-600 hover:text-gray-900">
                <Heart size={20} className="mr-1" />
                <span>Saved Recipes</span>
            </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Healthy Recipe Search</h2>
          <p className="text-gray-500 mb-6">Find delicious, nutritious recipes for your wellness journey</p>
          
          {/* Search input */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Enter ingredients (e.g. chicken, broccoli, rice)"
              className="w-full p-4 pl-12 pr-24 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Searching</span>
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 dropdown-container">
            {/* Allergies Dropdown */}
            <div className="relative">
              <button
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors text-left"
                onClick={() => setOpenDropdown(openDropdown === 'allergies' ? null : 'allergies')}
              >
                <span className="text-gray-700">Select allergies</span>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-500 transition-transform duration-200 ${
                    openDropdown === 'allergies' ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              {openDropdown === 'allergies' && (
                <div className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filterOptions.allergies.map(option => (
                    <button
                      key={option}
                      className={`block w-full text-left px-4 py-3 hover:bg-gray-100 ${
                        selectedFilters.allergies.includes(option) ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => {
                        if (selectedFilters.allergies.includes(option)) {
                          removeFilter('allergies', option);
                        } else {
                          addFilter('allergies', option);
                        }
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Dietary Restrictions Dropdown */}
            <div className="relative">
              <button
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors text-left"
                onClick={() => setOpenDropdown(openDropdown === 'dietary' ? null : 'dietary')}
              >
                <span className="text-gray-700">Select dietary restrictions</span>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-500 transition-transform duration-200 ${
                    openDropdown === 'dietary' ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openDropdown === 'dietary' && (
                <div className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filterOptions.dietary.map(option => (
                    <button
                      key={option}
                      className={`block w-full text-left px-4 py-3 hover:bg-gray-100 ${
                        selectedFilters.dietary.includes(option) ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => {
                        if (selectedFilters.dietary.includes(option)) {
                          removeFilter('dietary', option);
                        } else {
                          addFilter('dietary', option);
                        }
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Meal Type Dropdown */}
            <div className="relative">
              <button
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors text-left"
                onClick={() => setOpenDropdown(openDropdown === 'mealType' ? null : 'mealType')}
              >
                <span className="text-gray-700">Select meal type</span>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-500 transition-transform duration-200 ${
                    openDropdown === 'mealType' ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openDropdown === 'mealType' && (
                <div className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filterOptions.mealType.map(option => (
                    <button
                      key={option}
                      className={`block w-full text-left px-4 py-3 hover:bg-gray-100 ${
                        selectedFilters.mealType.includes(option) ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => {
                        if (selectedFilters.mealType.includes(option)) {
                          removeFilter('mealType', option);
                        } else {
                          addFilter('mealType', option);
                        }
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Cuisine Type Dropdown */}
            <div className="relative">
              <button
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors text-left"
                onClick={() => setOpenDropdown(openDropdown === 'cuisine' ? null : 'cuisine')}
              >
                <span className="text-gray-700">Select cuisine type</span>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-500 transition-transform duration-200 ${
                    openDropdown === 'cuisine' ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openDropdown === 'cuisine' && (
                <div className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filterOptions.cuisine.map(option => (
                    <button
                      key={option}
                      className={`block w-full text-left px-4 py-3 hover:bg-gray-100 ${
                        selectedFilters.cuisine.includes(option) ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => {
                        if (selectedFilters.cuisine.includes(option)) {
                          removeFilter('cuisine', option);
                        } else {
                          addFilter('cuisine', option);
                        }
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="mb-6">
              {activeFilters.map((filter, index) => (
                <FilterPill
                  key={index}
                  label={filter.value}
                  onRemove={() => removeFilter(filter.category, filter.value)}
                />
              ))}
              
              {activeFilters.length > 1 && (
                <button 
                  onClick={() => {
                    setActiveFilters([]);
                    setSelectedFilters({
                      allergies: [],
                      dietary: [],
                      mealType: [],
                      cuisine: []
                    });
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 ml-2 underline"
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Recipe Results */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Search Results</h2>
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-500">Searching for the perfect recipes...</span>
            </div>
          ) : (
            <span className="text-gray-500">{recipes.length} recipes found</span>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) : (
            recipes.map((recipe, index) => (
              <RecipeCard key={`${recipe.videoId || index}`} recipe={recipe} />
            ))
          )}
        </div>
        
        {/* Empty state */}
        {!isLoading && recipes.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No recipes found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm ? 
                `We couldn't find any recipes for "${searchTerm}". Try different keywords or remove some filters.` :
                'Try searching for ingredients or dishes like "chicken", "vegetarian", or "Mediterranean".'}
            </p>
            
            {activeFilters.length > 0 && (
              <button 
                onClick={() => {
                  setActiveFilters([]);
                  setSelectedFilters({dietary: [], mealType: [], cuisine: [], difficulty: []});
                }}
                className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </main>
    </div>
    </Layout>
  );
};

export default RecipeExplorer;