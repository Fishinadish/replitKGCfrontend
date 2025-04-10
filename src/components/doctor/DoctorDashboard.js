// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { ArrowLeft, LogOut, UserCircle, Clipboard, Calendar, MessageSquare, Activity, ClipboardCheck } from 'lucide-react';
// import AddPatientModal from '../Modals/AddPatient'

// const DoctorDashboard = () => {
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [healthData, setHealthData] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const [doctorRemarks, setDoctorRemarks] = useState({
//     healthy_eating_plan: "",
//     exercise_wellness_routine: "",
//     prescribed_medication: "",
//   });
//   const [currentView, setCurrentView] = useState('dashboard'); 

//   const handleAddPatient = (patientData) => {
//     setIsLoading(true);
    
//     // Add doctor_id to the patient data
//     const enrichedPatientData = {
//       ...patientData,
//       doctor_id: user.user_id
//     };
    
//     // Send the data to your API
//     fetch('https://app.keepgoingcare.com/add_patient', {
//       method: 'POST',
//       headers: createAuthHeaders(),
//       body: JSON.stringify(enrichedPatientData)
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Failed to add patient');
//       }
//       return response.json();
//     })
//     .then(data => {
//       // Format the new patient to match the structure of existing patients
//       const newPatient = {
//         id: data.id,
//         name: data.name,
//         joined_date: data.joined_date || new Date().toISOString(),
//         score_count: 0,
//         message_count: 0,
//         remarks: data.remarks || "New patient"
//       };
      
//       // Add the new patient to the state
//       setPatients(prevPatients => [...prevPatients, newPatient]);
//       setIsModalOpen(false);
      
//       // Show success message
//       setShowSuccess(true);
//       setTimeout(() => setShowSuccess(false), 3000);
//     })
//     .catch(err => {
//       setError('Failed to add patient');
//     })
//     .finally(() => {
//       setIsLoading(false);
//     });
//   };

//   useEffect(() => {
//     // Check if user is logged in and is a doctor
//     if (!user || user.role !== 'doctor') {
//       navigate('/login');
//       return;
//     }
//     fetchPatients();
//   }, [user, navigate]);

//   const createAuthHeaders = () => ({
//     'Authorization': `Bearer ${user.token}`,
//     'Content-Type': 'application/json'
//   });

//   const handleUnauthorized = () => {
//     logout();
//     navigate('/login');
//   };

//   const fetchDoctorRemarks = async (patientId, doctorId) => {
//     try {
//       const response = await fetch(
//         `https://app.keepgoingcare.com/get_doctor_remarks?patient_id=${patientId}&doctor_id=${doctorId}`,
//         {
//           method: 'GET',
//           headers: createAuthHeaders(),
//         }
//       );

//       if (response.status === 401) {
//         handleUnauthorized();
//         return;
//       }

//       if (!response.ok) {
//         throw new Error('Failed to fetch doctor remarks');
//       }

//       const data = await response.json();
//       console.log("Doctor Remarks:", data)
//       if (data.status === 'success') {
//         setDoctorRemarks(data.remarks); // Save fetched remarks in state
//       } else {
//         setDoctorRemarks({
//           healthy_eating_plan: "",
//           exercise_wellness_routine: "",
//           prescribed_medication: "",
//         });
//       }
//     } catch (err) {
//       setError('Failed to fetch doctor remarks');
//     }
//   };

//   const fetchPatients = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch('https://app.keepgoingcare.com/doctor/dashboard', {
//         method: 'GET',
//         headers: createAuthHeaders()
//       });

//       if (response.status === 401) {
//         handleUnauthorized();
//         return;
//       }

//       if (!response.ok) {
//         throw new Error('Failed to fetch patients');
//       }

//       const data = await response.json();
//       setPatients(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPatientHealthData = async (patientId) => {
//     try {
//       const response = await fetch(`https://app.keepgoingcare.com/doctor/patient/health_data/${patientId}`, {
//         method: 'GET',
//         headers: createAuthHeaders()
//       });

//       if (response.status === 401) {
//         handleUnauthorized();
//         return;
//       }

//       if (!response.ok) {
//         throw new Error('Failed to fetch patient health data');
//       }

//       const data = await response.json();
//       console.log("Fetched health data:", data);

//       // Transform data for LineChart
//       const transformedData = data.scores_history.map(entry => {
//         const dateObj = new Date(entry.timestamp);
//         const formattedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
//         return {
//           date: formattedDate,
//           medication: entry.medication,
//           diet: entry.diet,
//           exercise: entry.exercise,
//         };
//       });

//       setHealthData(transformedData);
//       setSelectedPatient(prevPatient => ({ ...prevPatient, healthData: transformedData }));
//     } catch (err) {
//       setError('Failed to fetch patient health data');
//     }
//   };

//   const handlePatientSelect = (patient) => {
//     setSelectedPatient(patient);
//     console.log("Patient:", patient)
//     fetchPatientHealthData(patient.id);
//     fetchDoctorRemarks(patient.id, user.user_id)
//   };


//   const handleSaveHealthPoints = async (event) => {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData.entries());


//     try {
//       const response = await fetch(
//         `https://app.keepgoingcare.com/save_health_points/${selectedPatient.id}?user_id=${user.user_id}&role=${user.role}`,
//         {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${user.token}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(data)
//         }
//       );
//       console.log("saving points data", data)
//       if (response.status === 401) {
//         handleUnauthorized();
//         return;
//       }

//       if (!response.ok) {
//         throw new Error('Failed to save health points');
//       }

//       setShowSuccess(true);
//       setTimeout(() => setShowSuccess(false), 3000);
//     } catch (err) {
//       setError('Failed to save health points');
//     }
//   };

//   const LoadingSpinner = () => (
//     <div className="flex justify-center items-center p-8">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
//     </div>
//   );

//   const ErrorMessage = () => (
//     <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
//       <p className="text-red-700">{error}</p>
//       <button
//         onClick={() => error.includes('authentication') ? navigate('/login') : fetchPatients()}
//         className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
//       >
//         {error.includes('authentication') ? 'Go to Login' : 'Try again'}
//       </button>
//     </div>
//   );


//   const PatientListView = () => (
//     <div className="p-6 space-y-6">
//       <div className="bg-white rounded-xl shadow-sm border border-emerald-100">
//         {/* Header Section */}
//         <div className="bg-emerald-50 p-6 rounded-t-xl flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-extrabold text-emerald-800">Welcome, Doctor</h1>
//             <p className="text-sm text-emerald-600 mt-1">Your dashboard overview</p>
//           </div>
//           <div className="flex flex-col items-end">
//             {/* Buttons Container */}
//             <div className="flex space-x-3">
//               {/* Clinical Audit Dashboard Button */}
//               <button
//                 onClick={() => navigate('/audit-dashboard')}
//                 className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
//               >
//                 <ClipboardCheck size={18} />
//                 <span>Clinical Audit</span>
//               </button>
              
//               {/* Logout Button */}
//               <button
//                 onClick={logout}
//                 className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
//               >
//                 <LogOut size={18} />
//                 <span>Logout</span>
//               </button>
//             </div>

//             {/* Divider */}
//             <div className="border-t border-gray-300 w-full my-2"></div>

//             {/* Add Patient Button */}
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 w-full"
//             >
//               <UserCircle size={18} />
//               <span>Add Patient</span>
//             </button>
//           </div>
          
//           {/* Patient Added Success Message */}
//           {showSuccess && (
//             <div className="absolute top-4 right-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg shadow-md">
//               <p className="text-emerald-800">Patient added successfully!</p>
//             </div>
//           )}
          
//           <AddPatientModal
//             doctorId={user.user_id}
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//             onSubmit={handleAddPatient}
//             isLoading={isLoading}
//           />
//         </div>

//         {/* Main Content Section */}
//         <div className="p-6">
//           {error ? (
//             <ErrorMessage />
//           ) : loading ? (
//             <LoadingSpinner />
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {patients.map((patient) => (
//                 <div
//                   key={patient.id}
//                   className="border border-emerald-100 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all duration-200 bg-white hover:bg-emerald-50"
//                   onClick={() => handlePatientSelect(patient)}
//                 >
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                       <UserCircle className="text-emerald-600" size={24} />
//                       <h3 className="font-semibold text-lg text-emerald-800">{patient.name}</h3>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-emerald-600">
//                       <Calendar size={16} />
//                       <p>Joined: {new Date(patient.joined_date).toLocaleDateString()}</p>
//                     </div>
//                     <p className="text-sm text-emerald-700 line-clamp-2">{patient.remarks}</p>
//                     <div className="flex justify-between mt-2 pt-2 border-t border-emerald-100">
//                       <span className="flex items-center gap-1 text-sm text-emerald-600">
//                         <Activity size={16} /> {patient.score_count} scores
//                       </span>
//                       <span className="flex items-center gap-1 text-sm text-emerald-600">
//                         <MessageSquare size={16} /> {patient.message_count} Patient Alerts
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );


//   const PatientDetailView = () => (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <button
//           onClick={() => setSelectedPatient(null)}
//           className="text-emerald-600 hover:text-emerald-800 transition-colors flex items-center gap-2"
//         >
//           <ArrowLeft size={20} /> Back to Patient List
//         </button>

//         <div className="flex items-center space-x-3">
//           {/* Clinical Audit Dashboard Button */}
//           <button
//             onClick={() => navigate('/clinical-audit', { state: { selectedPatient } })}
//             className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
//           >
//             <ClipboardCheck size={18} />
//             <span>Clinical Audit</span>
//           </button>

//           {/* Progress Report Button */}
//           <button
//             onClick={() => navigate(`/progress-report`,  { state: { selectedPatient } })}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
//           >
//             <Clipboard size={18} />
//             <span>Patient Progress Report</span>
//           </button>

//           {/* Logout Button */}
//           <button
//             onClick={logout}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
//           >
//             <LogOut size={18} />
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>


//       {/* Patient Overview Card */}
//       <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
//         <div className="flex items-start justify-between mb-6">
//           <div className="space-y-2">
//             <div className="flex items-center gap-3">
//               <UserCircle className="text-emerald-600" size={32} />
//               <h2 className="text-2xl font-bold text-emerald-800">{selectedPatient.name}</h2>
//             </div>
//             <p className="text-emerald-600">Patient ID: #{selectedPatient.id}</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div className="bg-emerald-50 rounded-lg p-4">
//             <p className="text-sm text-emerald-600 mb-1">Joined Date</p>
//             <p className="font-medium text-emerald-800">
//               {new Date(selectedPatient.joined_date).toLocaleDateString()}
//             </p>
//           </div>
//           <div className="bg-emerald-50 rounded-lg p-4">
//             <p className="text-sm text-emerald-600 mb-1">Average Self-Score</p>
//             <p className="font-medium text-emerald-800">{selectedPatient.score_count}</p>
//           </div>
//           <div className="bg-emerald-50 rounded-lg p-4">
//             <p className="text-sm text-emerald-600 mb-1">Patient Alerts</p>
//             <p className="font-medium text-emerald-800">{selectedPatient.message_count}</p>
//           </div>
//         </div>
//       </div>

    
//       {/* Health Progress Graph */}
//       {healthData.length > 0 && (
//         <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
//           <h3 className="text-xl font-semibold mb-6 text-emerald-800">Health Progress</h3>
//           <div className="h-[400px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={healthData}>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="medication" stroke="#ff0000" name="Medication" />
//                 <Line type="monotone" dataKey="diet" stroke="#008080" name="Diet" />
//                 <Line type="monotone" dataKey="exercise" stroke="#0000ff" name="Exercise" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}

//       {/* Major Health Points Form */}
//       <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6 mt-6">
//         <h3 className="text-xl font-semibold mb-6 text-emerald-800">KGC Care Plan Directives</h3>
//         <form onSubmit={handleSaveHealthPoints} className="space-y-4">
//           {/* Healthy Eating Plan */}
//           <div className="bg-emerald-50 rounded-lg p-4">
//             <label className="block text-sm font-medium text-emerald-700 mb-2">
//               Healthy Eating Plan
//             </label>
//             <textarea
//               name="healthy_eating_plan"
//               placeholder="Enter details for Healthy Eating Plan..."
//               className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
//               rows={3}
//             />
//             <p className="text-m text-blue-600 bg-blue-50 border border-blue-100 rounded-md p-2 mt-2">
//               1. {doctorRemarks.healthy_eating_plan || "No remarks available"}
//             </p>
//           </div>

//           {/* Exercise and Wellness Routine */}
//           <div className="bg-emerald-50 rounded-lg p-4">
//             <label className="block text-sm font-medium text-emerald-700 mb-2">
//               Exercise and Wellness Routine
//             </label>
//             <textarea
//               name="exercise_wellness_routine"
//               placeholder="Enter details for Exercise and Wellness Routine..."
//               className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
//               rows={3}
//             />
//               <p className="text-m text-blue-600 bg-blue-50 border border-blue-100 rounded-md p-2 mt-2">
//               2. {doctorRemarks.exercise_wellness_routine || "No remarks available"}
//             </p>
//           </div>

//           {/* Prescribed Medications */}
//           <div className="bg-emerald-50 rounded-lg p-4">
//             <label className="block text-sm font-medium text-emerald-700 mb-2">
//               Prescribed Medications
//             </label>
//             <textarea
//               name="prescribed_medication"
//               placeholder="Enter details for Prescribed Medications..."
//               className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
//               rows={3}
//             />
//               <p className="text-m text-blue-600 bg-blue-50 border border-blue-100 rounded-md p-2 mt-2">
//               3. {doctorRemarks.prescribed_medication || "No remarks available"}
//             </p>
//           </div>


//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
//           >
//             Save Health Points
//           </button>

//         </form>
//         {/* Success Message */}
//         {showSuccess && (
//           <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
//             <p className="text-emerald-800">Health points saved successfully!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-7xl mx-auto bg-emerald-50/30 min-h-screen">
//       {selectedPatient ? <PatientDetailView /> : <PatientListView />}
//     </div>
//   );
// };

// export default DoctorDashboard;


import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, LogOut, UserCircle, Clipboard, Calendar, MessageSquare, Activity, ClipboardCheck } from 'lucide-react';
import AddPatientModal from '../Modals/AddPatient'

const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [healthData, setHealthData] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [doctorRemarks, setDoctorRemarks] = useState({
    healthy_eating_plan: "",
    exercise_wellness_routine: "",
    prescribed_medication: "",
  });
  const [currentView, setCurrentView] = useState('dashboard'); 

  const handleAddPatient = async (patientData) => {
    try {
      setIsLoading(true);
      
      // Add doctor_id to the patient data
      const enrichedPatientData = {
        ...patientData,
        doctor_id: user.user_id
      };
      
      // Send the data to your API
      const response = await fetch('https://app.keepgoingcare.com/add_patient', {
        method: 'POST',
        headers: createAuthHeaders(),
        body: JSON.stringify(enrichedPatientData)
      });

      if (!response.ok) {
        throw new Error('Failed to add patient');
      }

      const data = await response.json();
      console.log("API Response:", data); // Log the exact response
      
      // After successful patient creation, re-fetch all patients
      // This ensures we get the exact format expected by the component
      await fetchPatients();
      
      // Close modal and show success message
      setIsModalOpen(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Error adding patient:", err);
      setError('Failed to add patient');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if user is logged in and is a doctor
    if (!user || user.role !== 'doctor') {
      navigate('/login');
      return;
    }
    fetchPatients();
  }, [user, navigate]);

  const createAuthHeaders = () => ({
    'Authorization': `Bearer ${user.token}`,
    'Content-Type': 'application/json'
  });

  const handleUnauthorized = () => {
    logout();
    navigate('/login');
  };

  const fetchDoctorRemarks = async (patientId, doctorId) => {
    try {
      const response = await fetch(
        `https://app.keepgoingcare.com/get_doctor_remarks?patient_id=${patientId}&doctor_id=${doctorId}`,
        {
          method: 'GET',
          headers: createAuthHeaders(),
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch doctor remarks');
      }

      const data = await response.json();
      console.log("Doctor Remarks:", data)
      if (data.status === 'success') {
        setDoctorRemarks(data.remarks); // Save fetched remarks in state
      } else {
        setDoctorRemarks({
          healthy_eating_plan: "",
          exercise_wellness_routine: "",
          prescribed_medication: "",
        });
      }
    } catch (err) {
      setError('Failed to fetch doctor remarks');
    }
  };

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://app.keepgoingcare.com/doctor/dashboard', {
        method: 'GET',
        headers: createAuthHeaders()
      });

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }

      const data = await response.json();
      console.log("Fetched patients:", data); // Log the exact response
      setPatients(data);
      return data; // Return the data for use in other functions
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientHealthData = async (patientId) => {
    try {
      const response = await fetch(`https://app.keepgoingcare.com/doctor/patient/health_data/${patientId}`, {
        method: 'GET',
        headers: createAuthHeaders()
      });

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch patient health data');
      }

      const data = await response.json();
      console.log("Fetched health data:", data);

      // Transform data for LineChart
      const transformedData = data.scores_history.map(entry => {
        const dateObj = new Date(entry.timestamp);
        const formattedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
        return {
          date: formattedDate,
          medication: entry.medication,
          diet: entry.diet,
          exercise: entry.exercise,
        };
      });

      setHealthData(transformedData);
      setSelectedPatient(prevPatient => ({ ...prevPatient, healthData: transformedData }));
    } catch (err) {
      setError('Failed to fetch patient health data');
    }
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    console.log("Patient:", patient)
    fetchPatientHealthData(patient.id);
    fetchDoctorRemarks(patient.id, user.user_id)
  };


  const handleSaveHealthPoints = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());


    try {
      const response = await fetch(
        `https://app.keepgoingcare.com/save_health_points/${selectedPatient.id}?user_id=${user.user_id}&role=${user.role}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      );
      console.log("saving points data", data)
      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to save health points');
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save health points');
    }
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>
  );

  const ErrorMessage = () => (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
      <p className="text-red-700">{error}</p>
      <button
        onClick={() => error.includes('authentication') ? navigate('/login') : fetchPatients()}
        className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
      >
        {error.includes('authentication') ? 'Go to Login' : 'Try again'}
      </button>
    </div>
  );


  const PatientListView = () => (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100">
        {/* Header Section */}
        <div className="bg-emerald-50 p-6 rounded-t-xl flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-emerald-800">Welcome, Doctor</h1>
            <p className="text-sm text-emerald-600 mt-1">Your dashboard overview</p>
          </div>
          <div className="flex flex-col items-end">
            {/* Buttons Container */}
            <div className="flex space-x-3">
              {/* Clinical Audit Dashboard Button */}
              <button
                onClick={() => navigate('/audit-dashboard')}
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
              >
                <ClipboardCheck size={18} />
                <span>Clinical Audit</span>
              </button>
              
              {/* Logout Button */}
              <button
                onClick={logout}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 w-full my-2"></div>

            {/* Add Patient Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 w-full"
            >
              <UserCircle size={18} />
              <span>Add Patient</span>
            </button>
          </div>
          
          {/* Patient Added Success Message */}
          {showSuccess && (
            <div className="absolute top-4 right-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg shadow-md">
              <p className="text-emerald-800">Patient added successfully!</p>
            </div>
          )}
          
          <AddPatientModal
            doctorId={user.user_id}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddPatient}
            isLoading={isLoading}
          />
        </div>

        {/* Main Content Section */}
        <div className="p-6">
          {error ? (
            <ErrorMessage />
          ) : loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patients.length > 0 ? patients.map((patient) => (
                <div
                  key={patient.id}
                  className="border border-emerald-100 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all duration-200 bg-white hover:bg-emerald-50"
                  onClick={() => handlePatientSelect(patient)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <UserCircle className="text-emerald-600" size={24} />
                      <h3 className="font-semibold text-lg text-emerald-800">{patient.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                      <Calendar size={16} />
                      <p>Joined: {new Date(patient.joined_date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-emerald-700 line-clamp-2">{patient.remarks}</p>
                    <div className="flex justify-between mt-2 pt-2 border-t border-emerald-100">
                      <span className="flex items-center gap-1 text-sm text-emerald-600">
                        <Activity size={16} /> {patient.score_count} scores
                      </span>
                      <span className="flex items-center gap-1 text-sm text-emerald-600">
                        <MessageSquare size={16} /> {patient.message_count} Patient Alerts
                      </span>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-emerald-600">No patients found. Add your first patient!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );


  const PatientDetailView = () => (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setSelectedPatient(null)}
          className="text-emerald-600 hover:text-emerald-800 transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Back to Patient List
        </button>

        <div className="flex items-center space-x-3">
          {/* Clinical Audit Dashboard Button */}
          <button
            onClick={() => navigate('/clinical-audit', { state: { selectedPatient } })}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
          >
            <ClipboardCheck size={18} />
            <span>Clinical Audit</span>
          </button>

          {/* Progress Report Button */}
          <button
            onClick={() => navigate(`/progress-report`,  { state: { selectedPatient } })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Clipboard size={18} />
            <span>Patient Progress Report</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>


      {/* Patient Overview Card */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <UserCircle className="text-emerald-600" size={32} />
              <h2 className="text-2xl font-bold text-emerald-800">{selectedPatient.name}</h2>
            </div>
            <p className="text-emerald-600">Patient ID: #{selectedPatient.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-emerald-50 rounded-lg p-4">
            <p className="text-sm text-emerald-600 mb-1">Joined Date</p>
            <p className="font-medium text-emerald-800">
              {new Date(selectedPatient.joined_date).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4">
            <p className="text-sm text-emerald-600 mb-1">Average Self-Score</p>
            <p className="font-medium text-emerald-800">{selectedPatient.score_count}</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4">
            <p className="text-sm text-emerald-600 mb-1">Patient Alerts</p>
            <p className="font-medium text-emerald-800">{selectedPatient.message_count}</p>
          </div>
        </div>
      </div>

    
      {/* Health Progress Graph */}
      {healthData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <h3 className="text-xl font-semibold mb-6 text-emerald-800">Health Progress</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="medication" stroke="#ff0000" name="Medication" />
                <Line type="monotone" dataKey="diet" stroke="#008080" name="Diet" />
                <Line type="monotone" dataKey="exercise" stroke="#0000ff" name="Exercise" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Major Health Points Form */}
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6 mt-6">
        <h3 className="text-xl font-semibold mb-6 text-emerald-800">KGC Care Plan Directives</h3>
        <form onSubmit={handleSaveHealthPoints} className="space-y-4">
          {/* Healthy Eating Plan */}
          <div className="bg-emerald-50 rounded-lg p-4">
            <label className="block text-sm font-medium text-emerald-700 mb-2">
              Healthy Eating Plan
            </label>
            <textarea
              name="healthy_eating_plan"
              placeholder="Enter details for Healthy Eating Plan..."
              className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
              rows={3}
            />
            <p className="text-m text-blue-600 bg-blue-50 border border-blue-100 rounded-md p-2 mt-2">
              1. {doctorRemarks.healthy_eating_plan || "No remarks available"}
            </p>
          </div>

          {/* Exercise and Wellness Routine */}
          <div className="bg-emerald-50 rounded-lg p-4">
            <label className="block text-sm font-medium text-emerald-700 mb-2">
              Exercise and Wellness Routine
            </label>
            <textarea
              name="exercise_wellness_routine"
              placeholder="Enter details for Exercise and Wellness Routine..."
              className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
              rows={3}
            />
              <p className="text-m text-blue-600 bg-blue-50 border border-blue-100 rounded-md p-2 mt-2">
              2. {doctorRemarks.exercise_wellness_routine || "No remarks available"}
            </p>
          </div>

          {/* Prescribed Medications */}
          <div className="bg-emerald-50 rounded-lg p-4">
            <label className="block text-sm font-medium text-emerald-700 mb-2">
              Prescribed Medications
            </label>
            <textarea
              name="prescribed_medication"
              placeholder="Enter details for Prescribed Medications..."
              className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
              rows={3}
            />
              <p className="text-m text-blue-600 bg-blue-50 border border-blue-100 rounded-md p-2 mt-2">
              3. {doctorRemarks.prescribed_medication || "No remarks available"}
            </p>
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            Save Health Points
          </button>

        </form>
        {/* Success Message */}
        {showSuccess && (
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-emerald-800">Health points saved successfully!</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto bg-emerald-50/30 min-h-screen">
      {selectedPatient ? <PatientDetailView /> : <PatientListView />}
    </div>
  );
};

export default DoctorDashboard;