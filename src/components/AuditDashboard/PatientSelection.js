// import React, { useState } from 'react';

// const PatientSelection = () => {
//   // State for patient data
//   const [patients, setPatients] = useState([
//     { id: 1, fullName: '', dateOfBirth: '' },
//     { id: 2, fullName: '', dateOfBirth: '' },
//     { id: 3, fullName: '', dateOfBirth: '' },
//     { id: 4, fullName: '', dateOfBirth: '' },
//     { id: 5, fullName: '', dateOfBirth: '' }
//   ]);

//   // Handle input changes
//   const handleChange = (id, field, value) => {
//     setPatients(prevPatients =>
//       prevPatients.map(patient =>
//         patient.id === id ? { ...patient, [field]: value } : patient
//       )
//     );
//   };

//   // Delete individual patient data
//   const handleDelete = (id) => {
//     setPatients(prevPatients =>
//       prevPatients.map(patient =>
//         patient.id === id ? { ...patient, fullName: '', dateOfBirth: '' } : patient
//       )
//     );
//   };

//   // Delete all patient data
//   const handleDeleteAllData = () => {
//     setPatients(prevPatients =>
//       prevPatients.map(patient => ({ ...patient, fullName: '', dateOfBirth: '' }))
//     );
//   };

//   return (
//     <div className="min-h-screen bg-green-200 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Back button */}
//         <div className="mb-8">
//           <button 
//             onClick={() => window.history.back()} 
//             className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//             </svg>
//             Back to Dashboard
//           </button>
//         </div>

//         {/* Header with title and delete all button */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-blue-600">Patient Selection</h1>
//           <button 
//             onClick={handleDeleteAllData}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
//           >
//             Delete All Data
//           </button>
//         </div>

//         {/* Video embed */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
//           <div className="relative pb-[56.25%] h-0">
//             <iframe 
//               className="absolute top-0 left-0 w-full h-full"
//               src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
//               title="Patient Selection Criteria"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>

//         {/* Introduction */}
//         <div className="bg-green-100 rounded-lg p-6 mb-8">
//           <h2 className="text-2xl font-bold mb-4">Introduction</h2>
//           <p className="text-gray-700">
//             Select 5 of your patients at risk for or with mild cardiometabolic issues. Before you 
//             enrol them in your Self-Reported Mini Clinical Audit Program assess their 
//             willingness and ability to engage your interventions including the Keep Going Care 
//             KGC Assistant Type 1, Non-Diagnostic SaMD or Software as a Medical Device to 
//             gain their informed consent.
//           </p>
//         </div>

//         {/* Patient forms */}
//         {patients.map(patient => (
//           <div key={patient.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <h2 className="text-xl font-bold mb-4">Patient {patient.id}</h2>
            
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Full Name</label>
//               <input
//                 type="text"
//                 value={patient.fullName}
//                 onChange={(e) => handleChange(patient.id, 'fullName', e.target.value)}
//                 className="w-full p-3 border rounded-md bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 placeholder="Enter patient name"
//               />
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={patient.dateOfBirth}
//                   onChange={(e) => handleChange(patient.id, 'dateOfBirth', e.target.value)}
//                   className="w-full p-3 border rounded-md bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="mm/dd/yyyy"
//                 />
//                 <div className="absolute right-3 top-3 text-gray-400">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex space-x-4">
//               <button 
//                 className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors"
//               >
//                 Save
//               </button>
//               <button 
//                 onClick={() => handleDelete(patient.id)}
//                 className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PatientSelection;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const PatientSelection = () => {
  // State for patient data
  const [patients, setPatients] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([
    { priority: 1, patientId: null, patientName: '' },
    { priority: 2, patientId: null, patientName: '' },
    { priority: 3, patientId: null, patientName: '' },
    { priority: 4, patientId: null, patientName: '' },
    { priority: 5, patientId: null, patientName: '' }
  ]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth();

  // Fetch patients from API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('https://app.keepgoingcare.com/get_patients', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    
    fetchPatients();
  }, [user]);

  // Handle input changes
  const handleSelectPatient = (priority, patient) => {
    setSelectedSlots(prevSlots =>
      prevSlots.map(slot =>
        slot.priority === priority 
          ? { ...slot, patientId: patient.id, patientName: patient.name } 
          : slot
      )
    );
    setOpenDropdown(null);
  };

  // Save patient selection
  const handleSave = async (priority) => {
    const slot = selectedSlots.find(s => s.priority === priority);
    if (!slot.patientId) return;

    try {
      setIsSaving(true);
      
      const response = await fetch('https://app.keepgoingcare.com/add-selected-patient', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patient_id: slot.patientId,
          priority: priority
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save patient selection');
      }

      setSuccessMessage(`Patient saved successfully to priority ${priority}`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete individual patient data
  const handleDelete = (priority) => {
    setSelectedSlots(prevSlots =>
      prevSlots.map(slot =>
        slot.priority === priority ? { ...slot, patientId: null, patientName: '' } : slot
      )
    );
  };

  // Delete all patient data
  const handleDeleteAllData = () => {
    setSelectedSlots(prevSlots =>
      prevSlots.map(slot => ({ ...slot, patientId: null, patientName: '' }))
    );
  };

  // Get available patients for dropdown
  const getAvailablePatients = () => {
    const selectedIds = selectedSlots
      .filter(slot => slot.patientId !== null)
      .map(slot => slot.patientId);
    
    return patients.filter(patient => !selectedIds.includes(patient.id));
  };

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

        {/* Header with title and delete all button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Patient Selection</h1>
          <button 
            onClick={handleDeleteAllData}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Delete All Data
          </button>
        </div>

        {/* Status messages */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex justify-between">
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage('')}>&times;</button>
          </div>
        )}
        
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage('')}>&times;</button>
          </div>
        )}

        {/* Video embed */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative pb-[56.25%] h-0">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/TD6reyTvxb0" 
              title="Patient Selection Criteria"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-green-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="text-gray-700">
            Select 5 of your patients at risk for or with mild cardiometabolic issues. Before you 
            enrol them in your Self-Reported Mini Clinical Audit Program assess their 
            willingness and ability to engage your interventions including the Keep Going Care 
            KGC Assistant Type 1, Non-Diagnostic SaMD or Software as a Medical Device to 
            gain their informed consent.
          </p>
        </div>

        {/* Patient forms */}
        {selectedSlots.map(slot => (
          <div key={slot.priority} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Patient {slot.priority}</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <div className="relative">
                <div
                  className="w-full p-3 border rounded-md bg-green-100 cursor-pointer flex justify-between items-center"
                  onClick={() => setOpenDropdown(openDropdown === slot.priority ? null : slot.priority)}
                >
                  <span className={slot.patientName ? 'text-gray-900' : 'text-gray-500'}>
                    {slot.patientName || 'Select a patient'}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {openDropdown === slot.priority && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                    {getAvailablePatients().length === 0 ? (
                      <div className="p-3 text-gray-500">No more patients available</div>
                    ) : (
                      getAvailablePatients().map(patient => (
                        <div 
                          key={patient.id}
                          className="p-3 hover:bg-green-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => handleSelectPatient(slot.priority, patient)}
                        >
                          {patient.name}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Patient ID</label>
              <div className="relative">
                <input
                  type="text"
                  value={slot.patientId || ''}
                  readOnly
                  className="w-full p-3 border rounded-md bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="ID will appear when patient is selected"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => handleSave(slot.priority)}
                disabled={!slot.patientId || isSaving}
                className={`bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors ${
                  (!slot.patientId || isSaving) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button 
                onClick={() => handleDelete(slot.priority)}
                disabled={!slot.patientId || isSaving}
                className={`bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors ${
                  (!slot.patientId || isSaving) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientSelection;