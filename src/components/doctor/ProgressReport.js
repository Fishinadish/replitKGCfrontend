// import React, { useRef, useState, useEffect } from 'react';
// import { TrendingUp, TrendingDown, Minus, Activity, Bell, Clock, User, AlertCircle } from 'lucide-react';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
// import { useLocation } from 'react-router-dom';

// const ProgressReport = () => {
//   // const reportRef = useRef(null);
//   const reportContentRef = useRef(null);
//   const [patientData, setPatientData] = useState(null);
//   const routerLocation = useLocation();
//   const { selectedPatient } = routerLocation.state || {};

//   const patientId = selectedPatient?.id;

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const response = await fetch(`https://app.keepgoingcare.com/doctor/patient-report/${patientId}`);
//         const data = await response.json();

//         if (data.status === 'success') {
//           setPatientData(data.report);
//         } else {
//           console.error('Error fetching patient data:', data.error);
//         }
//       } catch (error) {
//         console.error('Error fetching patient data:', error);
//       }
//     };

//     fetchPatientData();
//   }, [patientId]);

//   if (!patientData) {
//     return <div>Loading...</div>;
//   }

//   const { patient_details, doctor_details, daily_self_scores } = patientData;

//   // Helper function to convert timestamp to "time ago" format
//   const getTimeAgo = (date) => {
//     const seconds = Math.floor((new Date() - date) / 1000);
//     const intervals = {
//       year: 31536000,
//       month: 2592000,
//       week: 604800,
//       day: 86400,
//       hour: 3600,
//       minute: 60,
//       second: 1
//     };

//     for (const [unit, secondsInUnit] of Object.entries(intervals)) {
//       const interval = Math.floor(seconds / secondsInUnit);
//       if (interval > 1) {
//         return `${interval} ${unit}s ago`;
//       } else if (interval === 1) {
//         return `${interval} ${unit} ago`;
//       }
//     }
//     return 'Just now';
//   };

//   // Function to get stress data with fallbacks
//   const getStressData = () => {
//     if (!patientData?.stress_button_usage) {
//       return {
//         totalPresses: 0,
//         weeklyAverage: 0,
//         commonTimes: [],
//         lastPressed: 'Never',
//         weeklyTrend: {
//           direction: 'stable',
//           percentage: 0
//         }
//       };
//     }

//     const {
//       total_presses,
//       weekly_average,
//       common_stress_times,
//       last_button_press
//     } = patientData.stress_button_usage;

//     // Calculate time difference for last pressed
//     const lastPressed = last_button_press ? 
//       getTimeAgo(new Date(last_button_press)) : 
//       'Never';

//     // Calculate weekly trend
//     const weeklyTrend = {
//       direction: weekly_average > 1.0 ? 'up' : 'down',
//       percentage: Math.abs(((weekly_average - 1.0) / 1.0) * 100).toFixed(1)
//     };

//     return {
//       totalPresses: total_presses || 0,
//       weeklyAverage: weekly_average || 0,
//       commonTimes: common_stress_times || [],
//       lastPressed,
//       weeklyTrend
//     };
//   };

//   const stressData = getStressData();

//   const priorityInsights = [
//     { type: 'error', message: 'Missed medication pattern: 3 doses in evening hours', icon: 'clock' },
//     { type: 'warning', message: 'Stress events peak before work meetings', icon: 'activity' },
//     { type: 'success', message: 'Consistent morning exercise routine established', icon: 'trending-up' }
//   ];

//   const lifeEvents = [
//     {
//       date: 'Apr 10',
//       title: 'Work Deadline',
//       impact: 'Stress button usage increased 3x',
//       type: 'negative'
//     },
//     {
//       date: 'Apr 5',
//       title: 'Started Morning Walks',
//       impact: 'Exercise scores improved by 15%',
//       type: 'positive'
//     }
//   ];

//   const getTrendIcon = (direction, size = 16) => {
//     switch (direction) {
//       case 'up':
//         return <TrendingUp size={size} />;
//       case 'down':
//         return <TrendingDown size={size} />;
//       default:
//         return <Minus size={size} />;
//     }
//   };

//   const getInsightIcon = (iconName) => {
//     switch (iconName) {
//       case 'clock':
//         return <Clock className="h-4 w-4 mr-2" />;
//       case 'activity':
//         return <Activity className="h-4 w-4 mr-2" />;
//       case 'trending-up':
//         return <TrendingUp className="h-4 w-4 mr-2" />;
//       default:
//         return null;
//     }
//   };

//   const getInsightColor = (type) => {
//     switch (type) {
//       case 'error':
//         return 'text-red-600';
//       case 'warning':
//         return 'text-amber-600';
//       case 'success':
//         return 'text-green-600';
//       default:
//         return 'text-gray-600';
//     }
//   };

//   const handleDownloadPDF = async () => {
//     const reportElement = reportContentRef.current;
  
//     if (reportElement) {
//       try {
//         const canvas = await html2canvas(reportElement, {
//           scale: 2,
//           useCORS: true,
//           logging: false,
//           removeContainer: true
//         });
        
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
        
//         const imgWidth = canvas.width;
//         const imgHeight = canvas.height;
//         const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        
//         const imgX = (pdfWidth - imgWidth * ratio) / 2;
//         const imgY = 0;
  
//         pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
//         pdf.save('Progress_Report.pdf');
//       } catch (error) {
//         console.error('Error generating PDF:', error);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-4xl p-6 space-y-6 bg-white shadow-lg rounded-lg" ref={reportContentRef}>
//         {/* Patient Details Section */}
//         <div className="border-b pb-4 mb-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//               <div className="bg-blue-100 rounded-full p-3">
//                 <User className="h-8 w-8 text-blue-600" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold">{patient_details.name}</h2>
//                 <p className="text-gray-600">
//                   {patient_details.age} years | {patient_details.condition}
//                 </p>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="font-semibold">Medical Record: {patient_details.id}</p>
//               <p className="text-gray-600">
//                 Treating Physician: {doctor_details.name}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Stress Button Usage Section */}
//         <div className="border rounded">
//           <div className="p-4 border-b">
//             <h3 className="text-lg font-semibold flex items-center">
//               <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
//               Stress Button Usage
//             </h3>
//           </div>
//           <div className="p-4">
//             <div className="grid grid-cols-2 gap-4">
//               {/* Left column with main stats */}
//               <div className="space-y-4">
//                 <div className="bg-red-50 p-4 rounded-lg">
//                   <div className="text-4xl font-bold text-red-600">
//                     {stressData.totalPresses}
//                   </div>
//                   <div className="text-sm text-gray-600">Total Button Presses</div>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <div className="flex justify-between items-center">
//                     <span>Weekly Average</span>
//                     {stressData.weeklyAverage > 0 && (
//                       <div className={`flex items-center ${getInsightColor(stressData.weeklyTrend.direction === 'down' ? 'success' : 'error')}`}>
//                         {getTrendIcon(stressData.weeklyTrend.direction)}
//                         <span className="ml-1">{stressData.weeklyTrend.percentage}%</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="text-2xl font-semibold mt-1">
//                     {stressData.weeklyAverage.toFixed(1)} presses
//                   </div>
//                 </div>
//               </div>
//               {/* Right column with details */}
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <div className="space-y-3">
//                   <div>
//                     <p className="text-sm text-gray-600">Common Stress Times</p>
//                     <div className="flex gap-2 mt-1 flex-wrap">
//                       {stressData.commonTimes.length > 0 ? (
//                         stressData.commonTimes.map((time, index) => (
//                           <span key={index} className="bg-white px-2 py-1 rounded text-sm">
//                             {time}
//                           </span>
//                         ))
//                       ) : (
//                         <span className="text-gray-500">No common times recorded</span>
//                       )}
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Last Button Press</p>
//                     <p className="font-semibold">{stressData.lastPressed}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Progress Summary */}
//         <div className="border rounded">
//           <div className="p-4 border-b">
//             <h3 className="text-lg font-semibold">Daily Self-Scores (Average)</h3>
//           </div>
//           <div className="p-4">
//             <div className="grid grid-cols-3 gap-4">
//               {Object.keys(daily_self_scores.average || {}).map((category) => (
//                 <div key={category} className="p-4 bg-blue-50 rounded-lg">
//                   <div className="flex justify-between items-center">
//                     <span className="font-semibold">{category}</span>
//                     <div className={`flex items-center ${getInsightColor(daily_self_scores.average[category] < daily_self_scores.average[Object.keys(daily_self_scores.average)[0]] ? 'error' : daily_self_scores.average[category] > daily_self_scores.average[Object.keys(daily_self_scores.average)[0]] ? 'success' : '')}`}>
//                       {getTrendIcon(daily_self_scores.average[category] < daily_self_scores.average[Object.keys(daily_self_scores.average)[0]] ? 'down' : daily_self_scores.average[category] > daily_self_scores.average[Object.keys(daily_self_scores.average)[0]] ? 'up' : 'stable')}
//                       <span className="ml-1">{((daily_self_scores.average[category] - daily_self_scores.average[Object.keys(daily_self_scores.average)[0]]) / daily_self_scores.average[Object.keys(daily_self_scores.average)[0]] * 100).toFixed(1)}%</span>
//                     </div>
//                   </div>
//                   <p className="text-2xl font-bold mt-2">{daily_self_scores.average[category].toFixed(1)}/10</p>
//                   <div className="h-8 mt-2 text-xs text-gray-500">
//                     {category === 'meals' ? 'Improving after meal plan adjustment' : 
//                      category === 'exercise' ? 'Declines on weekends' :
//                      'Consistent except evening doses'}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Priority Insights */}
//         <div className="border border-blue-200 bg-blue-50 p-4 rounded">
//           <Bell className="h-4 w-4 inline-block mr-2" />
//           <div className="ml-2 inline-block">
//             <p className="font-semibold">Priority Insights:</p>
//             <ul className="mt-2 space-y-1">
//               {priorityInsights.map((insight, index) => (
//                 <li key={index} className={`flex items-center ${getInsightColor(insight.type)}`}>
//                   {getInsightIcon(insight.icon)}
//                   {insight.message}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Life Events Timeline */}
//         <div className="border rounded">
//           <div className="p-4 border-b">
//             <h3 className="text-lg font-semibold">Life Events & Impact</h3>
//           </div>
//           <div className="p-4">
//             <div className="relative">
//               <div className="absolute h-full w-0.5 bg-gray-200 left-2"></div>
//               <div className="space-y-4 ml-8">
//                 {lifeEvents.map((event, index) => (
//                   <div key={index} className="relative">
//                     <div className={`absolute -left-6 w-4 h-4 rounded-full ${event.type === 'positive' ? 'bg-green-400' : 'bg-red-400'}`}></div>
//                     <div className={`${event.type === 'positive' ? 'bg-green-50' : 'bg-red-50'} p-3 rounded-lg`}>
//                       <p className="font-semibold">{event.title} ({event.date})</p>
//                       <p className="text-sm text-gray-600">{event.impact}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Download Button */}
//         <div className="mt-4">
//           <button 
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
//             onClick={handleDownloadPDF}
//           >
//             Download Report as PDF
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgressReport;  




import React, { useRef, useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Activity, Bell, Clock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation, useNavigate } from 'react-router-dom';

const ProgressReport = () => {
  // const reportRef = useRef(null);
  const reportContentRef = useRef(null);
  const [patientData, setPatientData] = useState(null);
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const { selectedPatient } = routerLocation.state || {};

  const patientId = selectedPatient?.id;

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`https://app.keepgoingcare.com/doctor/patient-report/${patientId}`);
        const data = await response.json();

        if (data.status === 'success') {
          setPatientData(data.report);
        } else {
          console.error('Error fetching patient data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [patientId]);

  if (!patientData) {
    return <div>Loading...</div>;
  }

  const { patient_details, doctor_details, daily_self_scores } = patientData;

  // Helper function to convert timestamp to "time ago" format
  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval > 1) {
        return `${interval} ${unit}s ago`;
      } else if (interval === 1) {
        return `${interval} ${unit} ago`;
      }
    }
    return 'Just now';
  };

  // Function to get stress data with fallbacks
  const getStressData = () => {
    if (!patientData?.stress_button_usage) {
      return {
        totalPresses: 0,
        weeklyAverage: 0,
        commonTimes: [],
        lastPressed: 'Never',
        weeklyTrend: {
          direction: 'stable',
          percentage: 0
        }
      };
    }

    const {
      total_presses,
      weekly_average,
      common_stress_times,
      last_button_press
    } = patientData.stress_button_usage;

    // Calculate time difference for last pressed
    const lastPressed = last_button_press ? 
      getTimeAgo(new Date(last_button_press)) : 
      'Never';

    // Calculate weekly trend
    const weeklyTrend = {
      direction: weekly_average > 1.0 ? 'up' : 'down',
      percentage: Math.abs(((weekly_average - 1.0) / 1.0) * 100).toFixed(1)
    };

    return {
      totalPresses: total_presses || 0,
      weeklyAverage: weekly_average || 0,
      commonTimes: common_stress_times || [],
      lastPressed,
      weeklyTrend
    };
  };

  const stressData = getStressData();

  const priorityInsights = [
    { type: 'error', message: 'Missed medication pattern: 3 doses in evening hours', icon: 'clock' },
    { type: 'warning', message: 'Stress events peak before work meetings', icon: 'activity' },
    { type: 'success', message: 'Consistent morning exercise routine established', icon: 'trending-up' }
  ];

  const lifeEvents = [
    {
      date: 'Apr 10',
      title: 'Work Deadline',
      impact: 'Stress button usage increased 3x',
      type: 'negative'
    },
    {
      date: 'Apr 5',
      title: 'Started Morning Walks',
      impact: 'Exercise scores improved by 15%',
      type: 'positive'
    }
  ];

  const getTrendIcon = (direction, size = 16) => {
    switch (direction) {
      case 'up':
        return <TrendingUp size={size} />;
      case 'down':
        return <TrendingDown size={size} />;
      default:
        return <Minus size={size} />;
    }
  };

  const getInsightIcon = (iconName) => {
    switch (iconName) {
      case 'clock':
        return <Clock className="h-4 w-4 mr-2" />;
      case 'activity':
        return <Activity className="h-4 w-4 mr-2" />;
      case 'trending-up':
        return <TrendingUp className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-amber-600';
      case 'success':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleDownloadPDF = async () => {
    const reportElement = reportContentRef.current;
  
    if (reportElement) {
      try {
        const canvas = await html2canvas(reportElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          removeContainer: true
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;
  
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('Progress_Report.pdf');
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl p-6 space-y-6 bg-white shadow-lg rounded-lg" ref={reportContentRef}>
        {/* Back Button and Patient Details Section */}
        <div className="border-b pb-4 mb-4">
          <button 
            onClick={handleGoBack}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back to Patients</span>
          </button>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-full p-3">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{patient_details.name}</h2>
                <p className="text-gray-600">
                  {patient_details.age} years | {patient_details.condition}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">Medical Record: {patient_details.id}</p>
              <p className="text-gray-600">
                Treating Doctor: {doctor_details.name}
              </p>
            </div>
          </div>
        </div>

        {/* Stress Button Usage Section */}
        <div className="border rounded">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              Stress Button Usage
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Left column with main stats */}
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-4xl font-bold text-red-600">
                    {stressData.totalPresses}
                  </div>
                  <div className="text-sm text-gray-600">Total Button Presses</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Weekly Average</span>
                    {stressData.weeklyAverage > 0 && (
                      <div className={`flex items-center ${getInsightColor(stressData.weeklyTrend.direction === 'down' ? 'success' : 'error')}`}>
                        {getTrendIcon(stressData.weeklyTrend.direction)}
                        <span className="ml-1">{stressData.weeklyTrend.percentage}%</span>
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-semibold mt-1">
                    {stressData.weeklyAverage.toFixed(1)} presses
                  </div>
                </div>
              </div>
              {/* Right column with details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Common Stress Times</p>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {stressData.commonTimes.length > 0 ? (
                        stressData.commonTimes.map((time, index) => (
                          <span key={index} className="bg-white px-2 py-1 rounded text-sm">
                            {time}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No common times recorded</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Button Press</p>
                    <p className="font-semibold">{stressData.lastPressed}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="border rounded">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Daily Self-Scores (Average)</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(daily_self_scores.average || {}).map((category) => (
                <div key={category} className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{category}</span>
                    <div className={`flex items-center ${getInsightColor(daily_self_scores.average[category] < daily_self_scores.average[Object.keys(daily_self_scores.average)[0]] ? 'error' : daily_self_scores.average[category] > daily_self_scores.average[Object.keys(daily_self_scores.average)[0]] ? 'success' : '')}`}>
                      {getTrendIcon(daily_self_scores.average[category] < daily_self_scores.average[Object.keys(daily_self_scores.average)[0]] ? 'down' : daily_self_scores.average[category] > daily_self_scores.average[Object.keys(daily_self_scores.average)[0]] ? 'up' : 'stable')}
                      <span className="ml-1">{((daily_self_scores.average[category] - daily_self_scores.average[Object.keys(daily_self_scores.average)[0]]) / daily_self_scores.average[Object.keys(daily_self_scores.average)[0]] * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-2">{daily_self_scores.average[category].toFixed(1)}/10</p>
                  <div className="h-8 mt-2 text-xs text-gray-500">
                    {category === 'meals' ? 'Improving after meal plan adjustment' : 
                     category === 'exercise' ? 'Declines on weekends' :
                     'Consistent except evening doses'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Insights */}
        <div className="border border-blue-200 bg-blue-50 p-4 rounded">
          <Bell className="h-4 w-4 inline-block mr-2" />
          <div className="ml-2 inline-block">
            <p className="font-semibold">Priority Insights:</p>
            <ul className="mt-2 space-y-1">
              {priorityInsights.map((insight, index) => (
                <li key={index} className={`flex items-center ${getInsightColor(insight.type)}`}>
                  {getInsightIcon(insight.icon)}
                  {insight.message}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Life Events Timeline */}
        <div className="border rounded">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Life Events & Impact</h3>
          </div>
          <div className="p-4">
            <div className="relative">
              <div className="absolute h-full w-0.5 bg-gray-200 left-2"></div>
              <div className="space-y-4 ml-8">
                {lifeEvents.map((event, index) => (
                  <div key={index} className="relative">
                    <div className={`absolute -left-6 w-4 h-4 rounded-full ${event.type === 'positive' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <div className={`${event.type === 'positive' ? 'bg-green-50' : 'bg-red-50'} p-3 rounded-lg`}>
                      <p className="font-semibold">{event.title} ({event.date})</p>
                      <p className="text-sm text-gray-600">{event.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Download Button */}
        <div className="mt-4">
          <button 
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            onClick={handleDownloadPDF}
          >
            Download Report as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressReport;