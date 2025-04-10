// import React, { useState } from 'react';

// const MiniClinicalAuditDashboard = () => {
//   const [activeTab, setActiveTab] = useState('introduction');
//   const youtubeVideoId = 'AitZI0VTYj8';

//   // Navigation function that actually routes to the page
//   const navigateTo = (path) => {
//     console.log(`Navigate to: ${path}`);
//     // Use direct navigation to ensure it works
//     window.location.href = path;
//   };

//   return (
//     <div className="min-h-screen bg-white p-6">
//       <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
//         {/* Header */}
//         <div className="p-6">
//           <div className="flex items-center mb-6">
//             <span className="text-yellow-400 mr-3 text-2xl">📁</span>
//             <h1 className="text-2xl font-bold text-blue-500">Mini Clinical Audit Dashboard</h1>
//           </div>

//           {/* Featured Video Section */}
//           <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
//             <h2 className="text-xl font-semibold mb-3 flex items-center">
//               <span className="text-red-500 mr-2">▶️</span> 
//               Featured Tutorial Video
//             </h2>
//             <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
//               <iframe 
//                 className="w-full h-96"
//                 src={`https://www.youtube.com/embed/${youtubeVideoId}`}
//                 title="Clinical Audit Tutorial Video"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </div>
//             <p className="mt-3 text-gray-600 text-sm">
//               This introductory video guides you through the clinical audit process and provides helpful tips for completing each section effectively.
//             </p>
//           </div>

//           {/* Tabs */}
//           <div className="bg-green-100 rounded-lg p-1 mb-8">
//             <div className="flex flex-wrap">
//               <button 
//                 className={`px-4 py-2 rounded-md transition-all flex items-center mr-2 ${
//                   activeTab === 'introduction' 
//                     ? 'bg-green-500 text-white' 
//                     : 'hover:bg-green-200'
//                 }`}
//                 onClick={() => setActiveTab('introduction')}
//               >
//                 <span className="mr-2">👋</span> Introduction
//               </button>
//               <button 
//                 className={`px-4 py-2 rounded-md transition-all flex items-center mr-2 ${
//                   activeTab === 'dataCollection' 
//                     ? 'bg-green-500 text-white' 
//                     : 'hover:bg-green-200'
//                 }`}
//                 onClick={() => setActiveTab('dataCollection')}
//               >
//                 <span className="mr-2">📋</span> Data Collection
//               </button>
//               <button 
//                 className={`px-4 py-2 rounded-md transition-all flex items-center mr-2 ${
//                   activeTab === 'analysis' 
//                     ? 'bg-green-500 text-white' 
//                     : 'hover:bg-green-200'
//                 }`}
//                 onClick={() => setActiveTab('analysis')}
//               >
//                 <span className="mr-2">📊</span> Analysis & Reflection
//               </button>
//               <button 
//                 className={`px-4 py-2 rounded-md transition-all flex items-center ${
//                   activeTab === 'completion' 
//                     ? 'bg-green-500 text-white' 
//                     : 'hover:bg-green-200'
//                 }`}
//                 onClick={() => setActiveTab('completion')}
//               >
//                 <span className="mr-2">📜</span> Completion & Certification
//               </button>
//             </div>
//           </div>
          
//           {/* Tab Content */}
//           <div>
//             {/* Introduction Tab Content */}
//             {activeTab === 'introduction' && (
//               <div className="space-y-8">
//                 <div>
//                   <h2 className="text-xl font-bold mb-2">Program Overview</h2>
//                   <p className="text-gray-600 mb-4">
//                     Study design, objectives, and expected outcomes for the 3-month mini clinical audit
//                   </p>
//                   <button 
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
//                     onClick={() => navigateTo('/program-overview')}
//                     data-testid="program-overview-btn"
//                   >
//                     Start Section →
//                   </button>
//                 </div>
                
//                 <hr className="border-gray-200" />
                
//                 <div>
//                   <h2 className="text-xl font-bold mb-2">Patient Selection Criteria</h2>
//                   <p className="text-gray-600 mb-4">
//                     Guidelines for selecting 5 suitable patients for the audit
//                   </p>
//                   <button 
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
//                     onClick={() => navigateTo('/patient-selection')}
//                   >
//                     Start Section →
//                   </button>
//                 </div>
                
//                 {/* Data Collection Tools section removed as requested */}
//               </div>
//             )}
            
//             {/* Data Collection Tab Content */}
//             {activeTab === 'dataCollection' && (
//               <div className="space-y-8">
//                 <div>
//                   <h2 className="text-xl font-bold mb-2">Primary Outcomes</h2>
//                   <p className="text-gray-600 mb-4">
//                     Collection and tracking of key health metrics
//                   </p>
//                   <button 
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
//                     onClick={() => navigateTo('/primary-outcomes')}
//                   >
//                     Start Section →
//                   </button>
//                 </div>
                
//                 <hr className="border-gray-200" />
                
//                 <div>
//                   <h2 className="text-xl font-bold mb-2">Secondary Outcomes</h2>
//                   <p className="text-gray-600 mb-4">
//                     Patient motivation and quality of life assessment
//                   </p>
//                   <button 
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
//                     onClick={() => navigateTo('/secondary-outcomes')}
//                   >
//                     Start Section →
//                   </button>
//                 </div>
//               </div>
//             )}
            
//             {/* Analysis Tab Content */}
//             {activeTab === 'analysis' && (
//               <div className="space-y-8">
//                 <div>
//                   <h2 className="text-xl font-bold mb-2">Data Analysis</h2>
//                   <p className="text-gray-600 mb-4">
//                     Review and interpret collected patient data
//                   </p>
//                   <button 
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
//                     onClick={() => navigateTo('/analysis')}
//                   >
//                     Start Section →
//                   </button>
//                 </div>
                
//                 <hr className="border-gray-200" />
                
//                 <div>
//                   <h2 className="text-xl font-bold mb-2">Practice Impact</h2>
//                   <p className="text-gray-600 mb-4">
//                     Reflection on implications for clinical practice
//                   </p>
//                   <button 
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
//                     onClick={() => navigateTo('/practice-impact')}
//                   >
//                     Start Section →
//                   </button>
//                 </div>
//               </div>
//             )}
            
//             {/* Completion Tab Content */}
//             {activeTab === 'completion' && (
//               <div className="space-y-8">
//                 <div>
//                   <h2 className="text-xl font-bold mb-2">Final Reflection</h2>
//                   <p className="text-gray-600 mb-4">
//                     Comprehensive reflection on the audit experience and learning outcomes
//                   </p>
//                   <button 
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
//                     onClick={() => navigateTo('/final-reflection')}
//                   >
//                     Start Section →
//                   </button>
//                 </div>
                
//                 <hr className="border-gray-200" />
                
//                 <div>
//                   <h2 className="text-xl font-bold mb-2">Certification</h2>
//                   <p className="text-gray-600 mb-4">
//                     Generate your CPD certificate for the completed audit
//                   </p>
//                   <button 
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
//                     onClick={() => navigateTo('/certification')}
//                   >
//                     Access Certificate →
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MiniClinicalAuditDashboard;


import React, { useState } from 'react';

const MiniClinicalAuditDashboard = () => {
  const [activeTab, setActiveTab] = useState('introduction');
  const youtubeVideoId = 'AitZI0VTYj8';

  // Navigation function that actually routes to the page
  const navigateTo = (path) => {
    console.log(`Navigate to: ${path}`);
    // Use direct navigation to ensure it works
    window.location.href = path;
  };

  // Function to handle "Return Back" action
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        {/* Header with Return Back Button */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-3 text-2xl">📁</span>
              <h1 className="text-2xl font-bold text-blue-500">Mini Clinical Audit Dashboard</h1>
            </div>
            <button 
              onClick={goBack} 
              className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors"
            >
              <span className="mr-2">←</span> Return Back
            </button>
          </div>

          {/* Featured Video Section */}
          <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <span className="text-red-500 mr-2">▶️</span> 
              Featured Tutorial Video
            </h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe 
                className="w-full h-96"
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                title="Clinical Audit Tutorial Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              This introductory video guides you through the clinical audit process and provides helpful tips for completing each section effectively.
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-green-100 rounded-lg p-1 mb-8">
            <div className="flex flex-wrap">
              <button 
                className={`px-4 py-2 rounded-md transition-all flex items-center mr-2 ${
                  activeTab === 'introduction' 
                    ? 'bg-green-500 text-white' 
                    : 'hover:bg-green-200'
                }`}
                onClick={() => setActiveTab('introduction')}
              >
                <span className="mr-2">👋</span> Introduction
              </button>
              <button 
                className={`px-4 py-2 rounded-md transition-all flex items-center mr-2 ${
                  activeTab === 'dataCollection' 
                    ? 'bg-green-500 text-white' 
                    : 'hover:bg-green-200'
                }`}
                onClick={() => setActiveTab('dataCollection')}
              >
                <span className="mr-2">📋</span> Data Collection
              </button>
              <button 
                className={`px-4 py-2 rounded-md transition-all flex items-center mr-2 ${
                  activeTab === 'analysis' 
                    ? 'bg-green-500 text-white' 
                    : 'hover:bg-green-200'
                }`}
                onClick={() => setActiveTab('analysis')}
              >
                <span className="mr-2">📊</span> Analysis & Reflection
              </button>
              <button 
                className={`px-4 py-2 rounded-md transition-all flex items-center ${
                  activeTab === 'completion' 
                    ? 'bg-green-500 text-white' 
                    : 'hover:bg-green-200'
                }`}
                onClick={() => setActiveTab('completion')}
              >
                <span className="mr-2">📜</span> Completion & Certification
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div>
            {/* Introduction Tab Content */}
            {activeTab === 'introduction' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-2">Program Overview</h2>
                  <p className="text-gray-600 mb-4">
                    Study design, objectives, and expected outcomes for the 3-month mini clinical audit
                  </p>
                  <button 
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                    onClick={() => navigateTo('/program-overview')}
                    data-testid="program-overview-btn"
                  >
                    Start Section →
                  </button>
                </div>
                
                <hr className="border-gray-200" />
                
                <div>
                  <h2 className="text-xl font-bold mb-2">Patient Selection Criteria</h2>
                  <p className="text-gray-600 mb-4">
                    Guidelines for selecting 5 suitable patients for the audit
                  </p>
                  <button 
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                    onClick={() => navigateTo('/patient-selection')}
                  >
                    Start Section →
                  </button>
                </div>
                
                {/* Data Collection Tools section removed as requested */}
              </div>
            )}
            
            {/* Data Collection Tab Content */}
            {activeTab === 'dataCollection' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-2">Primary Outcomes</h2>
                  <p className="text-gray-600 mb-4">
                    Collection and tracking of key health metrics
                  </p>
                  <button 
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                    onClick={() => navigateTo('/primary-outcomes')}
                  >
                    Start Section →
                  </button>
                </div>
                
                <hr className="border-gray-200" />
                
                <div>
                  <h2 className="text-xl font-bold mb-2">Secondary Outcomes</h2>
                  <p className="text-gray-600 mb-4">
                    Patient motivation and quality of life assessment
                  </p>
                  <button 
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                    onClick={() => navigateTo('/secondary-outcomes')}
                  >
                    Start Section →
                  </button>
                </div>
              </div>
            )}
            
            {/* Analysis Tab Content */}
            {activeTab === 'analysis' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-2">Data Analysis</h2>
                  <p className="text-gray-600 mb-4">
                    Review and interpret collected patient data
                  </p>
                  <button 
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                    onClick={() => navigateTo('/analysis')}
                  >
                    Start Section →
                  </button>
                </div>
                
                <hr className="border-gray-200" />
                
                <div>
                  <h2 className="text-xl font-bold mb-2">Practice Impact</h2>
                  <p className="text-gray-600 mb-4">
                    Reflection on implications for clinical practice
                  </p>
                  <button 
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                    onClick={() => navigateTo('/practice-impact')}
                  >
                    Start Section →
                  </button>
                </div>
              </div>
            )}
            
            {/* Completion Tab Content */}
            {activeTab === 'completion' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-2">Final Reflection</h2>
                  <p className="text-gray-600 mb-4">
                    Comprehensive reflection on the audit experience and learning outcomes
                  </p>
                  <button 
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                    onClick={() => navigateTo('/final-reflection')}
                  >
                    Start Section →
                  </button>
                </div>
                
                <hr className="border-gray-200" />
                
                <div>
                  <h2 className="text-xl font-bold mb-2">Certification</h2>
                  <p className="text-gray-600 mb-4">
                    Generate your CPD certificate for the completed audit
                  </p>
                  <button 
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                    onClick={() => navigateTo('/certification')}
                  >
                    Access Certificate →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniClinicalAuditDashboard;