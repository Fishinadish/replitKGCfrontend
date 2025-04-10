// // import React, { useState, useEffect } from 'react';
// // import { Heart, Trash2, Download, Upload } from 'lucide-react';
// // import Layout from '../Layout/Layout';

// // const LoveHeartProcessor = () => {
// //   const [selectedImage, setSelectedImage] = useState(null);
// //   const [previewUrl, setPreviewUrl] = useState(null);
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [enhancedImage, setEnhancedImage] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [savedImages, setSavedImages] = useState([]);

// //   useEffect(() => {
// //     const loadSavedImages = () => {
// //       const saved = localStorage.getItem('savedHeartImages');
// //       if (saved) {
// //         setSavedImages(JSON.parse(saved));
// //       }
// //     };
// //     loadSavedImages();
// //   }, []);

// //   const handleImageUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       if (file.type === "image/jpeg" || file.type === "image/png") {
// //         setSelectedImage(file);
// //         setPreviewUrl(URL.createObjectURL(file));
// //         setEnhancedImage(null);
// //         setError(null);
// //       } else {
// //         setError("Please upload a JPEG or PNG image");
// //       }
// //     }
// //   };

// //   const handleEnhance = async () => {
// //     if (!selectedImage) return;

// //     try {
// //       setIsProcessing(true);
// //       setError(null);

// //       const formData = new FormData();
// //       formData.append('image', selectedImage);

// //       const response = await fetch('https://app.keepgoingcare.com/api/enhance', {
// //         method: 'POST',
// //         body: formData
// //       });

// //       if (!response.ok) {
// //         throw new Error('Enhancement failed');
// //       }

// //       const result = await response.json();
      
// //       if (result.image) {
// //         const timestamp = new Date().getTime();
// //         const newImage = {
// //           id: timestamp,
// //           data: result.image,
// //           name: `enhanced-${timestamp}.jpg`,
// //           createdAt: new Date().toISOString()
// //         };

// //         const updatedImages = [...savedImages, newImage];
// //         localStorage.setItem('savedHeartImages', JSON.stringify(updatedImages));
// //         setSavedImages(updatedImages);
// //         setEnhancedImage(result.image);
// //       } else {
// //         throw new Error('Invalid response from server');
// //       }
// //     } catch (err) {
// //       setError(err.message);
// //       console.error('Enhancement error:', err);
// //     } finally {
// //       setIsProcessing(false);
// //     }
// //   };

// //   const handleDelete = (imageId) => {
// //     const updatedImages = savedImages.filter(img => img.id !== imageId);
// //     localStorage.setItem('savedHeartImages', JSON.stringify(updatedImages));
// //     setSavedImages(updatedImages);
// //   };

// //   const handleDownload = (imageData, filename) => {
// //     const link = document.createElement('a');
// //     link.href = imageData;
// //     link.download = filename;
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };

// //   const handleReset = () => {
// //     setSelectedImage(null);
// //     setPreviewUrl(null);
// //     setEnhancedImage(null);
// //     setError(null);
// //   };

// //   return (
// //     <Layout>
// //     <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
// //       {/* Header */}
// //       <div className="relative py-8 mb-6 bg-gradient-to-r from-pink-50 to-red-50">
// //         <div className="max-w-4xl mx-auto text-center px-6">
// //           <div className="flex items-center justify-center gap-3 mb-3">
// //             <Heart className="text-red-500 w-6 h-6" fill="currentColor" />
// //             <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">
// //               Love Heart Emoji
// //             </h1>
// //             <Heart className="text-red-500 w-6 h-6" fill="currentColor" />
// //           </div>
          
// //           <h2 className="text-xl font-medium text-gray-700 mb-2">
// //             Motivational Image Processor
// //           </h2>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="max-w-4xl mx-auto px-4 py-2">
// //         {error && (
// //           <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200">
// //             {error}
// //           </div>
// //         )}

// //         {/* Upload Section */}
// //         <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
// //           {!previewUrl ? (
// //             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
// //               <input
// //                 type="file"
// //                 accept="image/jpeg,image/png"
// //                 onChange={handleImageUpload}
// //                 className="hidden"
// //                 id="imageInput"
// //               />
// //               <label 
// //                 htmlFor="imageInput"
// //                 className="cursor-pointer block"
// //               >
// //                 <div className="space-y-3">
// //                   <Upload className="mx-auto h-10 w-10 text-gray-400" />
// //                   <div className="text-gray-600">
// //                     <p className="text-base font-medium">Click to upload an image</p>
// //                     <p className="text-sm mt-1">JPG or PNG</p>
// //                   </div>
// //                 </div>
// //               </label>
// //             </div>
// //           ) : (
// //             <div className="space-y-4">
// //               <div className="h-48 rounded-lg overflow-hidden bg-gray-100">
// //                 <img
// //                   src={enhancedImage || previewUrl}
// //                   alt="Preview"
// //                   className="w-full h-full object-contain"
// //                 />
// //               </div>

// //               <div className="flex justify-center gap-3">
// //                 <button
// //                   onClick={handleReset}
// //                   className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
// //                 >
// //                   <Upload className="w-4 h-4" />
// //                   New Image
// //                 </button>
                
// //                 {!enhancedImage && !isProcessing && (
// //                   <button
// //                     onClick={handleEnhance}
// //                     className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
// //                     disabled={isProcessing}
// //                   >
// //                     <Heart className="w-4 h-4" />
// //                     Enhance
// //                   </button>
// //                 )}

// //                 {enhancedImage && (
// //                   <button
// //                     onClick={() => handleDownload(enhancedImage, 'enhanced-image.jpg')}
// //                     className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
// //                   >
// //                     <Download className="w-4 h-4" />
// //                     Download
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Saved Images Gallery */}
// //         {savedImages.length > 0 && (
// //           <div className="bg-white rounded-xl shadow-lg p-4">
// //             <h3 className="text-lg font-semibold text-gray-800 mb-3">Saved Images</h3>
// //             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
// //               {savedImages.map((img) => (
// //                 <div key={img.id} className="relative group">
// //                   <div className="h-32 rounded-lg overflow-hidden bg-gray-100">
// //                     <img
// //                       src={img.data}
// //                       alt={img.name}
// //                       className="w-full h-full object-cover"
// //                     />
// //                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
// //                       <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
// //                         <button
// //                           onClick={() => handleDownload(img.data, img.name)}
// //                           className="p-1.5 bg-white rounded-full hover:bg-gray-100"
// //                           title="Download"
// //                         >
// //                           <Download className="w-4 h-4 text-gray-700" />
// //                         </button>
// //                         <button
// //                           onClick={() => handleDelete(img.id)}
// //                           className="p-1.5 bg-white rounded-full hover:bg-gray-100"
// //                           title="Delete"
// //                         >
// //                           <Trash2 className="w-4 h-4 text-red-500" />
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* Processing Overlay */}
// //         {isProcessing && (
// //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //             <div className="bg-white p-4 rounded-lg shadow-xl text-center">
// //               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500 mx-auto"></div>
// //               <p className="mt-3 text-gray-600">Enhancing your image with love...</p>
// //               <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //     </Layout>
// //   );
// // };

// // export default LoveHeartProcessor;






// import React, { useState, useEffect } from 'react';
// import { Heart, Trash2, Download, Upload } from 'lucide-react';
// import Layout from '../Layout/Layout';

// const LoveHeartProcessor = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [enhancedImage, setEnhancedImage] = useState(null);
//   const [error, setError] = useState(null);
//   const [savedImages, setSavedImages] = useState([]);
  
//   // Simulate user ID - in real app, get this from auth system
//   const userId = "user123"; 

//   useEffect(() => {
//     loadSavedImages();
//   }, []);

//   const loadSavedImages = () => {
//     try {
//       // Load images for specific user
//       const saved = localStorage.getItem(`heartImages_${userId}`);
//       if (saved) {
//         setSavedImages(JSON.parse(saved));
//       }
//     } catch (err) {
//       console.error('Error loading saved images:', err);
//     }
//   };

//   const saveImageLocally = async (imageData, originalFilename) => {
//     try {
//       // Create unique filename with user ID
//       const timestamp = new Date().getTime();
//       const filename = `${userId}_${timestamp}_${originalFilename}`;

//       // Save image data and metadata
//       const imageInfo = {
//         id: `${userId}_${timestamp}`,
//         data: imageData,
//         filename: filename,
//         originalName: originalFilename,
//         createdAt: new Date().toISOString(),
//         userId: userId
//       };

//       const updatedImages = [...savedImages, imageInfo];
//       localStorage.setItem(`heartImages_${userId}`, JSON.stringify(updatedImages));
//       setSavedImages(updatedImages);

//       return imageInfo;
//     } catch (err) {
//       console.error('Error saving image:', err);
//       throw new Error('Failed to save image locally');
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.type === "image/jpeg" || file.type === "image/png") {
//         setSelectedImage(file);
//         setPreviewUrl(URL.createObjectURL(file));
//         setEnhancedImage(null);
//         setError(null);
//       } else {
//         setError("Please upload a JPEG or PNG image");
//       }
//     }
//   };

//   const handleEnhance = async () => {
//     if (!selectedImage) return;

//     try {
//       setIsProcessing(true);
//       setError(null);

//       const formData = new FormData();
//       formData.append('image', selectedImage);

//       const response = await fetch('https://app.keepgoingcare.com/api/enhance', {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error('Enhancement failed');
//       }

//       const result = await response.json();
      
//       if (result.image) {
//         // Save enhanced image locally
//         const savedImage = await saveImageLocally(
//           result.image,
//           selectedImage.name
//         );
//         setEnhancedImage(result.image);
//       } else {
//         throw new Error('Invalid response from server');
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error('Enhancement error:', err);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleDelete = async (imageId) => {
//     try {
//       const updatedImages = savedImages.filter(img => img.id !== imageId);
//       localStorage.setItem(`heartImages_${userId}`, JSON.stringify(updatedImages));
//       setSavedImages(updatedImages);
//     } catch (err) {
//       console.error('Error deleting image:', err);
//       setError('Failed to delete image');
//     }
//   };

//   const handleDownload = (imageData, filename) => {
//     try {
//       const link = document.createElement('a');
//       link.href = imageData;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (err) {
//       console.error('Error downloading image:', err);
//       setError('Failed to download image');
//     }
//   };

//   const handleReset = () => {
//     setSelectedImage(null);
//     setPreviewUrl(null);
//     setEnhancedImage(null);
//     setError(null);
//   };

//   // Filter images by user ID
//   const userImages = savedImages.filter(img => img.userId === userId);

//   return (
//     <Layout>
//     <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
//       {/* Header */}
//       <div className="relative py-8 mb-6 bg-gradient-to-r from-pink-50 to-red-50">
//         <div className="max-w-4xl mx-auto text-center px-6">
//           <div className="flex items-center justify-center gap-3 mb-3">
//             <Heart className="text-red-500 w-6 h-6" fill="currentColor" />
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">
//               Love Heart Emoji
//             </h1>
//             <Heart className="text-red-500 w-6 h-6" fill="currentColor" />
//           </div>
          
//           <h2 className="text-xl font-medium text-gray-700 mb-2">
//             Motivational Image Processor
//           </h2>
          
//           <p className="text-sm text-gray-600">
//             {/* User ID: {userId} */}
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto px-4 py-2">
//         {error && (
//           <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200">
//             {error}
//           </div>
//         )}

//         {/* Upload Section */}
//         <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
//           {!previewUrl ? (
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//               <input
//                 type="file"
//                 accept="image/jpeg,image/png"
//                 onChange={handleImageUpload}
//                 className="hidden"
//                 id="imageInput"
//               />
//               <label 
//                 htmlFor="imageInput"
//                 className="cursor-pointer block"
//               >
//                 <div className="space-y-3">
//                   <Upload className="mx-auto h-10 w-10 text-gray-400" />
//                   <div className="text-gray-600">
//                     <p className="text-base font-medium">Click to upload an image</p>
//                     <p className="text-sm mt-1">JPG or PNG</p>
//                   </div>
//                 </div>
//               </label>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <div className="h-48 rounded-lg overflow-hidden bg-gray-100">
//                 <img
//                   src={enhancedImage || previewUrl}
//                   alt="Preview"
//                   className="w-full h-full object-contain"
//                 />
//               </div>

//               <div className="flex justify-center gap-3">
//                 <button
//                   onClick={handleReset}
//                   className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
//                 >
//                   <Upload className="w-4 h-4" />
//                   New Image
//                 </button>
                
//                 {!enhancedImage && !isProcessing && (
//                   <button
//                     onClick={handleEnhance}
//                     className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
//                     disabled={isProcessing}
//                   >
//                     <Heart className="w-4 h-4" />
//                     Enhance
//                   </button>
//                 )}

//                 {enhancedImage && (
//                   <button
//                     onClick={() => handleDownload(enhancedImage, `${userId}_enhanced.jpg`)}
//                     className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
//                   >
//                     <Download className="w-4 h-4" />
//                     Download
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Saved Images Gallery */}
//         {userImages.length > 0 && (
//           <div className="bg-white rounded-xl shadow-lg p-4">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">
//               Your Saved Images ({userImages.length})
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {userImages.map((img) => (
//                 <div key={img.id} className="relative group">
//                   <div className="h-32 rounded-lg overflow-hidden bg-gray-100">
//                     <img
//                       src={img.data}
//                       alt={img.filename}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
//                       <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button
//                           onClick={() => handleDownload(img.data, img.filename)}
//                           className="p-1.5 bg-white rounded-full hover:bg-gray-100"
//                           title="Download"
//                         >
//                           <Download className="w-4 h-4 text-gray-700" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(img.id)}
//                           className="p-1.5 bg-white rounded-full hover:bg-gray-100"
//                           title="Delete"
//                         >
//                           <Trash2 className="w-4 h-4 text-red-500" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-1 text-xs text-gray-500 truncate">
//                     {new Date(img.createdAt).toLocaleDateString()}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Processing Overlay */}
//         {isProcessing && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-4 rounded-lg shadow-xl text-center">
//               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500 mx-auto"></div>
//               <p className="mt-3 text-gray-600">Enhancing your image with love...</p>
//               <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//     </Layout>
//   );
// };

// export default LoveHeartProcessor;


import React, { useState, useEffect } from 'react';
import { Heart, Trash2, Download, Upload, Save } from 'lucide-react';
import Layout from '../Layout/Layout';

const LoveHeartProcessor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [error, setError] = useState(null);
  const [savedImages, setSavedImages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  
  // Simulate user ID - in real app, get this from auth system
  const userId = "user123"; 

  useEffect(() => {
    loadSavedImages();
  }, []);

  const loadSavedImages = () => {
    try {
      // Load images for specific user
      const saved = localStorage.getItem(`heartImages_${userId}`);
      if (saved) {
        setSavedImages(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Error loading saved images:', err);
    }
  };

  const saveImageLocally = async (imageData, originalFilename) => {
    try {
      // Create unique filename with user ID
      const timestamp = new Date().getTime();
      const filename = `${userId}_${timestamp}_${originalFilename}`;

      // Save image data and metadata
      const imageInfo = {
        id: `${userId}_${timestamp}`,
        data: imageData,
        filename: filename,
        originalName: originalFilename,
        createdAt: new Date().toISOString(),
        userId: userId
      };

      const updatedImages = [...savedImages, imageInfo];
      localStorage.setItem(`heartImages_${userId}`, JSON.stringify(updatedImages));
      setSavedImages(updatedImages);

      return imageInfo;
    } catch (err) {
      console.error('Error saving image:', err);
      throw new Error('Failed to save image locally');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        setEnhancedImage(null);
        setError(null);
      } else {
        setError("Please upload a JPEG or PNG image");
      }
    }
  };

  const handleEnhance = async () => {
    if (!selectedImage) return;

    try {
      setIsProcessing(true);
      setError(null);

      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('https://app.keepgoingcare.com/api/enhance', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Enhancement failed');
      }

      const result = await response.json();
      
      if (result.image) {
        setEnhancedImage(result.image);
        // Note: We're not saving automatically after enhancement now
        // User will click the Save button instead
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err.message);
      console.error('Enhancement error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveImage = async () => {
    if (!enhancedImage) return;

    try {
      setIsSaving(true);
      setError(null);

      // In future, we'll replace this with an API call
      // For now, just save locally
      await saveImageLocally(
        enhancedImage,
        selectedImage.name
      );

      // Here's where we would put the API call:
      /*
      const response = await fetch('https://app.keepgoingcare.com/api/save-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}` // if needed
        },
        body: JSON.stringify({
          userId: userId,
          imageData: enhancedImage,
          filename: selectedImage.name
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save image');
      }
      */

      // Success message
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Save image error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      const updatedImages = savedImages.filter(img => img.id !== imageId);
      localStorage.setItem(`heartImages_${userId}`, JSON.stringify(updatedImages));
      setSavedImages(updatedImages);
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Failed to delete image');
    }
  };

  const handleDownload = (imageData, filename) => {
    try {
      const link = document.createElement('a');
      link.href = imageData;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading image:', err);
      setError('Failed to download image');
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setEnhancedImage(null);
    setError(null);
  };

  // Filter images by user ID
  const userImages = savedImages.filter(img => img.userId === userId);

  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <div className="relative py-8 mb-6 bg-gradient-to-r from-pink-50 to-red-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Heart className="text-red-500 w-6 h-6" fill="currentColor" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">
              Love Heart Emoji
            </h1>
            <Heart className="text-red-500 w-6 h-6" fill="currentColor" />
          </div>
          
          <h2 className="text-xl font-medium text-gray-700 mb-2">
            Motivational Image Processor
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-2">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          {!previewUrl ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageUpload}
                className="hidden"
                id="imageInput"
              />
              <label 
                htmlFor="imageInput"
                className="cursor-pointer block"
              >
                <div className="space-y-3">
                  <Upload className="mx-auto h-10 w-10 text-gray-400" />
                  <div className="text-gray-600">
                    <p className="text-base font-medium">Click to upload an image</p>
                    <p className="text-sm mt-1">JPG or PNG</p>
                  </div>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-48 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={enhancedImage || previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  New Image
                </button>
                
                {!enhancedImage && !isProcessing && (
                  <button
                    onClick={handleEnhance}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                    disabled={isProcessing}
                  >
                    <Heart className="w-4 h-4" />
                    Enhance
                  </button>
                )}

                {enhancedImage && (
                  <button
                    onClick={handleSaveImage}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                    disabled={isSaving}
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                )}

                {enhancedImage && (
                  <button
                    onClick={() => handleDownload(enhancedImage, `${userId}_enhanced.jpg`)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Saved Images Gallery */}
        {userImages.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Your Saved Images ({userImages.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {userImages.map((img) => (
                <div key={img.id} className="relative group">
                  <div className="h-32 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={img.data}
                      alt={img.filename}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
                      <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDownload(img.data, img.filename)}
                          className="p-1.5 bg-white rounded-full hover:bg-gray-100"
                          title="Download"
                        >
                          <Download className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          onClick={() => handleDelete(img.id)}
                          className="p-1.5 bg-white rounded-full hover:bg-gray-100"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500 truncate">
                    {new Date(img.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-xl text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500 mx-auto"></div>
              <p className="mt-3 text-gray-600">Enhancing your image with love...</p>
              <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default LoveHeartProcessor;