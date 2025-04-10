import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout/Layout';

const ThumbsUpIcon = ({ filled }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

const ThumbsDownIcon = ({ filled }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const KeepGoingCare = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `
  Hello! 😊
  
  I’m excited to work with you and your doctor to reach your health goals. I’m here 24/7 to help with any questions about:
  
  - 🍎 **Your healthy meal plan**
  - 🏋️‍♂️ **Your exercise and wellness routine**
  - 💊 **Your prescribed medications**
  
  I’ll check in with you once a day to see how you’re doing on a scale of 1-10 for each of these. A score of **5-10** means you’re doing great! A score of **4-1** shows you might be facing some challenges, and we can work through them together or contact your doctor for help.
  
  Also, let me know how I’m doing by giving my answers to your questions a thumbs up or down emoji click.
  
  If I don’t hear from you for over **24 hours**, I’ll assume a score of **0** and will reach out to your doctor to keep you safe 🩺✨. Your scores and feedback will be shared in a report for your doctor to review at your next appointment.
      `,
    }
  ]);

  // const [messages, setMessages] = useState([])
  const [userMessage, setUserMessage] = useState('');
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [messageFeedback, setMessageFeedback] = useState({});

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('user_id');
    setRole(storedRole);
    setUserId(storedUserId);

    if (!storedUserId) {
      setError('User ID is missing. Please log in.');
      return;
    }

    if (storedRole !== 'patient') {
      setError('Access Denied: Only patients can access this service.');
    }
  }, []);

  const handleFeedback = (messageIndex, feedbackType) => {
  setMessageFeedback(prev => {
    const currentFeedback = prev[messageIndex];
    let newFeedback;
    
    if (currentFeedback === feedbackType) {
      // If clicking the same button again, remove feedback
      newFeedback = null;
    } else {
      // Set new feedback
      newFeedback = feedbackType;
    }
    
    return {
      ...prev,
      [messageIndex]: newFeedback
    };
  });
};

  const handleSendMessage = async () => {
    if (userMessage.trim() && role === 'patient' && userId) {
      setIsSendingMessage(true);
      setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userMessage }]);
      setUserMessage('');

      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication token not found. Please log in again.');

        const response = await fetch('https://app.keepgoingcare.com/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ user_id: userId, role: role, message: userMessage }),
        });

        if (!response.ok) throw new Error('Failed to send message to chat API');

        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: data.chatbot_response },
        ]);
      } catch (err) {
        console.error('Error sending message:', err);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Sorry, something went wrong. Please try again later.' },
        ]);
      } finally {
        setIsSendingMessage(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  const handleToggleChatbot = () => {
    navigate('/patient-profile');
  };

  const handleGoBack = () => {
    navigate('/patient-profile');
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">{error}</h2>
          <button
            onClick={handleToggleChatbot}
            className="ml-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Go to Chatbot
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="p-4 bg-white text-green-600 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleGoBack}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
            >
              <ChevronLeftIcon />
            </button>
            <h2 className="text-3xl font-bold">Keep Going Care</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleToggleChatbot}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Go to Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
            >
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Chat Display
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4 max-w-2xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`${
                  message.sender === 'user' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-800'
                } p-4 rounded-lg max-w-xs md:max-w-md shadow-sm`}
                style={{ lineHeight: '1.6', fontSize: '16px', textAlign: message.sender === 'bot' ? 'left' : 'right' }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* Recent Old */}
      {/* <div className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4 max-w-2xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`${
                  message.sender === 'user' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-800'
                } p-4 rounded-lg max-w-xs md:max-w-md shadow-sm`}
                style={{
                  lineHeight: '1.6',
                  fontSize: '16px',
                  textAlign: message.sender === 'bot' ? 'left' : 'right',
                }}
              >
                {typeof message.text === 'string' ? (
                  // If `message.text` is a string, render it as Markdown
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                ) : (
                  // If `message.text` is JSX, render it directly
                  message.text
                )}
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <div className="flex-grow p-6 overflow-y-auto">
  <div className="space-y-4 max-w-2xl mx-auto">
    {messages.map((message, index) => (
      <div
        key={index}
        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        <div className="flex flex-col">
          <div
            className={`${
              message.sender === 'user' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-800'
            } p-4 rounded-lg max-w-xs md:max-w-md shadow-sm`}
            style={{
              lineHeight: '1.6',
              fontSize: '16px',
              textAlign: message.sender === 'bot' ? 'left' : 'right',
            }}
          >
            {typeof message.text === 'string' ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
            ) : (
              message.text
            )}
          </div>
          
          {/* Feedback buttons */}
          <div className={`flex gap-2 mt-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <button
              onClick={() => handleFeedback(index, 'up')}
              className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${
                messageFeedback[index] === 'up' ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <ThumbsUpIcon filled={messageFeedback[index] === 'up'} />
            </button>
            <button
              onClick={() => handleFeedback(index, 'down')}
              className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${
                messageFeedback[index] === 'down' ? 'text-red-600' : 'text-gray-400'
              }`}
            >
              <ThumbsDownIcon filled={messageFeedback[index] === 'down'} />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Input Field */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center max-w-2xl mx-auto space-x-4">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            disabled={role !== 'patient' || isSendingMessage}
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center space-x-2"
            disabled={role !== 'patient' || isSendingMessage}
          >
            <MessageIcon />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default KeepGoingCare;