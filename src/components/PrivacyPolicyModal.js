// import React, { useState } from 'react';

// const PrivacyPolicyModal = ({ onAccept }) => {
//   const [isChecked, setIsChecked] = useState(false);
  
//   const handleAccept = () => {
//     if (isChecked) {
//       // Store acceptance in localStorage
//       localStorage.setItem('privacyPolicyAccepted', 'true');
//       localStorage.setItem('privacyPolicyAcceptedDate', new Date().toISOString());
      
//       // Call the onAccept callback
//       if (onAccept) {
//         onAccept();
//       }
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg max-w-2xl w-full mx-auto">
//         <div className="p-6">
//           <div className="flex items-center justify-center mb-4">
//             <h2 className="text-2xl font-bold text-green-600">Keep Going Care</h2>
//           </div>
//           <h3 className="text-xl font-semibold mb-2 text-green-700">Privacy Policy</h3>
//           <p className="text-gray-600 mb-4">
//             Please review our Privacy Policy before continuing with Keep Going Care services
//           </p>

//           {/* Scrollable content area */}
//           <div className="border rounded-md h-96 overflow-y-auto p-4 mb-4">
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-green-700">1. Information We Collect</h3>
//               <p className="text-gray-600">
//                 At Keep Going Care, we collect information you provide directly to us, including but not limited to:
//                 name, email address, health information, and any other information you choose to provide to help us deliver better care.
//               </p>

//               <h3 className="text-lg font-semibold text-green-700">2. How We Use Your Information</h3>
//               <p className="text-gray-600">
//                 We use the information we collect to:
//                 <br />- Provide, maintain, and improve our healthcare services
//                 <br />- Send you appointment reminders and care instructions
//                 <br />- Respond to your healthcare questions and needs
//                 <br />- Coordinate your care with other providers when necessary
//               </p>

//               <h3 className="text-lg font-semibold text-green-700">3. Information Sharing</h3>
//               <p className="text-gray-600">
//                 Keep Going Care values your privacy. We do not share your personal information with third parties except as
//                 necessary for your healthcare, as described in this privacy policy, or with your explicit consent.
//               </p>

//               <h3 className="text-lg font-semibold text-green-700">4. Data Security</h3>
//               <p className="text-gray-600">
//                 We implement appropriate security measures to protect your personal and health
//                 information from unauthorized access and disclosure in compliance with applicable healthcare regulations.
//               </p>

//               <h3 className="text-lg font-semibold text-green-700">5. Your Rights</h3>
//               <p className="text-gray-600">
//                 You have the right to access, correct, or delete your personal information.
//                 Contact Keep Going Care support if you wish to exercise these rights or have any privacy concerns.
//               </p>
//             </div>
//           </div>

//           {/* Checkbox */}
//           <div className="flex items-center space-x-2 mb-6">
//             <input
//               type="checkbox"
//               id="privacy-accept"
//               checked={isChecked}
//               onChange={(e) => setIsChecked(e.target.checked)}
//               className="h-4 w-4 rounded border-gray-300"
//             />
//             <label
//               htmlFor="privacy-accept"
//               className="text-sm text-gray-600"
//             >
//               I have read and agree to the Privacy Policy
//             </label>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end space-x-4">
//             <button
//               onClick={() => window.location.href = '/'}
//               className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md border border-gray-300"
//             >
//               Decline
//             </button>
//             <button
//               onClick={handleAccept}
//               disabled={!isChecked}
//               className={`px-4 py-2 rounded-md ${
//                 isChecked 
//                   ? 'bg-green-600 text-white hover:bg-green-700'
//                   : 'bg-green-300 text-white cursor-not-allowed'
//               }`}
//             >
//               I agree
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrivacyPolicyModal;



import React, { useState, useEffect } from 'react';

const PrivacyPolicyModal = ({ onAccept }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  
  // Get user info and check policy acceptance status on mount
  useEffect(() => {
    const checkPolicyStatus = async () => {
      try {
        // Get user ID and role from localStorage
        const storedUserId = localStorage.getItem('userId');
        const storedRole = localStorage.getItem('role');
        
        // Only proceed if user is a patient
        if (storedRole === 'patient' && storedUserId) {
          setUserId(storedUserId);
          
          // Check if the policy is already accepted by this user in the database
          const response = await fetch(`/privacy-policy?patient_id=${storedUserId}`);
          
          if (response.ok) {
            const data = await response.json();
            // Only show modal if policy is not accepted
            if (!data.accepted) {
              setIsVisible(true);
            }
          } else {
            // If there's no record or any error, assume not accepted
            setIsVisible(true);
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking policy status:', error);
        // If there's an error, we show the modal to be safe
        setIsVisible(true);
        setIsLoading(false);
      }
    };
    
    checkPolicyStatus();
  }, []);

  const handleAccept = async () => {
    if (isChecked && userId) {
      try {
        // Save to database via API
        const response = await fetch('/privacy-policy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            patient_id: userId,
            accepted: true
          })
        });
        
        if (!response.ok) {
          console.error('Failed to save privacy policy acceptance to server');
          alert('There was an error saving your privacy policy acceptance. Please try again.');
          return;
        }
        
        // Hide the modal
        setIsVisible(false);
        
        // Call the onAccept callback
        if (onAccept) {
          onAccept();
        }
      } catch (error) {
        console.error('Error saving privacy policy acceptance:', error);
        alert('There was an error saving your privacy policy acceptance. Please try again.');
      }
    }
  };

  const handleDecline = () => {
    // Just hide the modal without storing acceptance
    setIsVisible(false);
  };

  // Add click event listener to document to reshow modal when clicking outside elements
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    
    // Only apply this logic for patients who haven't accepted
    if (!isVisible && !isLoading && storedRole === 'patient') {
      const handleDocumentClick = async (e) => {
        // Don't trigger if clicking on or within the modal itself
        if (!e.target.closest('.privacy-policy-modal')) {
          try {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
              // Check again with the API before showing
              const response = await fetch(`/privacy-policy?patient_id=${storedUserId}`);
              
              if (response.ok) {
                const data = await response.json();
                // Only show modal if policy is not accepted
                if (!data.accepted) {
                  setIsVisible(true);
                }
              } else {
                // If error, show modal
                setIsVisible(true);
              }
            }
          } catch (error) {
            console.error('Error rechecking policy acceptance:', error);
            setIsVisible(true);
          }
        }
      };

      // Use a timeout to avoid immediate re-triggering
      const timer = setTimeout(() => {
        document.addEventListener('click', handleDocumentClick);
      }, 100);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleDocumentClick);
      };
    }
  }, [isVisible, isLoading]);

  // Don't render if still loading or modal shouldn't be visible
  if (isLoading || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-auto privacy-policy-modal">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl font-bold text-green-600">Keep Going Care</h2>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-green-700">Privacy Policy</h3>
          <p className="text-gray-600 mb-4">
            Please review our Privacy Policy before continuing with Keep Going Care services
          </p>

          {/* Scrollable content area */}
          <div className="border rounded-md h-96 overflow-y-auto p-4 mb-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-700">1. Information We Collect</h3>
              <p className="text-gray-600">
                At Keep Going Care, we collect information you provide directly to us, including but not limited to:
                name, email address, health information, and any other information you choose to provide to help us deliver better care.
              </p>

              <h3 className="text-lg font-semibold text-green-700">2. How We Use Your Information</h3>
              <p className="text-gray-600">
                We use the information we collect to:
                <br />- Provide, maintain, and improve our healthcare services
                <br />- Send you appointment reminders and care instructions
                <br />- Respond to your healthcare questions and needs
                <br />- Coordinate your care with other providers when necessary
              </p>

              <h3 className="text-lg font-semibold text-green-700">3. Information Sharing</h3>
              <p className="text-gray-600">
                Keep Going Care values your privacy. We do not share your personal information with third parties except as
                necessary for your healthcare, as described in this privacy policy, or with your explicit consent.
              </p>

              <h3 className="text-lg font-semibold text-green-700">4. Data Security</h3>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your personal and health
                information from unauthorized access and disclosure in compliance with applicable healthcare regulations.
              </p>

              <h3 className="text-lg font-semibold text-green-700">5. Your Rights</h3>
              <p className="text-gray-600">
                You have the right to access, correct, or delete your personal information.
                Contact Keep Going Care support if you wish to exercise these rights or have any privacy concerns.
              </p>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2 mb-6">
            <input
              type="checkbox"
              id="privacy-accept"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label
              htmlFor="privacy-accept"
              className="text-sm text-gray-600"
            >
              I have read and agree to the Privacy Policy
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md border border-gray-300"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              disabled={!isChecked}
              className={`px-4 py-2 rounded-md ${
                isChecked 
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-green-300 text-white cursor-not-allowed'
              }`}
            >
              I agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;