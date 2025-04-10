import React, { useState } from 'react';

const Certification = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    professionalNumber: '',
    completionDate: new Date().toISOString().split('T')[0],
    totalHours: '5',
    selectedTopics: {
      weightManagement: true,
      bloodPressureControl: true,
      patientEngagement: true,
      digitalHealth: true
    }
  });

  const [certificateGenerated, setCertificateGenerated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      selectedTopics: {
        ...formData.selectedTopics,
        [name]: checked
      }
    });
  };

  const handleGenerateCertificate = (e) => {
    e.preventDefault();
    // Validate form
    if (!formData.fullName || !formData.professionalNumber) {
      alert("Please fill in all required fields");
      return;
    }
    
    // In a real app, this would call an API to generate the certificate
    setCertificateGenerated(true);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

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
        
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Certification</h1>
        
        {/* Video Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative pb-[56.25%] h-0">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/ay3dAXaNXTM" 
              title="Completing Your CPD Certificate"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {!certificateGenerated ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">CPD Certificate Generation</h2>
            <p className="text-gray-600 mb-6">
              Generate your Continuing Professional Development certificate for completing the clinical audit. Please fill in your details below.
            </p>
            
            <form onSubmit={handleGenerateCertificate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="professionalNumber">
                    Professional Registration Number*
                  </label>
                  <input
                    type="text"
                    id="professionalNumber"
                    name="professionalNumber"
                    value={formData.professionalNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="completionDate">
                    Completion Date
                  </label>
                  <input
                    type="date"
                    id="completionDate"
                    name="completionDate"
                    value={formData.completionDate}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="totalHours">
                    Total CPD Hours
                  </label>
                  <input
                    type="number"
                    id="totalHours"
                    name="totalHours"
                    value={formData.totalHours}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="1"
                    max="10"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Topics Covered in Audit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="weightManagement"
                      name="weightManagement"
                      checked={formData.selectedTopics.weightManagement}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 text-green-500 rounded focus:ring-green-500"
                    />
                    <label htmlFor="weightManagement" className="ml-2 text-gray-700">
                      Weight Management
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="bloodPressureControl"
                      name="bloodPressureControl"
                      checked={formData.selectedTopics.bloodPressureControl}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 text-green-500 rounded focus:ring-green-500"
                    />
                    <label htmlFor="bloodPressureControl" className="ml-2 text-gray-700">
                      Blood Pressure Control
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="patientEngagement"
                      name="patientEngagement"
                      checked={formData.selectedTopics.patientEngagement}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 text-green-500 rounded focus:ring-green-500"
                    />
                    <label htmlFor="patientEngagement" className="ml-2 text-gray-700">
                      Patient Engagement
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="digitalHealth"
                      name="digitalHealth"
                      checked={formData.selectedTopics.digitalHealth}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 text-green-500 rounded focus:ring-green-500"
                    />
                    <label htmlFor="digitalHealth" className="ml-2 text-gray-700">
                      Digital Health Technologies
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md transition-colors font-medium"
                >
                  Generate Certificate
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8" id="certificate">
            <div className="border-8 border-double border-green-200 p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-green-600 mb-2">Certificate of Completion</h2>
                <p className="text-xl text-gray-600">Continuing Professional Development</p>
              </div>
              
              <div className="text-center mb-8">
                <p className="text-lg">This is to certify that</p>
                <p className="text-2xl font-bold my-2">{formData.fullName}</p>
                <p className="text-lg">Registration Number: {formData.professionalNumber}</p>
              </div>
              
              <div className="text-center mb-8">
                <p className="text-lg">Has successfully completed</p>
                <p className="text-2xl font-bold my-2">Mini Clinical Audit: Keep Going Care Assessment</p>
                <p className="text-lg">Awarded {formData.totalHours} CPD hours</p>
                <p className="text-lg">Completed on {new Date(formData.completionDate).toLocaleDateString()}</p>
              </div>
              
              <div className="mb-8">
                <p className="text-lg font-medium mb-2">Topics Covered:</p>
                <ul className="list-disc pl-6">
                  {formData.selectedTopics.weightManagement && <li>Weight Management</li>}
                  {formData.selectedTopics.bloodPressureControl && <li>Blood Pressure Control</li>}
                  {formData.selectedTopics.patientEngagement && <li>Patient Engagement Strategies</li>}
                  {formData.selectedTopics.digitalHealth && <li>Digital Health Technologies</li>}
                </ul>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <img src="/api/placeholder/200/80" alt="Keep Going Care Logo" className="mb-2" />
                  <p className="text-sm text-gray-500">Keep Going Care</p>
                </div>
                <div>
                  <div className="h-0.5 w-48 bg-gray-400 mb-2"></div>
                  <p className="text-sm text-gray-500">Authorized Signature</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={handlePrintCertificate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors font-medium"
              >
                Print Certificate
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                This certificate is valid for your professional portfolio and CPD records. Please save or print a copy for your records.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certification;