import React, { useState } from 'react';
import { Heart, Activity, AlertTriangle, Youtube } from 'lucide-react';
import Layout from '../Layout/Layout';

const ExerciseRecommender = () => {
  const [step, setStep] = useState(1);
  const [assessment, setAssessment] = useState({
    medicalConditions: '',
    symptoms: '',
    activityLevel: ''
  });
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatActivityLevel = (level) => {
    switch(level) {
      case 'Sedentary (little to no exercise)':
        return 'sedentary';
      case 'Moderate (1-3 days/week)':
        return 'moderate';
      case 'Active (4+ days/week)':
        return 'active';
      default:
        return level.toLowerCase();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    const requestBody = {
      medicalConditions: assessment.medicalConditions,
      symptoms: assessment.symptoms,
      activityLevel: formatActivityLevel(assessment.activityLevel)
    };

    try {
      const response = await fetch('https://app.keepgoingcare.com/api/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendations(data);
      setStep(4);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <Heart className="text-red-500" />
              <span>Do you have any medical conditions?</span>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
                <input
                  type="radio"
                  name="medical"
                  value="yes"
                  onChange={(e) => setAssessment({...assessment, medicalConditions: e.target.value})}
                  className="accent-blue-600"
                />
                <span>Yes (cardiovascular disease, high blood pressure, or diabetes)</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
                <input
                  type="radio"
                  name="medical"
                  value="no"
                  onChange={(e) => setAssessment({...assessment, medicalConditions: e.target.value})}
                  className="accent-blue-600"
                />
                <span>No</span>
              </label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <AlertTriangle className="text-yellow-500" />
              <span>Do you experience symptoms during physical activity?</span>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
                <input
                  type="radio"
                  name="symptoms"
                  value="yes"
                  onChange={(e) => setAssessment({...assessment, symptoms: e.target.value})}
                  className="accent-blue-600"
                />
                <span>Yes (chest pain, dizziness, or shortness of breath)</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
                <input
                  type="radio"
                  name="symptoms"
                  value="no"
                  onChange={(e) => setAssessment({...assessment, symptoms: e.target.value})}
                  className="accent-blue-600"
                />
                <span>No</span>
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <Activity className="text-green-500" />
              <span>What is your current activity level?</span>
            </div>
            <div className="space-y-2">
              {['Sedentary (little to no exercise)', 'Moderate (1-3 days/week)', 'Active (4+ days/week)'].map((level) => (
                <label key={level} className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <input
                    type="radio"
                    name="activity"
                    value={level}
                    onChange={(e) => setAssessment({...assessment, activityLevel: e.target.value})}
                    className="accent-blue-600"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderRecommendations = () => {
    if (loading) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Getting your personalized recommendations...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => setStep(3)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (!recommendations) return null;
    
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Workouts</h2>
        <p className="text-gray-600 mb-6">{recommendations.message}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.recommendations.map((rec, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-100">
                <img
                  src="/api/placeholder/400/225"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Youtube className="w-12 h-12 text-red-600" />
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {rec.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {rec.description}
                </p>
                <div className="flex items-center justify-between">
                  <a
                    href={rec.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Watch Video
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Layout>
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
      Inspiration Machine E&W
      </h1>
      
      <div className="bg-white rounded-lg shadow-md mb-8 p-6">
        <h2 className="text-xl font-semibold mb-6">Health Assessment</h2>
        {step < 4 && renderQuestion()}
        
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
              disabled={loading}
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto disabled:opacity-50"
              disabled={!assessment[Object.keys(assessment)[step - 1]]}
            >
              Next
            </button>
          ) : step === 3 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto disabled:opacity-50"
              disabled={loading || !assessment.activityLevel}
            >
              {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
            </button>
          ) : null}
        </div>
      </div>

      {renderRecommendations()}
    </div>
    </Layout>
  );
};

export default ExerciseRecommender;