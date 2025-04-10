// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import DoctorDashboard from './components/doctor/DoctorDashboard';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import ChatBot from './components/ChatBot';
// import PatientProfile from './components/PatientView';
// import LandingPage from './components/LandingPage';
// import ProtectedRoute from './components/ProtectedRoute';
// import { useAuth } from './context/AuthContext';
// import AdminDashboard from './components/admin/Admin';
// import ProgressReport from './components/doctor/ProgressReport';
// import Motivation from './components/Features/MotivationImage';
// import MedicationSearch from './components/Features/MedicationSearch';
// // import ProtectedRoute from './components/Auth/ProtectedRoute';
// import AppLayout from './components/Layout/AppLayout';
// import DietLogistics from './components/Features/DietLogistic';
// import ExerciseWellnessSupport from './components/Features/FitnessFinder';
// import RecipeExplorer from './components/Features/SearchRecipes';
// import SavedRecipes from './components/Features/SavedRecipies';
// import ExerciseRecommender from './components/Features/InspirationEW';

// function App() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         {/* <Route path='/admin' element={<AdminDashboard />} /> */}

//         {/* Patient routes */}
//         <Route
//           path="/chatbot"
//           element={
//             <ProtectedRoute requiredRole="patient">
//                <AppLayout>
//                 <ChatBot />
//                </AppLayout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/motivation-image"
//           element={
//             <ProtectedRoute requiredRole="patient">
//               <Motivation />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/medication-search"
//           element={
//             <ProtectedRoute requiredRole="patient">
//               <MedicationSearch />
//             </ProtectedRoute>
//           }
//         />
//          <Route
//           path="/diet-logistics"
//           element={
//             <ProtectedRoute requiredRole="patient">
//               <DietLogistics />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/gym-finder"
//           element={
//             <ProtectedRoute requiredRole="patient">
//               <ExerciseWellnessSupport />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/search-recipies"
//           element={
//             <ProtectedRoute requiredRole="patient">
//               <RecipeExplorer />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/saved-recipies"
//           element={
//             <ProtectedRoute requiredRole="patient">
//               <SavedRecipes />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/inspiration-machine-ew"
//           element={
//             <ProtectedRoute requiredRole="patient">
//               <ExerciseRecommender />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/patient-profile"
//           element={
//             <ProtectedRoute requiredRole="patient">
//               <PatientProfile />
//             </ProtectedRoute>
//           }
//         />


//         {/* Doctor routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute requiredRole="doctor">
//               <DoctorDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/progress-report"
//           element={
//             <ProtectedRoute requiredRole="doctor">
//               <ProgressReport />
//             </ProtectedRoute>
//           }
//         />
//         {/* Doctor routes */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute requiredRole="admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Redirect unauthorized users */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ChatBot from './components/ChatBot';
import PatientProfile from './components/PatientView';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import AdminDashboard from './components/admin/Admin';
import ProgressReport from './components/doctor/ProgressReport';
import Motivation from './components/Features/MotivationImage';
import MedicationSearch from './components/Features/MedicationSearch';
import AppLayout from './components/Layout/AppLayout';
import DietLogistics from './components/Features/DietLogistic';
import ExerciseWellnessSupport from './components/Features/FitnessFinder';
import RecipeExplorer from './components/Features/SearchRecipes';
import SavedRecipes from './components/Features/SavedRecipies';
import ExerciseRecommender from './components/Features/InspirationEW';
import PrivacyPolicyModal from './components/PrivacyPolicyModal'; // Import the modal
import MiniClinicalAuditDashboard from './components/AuditDashboard/LandingAuditDashboard';
import ProgramOverview from './components/AuditDashboard/ProgramOverview';
import PatientSelection from './components/AuditDashboard/PatientSelection';
import PrimaryOutcomesDataCollection from './components/AuditDashboard/PrimaryOutcome';
import SecondaryOutcomesDataCollection from './components/AuditDashboard/SecondaryOutcome';
import Analysis from './components/AuditDashboard/Analysis';
import FinalReflection from './components/AuditDashboard/FinalReflection';
import Practice from './components/AuditDashboard/PracticeImpact';
import PracticeImpact from './components/AuditDashboard/PracticeImpact';
import Certification from './components/AuditDashboard/Certificate';

function App() {
  const { user, loading } = useAuth();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  useEffect(() => {
    // Check if user is logged in and hasn't accepted the privacy policy
    if (user && !loading) {
      const hasAcceptedPolicy = localStorage.getItem('privacyPolicyAccepted');
      if (!hasAcceptedPolicy) {
        setShowPrivacyPolicy(true);
      }
    }
  }, [user, loading]);

  const handlePolicyAccept = () => {
    setShowPrivacyPolicy(false);
    // If you want to track this in your backend, you could call an API here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {/* Show privacy policy modal if needed */}
      {showPrivacyPolicy && user && (
        <PrivacyPolicyModal onAccept={handlePolicyAccept} />
      )}
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path='/admin' element={<AdminDashboard />} /> */}

        {/* Patient routes */}
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute requiredRole="patient">
               <AppLayout>
                <ChatBot />
               </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/motivation-image"
          element={
            <ProtectedRoute requiredRole="patient">
              <Motivation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medication-search"
          element={
            <ProtectedRoute requiredRole="patient">
              <MedicationSearch />
            </ProtectedRoute>
          }
        />
         <Route
          path="/diet-logistics"
          element={
            <ProtectedRoute requiredRole="patient">
              <DietLogistics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gym-finder"
          element={
            <ProtectedRoute requiredRole="patient">
              <ExerciseWellnessSupport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search-recipies"
          element={
            <ProtectedRoute requiredRole="patient">
              <RecipeExplorer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-recipies"
          element={
            <ProtectedRoute requiredRole="patient">
              <SavedRecipes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inspiration-machine-ew"
          element={
            <ProtectedRoute requiredRole="patient">
              <ExerciseRecommender />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-profile"
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientProfile />
            </ProtectedRoute>
          }
        />


        {/* Doctor routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress-report"
          element={
            <ProtectedRoute requiredRole="doctor">
              <ProgressReport />
            </ProtectedRoute>
          }
        />
        {/* Doctor routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Mini Clinical Audit Dashboard  */}
        <Route
          path="/audit-dashboard"
          element={
            // <ProtectedRoute requiredRole="">
              <MiniClinicalAuditDashboard/>
            // {/* </ProtectedRoute> */}
          }
        />

        <Route
          path="/program-overview"
          element={
            // <ProtectedRoute requiredRole="">
              <ProgramOverview/>
            // {/* </ProtectedRoute> */}
          }
        />

        <Route
          path="/patient-selection"
          element={
            // <ProtectedRoute requiredRole="">
              <PatientSelection/>
            // {/* </ProtectedRoute> */}
          }
        />

        <Route
          path="/primary-outcomes"
          element={
            // <ProtectedRoute requiredRole="">
              <PrimaryOutcomesDataCollection />
            // {/* </ProtectedRoute> */}
          }
        />
        
        
        <Route
          path="/secondary-outcomes"
          element={
            // <ProtectedRoute requiredRole="">
              <SecondaryOutcomesDataCollection/>
            // {/* </ProtectedRoute> */}
          }
        />

        <Route
          path="/analysis"
          element={
            // <ProtectedRoute requiredRole="">
              <Analysis/>
            // {/* </ProtectedRoute> */}
          }
        />  

        <Route
          path="/practice-impact"
          element={
            // <ProtectedRoute requiredRole="">
              <PracticeImpact/>
            // {/* </ProtectedRoute> */}
          }
        />

        <Route
          path="/final-reflection"
          element={
            // <ProtectedRoute requiredRole="">
                <FinalReflection/>
            // {/* </ProtectedRoute> */}
          }
        />

        <Route
          path="/certification"
          element={
            // <ProtectedRoute requiredRole="">
              <Certification/>
            // {/* </ProtectedRoute> */}
          }
        />

        {/* Redirect unauthorized users */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;