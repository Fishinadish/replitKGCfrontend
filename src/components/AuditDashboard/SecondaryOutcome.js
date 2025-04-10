import React, { useState, useEffect } from 'react';

// Mock data for patients - in a real application this would come from an API
const mockPatients = [
  {
    id: 1,
    name: "Juliette Collins",
    dateOfBirth: "2025-02-25",
    secondaryOutcomes: {
      baseline: {
        motivationScore: "5",
        qualityOfLifeScore: "3"
      },
      month1: {
        motivationScore: "7",
        qualityOfLifeScore: "4"
      },
      month3: {
        motivationScore: "9",
        qualityOfLifeScore: "5"
      }
    }
  },
  {
    id: 2,
    name: "Robert Johnson",
    dateOfBirth: "2023-05-14",
    secondaryOutcomes: {
      baseline: {
        motivationScore: "4",
        qualityOfLifeScore: "2"
      },
      month1: {
        motivationScore: "6",
        qualityOfLifeScore: "3"
      },
      month3: {
        motivationScore: "8",
        qualityOfLifeScore: "4"
      }
    }
  },
  {
    id: 3,
    name: "Maria Garcia",
    dateOfBirth: "2024-11-30",
    secondaryOutcomes: {
      baseline: {
        motivationScore: "3",
        qualityOfLifeScore: "3"
      },
      month1: {
        motivationScore: "5",
        qualityOfLifeScore: "4"
      },
      month3: {
        motivationScore: "7",
        qualityOfLifeScore: "5"
      }
    }
  },
  {
    id: 4,
    name: "James Williams",
    dateOfBirth: "2023-08-07",
    secondaryOutcomes: {
      baseline: {
        motivationScore: "2",
        qualityOfLifeScore: "2"
      },
      month1: {
        motivationScore: "5",
        qualityOfLifeScore: "3"
      },
      month3: {
        motivationScore: "8",
        qualityOfLifeScore: "4"
      }
    }
  },
  {
    id: 5,
    name: "Sarah Thompson",
    dateOfBirth: "2024-03-18",
    secondaryOutcomes: {
      baseline: {
        motivationScore: "6",
        qualityOfLifeScore: "3"
      },
      month1: {
        motivationScore: "8",
        qualityOfLifeScore: "4"
      },
      month3: {
        motivationScore: "9",
        qualityOfLifeScore: "5"
      }
    }
  }
];

// Patient Secondary Outcomes Form Component
const PatientSecondaryOutcomesForm = ({ patient, onUpdate }) => {
  const [formData, setFormData] = useState(patient.secondaryOutcomes);

  const handleChange = (period, field, value) => {
    const updated = {
      ...formData,
      [period]: {
        ...formData[period],
        [field]: value
      }
    };
    setFormData(updated);
    onUpdate(patient.id, updated);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Baseline */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Baseline</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Motivation Score (1-10)</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.baseline.motivationScore}
                onChange={(e) => handleChange('baseline', 'motivationScore', e.target.value)}
                className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Quality of Life Score (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.baseline.qualityOfLifeScore}
                onChange={(e) => handleChange('baseline', 'qualityOfLifeScore', e.target.value)}
                className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Month 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Month 1</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Motivation Score (1-10)</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.month1.motivationScore}
                onChange={(e) => handleChange('month1', 'motivationScore', e.target.value)}
                className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Quality of Life Score (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.month1.qualityOfLifeScore}
                onChange={(e) => handleChange('month1', 'qualityOfLifeScore', e.target.value)}
                className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Month 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Month 3</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Motivation Score (1-10)</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.month3.motivationScore}
                onChange={(e) => handleChange('month3', 'motivationScore', e.target.value)}
                className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Quality of Life Score (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.month3.qualityOfLifeScore}
                onChange={(e) => handleChange('month3', 'qualityOfLifeScore', e.target.value)}
                className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => alert(`Saved data for ${patient.name}`)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Save Data
        </button>
        <button
          onClick={() => alert(`Deleted data for ${patient.name}`)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Delete Data
        </button>
      </div>
    </div>
  );
};

// Main Component
const SecondaryOutcomesDataCollection = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkedPatients, setCheckedPatients] = useState(false);

  // Simulate API loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPatients(mockPatients);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check if we have patients
  useEffect(() => {
    if (!loading && !checkedPatients) {
      setCheckedPatients(true);
      if (!patients || patients.length === 0) {
        alert("No Patients Found. Please add patients in the Patient Selection section first.");
        // In a real app this would navigate to patient selection
        // navigate("/patient-selection");
      }
    }
  }, [loading, patients, checkedPatients]);

  // Update patient data
  const handleUpdatePatient = (patientId, newData) => {
    setPatients(prev => 
      prev.map(p => 
        p.id === patientId 
          ? { ...p, secondaryOutcomes: newData } 
          : p
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h1>
        <p className="text-gray-600 mb-4">
          Unable to load patient data. Please return to Patient Selection.
        </p>
        <button 
          onClick={() => window.history.back()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Go to Patient Selection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Patient Selection
          </button>
        </div>
        
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Secondary Outcomes Data Collection</h1>
        
        {/* Video Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative pb-[56.25%] h-0">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/Gf4PEgeGL1g" 
              title="Secondary Outcomes Data Collection Guide"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Patient Data Forms - Vertically stacked */}
        <div className="space-y-8 mt-8">
          {patients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {patient.name} (DOB: {new Date(patient.dateOfBirth).toLocaleDateString()})
                </h2>
                <PatientSecondaryOutcomesForm patient={patient} onUpdate={handleUpdatePatient} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondaryOutcomesDataCollection;