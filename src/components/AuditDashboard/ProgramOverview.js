import React from 'react';

const ProgramOverview = () => {
  return (
    <div className="min-h-screen bg-green-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
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

        {/* Page title */}
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Program Overview</h1>

        {/* Video embed */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative pb-[56.25%] h-0">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/RTEVUAz9g0I" 
              title="Mini Clinical Audit Introduction"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Study Overview section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Study Overview</h2>
          
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-4"></div>
              </div>
              <div>
                <span className="font-bold">Title:</span> Mini Clinical Audit: Rapid Impact Assessment of "Keep Going Care" (KGC) on Patient Compliance and Adherence to Doctor's Care Plan Directives
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-4"></div>
              </div>
              <div>
                <span className="font-bold">Objective:</span> Quick self-evaluation of doctor's lifestyle interventions effectiveness using TGA approved Type 1 SaMD "Keep Going Care - KGC Assistant"
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-4"></div>
              </div>
              <div>
                <span className="font-bold">Duration:</span> 3 months
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-4"></div>
              </div>
              <div>
                <span className="font-bold">Type:</span> Self-reported, prospective mini clinical audit
              </div>
            </div>
          </div>
        </div>

        {/* Participants section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Participants</h2>
          
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-4"></div>
              </div>
              <div>
                <span className="font-bold">Healthcare Providers:</span> Australian General Practitioners seeking quick, meaningful CPD
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-4"></div>
                </div>
                <div>
                  <span className="font-bold">Patient Criteria:</span>
                </div>
              </div>
              
              <div className="ml-6 mt-3 space-y-3">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-300 mr-4"></div>
                  </div>
                  <div>
                    At risk for or with mild cardiometabolic issues
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-300 mr-4"></div>
                  </div>
                  <div>
                    Able to engage with KGC
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-300 mr-4"></div>
                  </div>
                  <div>
                    Number: 5 patients per GP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outcome Measures section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Outcome Measures</h2>
          
          <div className="space-y-6">
            <div className="flex flex-col">
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-4"></div>
                </div>
                <div>
                  <span className="font-bold">Primary Outcomes:</span>
                </div>
              </div>
              
              <div className="ml-6 mt-3 space-y-3">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-300 mr-4"></div>
                  </div>
                  <div>
                    Weight: Baseline, 1 month, and 3 months
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-300 mr-4"></div>
                  </div>
                  <div>
                    Blood Pressure: Self-monitored or GP-measured
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-300 mr-4"></div>
                  </div>
                  <div>
                    Activity Levels: Weekly steps/exercise sessions via KGC
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-4"></div>
                </div>
                <div>
                  <span className="font-bold">Secondary Outcomes:</span>
                </div>
              </div>
              
              <div className="ml-6 mt-3 space-y-3">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-300 mr-4"></div>
                  </div>
                  <div>
                    Motivation Score: Monthly scale 1-10
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-300 mr-4"></div>
                  </div>
                  <div>
                    Quality of Life: Single-item score 1-5
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Allocation section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Time Allocation</h2>
          
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-4"></div>
              </div>
              <div>
                <span className="font-bold">Data Collection & Review:</span> 2 hours (spread across 3 months)
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-4"></div>
              </div>
              <div>
                <span className="font-bold">Reflection and Reporting:</span> 3 hours (concentrated at the end)
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-4"></div>
              </div>
              <div>
                <span className="font-bold">Total CPD Hours:</span> 5 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramOverview;