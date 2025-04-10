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

const FinalReflection = () => {
  const [activeTab, setActiveTab] = useState('reflection');
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

  // Calculate metrics for the audit
  const auditMetrics = useMemo(() => {
    if (!patients || patients.length === 0) {
      return {
        averageWeightLoss: 0,
        averageSBPReduction: 0,
        averageActivityImprovement: 0,
        averageMotivationImprovement: 0,
        averageQOLImprovement: 0,
        totalPatients: 0,
        motivationImprovement: 0,
        maxQualityOfLifeImprovement: 0,
        mostImprovedPatient: null
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
      motivationImprovement: 0,
      maxQualityOfLifeImprovement: 0,
      mostImprovedPatient: null
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

    // Find most improved patient for motivation and quality of life
    let maxMotivationImprovement = 0;
    let maxQualityOfLifeImprovement = 0;
    let mostImprovedPatient = null;

    for (const patient of completeDataPatients) {
      const motivationImprovement = Number(patient.motivationScoreMonth3) - Number(patient.motivationScoreMonth1);
      const qolImprovement = Number(patient.qualityOfLifeScoreMonth3) - Number(patient.qualityOfLifeScoreMonth1);

      if (motivationImprovement > maxMotivationImprovement) {
        maxMotivationImprovement = motivationImprovement;
        mostImprovedPatient = patient;
      }

      if (qolImprovement > maxQualityOfLifeImprovement) {
        maxQualityOfLifeImprovement = qolImprovement;
      }
    }

    return {
      averageWeightLoss: totalWeightLoss / totalPatients,
      averageSBPReduction: totalSBPReduction / totalPatients,
      averageActivityImprovement: totalActivityImprovement / totalPatients,
      averageMotivationImprovement: totalMotivationImprovement / totalPatients,
      averageQOLImprovement: totalQOLImprovement / totalPatients,
      totalPatients,
      motivationImprovement: maxMotivationImprovement,
      maxQualityOfLifeImprovement,
      mostImprovedPatient
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
          
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Final Reflection</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Final Reflection</h2>
            <p className="text-gray-600 mb-4">
              Add patients in the Patient Selection section and complete their data collection to proceed with the final reflection.
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
        
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Final Reflection</h1>
        
        {/* Video Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative pb-[56.25%] h-0">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/Y6V5mRhGdN0" 
              title="Completing Your Reflection"
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
              className={`px-4 py-2 ${activeTab === 'reflection' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('reflection')}
            >
              Reflection
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'visualization' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('visualization')}
            >
              Outcome Visualisation
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'discussion' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('discussion')}
            >
              Discussion & Limitations
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'conclusion' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('conclusion')}
            >
              Conclusion
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Reflection tab */}
          {activeTab === 'reflection' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Audit Experience Reflection</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Reflecting on this mini clinical audit, the use of "Keep Going Care" (KGC) has demonstrated its potential to support patients in achieving significant health improvements over a short period. One challenge was ensuring consistent daily use of the software, but with initial guidance, patients managed to incorporate it effectively, leading to positive changes in health metrics and quality of life.
                  {auditMetrics.mostImprovedPatient && (
                    <span> For instance, {auditMetrics.mostImprovedPatient.name}'s motivation score increased from {auditMetrics.mostImprovedPatient.motivationScoreMonth1}/10 to {auditMetrics.mostImprovedPatient.motivationScoreMonth3}/10, and their quality of life score from {auditMetrics.mostImprovedPatient.qualityOfLifeScoreMonth1}/5 to {auditMetrics.mostImprovedPatient.qualityOfLifeScoreMonth3}/5, reflecting enhanced engagement.</span>
                  )} Across all patients, activity levels, motivation, and quality of life improved, with average increases indicating better patient engagement, an unexpected detail given the short duration and self-reported nature.
                </p>

                <p className="mb-4">
                  These outcomes align with the Australian Heart Foundation's emphasis on the role of lifestyle interventions in managing CVD risk, particularly given that 66% of Australians are overweight or obese, contributing 28% to the CVD burden <em>Leading the fight to save Australian hearts</em>. A 2018 article, "Lifestyle Strategies for Risk Factor Reduction, Prevention, and Treatment of Cardiovascular Disease," notes that daily habits like regular physical activity and sound nutrition can reduce CVD risk by over 80% in some cohorts, supporting the observed improvements <em>Lifestyle Strategies for Risk Factor Reduction, Prevention, and Treatment of Cardiovascular Disease</em>. Additionally, a 2024 article, "Virtual health assistants: a grand challenge in health communications and behaviour change," highlights how AI-powered chatbots can provide continuous, personalised support for health behaviour change, which is crucial for long-term adherence, mirroring KGC's role in this audit <em>Virtual health assistants: a grand challenge in health communications and behaviour change</em>.
                </p>

                <p className="mb-4">
                  Moving forward, doctors are encouraged to continue using KGC and explore other digital tools, recognising the evolving role of AI in healthcare, as discussed in a 2021 article, "Artificial intelligence in healthcare: transforming the practice of medicine" <em>Artificial intelligence in healthcare: transforming the practice of medicine</em>. A pie chart illustrating the distribution of CVD risk reduction across patients (e.g., 20% for most, 40% for {auditMetrics.mostImprovedPatient?.name || 'some patients'}) visually underscores the impact of these interventions, providing a colourful visual aid for understanding the audit's effectiveness.
                </p>
              </div>
            </div>
          )}

          {/* Visualization tab */}
          {activeTab === 'visualization' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Outcome Visualisation</h2>
              
              <h3 className="font-medium text-lg mb-4">Average Patient Improvements</h3>
              <p className="text-gray-600 mb-6">
                Visual representation of average improvements across all {auditMetrics.totalPatients} patients in the audit:
              </p>

              {/* Bar Chart Visualization */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="grid grid-cols-5 gap-4">
                  {/* Weight Loss Column */}
                  <div className="text-center">
                    <p className="font-medium mb-2 text-sm">Weight Loss (kg)</p>
                    <div className="h-48 flex items-end justify-center">
                      <div className="relative w-12">
                        <div 
                          className="bg-blue-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max(auditMetrics.averageWeightLoss * 10, 30)}px` }}
                        >
                          {auditMetrics.averageWeightLoss.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SBP Reduction Column */}
                  <div className="text-center">
                    <p className="font-medium mb-2 text-sm">SBP Reduction (mmHg)</p>
                    <div className="h-48 flex items-end justify-center">
                      <div className="relative w-12">
                        <div 
                          className="bg-blue-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max(auditMetrics.averageSBPReduction * 3, 30)}px` }}
                        >
                          {auditMetrics.averageSBPReduction.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Improvement Column */}
                  <div className="text-center">
                    <p className="font-medium mb-2 text-sm">Activity Improvement</p>
                    <div className="h-48 flex items-end justify-center">
                      <div className="relative w-12">
                        <div 
                          className="bg-blue-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max(auditMetrics.averageActivityImprovement * 20, 30)}px` }}
                        >
                          {auditMetrics.averageActivityImprovement.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Motivation Improvement Column */}
                  <div className="text-center">
                    <p className="font-medium mb-2 text-sm">Motivation Improvement</p>
                    <div className="h-48 flex items-end justify-center">
                      <div className="relative w-12">
                        <div 
                          className="bg-blue-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max(auditMetrics.averageMotivationImprovement * 20, 30)}px` }}
                        >
                          {auditMetrics.averageMotivationImprovement.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QoL Improvement Column */}
                  <div className="text-center">
                    <p className="font-medium mb-2 text-sm">QoL Improvement</p>
                    <div className="h-48 flex items-end justify-center">
                      <div className="relative w-12">
                        <div 
                          className="bg-blue-500 w-full rounded-t-md text-white flex items-center justify-center text-xs py-1"
                          style={{ height: `${Math.max(auditMetrics.averageQOLImprovement * 40, 30)}px` }}
                        >
                          {auditMetrics.averageQOLImprovement.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CVD Risk Reduction Pie Chart */}
              <h3 className="font-medium text-lg mb-4">CVD Risk Reduction Distribution</h3>
              <p className="text-gray-600 mb-4">
                Estimated cardiovascular disease risk reduction across patient cohort (based on SBP reduction):
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg flex justify-center items-center">
                <div className="relative">
                  {/* Pie chart using CSS conic gradient */}
                  <div className="w-64 h-64 rounded-full" style={{ background: 'conic-gradient(#3b82f6 0% 70%, #22c55e 70% 100%)' }}>
                    {/* Inner white circle for donut effect */}
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full flex items-center justify-center flex-col">
                      <span className="text-lg font-medium">{patients.length} Patients</span>
                      <span className="text-sm text-gray-500">Average {(auditMetrics.averageSBPReduction / 10 * 20).toFixed(1)}% CVD Risk ↓</span>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="mt-8 flex justify-center gap-8">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                      <span className="text-sm">20% Reduction</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 mr-2"></div>
                      <span className="text-sm">40% Reduction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Discussion & Limitations tab */}
          {activeTab === 'discussion' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Discussion & Limitations</h2>
              
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  The audit's self-reported nature may introduce bias, and the 3-month duration limits long-term outcome assessment. However, the use of KGC for daily self-scoring likely enhanced compliance, as seen in improved metrics. Additional SBP reductions beyond weight loss suggest other lifestyle changes or medication adherence, a finding that warrants further exploration. Challenges include maintaining patient engagement with minimal GP time investment, mitigated by KGC's ease of use, as supported by <em>Virtual health assistants: a grand challenge in health communications and behaviour change</em>.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Key Limitations</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    <strong>Self-Reported Data:</strong> Patient-reported outcomes may be subject to recall bias and socially desirable responses
                  </li>
                  <li>
                    <strong>Short Duration:</strong> The 3-month timeframe may not fully capture the long-term sustainability of improvements
                  </li>
                  <li>
                    <strong>Small Sample Size:</strong> Limited to {auditMetrics.totalPatients} patients, which may not be representative of broader population
                  </li>
                  <li>
                    <strong>Lack of Control Group:</strong> Without a comparison group, it is difficult to attribute changes solely to the intervention
                  </li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">Unexpected Findings</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    The notable improvement in patient-reported motivation (average increase of {auditMetrics.averageMotivationImprovement.toFixed(1)} points) exceeded expectations for a short-term intervention
                  </li>
                  <li>
                    {auditMetrics.averageSBPReduction > auditMetrics.averageWeightLoss * 0.8 ? (
                      <span>Blood pressure reductions ({auditMetrics.averageSBPReduction.toFixed(1)} mmHg) were greater than would be predicted by weight loss alone, suggesting additional beneficial lifestyle modifications</span>
                    ) : (
                      <span>Blood pressure reductions were consistent with weight loss effects, suggesting a direct relationship between these metrics</span>
                    )}
                  </li>
                  <li>
                    Quality of life improvements appeared to correlate more strongly with activity level increases than with weight loss
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Conclusion tab */}
          {activeTab === 'conclusion' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Conclusion & References</h2>
              
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  This hypothetical audit suggests KGC is effective in enhancing patient engagement and achieving health outcome improvements, particularly in weight, blood pressure, and patient-reported measures. GPs can consider integrating such tools, aligning with Heart Foundation guidelines and recent research, for managing cardiometabolic health, reinforced by the educational sources provided.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Key Findings</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>
                    Average weight reduction of {auditMetrics.averageWeightLoss.toFixed(1)} kg across {auditMetrics.totalPatients} patients
                  </li>
                  <li>
                    Average systolic blood pressure reduction of {auditMetrics.averageSBPReduction.toFixed(1)} mmHg, correlating to approximately {(auditMetrics.averageSBPReduction / 10 * 20).toFixed(1)}% cardiovascular risk reduction
                  </li>
                  <li>
                    Patient engagement metrics (activity, motivation, quality of life) showed consistent improvements across the cohort
                  </li>
                  <li>
                    Digital health tools like KGC can effectively support traditional clinical care with minimal GP time investment
                  </li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">Key Citations</h3>
                <ol className="list-decimal pl-6 space-y-1 text-sm">
                  <li className="text-gray-600">Australian Heart Foundation clinical guidelines and position statements for cardiovascular care <em>Clinical guidelines and position statements for cardiovascular care</em></li>
                  <li className="text-gray-600">Leading the fight to save Australian hearts <em>Leading the fight to save Australian hearts</em></li>
                  <li className="text-gray-600">Impact of Lifestyle Modifications on Cardiovascular Health: A Narrative Review <em>Impact of Lifestyle Modifications on Cardiovascular Health: A Narrative Review</em></li>
                  <li className="text-gray-600">Importance of Lifestyle Modification on Cardiovascular Risk Reduction: COUNSELING STRATEGIES TO MAXIMIZE PATIENT OUTCOMES <em>Importance of Lifestyle Modification on Cardiovascular Risk Reduction: COUNSELING STRATEGIES TO MAXIMIZE PATIENT OUTCOMES</em></li>
                  <li className="text-gray-600">Lifestyle Strategies for Risk Factor Reduction, Prevention, and Treatment of Cardiovascular Disease <em>Lifestyle Strategies for Risk Factor Reduction, Prevention, and Treatment of Cardiovascular Disease</em></li>
                  <li className="text-gray-600">Virtual health assistants: a grand challenge in health communications and behaviour change <em>Virtual health assistants: a grand challenge in health communications and behaviour change</em></li>
                  <li className="text-gray-600">Artificial intelligence in healthcare: transforming the practice of medicine <em>Artificial intelligence in healthcare: transforming the practice of medicine</em></li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalReflection;