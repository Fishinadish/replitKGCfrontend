// import React from 'react';
// import { Link } from 'react-router-dom';
// import Header from './Header';

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
      
//       {/* Title Section */}
//       <div className="bg-green-600 pt-20"> {/* Added pt-20 to account for header height */}
//         <div className="text-center text-white py-16">
//           <h1 className="text-4xl font-bold">Welcome to Keep Going Care</h1>
//           <p className="mt-2 text-lg">Your partner in achieving healthier lifestyle goals</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="flex-grow bg-gray-100">
//         <div className="flex flex-col items-center px-6 py-12 space-y-12">
//           {/* Intro Section */}
//           <section className="max-w-4xl">
//             <h2 className="text-3xl font-semibold text-green-800 mb-4">
//               Personalised Health and Wellness Support
//             </h2>
//             <p className="text-gray-700 text-lg">
//               Keep Going Care is a 24/7 virtual assistant designed to support you in achieving your health goals, in partnership with your healthcare provider. Through personalised meal plans, exercise routines, and medication reminders, we empower you to live a healthier, happier life.
//             </p>
//           </section>

//           {/* Features Section */}
//           <section className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 max-w-4xl">
//             <div className="bg-white p-6 shadow-md rounded-lg w-full md:w-1/3">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">Diet and Nutrition</h3>
//               <p className="text-gray-700">
//                 Tailored meal plans and assistance to help you build a healthier relationship with food.
//               </p>
//             </div>
//             <div className="bg-white p-6 shadow-md rounded-lg w-full md:w-1/3">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">Exercise and Wellness</h3>
//               <p className="text-gray-700">
//                 Customised fitness plans, videos, and gym recommendations to fit your lifestyle.
//               </p>
//             </div>
//             <div className="bg-white p-6 shadow-md rounded-lg w-full md:w-1/3">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">Medication Support</h3>
//               <p className="text-gray-700">
//                 Medication reminders, side effect management, and price comparison tools.
//               </p>
//             </div>
//           </section>

//           {/* Call to Action */}
//           <section className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
//             <Link
//               to="/signup"
//               className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
//             >
//               Get Started
//             </Link>
//             <Link
//               to="/login"
//               className="px-8 py-4 bg-white text-green-600 border border-green-600 rounded-lg font-semibold hover:bg-green-50"
//             >
//               Sign In
//             </Link>
//           </section>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-4 text-center">
//         <p className="text-sm">&copy; {new Date().getFullYear()} Keep Going Care. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import Header from './Header';

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
      
//       {/* Hero Section with Video Background */}
//       <div className="relative h-screen">
//         {/* Video Background */}
//         <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900">
//           <video 
//             className="absolute min-w-full min-h-full object-cover opacity-60"
//             autoPlay 
//             muted 
//             loop 
//             playsInline
//           >
//             <source src="public\asset\KGC.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>

//         {/* Content Overlay */}
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
//           <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
//             Welcome to Keep Going Care
//           </h1>
//           <p className="text-xl md:text-2xl text-center mb-12 max-w-3xl">
//             Your partner in achieving healthier lifestyle goals
//           </p>
//           <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
//             <Link
//               to="/signup"
//               className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300"
//             >
//               Get Started
//             </Link>
//             <Link
//               to="/login"
//               className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition duration-300"
//             >
//               Sign In
//             </Link>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <svg 
//             className="w-6 h-6 text-white"
//             fill="none" 
//             strokeLinecap="round" 
//             strokeLinejoin="round" 
//             strokeWidth="2" 
//             viewBox="0 0 24 24" 
//             stroke="currentColor"
//           >
//             <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
//           </svg>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="bg-gray-100">
//         <div className="flex flex-col items-center px-6 py-16 space-y-16">
//           {/* Intro Section */}
//           <section className="max-w-4xl text-center">
//             <h2 className="text-3xl md:text-4xl font-semibold text-green-800 mb-6">
//               Personalised Health and Wellness Support
//             </h2>
//             <p className="text-gray-700 text-lg md:text-xl">
//               Keep Going Care is a 24/7 virtual assistant designed to support you in achieving your health goals, 
//               in partnership with your healthcare provider. Through personalised meal plans, exercise routines, 
//               and medication reminders, we empower you to live a healthier, happier life.
//             </p>
//           </section>

//           {/* Features Section */}
//           <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
//             <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">Diet and Nutrition</h3>
//               <p className="text-gray-700">
//                 Tailored meal plans and assistance to help you build a healthier relationship with food.
//               </p>
//             </div>
//             <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">Exercise and Wellness</h3>
//               <p className="text-gray-700">
//                 Customised fitness plans, videos, and gym recommendations to fit your lifestyle.
//               </p>
//             </div>
//             <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">Medication Support</h3>
//               <p className="text-gray-700">
//                 Medication reminders, side effect management, and price comparison tools.
//               </p>
//             </div>
//           </section>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-6 text-center">
//         <p className="text-sm">&copy; {new Date().getFullYear()} Keep Going Care. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import Header from './Header';

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
      
//       {/* Hero Section with YouTube Video Background */}
//       <div className="relative h-screen">
//         {/* Video Background */}
//         <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900">
//           <div className="relative w-full h-full">
//             <iframe
//               className="absolute w-full h-full object-cover"
//               src="https://www.youtube.com/embed/Vn7f4MkzrNk?autoplay=1&mute=0&loop=1&playlist=Vn7f4MkzrNk&controls=0&showinfo=0&rel=0&modestbranding=1"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: '100vw',
//                 height: '100vh',
//                 pointerEvents: 'none'
//               }}
//             />
//             {/* Overlay to control video opacity */}
//             <div className="absolute inset-0 bg-black opacity-40"></div>
//           </div>
//         </div>

//         {/* Content Overlay */}
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
//           <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
//             Welcome to Keep Going Care
//           </h1>
//           <p className="text-xl md:text-2xl text-center mb-12 max-w-3xl">
//             Your partner in achieving healthier lifestyle goals
//           </p>
//           <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
//             <Link
//               to="/signup"
//               className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300"
//             >
//               Get Started
//             </Link>
//             <Link
//               to="/login"
//               className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition duration-300"
//             >
//               Sign In
//             </Link>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <svg 
//             className="w-6 h-6 text-white"
//             fill="none" 
//             strokeLinecap="round" 
//             strokeLinejoin="round" 
//             strokeWidth="2" 
//             viewBox="0 0 24 24" 
//             stroke="currentColor"
//           >
//             <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
//           </svg>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="bg-gray-100">
//         <div className="flex flex-col items-center px-6 py-16 space-y-16">
//           {/* Intro Section */}
//           <section className="max-w-4xl text-center">
//             <h2 className="text-3xl md:text-4xl font-semibold text-green-800 mb-6">
//               Personalised Health and Wellness Support
//             </h2>
//             <p className="text-gray-700 text-lg md:text-xl">
//               Keep Going Care is a 24/7 virtual assistant designed to support you in achieving your health goals, 
//               in partnership with your healthcare provider. Through personalised meal plans, exercise routines, 
//               and medication reminders, we empower you to live a healthier, happier life.
//             </p>
//           </section>

//           {/* Features Section */}
//           <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
//             <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">Diet and Nutrition</h3>
//               <p className="text-gray-700">
//                 Tailored meal plans and assistance to help you build a healthier relationship with food.
//               </p>
//             </div>
//             <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">Exercise and Wellness</h3>
//               <p className="text-gray-700">
//                 Customised fitness plans, videos, and gym recommendations to fit your lifestyle.
//               </p>
//             </div>
//             <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">Medication Support</h3>
//               <p className="text-gray-700">
//                 Medication reminders, side effect management, and price comparison tools.
//               </p>
//             </div>
//           </section>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-6 text-center">
//         <p className="text-sm">&copy; {new Date().getFullYear()} Keep Going Care. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import Header from './Header';

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
      
//       {/* Hero Section with Local Video Background */}
//       <div className="relative h-screen">
//         {/* Video Background */}
//         <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900">
//           <video
//             className="absolute w-full h-full object-cover"
//             autoPlay
//             muted
//             loop
//             playsInline
//             style={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: '100vw',
//               height: '100vh',
//               objectFit: 'cover',
//               pointerEvents: 'none',
//             }}
//           >
//             <source src="/public/assets/KGC.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>

//           {/* Overlay to control video opacity */}
//           <div className="absolute inset-0 bg-black opacity-40"></div>
//         </div>

//         {/* Content Overlay */}
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
//           <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
//             Welcome to Keep Going Care
//           </h1>
//           <p className="text-xl md:text-2xl text-center mb-12 max-w-3xl">
//             Your partner in achieving healthier lifestyle goals
//           </p>
//           <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
//             <Link
//               to="/signup"
//               className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300"
//             >
//               Get Started
//             </Link>
//             <Link
//               to="/login"
//               className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition duration-300"
//             >
//               Sign In
//             </Link>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <svg 
//             className="w-6 h-6 text-white"
//             fill="none" 
//             strokeLinecap="round" 
//             strokeLinejoin="round" 
//             strokeWidth="2" 
//             viewBox="0 0 24 24" 
//             stroke="currentColor"
//           >
//             <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
//           </svg>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="bg-gray-100">
//         <div className="flex flex-col items-center px-6 py-16 space-y-16">
//           {/* Intro Section */}
//           <section className="max-w-4xl text-center">
//             <h2 className="text-3xl md:text-4xl font-semibold text-green-800 mb-6">
//               Personalised Health and Wellness Support
//             </h2>
//             <p className="text-gray-700 text-lg md:text-xl">
//               Keep Going Care is a 24/7 virtual assistant designed to support you in achieving your health goals, 
//               in partnership with your healthcare provider. Through personalised meal plans, exercise routines, 
//               and medication reminders, we empower you to live a healthier, happier life.
//             </p>
//           </section>

//           {/* Features Section */}
//           <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
//             <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">Diet and Nutrition</h3>
//               <p className="text-gray-700">
//                 Tailored meal plans and assistance to help you build a healthier relationship with food.
//               </p>
//             </div>
//             <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">Exercise and Wellness</h3>
//               <p className="text-gray-700">
//                 Customised fitness plans, videos, and gym recommendations to fit your lifestyle.
//               </p>
//             </div>
//             <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">Medication Support</h3>
//               <p className="text-gray-700">
//                 Medication reminders, side effect management, and price comparison tools.
//               </p>
//             </div>
//           </section>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-6 text-center">
//         <p className="text-sm">&copy; {new Date().getFullYear()} Keep Going Care. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;




import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
// Import the video directly if using webpack/create-react-app
import backgroundVideo from '../assets/KGC Patient Welcome.mp4'; // Keeping your original path

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header fixed at top */}
      <Header />
      
      {/* Hero Section with Local Video Background - positioned below header */}
      <div className="relative" style={{ height: "calc(100vh - 64px)" }}> {/* Assuming header is 64px tall, adjust if needed */}
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900">
          <video
            className="absolute w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            src={backgroundVideo}
          >
            {/* Fallback source if import doesn't work */}
            <source src={process.env.PUBLIC_URL + '/assets/KGC.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay to control video opacity */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
            Welcome to Keep Going Care
          </h1>
          <p className="text-xl md:text-2xl text-center mb-12 max-w-3xl">
            Your partner in achieving healthier lifestyle goals
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <Link
              to="/signup"
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            className="w-6 h-6 text-white"
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <main className="bg-gray-100">
        <div className="flex flex-col items-center px-6 py-16 space-y-16">
          {/* Intro Section */}
          <section className="max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-green-800 mb-6">
              Personalised Health and Wellness Support
            </h2>
            <p className="text-gray-700 text-lg md:text-xl">
              Keep Going Care is a 24/7 virtual assistant designed to support you in achieving your health goals, 
              in partnership with your healthcare provider. Through personalised meal plans, exercise routines, 
              and medication reminders, we empower you to live a healthier, happier life.
            </p>
          </section>

          {/* Features Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
            <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Diet and Nutrition</h3>
              <p className="text-gray-700">
                Tailored meal plans and assistance to help you build a healthier relationship with food.
              </p>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Exercise and Wellness</h3>
              <p className="text-gray-700">
                Customised fitness plans, videos, and gym recommendations to fit your lifestyle.
              </p>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Medication Support</h3>
              <p className="text-gray-700">
                Medication reminders, side effect management, and price comparison tools.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Keep Going Care. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;