import React, { useState, useEffect } from 'react';

// Mock patient data
const mockPatients = [
  {
    id: 1,
    name: "Juliette Collins",
    dateOfBirth: "2025-02-25",
    primaryOutcomes: {
      baseline: { weight: "100", systolic: "140", diastolic: "73", activityLevel: "1" },
      month1: { weight: "90", systolic: "135", diastolic: "82", activityLevel: "9" },
      month3: { weight: "80", systolic: "120", diastolic: "74", activityLevel: "10" }
    },
    secondaryOutcomes: {
      baseline: { motivationScore: "5", qualityOfLifeScore: "3" },
      month1: { motivationScore: "7", qualityOfLifeScore: "4" },
      month3: { motivationScore: "9", qualityOfLifeScore: "5" }
    }
  },
  {
    id: 2,
    name: "Robert Johnson",
    dateOfBirth: "2023-05-14",
    primaryOutcomes: {
      baseline: { weight: "95", systolic: "145", diastolic: "85", activityLevel: "2" },
      month1: { weight: "92", systolic: "140", diastolic: "80", activityLevel: "6" },
      month3: { weight: "88", systolic: "135", diastolic: "78", activityLevel: "8" }
    },
    secondaryOutcomes: {
      baseline: { motivationScore: "4", qualityOfLifeScore: "2" },
      month1: { motivationScore: "6", qualityOfLifeScore: "3" },
      month3: { motivationScore: "8", qualityOfLifeScore: "4" }
    }
  },
  {
    id: 5,
    name: "Sarah Thompson",
    dateOfBirth: "2024-03-18",
    primaryOutcomes: {
      baseline: { weight: "65", systolic: "125", diastolic: "80", activityLevel: "4" },
      month1: { weight: "63", systolic: "122", diastolic: "78", activityLevel: "7" },
      month3: { weight: "61", systolic: "120", diastolic: "75", activityLevel: "9" }
    },
    secondaryOutcomes: {
      baseline: { motivationScore: "6", qualityOfLifeScore: "3" },
      month1: { motivationScore: "8", qualityOfLifeScore: "4" },
      month3: { motivationScore: "9", qualityOfLifeScore: "5" }
    }
  }
];

// Incomplete patient (missing month3 data) - will be filtered out
const incompletePatient = {
  id: 3,
  name: "Maria Garcia",
  dateOfBirth: "2024-11-30",
  primaryOutcomes: {
    baseline: { weight: "78", systolic: "138", diastolic: "88", activityLevel: "3" },
    month1: { weight: "75", systolic: "132", diastolic: "84", activityLevel: "5" }
  },
  secondaryOutcomes: {
    baseline: { motivationScore: "3", qualityOfLifeScore: "3" },
    month1: { motivationScore: "5", qualityOfLifeScore: "4" }
  }
};

// Function to check if patient data is complete
const isPatientDataComplete = (patient) => {
  return (
    patient.primaryOutcomes?.baseline &&
    patient.primaryOutcomes?.month1 &&
    patient.primaryOutcomes?.month3 &&
    patient.secondaryOutcomes?.baseline &&
    patient.secondaryOutcomes?.month1 &&
    patient.secondaryOutcomes?.month3
  );
};

// Patient Report Component
const PatientReport = ({ patientId }) => {
  // Find the patient data
  const patient = mockPatients.find(p => p.id === patientId);
  
  if (!patient) return <div>Patient not found</div>;
  
  // Calculate changes and improvements
  const weightChange = parseInt(patient.primaryOutcomes.baseline.weight) - parseInt(patient.primaryOutcomes.month3.weight);
  const systolicChange = parseInt(patient.primaryOutcomes.baseline.systolic) - parseInt(patient.primaryOutcomes.month3.systolic);
  const diastolicChange = parseInt(patient.primaryOutcomes.baseline.diastolic) - parseInt(patient.primaryOutcomes.month3.diastolic);
  const activityImprovement = parseInt(patient.primaryOutcomes.month3.activityLevel) - parseInt(patient.primaryOutcomes.baseline.activityLevel);
  const motivationImprovement = parseInt(patient.secondaryOutcomes.month3.motivationScore) - parseInt(patient.secondaryOutcomes.baseline.motivationScore);
  const qolImprovement = parseInt(patient.secondaryOutcomes.month3.qualityOfLifeScore) - parseInt(patient.secondaryOutcomes.baseline.qualityOfLifeScore);
  
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <h3 className="text-xl font-bold mb-4">{patient.name}</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-3 text-green-600">Primary Outcomes</h4>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Weight Change:</span>
              <span className={`font-bold ${weightChange > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {weightChange > 0 ? `-${weightChange}kg` : `+${Math.abs(weightChange)}kg`}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Blood Pressure Change:</span>
              <span className={`font-bold ${systolicChange > 0 || diastolicChange > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {systolicChange > 0 ? `-${systolicChange}` : `+${Math.abs(systolicChange)}`}/
                {diastolicChange > 0 ? `-${diastolicChange}` : `+${Math.abs(diastolicChange)}`} mmHg
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Activity Level Improvement:</span>
              <span className={`font-bold ${activityImprovement > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {activityImprovement > 0 ? `+${activityImprovement}` : activityImprovement} points
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-3 text-blue-600">Secondary Outcomes</h4>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Motivation Improvement:</span>
              <span className={`font-bold ${motivationImprovement > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {motivationImprovement > 0 ? `+${motivationImprovement}` : motivationImprovement} points
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Quality of Life Improvement:</span>
              <span className={`font-bold ${qolImprovement > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {qolImprovement > 0 ? `+${qolImprovement}` : qolImprovement} points
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t">
        <h4 className="text-lg font-semibold mb-3">Overall Assessment</h4>
        <p className="text-gray-700">
          {patient.name} has shown 
          {weightChange > 0 ? ' significant' : ' minimal'} improvement in weight management, 
          {systolicChange + diastolicChange > 10 ? ' excellent' : ' some'} progress in blood pressure control, and
          {activityImprovement > 5 ? ' outstanding' : ' good'} increase in physical activity. 
          Their motivation has 
          {motivationImprovement > 3 ? ' greatly improved' : ' improved'}, contributing to a
          {qolImprovement > 1 ? ' better' : ' slightly improved'} quality of life.
        </p>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
          onClick={() => window.print()}
        >
          Print Report
        </button>
        <button 
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={() => alert(`Sharing report for ${patient.name}`)}
        >
          Share with Patient
        </button>
      </div>
    </div>
  );
};

// Main Analysis Component
const Analysis = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  // Simulate API loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Add the incomplete patient to show filtering
        setPatients([...mockPatients, incompletePatient]);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Set initialLoad to false after first render
  useEffect(() => {
    if (!isLoading) {
      setInitialLoad(false);
    }
  }, [isLoading]);

  if (isLoading && initialLoad) return <div>Loading...</div>;

  const patientsWithCompleteData = patients.filter(isPatientDataComplete);

  if (patientsWithCompleteData.length === 0) {
    return (
      <div className="min-h-screen bg-green-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button 
              onClick={() => window.history.back()} 
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </button>
          </div>
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Data Analysis</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">No Complete Patient Data Available</h2>
              <p className="text-gray-600 mb-4">
                Please ensure all patients have complete Primary and Secondary Outcomes data 
                before viewing their analysis reports.
              </p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => alert("Navigate to Primary Outcomes")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Enter Primary Outcomes
                </button>
                <button 
                  onClick={() => alert("Navigate to Secondary Outcomes")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Enter Secondary Outcomes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </button>
        </div>
        
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Data Analysis</h1>
        
        {/* Video Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative pb-[56.25%] h-0">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/JygF1HiLS9M" 
              title="Understanding Your Analysis Results"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Patient Analysis Reports</h2>
          
          <div className="space-y-8">
            {patientsWithCompleteData.map((patient) => (
              <PatientReport key={patient.id} patientId={patient.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;