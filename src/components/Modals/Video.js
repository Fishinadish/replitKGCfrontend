// import React, { useState, useRef } from "react";

// const VideoModal = ({ isOpen, onClose, videoUrl }) => {
//   const videoRef = useRef(null);

//   const handleClose = () => {
//     if (videoRef.current) {
//       videoRef.current.pause(); // Pause video on close
//     }
//     onClose(); // Call the parent-provided close function
//   };

//   if (!isOpen) return null; // Do not render if modal is closed

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
//         {/* Header */}
//         <div className="flex justify-between items-center bg-gray-100 px-4 py-2">
//           <h2 className="text-lg font-bold">Relaxation Video</h2>
//           <button
//             onClick={handleClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Video */}
//         <div className="p-4">
//           <video
//             ref={videoRef}
//             className="w-full rounded-lg"
//             controls
//             autoPlay
//             src={videoUrl} // Video URL passed as a prop
//           ></video>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end bg-gray-100 px-4 py-2">
//           <button
//             onClick={handleClose}
//             className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoModal;

import React, { useState, useRef } from "react";

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  const videoRef = useRef(null);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause?.(); // Pause video if it's an HTML video element
    }
    onClose(); // Call the parent-provided close function
  };

  if (!isOpen) return null; // Do not render if modal is closed

  const isYouTubeUrl = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-100 px-4 py-2">
          <h2 className="text-lg font-bold">Relaxation Video</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Video */}
        <div className="p-4">
          {isYouTubeUrl ? (
            <div className="relative" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoUrl.split('/').pop()}`}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
              ></iframe>
            </div>
          ) : (
            <video
              ref={videoRef}
              className="w-full rounded-lg"
              controls
              autoPlay
              src={videoUrl} // Video URL passed as a prop
            ></video>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end bg-gray-100 px-4 py-2">
          <button
            onClick={handleClose}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
