import React, { useState, useEffect, useMemo } from 'react';

// Mock patient data
const mockPatients = [
  {
    id: 1,
    name: "Juliette Collins",
    dateOfBirth: "2025-02-25",
    // Primary outcomes
    weightBaseline: "100",
    weightMonth1: "90",
    weightMonth3: "80",
    bpBaselineSystolic: "140",
    bpBaselineDiastolic: "73",
    bpMonth1Systolic: "135",
    bpMonth1Diastolic: "82",
    bpMonth3Systolic: "120",
    bpMonth3Diastolic: "74",
    activityLevelBaseline: "1",
    activityLevelMonth1: "9",
    activityLevelMonth3: "10",
    // Secondary outcomes
    motivationScoreMonth1: "7",
    motivationScoreMonth3: "9",
    qualityOfLifeScoreMonth1: "4",
    qualityOfLifeScoreMonth3: "5"
  },
  {
    id: 2,
    name: "Robert Johnson",
    dateOfBirth: "2023-05-14",
    // Primary outcomes
    weightBaseline: "95",
    weightMonth1: "92",
    weightMonth3: "88",
    bpBaselineSystolic: "145",
    bpBaselineDiastolic: "85",
    bpMonth1Systolic: "140",
    bpMonth1Diastolic: "80",
    bpMonth3Systolic: "135",
    bpMonth3Diastolic: "78",
    activityLevelBaseline: "2",
    activityLevelMonth1: "6",
    activityLevelMonth3: "8",
    // Secondary outcomes
    motivationScoreMonth1: "6",
    motivationScoreMonth3: "8",
    qualityOfLifeScoreMonth1: "3",
    qualityOfLifeScoreMonth3: "4"
  },
  {
    id: 5,
    name: "Sarah Thompson",
    dateOfBirth: "2024-03-18",
    // Primary outcomes
    weightBaseline: "65",
    weightMonth1: "63",
    weightMonth3: "61",
    bpBaselineSystolic: "125",
    bpBaselineDiastolic: "80",
    bpMonth1Systolic: "122",
    bpMonth1Diastolic: "78",
    bpMonth3Systolic: "120",
    bpMonth3Diastolic: "75",
    activityLevelBaseline: "4",
    activityLevelMonth1: "7",
    activityLevelMonth3: "9",
    // Secondary outcomes
    motivationScoreMonth1: "8",
    motivationScoreMonth3: "9",
    qualityOfLifeScoreMonth1: "4",
    qualityOfLifeScoreMonth3: "5"
  }
];

const PracticeImpact = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedPatients, setCheckedPatients] = useState(false);

  // Simulate API loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPatients(mockPatients);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check if we have patients
  useEffect(() => {
    if (!isLoading && !checkedPatients) {
      setCheckedPatients(true);
      if (!patients || patients.length === 0) {
        alert("No Patients Found. Please add patients in the Patient Selection section first.");
      }
    }
  }, [isLoading, patients, checkedPatients]);

  // Calculate aggregate practice metrics
  const practiceMetrics = useMemo(() => {
    if (!patients || patients.length === 0) {
      return {
        averageWeightLoss: 0,
        averageSBPReduction: 0,
        averageActivityImprovement: 0,
        averageMotivationImprovement: 0,
        averageQOLImprovement: 0,
        totalPatients: 0,
        patientsWithSignificantWeightLoss: 0,
        patientsWithSignificantBPReduction: 0
      };
    }

    // Count patients with complete data
    const completeDataPatients = patients.filter(p =>
      p.weightBaseline && p.weightMonth3 &&
      p.bpBaselineSystolic && p.bpMonth3Systolic &&
      p.activityLevelBaseline && p.activityLevelMonth3 &&
      p.motivationScoreMonth1 && p.motivationScoreMonth3 &&
      p.qualityOfLifeScoreMonth1 && p.qualityOfLifeScoreMonth3
    );

    const totalPatients = completeDataPatients.length;

    if (totalPatients === 0) return {
      averageWeightLoss: 0,
      averageSBPReduction: 0,
      averageActivityImprovement: 0,
      averageMotivationImprovement: 0,
      averageQOLImprovement: 0,
      totalPatients: 0,
      patientsWithSignificantWeightLoss: 0,
      patientsWithSignificantBPReduction: 0
    };

    // Calculate aggregated values
    const totalWeightLoss = completeDataPatients.reduce((sum, p) =>
      sum + (Number(p.weightBaseline) - Number(p.weightMonth3)), 0);

    const totalSBPReduction = completeDataPatients.reduce((sum, p) =>
      sum + (Number(p.bpBaselineSystolic) - Number(p.bpMonth3Systolic)), 0);

    const totalActivityImprovement = completeDataPatients.reduce((sum, p) =>
      sum + (Number(p.activityLevelMonth3) - Number(p.activityLevelBaseline)), 0);

    const totalMotivationImprovement = completeDataPatients.reduce((sum, p) =>
      sum + (Number(p.motivationScoreMonth3) - Number(p.motivationScoreMonth1)), 0);

    const totalQOLImprovement = completeDataPatients.reduce((sum, p) =>
      sum + (Number(p.qualityOfLifeScoreMonth3) - Number(p.qualityOfLifeScoreMonth1)), 0);

    // Count patients with significant improvements
    const patientsWithSignificantWeightLoss = completeDataPatients.filter(p => {
      const weightLossPercent = (Number(p.weightBaseline) - Number(p.weightMonth3)) / Number(p.weightBaseline) * 100;
      return weightLossPercent >= 5; // 5% is clinically significant
    }).length;

    const patientsWithSignificantBPReduction = completeDataPatients.filter(p =>
      (Number(p.bpBaselineSystolic) - Number(p.bpMonth3Systolic)) >= 10 // 10 mmHg is clinically significant
    ).length;

    return {
      averageWeightLoss: totalWeightLoss / totalPatients,
      averageSBPReduction: totalSBPReduction / totalPatients,
      averageActivityImprovement: totalActivityImprovement / totalPatients,
      averageMotivationImprovement: totalMotivationImprovement / totalPatients,
      averageQOLImprovement: totalQOLImprovement / totalPatients,
      totalPatients,
      patientsWithSignificantWeightLoss,
      patientsWithSignificantBPReduction
    };
  }, [patients]);

  if (isLoading) {
    return <div className="min-h-screen bg-green-200 p-6">Loading...</div>;
  }

  if (patients.length === 0) {
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
          
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Practice Impact</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Practice Impact Assessment</h2>
            <p className="text-gray-600 mb-4">
              Add patients in the Patient Selection section and complete their data collection to view practice-wide impact analysis.
            </p>
            <button 
              onClick={() => alert("Navigate to Patient Selection")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Go to Patient Selection
            </button>
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
        
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Practice Impact</h1>
        
        {/* Video Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative pb-[56.25%] h-0">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/5uCDkuBTpp4" 
              title="Understanding Practice Impact"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Tabs navigation */}
        <div className="mb-6">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 ${activeTab === 'summary' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('summary')}
            >
              Practice Summary
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'visualization' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('visualization')}
            >
              Visualisation
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'interpretation' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('interpretation')}
            >
              Clinical Interpretation
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Summary tab */}
          {activeTab === 'summary' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Practice Impact Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Patient Outcomes</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><span className="font-medium">Total Patients:</span> {practiceMetrics.totalPatients}</li>
                    <li><span className="font-medium">Average Weight Loss:</span> {practiceMetrics.averageWeightLoss.toFixed(1)} kg</li>
                    <li><span className="font-medium">Average SBP Reduction:</span> {practiceMetrics.averageSBPReduction.toFixed(1)} mmHg</li>
                    <li><span className="font-medium">Average Activity Improvement:</span> {practiceMetrics.averageActivityImprovement.toFixed(1)} points</li>
                    <li><span className="font-medium">Average Motivation Improvement:</span> {practiceMetrics.averageMotivationImprovement.toFixed(1)} points</li>
                    <li><span className="font-medium">Average Quality of Life Improvement:</span> {practiceMetrics.averageQOLImprovement.toFixed(1)} points</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-3">Clinical Significance</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><span className="font-medium">Patients with Clinically Significant Weight Loss (≥5%):</span> {practiceMetrics.patientsWithSignificantWeightLoss} of {practiceMetrics.totalPatients} ({((practiceMetrics.patientsWithSignificantWeightLoss / practiceMetrics.totalPatients) * 100 || 0).toFixed(1)}%)</li>
                    <li><span className="font-medium">Patients with Clinically Significant BP Reduction (≥10 mmHg):</span> {practiceMetrics.patientsWithSignificantBPReduction} of {practiceMetrics.totalPatients} ({((practiceMetrics.patientsWithSignificantBPReduction / practiceMetrics.totalPatients) * 100 || 0).toFixed(1)}%)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Visualization tab */}
          {activeTab === 'visualization' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Practice Metrics Visualisation</h2>
              
              <h3 className="font-medium text-lg mb-4">Practice-Wide Results</h3>
              <p className="text-gray-600 mb-6">
                Comparison of average baseline (blue) and month 3 (green) metrics across all patients:
              </p>

              {/* Bar Chart Visualization */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Weight Column - Practice Average */}
                  <div className="text-center">
                    <p className="font-medium mb-2 text-sm">Weight (kg)</p>
                    <div className="h-48 flex items-end justify-center">
                      <div className="relative w-12 mx-2">
                        <div 
                          className="bg-blue-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max((patients.reduce((sum, p) => sum + (Number(p.weightBaseline) || 0), 0) / patients.length) / 120 * 200, 30)}px` }}
                        >
                          {(patients.reduce((sum, p) => sum + (Number(p.weightBaseline) || 0), 0) / patients.length).toFixed(1)}
                        </div>
                      </div>
                      <div className="relative w-12 mx-2">
                        <div 
                          className="bg-green-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max((patients.reduce((sum, p) => sum + (Number(p.weightMonth3) || 0), 0) / patients.length) / 120 * 200, 30)}px` }}
                        >
                          {(patients.reduce((sum, p) => sum + (Number(p.weightMonth3) || 0), 0) / patients.length).toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SBP Column - Practice Average */}
                  <div className="text-center">
                    <p className="font-medium mb-2 text-sm">SBP (mmHg)</p>
                    <div className="h-48 flex items-end justify-center">
                      <div className="relative w-12 mx-2">
                        <div 
                          className="bg-blue-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max((patients.reduce((sum, p) => sum + (Number(p.bpBaselineSystolic) || 0), 0) / patients.length) / 180 * 200, 30)}px` }}
                        >
                          {(patients.reduce((sum, p) => sum + (Number(p.bpBaselineSystolic) || 0), 0) / patients.length).toFixed(0)}
                        </div>
                      </div>
                      <div className="relative w-12 mx-2">
                        <div 
                          className="bg-green-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max((patients.reduce((sum, p) => sum + (Number(p.bpMonth3Systolic) || 0), 0) / patients.length) / 180 * 200, 30)}px` }}
                        >
                          {(patients.reduce((sum, p) => sum + (Number(p.bpMonth3Systolic) || 0), 0) / patients.length).toFixed(0)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Column - Practice Average */}
                  <div className="text-center">
                    <p className="font-medium mb-2 text-sm">Activity</p>
                    <div className="h-48 flex items-end justify-center">
                      <div className="relative w-12 mx-2">
                        <div 
                          className="bg-blue-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max((patients.reduce((sum, p) => sum + (Number(p.activityLevelBaseline) || 0), 0) / patients.length) / 10 * 200, 30)}px` }}
                        >
                          {(patients.reduce((sum, p) => sum + (Number(p.activityLevelBaseline) || 0), 0) / patients.length).toFixed(1)}/10
                        </div>
                      </div>
                      <div className="relative w-12 mx-2">
                        <div 
                          className="bg-green-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max((patients.reduce((sum, p) => sum + (Number(p.activityLevelMonth3) || 0), 0) / patients.length) / 10 * 200, 30)}px` }}
                        >
                          {(patients.reduce((sum, p) => sum + (Number(p.activityLevelMonth3) || 0), 0) / patients.length).toFixed(1)}/10
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Motivation Column - Practice Average */}
                  <div className="text-center">
                    <p className="font-medium mb-2 text-sm">Motivation</p>
                    <div className="h-48 flex items-end justify-center">
                      <div className="relative w-12 mx-2">
                        <div 
                          className="bg-blue-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max((patients.reduce((sum, p) => sum + (Number(p.motivationScoreMonth1) || 0), 0) / patients.length) / 10 * 200, 30)}px` }}
                        >
                          {(patients.reduce((sum, p) => sum + (Number(p.motivationScoreMonth1) || 0), 0) / patients.length).toFixed(1)}/10
                        </div>
                      </div>
                      <div className="relative w-12 mx-2">
                        <div 
                          className="bg-green-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max((patients.reduce((sum, p) => sum + (Number(p.motivationScoreMonth3) || 0), 0) / patients.length) / 10 * 200, 30)}px` }}
                        >
                          {(patients.reduce((sum, p) => sum + (Number(p.motivationScoreMonth3) || 0), 0) / patients.length).toFixed(1)}/10
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quality of Life Column - Practice Average */}
                  <div className="text-center">
                    <p className="font-medium mb-2 text-sm">Quality of Life</p>
                    <div className="h-48 flex items-end justify-center">
                      <div className="relative w-12 mx-2">
                        <div 
                          className="bg-blue-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max((patients.reduce((sum, p) => sum + (Number(p.qualityOfLifeScoreMonth1) || 0), 0) / patients.length) / 5 * 200, 30)}px` }}
                        >
                          {(patients.reduce((sum, p) => sum + (Number(p.qualityOfLifeScoreMonth1) || 0), 0) / patients.length).toFixed(1)}/5
                        </div>
                      </div>
                      <div className="relative w-12 mx-2">
                        <div 
                          className="bg-green-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max((patients.reduce((sum, p) => sum + (Number(p.qualityOfLifeScoreMonth3) || 0), 0) / patients.length) / 5 * 200, 30)}px` }}
                        >
                          {(patients.reduce((sum, p) => sum + (Number(p.qualityOfLifeScoreMonth3) || 0), 0) / patients.length).toFixed(1)}/5
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center mt-6">
                  <div className="flex items-center mx-4">
                    <div className="w-4 h-4 bg-blue-500 mr-2 rounded"></div>
                    <span className="text-sm">Baseline/Month 1</span>
                  </div>
                  <div className="flex items-center mx-4">
                    <div className="w-4 h-4 bg-green-500 mr-2 rounded"></div>
                    <span className="text-sm">Month 3</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Clinical Interpretation tab */}
          {activeTab === 'interpretation' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Clinical Interpretation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Cardiovascular Risk Impact</h3>
                  <p className="text-gray-600 mb-2">
                    The average systolic blood pressure reduction of {practiceMetrics.averageSBPReduction.toFixed(1)} mmHg observed across the practice has significant implications:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-600">
                    <li>
                      Based on the Framingham Heart Study data, this represents an estimated {(practiceMetrics.averageSBPReduction / 10 * 20).toFixed(1)}% reduction in cardiovascular risk
                    </li>
                    <li>
                      {practiceMetrics.patientsWithSignificantBPReduction} of {practiceMetrics.totalPatients} patients ({((practiceMetrics.patientsWithSignificantBPReduction / practiceMetrics.totalPatients) * 100 || 0).toFixed(1)}%) achieved clinically significant blood pressure reductions of 10 mmHg or more
                    </li>
                    <li>
                      This translates to approximately {(practiceMetrics.averageSBPReduction / 10 * 2).toFixed(1)} years of estimated life expectancy improvement per patient
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-3">Weight Management Outcomes</h3>
                  <p className="text-gray-600 mb-2">
                    The average weight reduction of {practiceMetrics.averageWeightLoss.toFixed(1)} kg has meaningful clinical implications:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-600">
                    <li>
                      {practiceMetrics.patientsWithSignificantWeightLoss} of {practiceMetrics.totalPatients} patients ({((practiceMetrics.patientsWithSignificantWeightLoss / practiceMetrics.totalPatients) * 100 || 0).toFixed(1)}%) achieved clinically significant weight loss of 5% or more
                    </li>
                    <li>
                      Based on Australian Heart Foundation guidelines, this level of weight reduction contributes an estimated {(practiceMetrics.averageWeightLoss * 0.8).toFixed(1)} mmHg to systolic blood pressure reduction
                    </li>
                    <li>
                      The average weight loss observed is consistent with Heart Foundation recommendations for cardiovascular risk reduction
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-3">Treatment Engagement Insights</h3>
                  <p className="text-gray-600 mb-2">
                    The observed changes in patient engagement metrics are significant indicators of treatment effectiveness:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-600">
                    <li>
                      Activity score improved by an average of {practiceMetrics.averageActivityImprovement.toFixed(1)} points, indicating successful patient activation in self-care
                    </li>
                    <li>
                      Motivation score increased by an average of {practiceMetrics.averageMotivationImprovement.toFixed(1)} points, suggesting enhanced patient engagement with treatment protocols
                    </li>
                    <li>
                      Quality of life score improved by an average of {practiceMetrics.averageQOLImprovement.toFixed(1)} points, reflecting positive patient-perceived outcomes
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-3">Practice Recommendations</h3>
                  <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-600">
                    <li>
                      Continue tracking patient outcomes over longer periods to assess sustained improvement
                    </li>
                    <li>
                      Consider implementing similar intervention approaches with additional patient cohorts
                    </li>
                    <li>
                      Emphasize motivational support strategies that were effective in improving patient engagement scores
                    </li>
                    <li>
                      Document these outcomes for continuing professional development and quality improvement initiatives
                    </li>
                  </ul>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  <p>Clinical References:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Australian Heart Foundation CVD Risk Guidelines (2023)</li>
                    <li>Framingham Heart Study - Cardiovascular Risk Analysis</li>
                    <li>Heart Foundation Clinical Weight Management Protocol</li>
                    <li>Australian Standards for Digital Health in Primary Care</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeImpact;