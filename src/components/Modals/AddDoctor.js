import React, { useState } from "react";
import { Toast } from "../ui/toast";
const AddDoctorModal = ({ isOpen, onClose, onDoctorAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        setLoading(true);
        setError("");
      
        const response = await fetch("https://app.keepgoingcare.com/admin/add_doctor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Convert formData to JSON string
        });
      
        if (response.ok) { // Use `ok` to check if the status is in the range 200-299
          const data = await response.json();
          onDoctorAdded(data); // Callback to update the dashboard
          onClose(); // Close the modal
          setToast("success", "Doctor added successfully!"); // Success toast
        } else {
          setToast("error", "Failed to add doctor. Please try again.");
        //   setError("Failed to add doctor. Please try again.");

        }
      } catch (err) {
        setToast("warning","An error occurred. Please check your input.");
        // setError("An error occurred. Please check your input.");
      } finally {
        setLoading(false);
      }
};      
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 space-y-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Add New Doctor</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-200 text-gray-800"
              placeholder="Doctor's Name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-200 text-gray-800"
              placeholder="Doctor's Email"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-200 text-gray-800"
              placeholder="Enter Doctor's Password"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-200 text-gray-800"
              placeholder="Enter Doctor's Contact Number"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition ${
              loading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {loading ? "Adding..." : "Add Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorModal;
