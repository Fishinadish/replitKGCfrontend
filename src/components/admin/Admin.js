// import React, { useState, useEffect } from 'react';
// import { Users, UserPlus, UserCircle, LogOut, MessageSquare, Activity } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import AddDoctorModal from '../Modals/AddDoctor';


// const AdminDashboard = () => {
//   const [dashboardData, setDashboardData] = useState({
//     total_doctors: 0,
//     total_patients: 0,
//     recent_messages_count: 0,
//     active_appointments: 0,
//     patient_activity: [],
//     doctors: []
//   });
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const [isModalOpen, setIsModalOpen] = useState(false);


//   const handleAddDoctor = (newDoctor) => {
//     // Logic to refresh or update the doctor list
//     console.log("New doctor added:", newDoctor);
//   };

//   const handleDeleteDoctor = async (doctorId) => {
//     try {
//       const response = await fetch(`https://app.keepgoingcare.com/admin/delete-doctor/${doctorId}`, {
//         method: 'DELETE',
//       });
//       const result = await response.json();
//       if (result.status === 'success') {
//         // Refresh the dashboard data after deletion
//         const updatedDoctors = dashboardData.doctors.filter(doctor => doctor.id !== doctorId);
//         setDashboardData(prevState => ({
//           ...prevState,
//           doctors: updatedDoctors,
//           total_doctors: prevState.total_doctors - 1,
//         }));
//       } else {
//         console.error('Error deleting doctor:', result.message);
//       }
//     } catch (error) {
//       console.error('Error deleting doctor:', error);
//     }
//   };

//   const handleDeletePatient = async (patientId) => {
//     try {
//       const response = await fetch(`https://app.keepgoingcare.com/admin/delete-patient/${patientId}`, {
//         method: 'DELETE',
//       });
//       const result = await response.json();
//       if (result.status === 'success') {
//         // Refresh the dashboard data or update the specific doctor's patients
//         const updatedDoctors = dashboardData.doctors.map(doctor => {
//           return {
//             ...doctor,
//             patients: doctor.patients.filter(patient => patient.id !== patientId),
//           };
//         });
//         setDashboardData(prevState => ({
//           ...prevState,
//           doctors: updatedDoctors,
//           total_patients: prevState.total_patients - 1,
//         }));
//       } else {
//         console.error('Error deleting patient:', result.message);
//       }
//     } catch (error) {
//       console.error('Error deleting patient:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await fetch('https://app.keepgoingcare.com/admin/dashboard_data');
//         const result = await response.json();
//         if (result.status === 'success') {
//           setDashboardData(result.data);
//         }
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50">
//       {/* <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1> */}

//       <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
//             {/* <p className="text-sm text-gray-500 mt-1">Manage your system effectively</p> */}
//           </div>
//           <div className="flex space-x-4">
//             {/* Logout Button */}
//             <button
//               onClick={logout}
//               className="flex items-center space-x-2 bg-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200"
//             >
//               <LogOut size={20} className="text-white" />
//               <span className="text-sm font-medium">Logout</span>
//             </button>
//             {/* Add Doctor Button */}
//             <button
//               onClick={() => setIsModalOpen(true)}
//               onClose={() => setIsModalOpen(false)}
//               className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
//             >
//               <UserCircle size={20} className="text-white" />
//               <span className="text-sm font-medium">Add Doctor</span>

//             </button>
//             {/* Modal */}
//             <AddDoctorModal
//               isOpen={isModalOpen}
//               onClose={() => setIsModalOpen(false)}
//               onDoctorAdded={handleAddDoctor}
//             />
//           </div>
//         </div>
//       </div>


//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {/* Total Doctors Card */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center space-x-4">
//             <div className="p-3 bg-blue-100 rounded-full">
//               <Users className="h-8 w-8 text-blue-500" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Total Doctors</p>
//               <h3 className="text-2xl font-bold text-gray-800">{dashboardData.total_doctors}</h3>
//             </div>
//           </div>
//         </div>

//         {/* Total Patients Card */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center space-x-4">
//             <div className="p-3 bg-green-100 rounded-full">
//               <UserPlus className="h-8 w-8 text-green-500" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Total Patients</p>
//               <h3 className="text-2xl font-bold text-gray-800">{dashboardData.total_patients}</h3>
//             </div>
//           </div>
//         </div>

//         {/* Messages Card */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center space-x-4">
//             <div className="p-3 bg-purple-100 rounded-full">
//               <MessageSquare className="h-8 w-8 text-purple-500" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">New Messages</p>
//               <h3 className="text-2xl font-bold text-gray-800">{dashboardData.recent_messages_count}</h3>
//             </div>
//           </div>
//         </div>

//         {/* Appointments Card */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center space-x-4">
//             <div className="p-3 bg-red-100 rounded-full">
//               <Activity className="h-8 w-8 text-red-500" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Active Appointments</p>
//               <h3 className="text-2xl font-bold text-gray-800">{dashboardData.active_appointments}</h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Patient Activity Chart */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800">Patient Activity</h2>
//         <div className="h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={dashboardData.patient_activity}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

   

//       <div className="grid grid-cols-1 gap-8">
//         {/* Doctors and Their Patients */}
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <h2 className="text-2xl font-semibold mb-6 text-gray-800 tracking-tight">
//             Doctors & Their Patients
//           </h2>
//           <div className="space-y-8">
//             {dashboardData.doctors.map((doctor) => (
//               <div key={doctor.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <h3 className="font-medium text-xl text-gray-900">{doctor.name}</h3>
//                     <p className="text-sm text-gray-500">{doctor.email}</p>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
//                       {doctor.patients_count} Patients
//                     </div>
//                     {/* Delete Doctor Button */}
//                     <button
//                       onClick={() => handleDeleteDoctor(doctor.id)}
//                       className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700"
//                     >
//                       <i className="fas fa-trash-alt"></i> {/* Using FontAwesome icon */}
//                       <span>Delete</span>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Patients Table */}
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full text-left border-collapse">
//                     <thead>
//                       <tr className="text-gray-500 bg-gray-100 text-sm">
//                         <th className="px-6 py-3 font-medium">Name</th>
//                         <th className="px-6 py-3 font-medium">Age</th>
//                         <th className="px-6 py-3 font-medium">Last Visit</th>
//                         <th className="px-6 py-3 font-medium">Condition</th>
//                         <th className="px-6 py-3 font-medium text-right">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                       {doctor.patients.map((patient) => (
//                         <tr key={patient.id} className="hover:bg-gray-100">
//                           <td className="px-6 py-4 text-gray-800 text-sm">{patient.name}</td>
//                           <td className="px-6 py-4 text-gray-600 text-sm">{patient.age}</td>
//                           <td className="px-6 py-4 text-gray-600 text-sm">{patient.last_visit}</td>
//                           <td className="px-6 py-4">
//                             <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-200 text-green-800">
//                               {patient.condition}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 text-right">
//                             {/* Delete Patient Button */}
//                             <button
//                               onClick={() => handleDeletePatient(patient.id)}
//                               className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700"
//                             >
//                               <i className="fas fa-trash-alt"></i> {/* Using FontAwesome icon */}
//                               <span>Delete</span>
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>


//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  UserCircle,
  LogOut,
  MessageSquare,
  Activity,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AddDoctorModal from '../Modals/AddDoctor';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    total_doctors: 0,
    total_patients: 0,
    recent_messages_count: 0,
    active_appointments: 0,
    patient_activity: [],
    doctors: [],
  });

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Updated: Append the new doctor to state
  const handleAddDoctor = (newDoctor) => {
    setDashboardData((prevData) => ({
      ...prevData,
      doctors: [...prevData.doctors, newDoctor],
      total_doctors: prevData.total_doctors + 1,
    }));
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const response = await fetch(`https://app.keepgoingcare.com/admin/delete-doctor/${doctorId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.status === 'success') {
        const updatedDoctors = dashboardData.doctors.filter((doctor) => doctor.id !== doctorId);
        setDashboardData((prevState) => ({
          ...prevState,
          doctors: updatedDoctors,
          total_doctors: prevState.total_doctors - 1,
        }));
      } else {
        console.error('Error deleting doctor:', result.message);
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const handleDeletePatient = async (patientId) => {
    try {
      const response = await fetch(`https://app.keepgoingcare.com/admin/delete-patient/${patientId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.status === 'success') {
        const updatedDoctors = dashboardData.doctors.map((doctor) => {
          return {
            ...doctor,
            patients: doctor.patients.filter((patient) => patient.id !== patientId),
          };
        });
        setDashboardData((prevState) => ({
          ...prevState,
          doctors: updatedDoctors,
          total_patients: prevState.total_patients - 1,
        }));
      } else {
        console.error('Error deleting patient:', result.message);
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('https://app.keepgoingcare.com/admin/dashboard_data');
      const result = await response.json();
      if (result.status === 'success') {
        setDashboardData(result.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={logout}
              className="flex items-center space-x-2 bg-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200"
            >
              <LogOut size={20} className="text-white" />
              <span className="text-sm font-medium">Logout</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              <UserCircle size={20} className="text-white" />
              <span className="text-sm font-medium">Add Doctor</span>
            </button>

            {/* ✅ Doctor Modal */}
            <AddDoctorModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onDoctorAdded={handleAddDoctor}
            />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Doctors */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Doctors</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.total_doctors}</h3>
            </div>
          </div>
        </div>

        {/* Total Patients */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <UserPlus className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.total_patients}</h3>
            </div>
          </div>
        </div>

        {/* New Messages */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <MessageSquare className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">New Messages</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.recent_messages_count}</h3>
            </div>
          </div>
        </div>

        {/* Active Appointments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-full">
              <Activity className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Appointments</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.active_appointments}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Patient Activity</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dashboardData.patient_activity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Doctors and Patients */}
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 tracking-tight">
            Doctors & Their Patients
          </h2>
          <div className="space-y-8">
            {dashboardData.doctors.map((doctor) => (
              <div key={doctor.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-medium text-xl text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-gray-500">{doctor.email}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                      {doctor.patients_count} Patients
                    </div>
                    <button
                      onClick={() => handleDeleteDoctor(doctor.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700"
                    >
                      <i className="fas fa-trash-alt"></i>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                {/* Patients Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left border-collapse">
                    <thead>
                      <tr className="text-gray-500 bg-gray-100 text-sm">
                        <th className="px-6 py-3 font-medium">Name</th>
                        <th className="px-6 py-3 font-medium">Age</th>
                        <th className="px-6 py-3 font-medium">Last Visit</th>
                        <th className="px-6 py-3 font-medium">Condition</th>
                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {doctor.patients.map((patient) => (
                        <tr key={patient.id} className="hover:bg-gray-100">
                          <td className="px-6 py-4 text-gray-800 text-sm">{patient.name}</td>
                          <td className="px-6 py-4 text-gray-600 text-sm">{patient.age}</td>
                          <td className="px-6 py-4 text-gray-600 text-sm">{patient.last_visit}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-200 text-green-800">
                              {patient.condition}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDeletePatient(patient.id)}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700"
                            >
                              <i className="fas fa-trash-alt"></i>
                              <span>Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
