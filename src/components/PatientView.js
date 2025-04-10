import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import VideoModal from './Modals/Video'
import Layout from './Layout/Layout';
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);


const PatientProfile = () => {
  const [scores, setScores] = useState({ medication: 5, diet: 5, exercise: 5 });
  const [healthData, setHealthData] = useState([]);
  const [patientInfo, setPatientInfo] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showError, setShowError] = useState(null);
  
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://app.keepgoingcare.com/patient/my_profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) throw new Error('Unauthorized access');
          return response.json();
        })
        .then(data => {
          setPatientInfo(data);
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
        })
        .catch(error => console.error('Error fetching patient data:', error));
    } else {
      console.error('No token found');
    }
  }, []);

  console.log("Patient Information: ", patientInfo)

  const handleScoreChange = (type, value) => {
    setScores(prev => ({ ...prev, [type]: value }));
  };
  const handleGoBack = () => {
    navigate('/');
  };
  const handleSubmit = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const requestBody = {
      medication_score: scores.medication,
      diet_score: scores.diet,
      exercise_score: scores.exercise,
    };

    fetch('https://app.keepgoingcare.com/patient/daily_health_score', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (!response.ok) throw new Error('Daily health score already submitted for today');
        return response.json();
      })
      .then(() => {
        setShowSuccess(true);
        setShowError(null);
        setTimeout(() => setShowSuccess(false), 3000);
      })
      .catch(error => {
        setShowError(error.message);
        console.error('Error submitting scores:', error);
      });
  };

  const handleStressButtonClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      // First track the button click
      const response = await fetch('https://app.keepgoingcare.com/patient/stressed_button', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient_name: patientInfo,
          clicked_at: new Date().toISOString()
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to track button click');
      }
  
      // If tracking successful, then open the video modal
      handleOpenModal();
    } catch (error) {
      console.error('Error tracking stress button click:', error);
    }
  };

  const handleToggleChatbot = () => {
    navigate('/chatbot');
  };

  return (
    <Layout>
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Patient Header */}
      {/* <div className="flex items-center space-between px-10 bg-green-50 p-4 rounded-lg">
            <button
              onClick={handleGoBack}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
            >
              <ChevronLeftIcon />
            </button>
        <div>
          <h1 className="text-2xl font-bold text-green-800">Patient Profile</h1>
          <p className="text-green-600">Name: {patientInfo.name}</p>
          <p className="text-green-600">Email: {patientInfo.email}</p>
          <p className="text-green-600">Joined Date: {new Date(patientInfo.joined_date).toLocaleDateString()}</p>
        </div>
        <button
          onClick={handleToggleChatbot}
          className="ml-auto bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Go to Chatbot
        </button>
      </div> */}
  <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
  <button
    onClick={handleGoBack}
    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
  >
    <ChevronLeftIcon />
  </button>
  
  {/* Profile Information Section */}
  <div className="flex flex-col items-center md:items-start md:ml-4 w-full text-center md:text-left">
      <h1 className="text-2xl font-bold text-green-800 mb-2">Patient Profile</h1>

      <div className="text-green-600 space-y-1">
        <p><strong>Name:</strong> {patientInfo.name}</p>
        <p><strong>Email:</strong> {patientInfo.email}</p>
        <p><strong>Joined Date:</strong> {[patientInfo.joined_date]}</p>
      </div>
    </div>

    {/* <button
      onClick={handleToggleChatbot}
      className="ml-auto bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
    >
      Chatbot
    </button>
    <button
      // onClick={}
    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-32"
    >
      I'm Stressed
    </button> */}
    <div className="flex flex-col items-end">
  <button
    onClick={handleToggleChatbot}
    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 w-32 mb-2"
  >
    Chatbot
  </button>
  <div className="border-t border-gray-300 w-32 my-2"></div>
  <button
    onClick={handleStressButtonClick}  // Open the modal on click
    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-32"
  >
    Keep Going
  </button>
</div>
  </div>
  {/* Video Modal */}
  <VideoModal
        isOpen={isModalOpen} // Pass modal open state
        onClose={handleCloseModal} // Pass close handler
        videoUrl="https://youtu.be/_iBZDlt-IXs" // Replace with your video URL
      />


      {/* Health Progress Graph */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Health Progress</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <LineChart data={healthData}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="medication" stroke="#ff0000" name="Medication" />
              <Line type="monotone" dataKey="diet" stroke="#008080" name="Diet" />
              <Line type="monotone" dataKey="exercise" stroke="#0000ff" name="Exercise" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Self Scoring Section */}
      <div className="bg-white shadow-md rounded-lg p-4 space-y-6">
        <h2 className="text-xl font-semibold mb-4">Daily Health Score</h2>

        <div>
          <label className="block text-sm font-medium mb-2">Medication Score</label>
          <input
            type="range"
            min="1"
            max="10"
            value={scores.medication}
            onChange={(e) => handleScoreChange('medication', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-right">{scores.medication}/10</div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Diet Score</label>
          <input
            type="range"
            min="1"
            max="10"
            value={scores.diet}
            onChange={(e) => handleScoreChange('diet', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-right">{scores.diet}/10</div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Exercise Score</label>
          <input
            type="range"
            min="1"
            max="10"
            value={scores.exercise}
            onChange={(e) => handleScoreChange('exercise', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-right">{scores.exercise}/10</div>
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Submit Daily Scores
        </button>
      </div>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <p className="text-green-800">Scores submitted successfully!</p>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default PatientProfile;
