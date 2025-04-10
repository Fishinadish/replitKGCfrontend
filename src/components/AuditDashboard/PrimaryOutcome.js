import React, { useState } from 'react';

const PrimaryOutcomesDataCollection = () => {
  // Sample data for 5 patients
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Juliette Collins",
      dob: "2/25/2025",
      baseline: {
        weight: "100",
        systolic: "140",
        diastolic: "73",
        activityLevel: "1"
      },
      month1: {
        weight: "90",
        systolic: "135",
        diastolic: "82",
        activityLevel: "9"
      },
      month3: {
        weight: "80",
        systolic: "120",
        diastolic: "74",
        activityLevel: "10"
      }
    },
    {
      id: 2,
      name: "Robert Johnson",
      dob: "5/14/2023",
      baseline: {
        weight: "95",
        systolic: "145",
        diastolic: "85",
        activityLevel: "2"
      },
      month1: {
        weight: "92",
        systolic: "140",
        diastolic: "80",
        activityLevel: "6"
      },
      month3: {
        weight: "88",
        systolic: "135",
        diastolic: "78",
        activityLevel: "8"
      }
    },
    {
      id: 3,
      name: "Maria Garcia",
      dob: "11/30/2024",
      baseline: {
        weight: "78",
        systolic: "138",
        diastolic: "88",
        activityLevel: "3"
      },
      month1: {
        weight: "75",
        systolic: "132",
        diastolic: "84",
        activityLevel: "5"
      },
      month3: {
        weight: "72",
        systolic: "128",
        diastolic: "80",
        activityLevel: "7"
      }
    },
    {
      id: 4,
      name: "James Williams",
      dob: "8/7/2023",
      baseline: {
        weight: "110",
        systolic: "150",
        diastolic: "95",
        activityLevel: "1"
      },
      month1: {
        weight: "105",
        systolic: "145",
        diastolic: "90",
        activityLevel: "4"
      },
      month3: {
        weight: "98",
        systolic: "138",
        diastolic: "85",
        activityLevel: "9"
      }
    },
    {
      id: 5,
      name: "Sarah Thompson",
      dob: "3/18/2024",
      baseline: {
        weight: "65",
        systolic: "125",
        diastolic: "80",
        activityLevel: "4"
      },
      month1: {
        weight: "63",
        systolic: "122",
        diastolic: "78",
        activityLevel: "7"
      },
      month3: {
        weight: "61",
        systolic: "120",
        diastolic: "75",
        activityLevel: "9"
      }
    }
  ]);

  const handleInputChange = (patientIndex, period, field, value) => {
    const updatedPatients = [...patients];
    updatedPatients[patientIndex] = {
      ...updatedPatients[patientIndex],
      [period]: {
        ...updatedPatients[patientIndex][period],
        [field]: value
      }
    };
    setPatients(updatedPatients);
  };

  const handleSaveData = (patientIndex) => {
    console.log("Saving data for patient:", patients[patientIndex]);
    // Here you would implement your API call to save the data
    alert(`Data saved successfully for ${patients[patientIndex].name}!`);
  };

  const handleDeleteData = (patientIndex) => {
    if (window.confirm(`Are you sure you want to delete data for ${patients[patientIndex].name}?`)) {
      const updatedPatients = [...patients];
      updatedPatients[patientIndex] = {
        ...updatedPatients[patientIndex],
        baseline: {
          weight: "",
          systolic: "",
          diastolic: "",
          activityLevel: ""
        },
        month1: {
          weight: "",
          systolic: "",
          diastolic: "",
          activityLevel: ""
        },
        month3: {
          weight: "",
          systolic: "",
          diastolic: "",
          activityLevel: ""
        }
      };
      setPatients(updatedPatients);
      console.log("Data deleted");
    }
  };

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
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Primary Outcomes Data Collection</h1>
        
        {/* Video Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative pb-[56.25%] h-0">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/LlQch3LA9HA" 
              title="Measuring Primary Outcomes"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Patient Data Forms - Vertically stacked */}
        {patients.map((patient, index) => (
          <div key={patient.id} className="bg-green-100 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {patient.name} (DOB: {patient.dob})
            </h2>
            
            <div className="md:flex md:space-x-6">
              {/* Baseline Measurements */}
              <div className="md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-4">Baseline</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Weight (kg)</label>
                    <input
                      type="text"
                      value={patient.baseline.weight}
                      onChange={(e) => handleInputChange(index, 'baseline', 'weight', e.target.value)}
                      className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Systolic</label>
                    <input
                      type="text"
                      value={patient.baseline.systolic}
                      onChange={(e) => handleInputChange(index, 'baseline', 'systolic', e.target.value)}
                      className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Diastolic</label>
                    <input
                      type="text"
                      value={patient.baseline.diastolic}
                      onChange={(e) => handleInputChange(index, 'baseline', 'diastolic', e.target.value)}
                      className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Activity (1-10)</label>
                    <input
                      type="text"
                      value={patient.baseline.activityLevel}
                      onChange={(e) => handleInputChange(index, 'baseline', 'activityLevel', e.target.value)}
                      className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Month 1 Measurements */}
              <div className="md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-4">Month 1</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Weight (kg)</label>
                    <input
                      type="text"
                      value={patient.month1.weight}
                      onChange={(e) => handleInputChange(index, 'month1', 'weight', e.target.value)}
                      className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Systolic</label>
                    <input
                      type="text"
                      value={patient.month1.systolic}
                      onChange={(e) => handleInputChange(index, 'month1', 'systolic', e.target.value)}
                      className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Diastolic</label>
                    <input
                      type="text"
                      value={patient.month1.diastolic}
                      onChange={(e) => handleInputChange(index, 'month1', 'diastolic', e.target.value)}
                      className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Activity (1-10)</label>
                    <input
                      type="text"
                      value={patient.month1.activityLevel}
                      onChange={(e) => handleInputChange(index, 'month1', 'activityLevel', e.target.value)}
                      className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Month 3 Measurements */}
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold mb-4">Month 3</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Weight (kg)</label>
                    <input
                      type="text"
                      value={patient.month3.weight}
                      onChange={(e) => handleInputChange(index, 'month3', 'weight', e.target.value)}
                      className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Systolic</label>
                    <input
                      type="text"
                      value={patient.month3.systolic}
                      onChange={(e) => handleInputChange(index, 'month3', 'systolic', e.target.value)}
                      className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Diastolic</label>
                    <input
                      type="text"
                      value={patient.month3.diastolic}
                      onChange={(e) => handleInputChange(index, 'month3', 'diastolic', e.target.value)}
                      className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Activity (1-10)</label>
                    <input
                      type="text"
                      value={patient.month3.activityLevel}
                      onChange={(e) => handleInputChange(index, 'month3', 'activityLevel', e.target.value)}
                      className="w-full p-3 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={() => handleSaveData(index)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md transition-colors font-medium"
              >
                Save Data
              </button>
              <button 
                onClick={() => handleDeleteData(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition-colors font-medium"
              >
                Delete Data
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrimaryOutcomesDataCollection;